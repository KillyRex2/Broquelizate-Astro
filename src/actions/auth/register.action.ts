import { firebase } from "@/firebase/config";
import { defineAction } from "astro:actions";
import { z } from 'astro:schema';
import { sendEmailVerification, createUserWithEmailAndPassword, type AuthError } from "firebase/auth";

import { updateProfile } from "firebase/auth/web-extension";

export const registerUser = defineAction({
    accept: 'form',
    input: z.object({
        name: z.string().min(2),
        email: z.string().email(),
        password: z.string().min(6),
        remember_me: z.boolean().optional(),
        
    }),
    handler: async ({name, email, password, remember_me}, {cookies}) => {
        // Cookies
        if (remember_me) {
            cookies.set('email', email, {
                expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365),
                path:'/'
            });
        } else {
            cookies.delete('email', {
                path: '/'
            });

        }

        //Creacion de usuario

        try {

            const user = await createUserWithEmailAndPassword( 
                firebase.auth, 
                email, 
                password
            );

            
            // Actualizar el nombre (displayName)
            updateProfile(firebase.auth.currentUser!, {
                displayName: name,
                /// sino preguntar a la IA photoURL,
            });


            // Verificar el email
            await sendEmailVerification( firebase.auth.currentUser!, {
                // url:'http://localhost:4321/protected?emailVerified=true'
                url: `${import.meta.env.WEBSITE_URL}/protected?emailVerified=true`
            });

        return {
            uid: user.user.uid,
            email: user.user.email,
            name: name,
        };

        } catch (error) {
            const firebaseError = error as AuthError;

            if (firebaseError.code === 'auth/email-already-in-use') {
                throw new Error('email already in use!');
            }

            throw new Error('Something went wrong')
        }
    },
});
import { firebase } from "@/firebase/config";
import { defineAction } from "astro:actions";
import { z } from "astro:schema";
import { GoogleAuthProvider } from "firebase/auth";
import { signInWithCredential } from "firebase/auth";

export const loginWithGoogle = defineAction({
    accept: 'json',
    input: z.any(),
    handler: async(credentials) => {
        const credential = GoogleAuthProvider.credentialFromResult(credentials);

        if ( !credential ) {
            throw new Error('Google sign in failed!')
        }
        await signInWithCredential(firebase.auth, credential)
        
        return {ok: true}

       
    },
});
import { firebase } from "@/firebase/config";
import { defineAction } from "astro:actions";
import { z } from 'astro:schema';
import { signInWithEmailAndPassword } from "firebase/auth";
import type { AuthError } from "firebase/auth";

export const loginUser = defineAction({
  accept: 'form',
  input: z.object({
    email: z.string().email(),
    password: z.string().min(6),
    remember_me: z.boolean().optional(),
  }),
  handler: async ({ email, password, remember_me }, { cookies }) => {
    try {
      // Gestionar cookies
      if (remember_me) {
        cookies.set('email', email, {
          expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365), // 1 año
          path: '/'
        });
      } else {
        cookies.delete('email', { path: '/' });
      }

      // Autenticación
      const userCredential = await signInWithEmailAndPassword(
        firebase.auth,
        email,
        password
      );

      const user = userCredential.user;

      // Puedes guardar un token o UID en cookies si quieres mantener sesión
      cookies.set('uid', user.uid, {
        path: '/',
        httpOnly: true,
        sameSite: 'strict',
        secure: true, // solo si usas https
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7), // 1 semana
      });

      return {
        uid: user.uid,
        email: user.email,
      };

    } catch (error) {
      const firebaseError = error as AuthError;

      // Manejamos algunos errores comunes de login
      if (firebaseError.code === 'auth/user-not-found') {
        throw new Error('User not found');
      }

      if (firebaseError.code === 'auth/wrong-password') {
        throw new Error('Wrong password');
      }

      if (firebaseError.code === 'auth/invalid-credential') {
        throw new Error('Invalid credentials');
      }

      throw new Error('Something went wrong during login');
    }
  },
});

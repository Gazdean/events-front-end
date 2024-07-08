import React from 'react'
import { useState, useContext, useEffect  } from 'react'
import { auth } from '../firebase'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, sendPasswordResetEmail, signInWithPopup, sendEmailVerification } from 'firebase/auth'

import { GoogleAuthProvider } from "firebase/auth"

const AuthContext = React.createContext()



export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({children}) {
    const [currentUser, setCurrentUser] = useState(null)
    
// functions

    async function signup(email, password) {
        try{
            const userCredential = await createUserWithEmailAndPassword( auth, email, password );
            const results = userCredential.user;
            await sendEmailVerification(results);
        } catch (error){
            throw new Error
        }
    }

    async function signin(email, password) {
        try{
            const userCredentials = await signInWithEmailAndPassword(auth, email, password)
            const results = userCredentials.user
            console.log(results.emailVerified)
            if (results.emailVerified) setCurrentUser(results)
            return results
        } catch (error){
            throw new Error
        }
        
    }

    async function logout() {
        try{
            await signOut(auth)
            setCurrentUser(null)
        } catch (error){
            throw new Error
        }
        
    }

    function resetPassword(email) {
        return sendPasswordResetEmail(auth, email)
    }

    

    async function googleSignIn(event) {
        try {
            const provider = new GoogleAuthProvider()
            const result = await signInWithPopup(auth, provider)
            const user = result.user
            setCurrentUser(user)
            return user
        } catch(error) {
            console.log(error)
            throw new Error(error)
        }
    }
   
    const value = {currentUser, signup, signin, logout, resetPassword, googleSignIn}

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
    }

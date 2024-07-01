import React from 'react'
import { useState, useContext, useEffect  } from 'react'
import { auth } from '../firebase'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, sendPasswordResetEmail, signInWithPopup } from 'firebase/auth'

import { GoogleAuthProvider } from "firebase/auth"

const AuthContext = React.createContext()



export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({children}) {
    const [currentUser, setCurrentUser] = useState(null)
    const [loading, setLoading] = useState(true)

    function signup(email, password) {
        console.log(password)
        let passwordData = password
        if(!password) {
            passwordData = new Date().toISOString()
        }
        return createUserWithEmailAndPassword(auth, email, passwordData)
    }

    function signin(email, password) {
        return signInWithEmailAndPassword(auth, email, password)
    }

    function logout() {
        return signOut(auth)
    }

    function resetPassword(email) {
        return sendPasswordResetEmail(auth, email)
    }

    useEffect(()=> {
        const unsubscribe = auth.onAuthStateChanged(user => {
             setCurrentUser(user)
             setLoading(false)        
        })
        return unsubscribe
    }, [])

    async function googleSignIn(event) {
        try {
            const provider = new GoogleAuthProvider()
            return signInWithPopup(auth, provider)
        } catch(error) {
            console.log(error)
            throw new Error(error)
        }
    }
   
    const value = {currentUser, signup, signin, logout, resetPassword, googleSignIn}

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
    }

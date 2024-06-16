import React from 'react'
import { useState, useContext, useEffect  } from 'react'
import { auth } from '../firebase'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, sendPasswordResetEmail } from 'firebase/auth'

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
   
    const value = {currentUser, signup, signin, logout, resetPassword}

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
    }

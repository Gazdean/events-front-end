import React, { useState } from "react"
import {Form, Button, Card, Alert, Container} from "react-bootstrap"
import { useAuth } from '../Contexts/AuthContext'
import { Link, useNavigate } from "react-router-dom"

import { addNewUser } from "../apiFirebaseCalls"

export default function GoogleSignIn({setError, signingIn, setSigningIn, buttonText}) {
    const {googleSignIn} = useAuth()
    const navigate = useNavigate()

  async function handleGoogleSignIn() {
    setError("")
    setSigningIn(true)
    console.log('here')
    try {
        
        const signIn = await googleSignIn()
        console.log('google sign in email', signIn.user.email)
        await addNewUser(signIn.user.email)
        navigate("/")
    } catch (error) {
        console.log(error)
        setError('Failed to log in')
    }finally {
        setSigningIn(false)
    }
}

  return (
    <Button  disabled={signingIn}  variant="success" className="w-100 mt-2" onClick={handleGoogleSignIn}>{`Sign ${buttonText} With Google`}</Button>
  )
}

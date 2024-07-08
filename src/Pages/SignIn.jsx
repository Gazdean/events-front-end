import React, { useState } from "react"
import {Form, Button, Card, Alert, Container} from "react-bootstrap"
import { useAuth } from '../Contexts/AuthContext'
import { Link, useNavigate } from "react-router-dom"

import { useForm } from 'react-hook-form'
import { addNewUser } from "../apiFirebaseCalls"

export default function SignIn () {
    const {signin, googleSignIn} = useAuth()
    const [error, setError] = useState("")
    const [googleError, setGoogleError] = useState("")
    const [loading, setLoading] = useState(false)
    const [verifiedUser, setVerifiedUser] = useState(true)
    const navigate = useNavigate()

    const {register, handleSubmit, formState:{errors}} = useForm()

    async function onSubmit(data) {
        try {
            setError('')
            setLoading(true)
            const results = await signin(data.email, data.password)
            console.log(results.emailVerified)
            !results.emailVerified ? 
                setVerifiedUser(false) :
                navigate("/")
        } catch(error) {
            setError('Failed to log in')
        }finally {
            setLoading(false)
        }
    }

    async function handleGoogleSignIn() {
        setError("")
        setLoading(true)
        console.log('here')
        try {   
            const signIn = await googleSignIn()
            console.log('google sign in email', signIn.email)
            await addNewUser(signIn.email)
            navigate("/")
        } catch (error) {
            console.log(error)
            setError('Failed to log in')
        }finally {
            setLoading(false)
        }
    }

    return (
        <Container className="w-100" style={{maxWidth:"400px"}}>
          <Card>
            <Card.Body>
                <h2 className="text-center mb-4">Sign In</h2>
                {error && <Alert variant="danger">{error}</Alert>}
                {!verifiedUser && <Alert variant="danger">Please verify your account, check inboxes and junk folder</Alert>}
                <Form onSubmit={handleSubmit(onSubmit)} >
                    <Form.Group id="email">
                        <Form.Label htmlFor="signInEmail">Email</Form.Label>
                        <Form.Control id="signInEmail" name="signInEmail" type="email" autoComplete="family-name"{...register('email', {required:true})}></Form.Control>
                        {errors.email?.type==="required"&&<p tabIndex="0" className="border border-2 border-danger rounded mt-2 ps-2" >An email is required</p>}
                    </Form.Group>
                    <Form.Group id="password">
                        <Form.Label htmlFor="signInPassword" >Password</Form.Label>
                        <Form.Control id="signInPassword" name="signInPassword"type="password" {...register('password', {required:true})}></Form.Control>
                        {errors.password?.type==="required"&&<p tabIndex="0" className="border border-2 border-danger rounded mt-2 ps-2">A password is required</p>}
                    </Form.Group>
                    <Button disabled={loading} className="w-100 mt-4" type="submit">Sign In</Button>
                    <Button disabled={loading}  variant="success" className="w-100 mt-4" onClick={handleGoogleSignIn}>Sign In With Google</Button>
                </Form>
                <div className="w-100 text-center mt-3"><Link to="/forgot-password">Forgot Password?</Link></div>
            </Card.Body>
            <div className="w-100 text-center mt-2">
              Don't have an account? <Link to="/join">Sign up</Link> 
            </div>
          </Card>
        </Container>
    )
}
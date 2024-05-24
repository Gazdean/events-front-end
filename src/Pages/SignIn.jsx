import React, { useState, useRef } from "react"
import {Form, Button, Card, Alert, Container} from "react-bootstrap"
import { useAuth } from '../Contexts/AuthContext'
import { Link, useNavigate } from "react-router-dom"

export default function SignIn () {
    const emailRef = useRef()
    const passwordRef = useRef()
    const {signin} = useAuth()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    async function handleSubmit(event) {
        event.preventDefault()

        try {
            setError('')
            setLoading(true)
            await signin(emailRef.current.value, passwordRef.current.value)
            navigate("/")
        } catch {
            setError('Failed to log in')
        }
        setLoading(false)    
    }

    return (
        <>
          <Card>
            <Card.Body>
                <h2 className="text-center mb-4">Log In</h2>
                {error && <Alert variant="danger">{error}</Alert>}
                <Form onSubmit={handleSubmit} >
                    <Form.Group id="email">
                        <Form.Label htmlFor="signInEmail">Email</Form.Label>
                        <Form.Control id="signInEmail" name="signInEmail" type="email" ref={emailRef} required></Form.Control>
                    </Form.Group>
                    <Form.Group id="password">
                        <Form.Label htmlFor="signInPassword" >Password</Form.Label>
                        <Form.Control id="signInPassword" name="signInPassword"type="password" ref={passwordRef} required></Form.Control>
                    </Form.Group>
                    <Button disabled={loading} className="w-100 mt-4" type="submit">Log in</Button>
                </Form>
                <div className="w-100 text-center mt-3"><Link to="/forgot-password">Forgot Password?</Link></div>
            </Card.Body>
            <div className="w-100 text-center mt-2">
              Don't have an account? <Link to="/join">Sign up</Link> 
            </div>
          </Card>
        </>
    )
}
import React, { useState, useRef } from "react"
import {Form, Button, Card, Alert} from "react-bootstrap"
import { useAuth } from '../Contexts/AuthContext'
import { Link } from "react-router-dom"

export default function ForgotPassword() {
    const emailRef = useRef()
    const { resetPassword } = useAuth()
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState('')

    async function handleSubmit(event) {
        event.preventDefault()

        try {
            setMessage('')
            setLoading(true)
            await resetPassword(emailRef.current.value)
            setMessage('Check your inbox or junk for futher instructions')
        } catch {
            // no error sent from Firebase if email does not exsist due to Firebases 'email enumeration protection' to stop brute-force attacks           
        }
        setLoading(false)
        
    }

    return (
        <>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Password Reset</h2>
                    {message && <Alert variant="success">{message}</Alert>}
                    <Form onSubmit={handleSubmit} >
                        <Form.Group id="email">
                            <Form.Label htmlFor="forgotPasswordEmail">Email</Form.Label>
                            <Form.Control id="forgotPasswordEmail" name="forgotPasswordEmail" type="email" ref={emailRef} required></Form.Control>
                        </Form.Group>
                        <Button disabled={loading} className="w-100 mt-4" type="submit">Reset Password</Button>
                    </Form>
                    <div className="w-100 text-center mt-3"><Link to="/sign-in">Login</Link></div>
                </Card.Body>
              <div className="w-100 text-center mt-2">
                Don't have an account? <Link to="/join">Sign up</Link> 
              </div>
            </Card>
            
        </>
    )
}
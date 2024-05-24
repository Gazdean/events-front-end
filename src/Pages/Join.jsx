import React, { useState, useRef } from "react"
import {Form, Button, Card, Alert, Container} from "react-bootstrap"
import { useAuth } from '../Contexts/AuthContext'
import { Link, useNavigate } from "react-router-dom"

export default function Join () {
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const {signup} = useAuth()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate() 

    async function handleSubmit(event) {
        event.preventDefault()

        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError ("Passwords do not match")
        }
        try {
            setError('')
            setLoading(true)
            await signup(emailRef.current.value, passwordRef.current.value)
            navigate("/")
        } catch {
            console.log()
            setError('Failed to create account')
        }
        setLoading(false)
        
    }

    return (
        <>
            <Card >
                <Card.Body >
                    <h2 className="text-center mb-4">Create an account</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={handleSubmit} >
                        <Form.Group id="email">
                            <Form.Label htmlFor="joinEmail">Email</Form.Label>
                            <Form.Control id="joinEmail" name="joinEmail" type="email" ref={emailRef} required></Form.Control>
                        </Form.Group>
                        <Form.Group id="password">
                            <Form.Label htmlFor="joinPassword">Password</Form.Label>
                            <Form.Control id="joinPassword" name="joinPassword" type="password" ref={passwordRef} required></Form.Control>
                        </Form.Group>
                        <Form.Group id="email">
                            <Form.Label htmlFor="joinConfirm">Password Confirmation</Form.Label>
                            <Form.Control id="joinConfirm" name="joinConfirm"type="password"  ref={passwordConfirmRef} required></Form.Control>
                        </Form.Group>
                        <Button disabled={loading} className="w-100 mt-4" type="submit">Sign Up</Button>
                    </Form>
                </Card.Body>
                    <Card.Text className="w-100 text-center mt-2">
                         Already have an account? <Link to="/sign-in">Log in</Link>
                    </Card.Text>
            </Card>
        </>
    )
}
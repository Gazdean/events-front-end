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


    const emailRegex = /^((([!#$%&'*+\-/=?^_`{|}~\w])|([!#$%&'*+\-/=?^_`{|}~\w][!#$%&'*+\-/=?^_`{|}~\.\w]{0,}[!#$%&'*+\-/=?^_`{|}~\w]))[@]\w+([-.]\w+)*\.\w+([-.]\w+)*)$/
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&^])[A-Za-z\d@.#$!%*?&]{8,15}$/

    async function onSubmit(data) {

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
        <Container className="w-100" style={{maxWidth:"400px"}}>
            <Card >
                <Card.Body >
                    <h2 className="text-center mb-4">Create an account</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={handleSubmit(onSubmit)} noValidate={true}>
                        <Form.Group id="email">
                            <Form.Label htmlFor="joinEmail">Email</Form.Label>
                            <Form.Control id="joinEmail" name="joinEmail" type="email"  {...register('email', {required:true, pattern:emailRegex})}></Form.Control>
                            {errors.email?.type==="required"&&<p tabIndex="0" className="border border-2 border-danger rounded mt-2 ps-2" >An email is required</p>}
                            {errors.email?.type==="pattern"&&<p tabIndex="0" className="border border-2 border-danger rounded mt-2 ps-2">Must be a valid email address</p>}
                        </Form.Group>
                        <Form.Group id="password">
                            <Form.Label htmlFor="joinPassword">Password</Form.Label>
                            <Form.Control id="joinPassword" name="joinPassword" type="password" {...register('password', {required:true, pattern: passwordRegex})}></Form.Control>
                             {errors.password?.type==="required"&&<p tabIndex="0" className="border border-2 border-danger rounded mt-2 ps-2">A password is required</p>}
                             {errors.password?.type==="pattern"&&<p tabIndex="0" className="border border-2 border-danger rounded mt-2 pe-2 ps-2">Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.</p>}
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
        </Container>
    )
}
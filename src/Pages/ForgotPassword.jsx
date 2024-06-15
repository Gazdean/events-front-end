import React, { useState } from "react"
import {Form, Button, Card, Alert, Container} from "react-bootstrap"
import { useAuth } from '../Contexts/AuthContext'
import { Link } from "react-router-dom"

import { useForm } from 'react-hook-form'

export default function ForgotPassword() {
    const { resetPassword } = useAuth()
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState('')
    const {register, handleSubmit, formState:{errors}} = useForm()

    async function onSubmit(data) {
        try {
            setMessage('')
            setLoading(true)
            await resetPassword(data.email)
            setMessage('Check your inbox or junk for futher instructions')
        } catch(error) {
            // no error sent from Firebase if email does not exsist due to Firebases 'email enumeration protection' to stop brute-force attacks           
        } finally {
            setLoading(false)
        }
    }

    return (
        <Container className="w-100" style={{maxWidth:"400px"}}>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Password Reset</h2>
                    {message && <Alert variant="success">{message}</Alert>}
                    <Form onSubmit={handleSubmit(onSubmit)} >
                        <Form.Group id="email">
                            <Form.Label htmlFor="forgotPasswordEmail">Email</Form.Label>
                            <Form.Control id="forgotPasswordEmail" name="forgotPasswordEmail" type="email" {...register('email', {required:true})}></Form.Control>
                            {errors.email?.type==="required"&&<p tabIndex="0" className="border border-2 border-danger rounded mt-2 ps-2" >An email is required</p>}
                        </Form.Group>
                        <Button disabled={loading} className="w-100 mt-4" type="submit">Reset Password</Button>
                    </Form>
                    <div className="w-100 text-center mt-3"><Link to="/sign-in">Login</Link></div>
                </Card.Body>
              <div className="w-100 text-center mt-2">
                Don't have an account? <Link to="/join">Sign up</Link> 
              </div>
            </Card>        
        </Container>
    )
}
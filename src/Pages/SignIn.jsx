import React, { useState } from "react"
import {Form, Button, Card, Alert, Container} from "react-bootstrap"
import { useAuth } from '../Contexts/AuthContext'
import { Link, useNavigate } from "react-router-dom"

import { useForm } from 'react-hook-form'

export default function SignIn () {
    const {signin} = useAuth()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const {register, handleSubmit, formState:{errors}} = useForm()

    async function onSubmit(data) {
        try {
            setError('')
            setLoading(true)
            await signin(data.email, data.password)
            navigate("/")
        } catch {
            setError('Failed to log in')
        }
        setLoading(false)    
    }

    return (
        <Container className="w-100" style={{maxWidth:"400px"}}>
          <Card>
            <Card.Body>
                <h2 className="text-center mb-4">Sign In</h2>
                {error && <Alert variant="danger">{error}</Alert>}
                <Form onSubmit={handleSubmit(onSubmit)} >
                    <Form.Group id="email">
                        <Form.Label htmlFor="signInEmail">Email</Form.Label>
                        <Form.Control id="signInEmail" name="signInEmail" type="email" {...register('email', {required:true})}></Form.Control>
                        {errors.email?.type==="required"&&<p tabIndex="0" className="border border-2 border-danger rounded mt-2 ps-2" >An email is required</p>}
                    </Form.Group>
                    <Form.Group id="password">
                        <Form.Label htmlFor="signInPassword" >Password</Form.Label>
                        <Form.Control id="signInPassword" name="signInPassword"type="password" {...register('password', {required:true})}></Form.Control>
                        {errors.password?.type==="required"&&<p tabIndex="0" className="border border-2 border-danger rounded mt-2 ps-2">A password is required</p>}
                    </Form.Group>
                    <Button disabled={loading} className="w-100 mt-4" type="submit">Sign in</Button>
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
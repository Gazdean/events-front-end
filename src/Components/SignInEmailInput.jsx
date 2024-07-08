import React from 'react'
import { useAuth } from '../Contexts/AuthContext'
import {Button, Form} from "react-bootstrap"
import { useForm } from 'react-hook-form'

export default function SignInEmailInput({ setUserEmail, setError, signingIn, setSigningIn, setSignInMethod}) {
  const { checkUserExists } = useAuth()
  const {register, handleSubmit, formState:{errors}} = useForm()
  const emailRegex = /^((([!#$%&'*+\-/=?^_`{|}~\w])|([!#$%&'*+\-/=?^_`{|}~\w][!#$%&'*+\-/=?^_`{|}~\.\w]{0,}[!#$%&'*+\-/=?^_`{|}~\w]))[@]\w+([-.]\w+)*\.\w+([-.]\w+)*)$/
  
  async function onSubmit(data) {
    try {
        setError('')
        setSigningIn(true)
        const userDetails = await checkUserExists(data.email)
        console.log('user details', userDetails)
        setUserEmail(data.email)
        setSignInMethod()
    } catch(error) {
        console.log(error)
        setError('enter an email address')
    }finally {
        setSigningIn(false)
    }
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)} noValidate={true}>
        <Form.Group id='email'>
            <Form.Label htmlFor='signInEmail'>Email</Form.Label>
            <Form.Control id='signInEmail' name='signInEmail' type='email' {...register('email', {required:true, pattern:emailRegex})}></Form.Control>
            {errors.email?.type==='required'&&<p tabIndex='0' className='border border-2 border-danger rounded mt-2 ps-2' >An email is required</p>}
            {errors.email?.type==="pattern"&&<p tabIndex="0" className="border border-2 border-danger rounded mt-2 ps-2">Must be a valid email address</p>}
            <Button disabled={signingIn} className='w-100 mt-4 mb-2' type="submit">Submit</Button>
        </Form.Group>
    </Form>
  )
}

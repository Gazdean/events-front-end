import React from 'react'
import {Form, Button} from 'react-bootstrap'
import { Link } from 'react-router-dom'

export default function SignInPasswordInput({register, errors, signingIn}) {
  return (
    <>
        <Form.Group id='password'>
            <Form.Label htmlFor='signInPassword' >Password</Form.Label>
            <Form.Control id='signInPassword' name='signInPassword'type='password' {...register('password', {required:true})}></Form.Control>
            {errors.password?.type==='required'&&<p tabIndex='0' className='border border-2 border-danger rounded mt-2 ps-2'>A password is required</p>}
        </Form.Group>
        <Button disabled={signingIn} className='w-100 mt-4 mb-2' type='submit'>Sign In</Button>
        <div className='w-100 text-center mt-1'><Link to='/forgot-password'>Forgot Password?</Link></div>
    </>
  )
}

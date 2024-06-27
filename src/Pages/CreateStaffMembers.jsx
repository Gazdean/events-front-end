import React, { useState } from "react"
import {Form, Button, Card, Alert, Container} from "react-bootstrap"

import { useForm } from 'react-hook-form'
import ReturnToEventsButton from "../Components/ReturnToEventsButton"
import { addNewStaff } from "../apiFirebaseCalls"

export default function CreateStaffMembers ({}) {
    const [error, setError] = useState("")
    const [creatingStaff, setCreatingStaff] = useState(false)
    const [staffCreated, setStaffCreated] = useState(false)
    
    const {register, handleSubmit, formState:{errors}, reset} = useForm()

    const emailRegex = /^((([!#$%&'*+\-/=?^_`{|}~\w])|([!#$%&'*+\-/=?^_`{|}~\w][!#$%&'*+\-/=?^_`{|}~\.\w]{0,}[!#$%&'*+\-/=?^_`{|}~\w]))[@]\w+([-.]\w+)*\.\w+([-.]\w+)*)$/
   
    async function onSubmit(data) {
        setError('')
        setCreatingStaff(true)
        setStaffCreated(false)
        const email = data.email
        const staffData = {... data}
        if (staffData.isAdmin === "true") staffData.isAdmin = true
        else staffData.isAdmin = false
        delete staffData.email
        console.log(staffData)
        try {
            await addNewStaff(email, staffData)
            setStaffCreated(true)
        } catch(error){
            console.log(error)
            setError(error.message)       
        } finally {
            setCreatingStaff(false)
        }
    }

    function handleOnFocus() {
        if (staffCreated) {
            setStaffCreated(false)
            reset()
        }
    }

    return (
        
        <Container className="w-100" style={{maxWidth:"400px"}}>
            <Card className="mb-4">
                <Card.Body >
                    <h2 className="text-center mb-4">Add a Staff Member</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    {creatingStaff && <Alert variant="primary">CreatingStaff</Alert>}
                    {staffCreated && <Alert variant="primary">Staff Member Added</Alert>}

                    <Form onSubmit={handleSubmit(onSubmit)} noValidate={true}>

                        <Form.Group id="inputFirstName">
                            <Form.Label htmlFor="firstName">First Name</Form.Label>
                            <Form.Control id="firstName" name="firstName" type="text" maxLength={140} onFocus={handleOnFocus} {...register('firstName', {required:true})}></Form.Control>
                            {errors.firstName?.type==="required"&&<p tabIndex="0" className="border border-2 border-danger rounded mt-2 ps-2" >A first name is required</p>}
                        </Form.Group>

                        <Form.Group id="inputLastName">
                            <Form.Label htmlFor="lastName">Last Name</Form.Label>
                            <Form.Control id="lastName" name="lastName" type="text" maxLength={140} onFocus={handleOnFocus} {...register('lastName', {required:true})}></Form.Control>
                            {errors.lastName?.type==="required"&&<p tabIndex="0" className="border border-2 border-danger rounded mt-2 ps-2" >A last name is required</p>}
                        </Form.Group>

                        <Form.Group id="email">
                            <Form.Label htmlFor="joinEmail">Email</Form.Label>
                            <Form.Control id="joinEmail" name="joinEmail" type="email"  {...register('email', {required:true, pattern:emailRegex})}></Form.Control>
                            {errors.email?.type==="required"&&<p tabIndex="0" className="border border-2 border-danger rounded mt-2 ps-2" >An email is required</p>}
                            {errors.email?.type==="pattern"&&<p tabIndex="0" className="border border-2 border-danger rounded mt-2 ps-2">Must be a valid email address</p>}
                        </Form.Group>

                        <Form.Group id="inputIsAdmin">
                            <Form.Label htmlFor="isAdmin">Is the staff member also an  admin</Form.Label>
                            <Form.Select id="isAdmin" name="isAdmin"  onFocus={handleOnFocus} {...register('isAdmin', {required:true})} >              
                                <option value="" >Please Select</option>
                                <option value={true}>true</option>
                                <option value={false}>false</option>
                            </Form.Select>
                            {errors.isAdmin?.type==="required"&&<p tabIndex="0" className="border border-2 border-danger rounded mt-2 ps-2" >Admin status is required</p>}
                        </Form.Group>

                        <Button disabled={creatingStaff} className="w-100 mt-4" type="submit" >Add Staff Member</Button>                   
                    </Form>
                </Card.Body>
            </Card>
            <ReturnToEventsButton string={"Return To Events"}/>
        </Container>
    )
}
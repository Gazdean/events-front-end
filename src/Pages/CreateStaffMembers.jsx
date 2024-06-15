import React, { useEffect, useState } from "react"
import {Form, Button, Card, Alert, Container} from "react-bootstrap"
import { useNavigate } from "react-router-dom"

import { useForm } from 'react-hook-form'
import ReturnToEventsButton from "../Components/ReturnToEventsButton"

export default function CreateStaffMembers ({}) {
    const navigate = useNavigate() 

    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const [creatingStaff, setCreatingStaff] = useState(false)
    
    const {register, handleSubmit, watch, formState:{errors}, setValue} = useForm()

//  below useEffect resets form values depending on the value of true/false answers
    
    async function onSubmit(data) {
        setError('')
        setLoading(true)
        setNewEventCreated(false)
        setCreatingStaff(true)
        try {
           
            const eventBody = formatCreateEventData(data)

            const createdEvent = await createEventbriteEvent(eventBody, organizationId)

            const eventId = createdEvent.id

            const ticketBody = formatCreateTicketClassData(data)

            const createdTicketClass = await createEventTicketClass(ticketBody, eventId)

            setNewEventCreated(true)
            
            navigate("/")
            
        } catch(error){
            console.log(error)
            setError('failed to create event')
            
        } finally {
            setLoading(false)
            setCreatingStaff(false)
        }
    }

    return (
        
        <Container className="w-100" style={{maxWidth:"400px"}}>
            <Card className="mb-4">
                <Card.Body >
                    <h2 className="text-center mb-4">Add a Staff Member</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    {creatingStaff && <Alert variant="primary">CreatingStaff event</Alert>}

                    <Form onSubmit={handleSubmit(onSubmit)} noValidate={true}>

                        <Form.Group id="eventTitle">
                            <Form.Label htmlFor="name">First Name</Form.Label>
                            <Form.Control id="name" name="name" type="text" maxLength={140} {...register('name', {required:true, })}></Form.Control>
                            {errors.name?.type==="required"&&<p tabIndex="0" className="border border-2 border-danger rounded mt-2 ps-2" >An event name is required</p>}
                        </Form.Group>

                        <Form.Group id="eventTitle">
                            <Form.Label htmlFor="name">Last Name</Form.Label>
                            <Form.Control id="name" name="name" type="text" maxLength={140} {...register('name', {required:true, })}></Form.Control>
                            {errors.name?.type==="required"&&<p tabIndex="0" className="border border-2 border-danger rounded mt-2 ps-2" >An event name is required</p>}
                        </Form.Group>

                        <Form.Group id="inputIsFree">
                            <Form.Label htmlFor="isFree">Is the staff member admin</Form.Label>
                            <Form.Select id="isFree" name="isFree" {...register('isFree', {required:true})} >              
                              <option>Please Select</option>
                              <option>true</option>
                              <option>false</option>
                            </Form.Select>
                            {errors.isFree?.type==="required"&&<p tabIndex="0" className="border border-2 border-danger rounded mt-2 ps-2" >Free event status is required</p>}
                        </Form.Group>

                        <Button disabled={loading} className="w-100 mt-4" type="submit" >Add Staff Member</Button>                   
                    </Form>
                </Card.Body>
            </Card>
            <ReturnToEventsButton string={"Cancel And Return To Events"}/>
        </Container>
    )
}
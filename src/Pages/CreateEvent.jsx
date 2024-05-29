import React, { useState } from "react"
import {Form, Button, Card, Alert, Container} from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"

import { useForm } from 'react-hook-form'

export default function createEvent () {

    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate() 

    const {register, handleSubmit, watch, formState:{errors}} = useForm()

    async function onSubmit(data) {
        try {
            setError('')
            setLoading(true)
            console.dir(data)
            
        } catch {
            console.log(error)
            setError('Failed to create account')
        }
        setLoading(false)

    }

    return (
        
        <Container className="w-100" style={{maxWidth:"400px"}}>
            <Card >
                <Card.Body >
                    <h2 className="text-center mb-4">Create an event</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={handleSubmit(onSubmit)} noValidate={true}>

                        <Form.Group id="title">
                            <Form.Label htmlFor="formEventTitle">Event Title</Form.Label>
                            <Form.Control id="formEventTitle" name="eventTitle" type="text"  {...register('eventTitle', {required:true, })}></Form.Control>
                            {errors.eventTitle?.type==="required"&&<p tabIndex="0" className="border border-2 border-danger rounded mt-2 ps-2" >A title is required</p>}
                        </Form.Group>

                        <Form.Group id="description">
                            <Form.Label htmlFor="formEventDescription">Event Description</Form.Label>
                            <Form.Control id="formEventDescription" name="eventDescription" type="text"  as="textarea" rows={3} {...register('eventDescription', {required:true, })}></Form.Control>
                            {errors.eventDescription?.type==="required"&&<p tabIndex="0" className="border border-2 border-danger rounded mt-2 ps-2" >A description is required</p>}
                        </Form.Group>

                        <Form.Group id="startDate">
                            <Form.Label htmlFor="formEventstartDate">Event start date</Form.Label>
                            <Form.Control id="formEventstartDate" name="eventstartDate" type="date" {...register('eventstartDate', {required:true, })}></Form.Control>
                            {errors.eventstartDate?.type==="required"&&<p tabIndex="0" className="border border-2 border-danger rounded mt-2 ps-2" >a start date is required</p>}
                        </Form.Group>

                        <Form.Group id="endDate">
                            <Form.Label htmlFor="formEventEndDate">Event EndDate</Form.Label>
                            <Form.Control id="formEventEndDate" name="eventEndDate" type="date" {...register('eventEndDate', {required:true, })}></Form.Control>
                            {errors.eventEndDate?.type==="required"&&<p tabIndex="0" className="border border-2 border-danger rounded mt-2 ps-2" >A EndDate is required</p>}
                        </Form.Group>
                        
                        <Form.Group id="category">
                            <Form.Label htmlFor="formEventCategory">Event Category</Form.Label>
                            <Form.Select id="formEventCategory" name="eventCategory" {...register('eventCategory', {required:true, })}>
                              <option value="1">1</option>
                              <option value="2">2</option>
                              <option value="3">3</option>
                            </Form.Select>
                            {errors.eventCategory?.type==="required"&&<p tabIndex="0" className="border border-2 border-danger rounded mt-2 ps-2" >A category is required</p>}
                        </Form.Group>

                        <Form.Group id="ticketsAvailable">
                            <Form.Label htmlFor="formEventTicketsAvailable">Event TicketsAvailable</Form.Label>
                            <Form.Control id="formEventTicketsAvailable" name="eventTicketsAvailable" type="text"  {...register('eventTicketsAvailable', {required:true, })}></Form.Control>
                            {errors.eventTicketsAvailable?.type==="required"&&<p tabIndex="0" className="border border-2 border-danger rounded mt-2 ps-2" >amount of tickets is required</p>}
                        </Form.Group>
    
                        <Button disabled={loading} className="w-100 mt-4" type="submit" >Create Event</Button>
                    </Form>
                </Card.Body>
                    
            </Card>
        </Container>
    )
}
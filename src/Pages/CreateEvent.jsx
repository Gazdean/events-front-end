import React, { useEffect, useState } from "react"
import {Form, Button, Card, Alert, Container} from "react-bootstrap"
import { useNavigate } from "react-router-dom"

import { useForm } from 'react-hook-form'
import { createEventbriteEvent, createEventTicketClass } from "../apiEventBriteCalls"
import CategoryOptions from "../Components/CategoryOptions"
import {formatCreateEventData, formatCreateTicketClassData} from "../utils"
import ReturnToEventsButton from "../Components/ReturnToEventsButton"

export default function createEvent ({organizationId, categories, setNewEventCreated}) {
    const navigate = useNavigate() 

    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const [creatingEvent, setCreatingEvent] = useState(false)
    
    const {register, handleSubmit, watch, formState:{errors}, setValue} = useForm()

    const watchIsFree = watch("isFree", "")
    const watchIsDonation = watch("donation", "")

    const wholeNumRegex = /^(0|[1-9]\d*)$/

//  below useEffect resets form values depending on the value of true/false answers
    useEffect(() => {
        if (watchIsFree === "true") {
            setValue('cost', ''); 
            setValue('donation', ''); 
        } else if (watchIsFree === "false" && watchIsDonation === "true") { // change to !watchIsFree
            setValue('cost', '')
        }
    }, [watchIsFree, watchIsDonation]);
    
    async function onSubmit(data) {
        setError('')
        setLoading(true)
        setNewEventCreated(false)
        setCreatingEvent(true)
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
            setCreatingEvent(false)
        }
    }

    return (
        
        <Container className="w-100" style={{maxWidth:"400px"}}>
            <Card className="mb-4">
                <Card.Body >
                    <h2 className="text-center mb-4">Create an event</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    {creatingEvent && <Alert variant="primary">Creating your event</Alert>}

                    <Form onSubmit={handleSubmit(onSubmit)} noValidate={true}>

                        <Form.Group id="eventTitle">
                            <Form.Label htmlFor="name">Event Name</Form.Label>
                            <Form.Control id="name" name="name" type="text" maxLength={140} {...register('name', {required:true, })}></Form.Control>
                            {errors.name?.type==="required"&&<p tabIndex="0" className="border border-2 border-danger rounded mt-2 ps-2" >An event name is required</p>}
                        </Form.Group>

                        <Form.Group id="eventDescription">
                            <Form.Label htmlFor="description">Event Description</Form.Label>
                            <Form.Control id="description" name="description" type="text"  as="textarea" rows={3} {...register('description', {required:true, maxLength: 140})}></Form.Control>
                            {errors.description?.type==="required"&&<p tabIndex="0" className="border border-2 border-danger rounded mt-2 ps-2" >An event description is required</p>}
                            {errors.description?.type==="maxLength"&&<p tabIndex="0" className="border border-2 border-danger rounded mt-2 ps-2" >Only use 140 characters</p>}
                        </Form.Group>

                        <Form.Group id="EventCategory">
                            <Form.Label htmlFor="category_id">Event Category</Form.Label>
                            <Form.Select id="category_id" name="category_id" {...register('category_id', {required:true, })}>              
                              <option>-- please select a category --</option>
                              <CategoryOptions categories={categories}/>
                            </Form.Select>
                            {errors.category_id?.type==="required"&&<p tabIndex="0" className="border border-2 border-danger rounded mt-2 ps-2" >A category is required</p>}
                        </Form.Group>

                        <Form.Group id="startDate">
                            <Form.Label htmlFor="start">Event start date</Form.Label>
                            <Form.Control id="start" name="start" type="datetime-local" {...register('start', {required:true, })}></Form.Control>
                            {errors.start?.type==="required"&&<p tabIndex="0" className="border border-2 border-danger rounded mt-2 ps-2" >a start date and time is required</p>}
                        </Form.Group>

                        <Form.Group id="endDate">
                            <Form.Label htmlFor="end">Event EndDate</Form.Label>
                            <Form.Control id="end" name="end" type="datetime-local" {...register('end', {required:true, })}></Form.Control>
                            {errors.end?.type==="required"&&<p tabIndex="0" className="border border-2 border-danger rounded mt-2 ps-2" >An end date and time is required</p>}
                        </Form.Group>

                        <Form.Group id="ticketsAvailable">
                            <Form.Label htmlFor="capacity">Number of tickets available</Form.Label>
                            <Form.Control id="capacity" name="capacity" type="number" min="1" {...register('capacity', {required:true, pattern:wholeNumRegex })}></Form.Control>
                            {errors.capacity?.type==="required"&&<p tabIndex="0" className="border border-2 border-danger rounded mt-2 ps-2" >Number of tickets available is required</p>}
                            {errors.capacity?.type==="pattern"&&<p tabIndex="0" className="border border-2 border-danger rounded mt-2 ps-2" >Should be a whole number</p>}
                        </Form.Group>

                        <Form.Group id="inputIsFree">
                            <Form.Label htmlFor="isFree">Is the event free</Form.Label>
                            <Form.Select id="isFree" name="isFree" {...register('isFree', {required:true})} >              
                              <option>Please Select</option>
                              <option>true</option>
                              <option>false</option>
                            </Form.Select>
                            {errors.isFree?.type==="required"&&<p tabIndex="0" className="border border-2 border-danger rounded mt-2 ps-2" >Free event status is required</p>}
                        </Form.Group>
                        
                        { watchIsFree === "false"  && (
                        <Form.Group id="selectDonation">
                            <Form.Label htmlFor="donation">Is the event pay what you feel</Form.Label>
                            <Form.Select id="donation" name="donation" {...register('donation', {required:true})} >              
                              <option>Please Select</option>
                              <option>true</option>
                              <option>false</option>
                            </Form.Select>
                            {errors.donation?.type==="required"&&<p tabIndex="0" className="border border-2 border-danger rounded mt-2 ps-2" >Donation event status is required</p>}
                        </Form.Group>)}

                        {watchIsDonation === "false" && watchIsFree === "false" && (
                            <Form.Group id="costInput">
                                <Form.Label htmlFor="cost">Cost per ticket in £</Form.Label>
                                <Form.Control id="cost" name="cost" type="number" min="0" {...register('cost', {required:true, pattern:wholeNumRegex})}></Form.Control>
                                {errors.cost?.type==="required"&&<p tabIndex="0" className="border border-2 border-danger rounded mt-2 ps-2" >Event cost is required</p>}
                                {errors.cost?.type==="pattern"&&<p tabIndex="0" className="border border-2 border-danger rounded mt-2 ps-2" >Cost should be a whole number</p>}
                            </Form.Group>) 
                        }                      
                        <Button disabled={loading} className="w-100 mt-4" type="submit" >Create Event</Button>                   
                    </Form>
                </Card.Body>
            </Card>
            <ReturnToEventsButton string={"Cancel And Return To Events"}/>
        </Container>
    )
}
import React, { useEffect, useState } from "react"
import {Form, Button, Card, Alert, Container} from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"

import { useForm } from 'react-hook-form'
import { fetchEventbriteCategories } from "../apiEventBriteCalls"
import CategoryOptions from "../Components/CategoryOptions"

export default function createEvent () {

    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const [catLoading, setCatLoading] = useState(false)
    const [categories, setCategories] = useState([])
    const navigate = useNavigate() 

    const {register, handleSubmit, watch, formState:{errors}} = useForm()

    const watchIsFree = watch("formIsFree", "")
    const wholeNumRegex = /^(0|[1-9]\d*)$/

    const eventData = {
        listed:false,
        ticket_classes: [{
            "name": "General Admission",
            "quantity_total": 0,
            "cost": {
                "value": "0",
                "currency": "GBP"
            },
            free: true
        }],
        online_event: false,
        venue: {
            "name": "",
            "address": {
                "address_1": "",
                "address_2": "",
                "city": "",
                "region": "",
                "postal_code": "3",
                "country": "UK"
            }
        }
    }

    useEffect(()=> {
      handleSetCategories()
  }, [])

  async function handleSetCategories() {
    setCatLoading(true)
    try { 
      const data = await fetchEventbriteCategories()
      setCategories(data.categories)
      setCatLoading(false)
    } catch {
        console.log(error, ' category error')
        setError('Failed To Load Categories')
    } finally {
        setCatLoading(false)
    }
  }
    
    async function onSubmit(data) {
        try {
            setError('')
            setLoading(true)
            console.dir(data)
           
            
            // navigate("/")
            
        } catch {
            console.log(error)
            
        } finally {
            setLoading(false)
        }
    }

    return (
        
        <Container className="w-100" style={{maxWidth:"400px"}}>
            <Card >
                <Card.Body >
                    <h2 className="text-center mb-4">Create an event</h2>
                    {error && <Alert variant="danger">{error}</Alert>}

                    <Form onSubmit={handleSubmit(onSubmit)} noValidate={true}>

                        <Form.Group id="eventTitle">
                            <Form.Label htmlFor="name">Event Name</Form.Label>
                            <Form.Control id="name" name="name" type="text"  {...register('name', {required:true, })}></Form.Control>
                            {errors.name?.type==="required"&&<p tabIndex="0" className="border border-2 border-danger rounded mt-2 ps-2" >An event name is required</p>}
                        </Form.Group>

                        <Form.Group id="eventDescription">
                            <Form.Label htmlFor="description">Event Description</Form.Label>
                            <Form.Control id="description" name="description" type="text"  as="textarea" rows={3} {...register('description', {required:true, })}></Form.Control>
                            {errors.description?.type==="required"&&<p tabIndex="0" className="border border-2 border-danger rounded mt-2 ps-2" >An event description is required</p>}
                        </Form.Group>

                        <Form.Group id="category">
                            <Form.Label htmlFor="formEventCategory">Event Category</Form.Label>
                            <Form.Select id="formEventCategory" name="category_id" {...register('category_id', {required:true, })}>              
                              {catLoading ? <option>*Loading*</option> : <option disabled>-- please select a category --</option>}
                              <CategoryOptions categories={categories}/>
                            </Form.Select>
                            {errors.category_id?.type==="required"&&<p tabIndex="0" className="border border-2 border-danger rounded mt-2 ps-2" >A category is required</p>}
                        </Form.Group>

                        <Form.Group id="venueName">
                            <Form.Label htmlFor="VenueName">Venue name</Form.Label>
                            <Form.Control id="venueNameInput" name="venueNameInput" type="text"  {...register('venueNameInput', {required:true, })}></Form.Control>
                            {errors.venueNameInput?.type==="required"&&<p tabIndex="0" className="border border-2 border-danger rounded mt-2 ps-2" >An venue name is required</p>}
                        </Form.Group>

                        <Form.Group id="addressLine1">
                            <Form.Label htmlFor="addressLine1">2nd line of address</Form.Label>
                            <Form.Control id="address_1" name="address_1" type="text"  {...register('address_1', {required:true, })}></Form.Control>
                            {errors.address_1?.type==="required"&&<p tabIndex="0" className="border border-2 border-danger rounded mt-2 ps-2" >Address line 1 is required</p>}
                        </Form.Group>

                        <Form.Group id="addressLine2">
                            <Form.Label htmlFor="addressLine2">2nd line of address</Form.Label>
                            <Form.Control id="address_2" name="address_2" type="text"  {...register('address_2', {required:true, })}></Form.Control>
                            {errors.address_2?.type==="required"&&<p tabIndex="0" className="border border-2 border-danger rounded mt-2 ps-2" >Address line 2 is required</p>}
                        </Form.Group>

                        <Form.Group id="cityName">
                            <Form.Label htmlFor="cityName">City/Town</Form.Label>
                            <Form.Control id="city" name="city" type="text"  {...register('city', {required:true, })}></Form.Control>
                            {errors.city?.type==="required"&&<p tabIndex="0" className="border border-2 border-danger rounded mt-2 ps-2" >A city is required</p>}
                        </Form.Group>

                        <Form.Group id="countyName">
                            <Form.Label htmlFor="countyName">County</Form.Label>
                            <Form.Control id="region" name="region" type="text"  {...register('region', {required:true, })}></Form.Control>
                            {errors.region?.type==="required"&&<p tabIndex="0" className="border border-2 border-danger rounded mt-2 ps-2" >A region is required</p>}
                        </Form.Group>

                        <Form.Group id="postcode">
                            <Form.Label htmlFor="postcode">Postcode</Form.Label>
                            <Form.Control id="postal_code" name="postal_code" type="text"  {...register('postal_code', {required:true, })}></Form.Control>
                            {errors.postal_code?.type==="required"&&<p tabIndex="0" className="border border-2 border-danger rounded mt-2 ps-2" >A postcode is required</p>}
                        </Form.Group>

                        <Form.Group id="startDate">
                            <Form.Label htmlFor="formEventstartDate">Event start date</Form.Label>
                            <Form.Control id="formEventstartDate" name="start" type="datetime-local" {...register('start', {required:true, })}></Form.Control>
                            {errors.start?.type==="required"&&<p tabIndex="0" className="border border-2 border-danger rounded mt-2 ps-2" >a start date and time is required</p>}
                        </Form.Group>

                        <Form.Group id="endDate">
                            <Form.Label htmlFor="formEventEndDate">Event EndDate</Form.Label>
                            <Form.Control id="formEventEndDate" name="end" type="datetime-local" {...register('end', {required:true, })}></Form.Control>
                            {errors.end?.type==="required"&&<p tabIndex="0" className="border border-2 border-danger rounded mt-2 ps-2" >An end date and time is required</p>}
                        </Form.Group>

                        <Form.Group id="ticketsAvailable">
                            <Form.Label htmlFor="capacity">Number of tickets available</Form.Label>
                            <Form.Control id="capacity" name="capacity" type="number" min="1" {...register('capacity', {required:true, pattern:wholeNumRegex })}></Form.Control>
                            {errors.capacity?.type==="required"&&<p tabIndex="0" className="border border-2 border-danger rounded mt-2 ps-2" >Number of tickets available is required</p>}
                            {errors.capacity?.type==="pattern"&&<p tabIndex="0" className="border border-2 border-danger rounded mt-2 ps-2" >Should be a whole number</p>}
                        </Form.Group>

                        <Form.Group id="eventIsFree">
                            <Form.Label htmlFor="isFree">Is the event free</Form.Label>
                            <Form.Select id="isFree" name="isFree" {...register('isFree', {required:true})} >              
                              <option disabled>Please Select</option>
                              <option>yes</option>
                              <option>no</option>
                            </Form.Select>
                            {errors.isFree?.type==="required"&&<p tabIndex="0" className="border border-2 border-danger rounded mt-2 ps-2" >Free event status is required</p>}
                        </Form.Group>
                        
                        { watchIsFree === "no"  && (
                            <Form.Group id="Cost">
                                <Form.Label htmlFor="formCost">Cost per ticket in pence</Form.Label>
                                <Form.Control id="cost" name="cost" type="number" min="0" {...register('cost', {required:true, pattern:wholeNumRegex})}></Form.Control>
                                {errors.cost?.type==="required"&&<p tabIndex="0" className="border border-2 border-danger rounded mt-2 ps-2" >Event cost is required</p>}
                                {errors.cost?.type==="pattern"&&<p tabIndex="0" className="border border-2 border-danger rounded mt-2 ps-2" >Cost should be a whole number</p>}
                            </Form.Group>) 
                        }
                        
                            
                        <Button disabled={loading} className="w-100 mt-4" type="submit" >Create Event</Button>
                    
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    )
}
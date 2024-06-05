import React from 'react'
import CallToAction from '../Components/CallToAction'
import EventView from './EventView'

export default function Landing({organizationId}) {
  console.log(organizationId)

  return (
    <>
      <CallToAction />
      <EventView organizationId={organizationId}/>
    </>
  )
}
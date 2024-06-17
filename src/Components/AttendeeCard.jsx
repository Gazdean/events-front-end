import React from 'react'
export default function AttendeeCard({attendee}) {

  return (
    <> 
        <li className="p-1 ps-2 pe-2">
            {attendee}
        </li>
    </>
  )
}
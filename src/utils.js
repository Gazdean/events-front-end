
export function formatCreateEventData(data) {
    const body = {
        event :{
            listed:false,
            currency: 'GBP',          
        }
    }

    if (!Object.keys(data).length) return {}
    else {
        body.event.name = {html:`<p>${data.name}</p>`}
        body.event.description = {html:`<p>${data.description}</p>`}
        body.event.start = {timezone: "Europe/London", utc: `${data.start}:00Z`}
        body.event.end = {timezone: "Europe/London", utc: `${data.end}:00Z`}
        body.event.capacity = Number(data.capacity)
        body.event.category_id = data.category_id     
    }
  return body
  
}

export function formatCreateTicketClassData(data) {
    console.log('data in call', data)
    const costInPence = data.cost * 100
    const body = {
        ticket_class: {
                name: "General Admission",
            },
    }

    if (!Object.keys(data).length) return {}
    else {
        body.ticket_class.quantity_total = data.capacity
        body.ticket_class.sales_end = `${data.end}:00Z`

        if (data.isFree === "true") {
            body.ticket_class.cost= "GBP,0"
            body.ticket_class.free= true
        } else if (data.donation === "false") {
            body.ticket_class.cost= `GBP,${costInPence}`
            body.ticket_class.free= false
            body.ticket_class.donation= false
        } else if (data.donation === "true") {
            body.ticket_class.free= false
            body.ticket_class.donation= true
            
        }
    }
  return body
  
}

export function handleFormatDate(event) {
  
    // event.start.utc has been used to stop an hour being added to the times when fetching due to BST, 
    // need to test what happens clocks go back and if any logic needs to be added
    
    const startString = event.start.utc 
    const endString = event.end.utc

    const startDate = `${startString.slice(8,10)}-${startString.slice(5,7)}-${startString.slice(0, 4)}`
    const endDate = `${endString.slice(8,10)}-${endString.slice(5,7)}-${endString.slice(0, 4)}`
    
    const startTime = startString.slice(11, 16)
    const endTime = endString.slice(11, 16)

    const dateObj = {startDate, endDate, startTime, endTime}

    return dateObj
}
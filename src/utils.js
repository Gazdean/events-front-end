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
    const costInPence = data.cost *100
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
        } else if (data.isFree === "false" && data.donation === "false") {
            body.ticket_class.cost= `GBP,${costInPence}`
            body.ticket_class.free= false
            body.ticket_class.donation= false
        } else if (data.isFree === "false" && data.donation === "true") {
            body.ticket_class.free= false
            body.ticket_class.donation= true
            
        }
    }
  return body
  
}
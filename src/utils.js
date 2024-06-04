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

export function formatCreateTicketClassesData(data) {
    const body = {
        ticket_classes: {
                display_name: "General Admission",
                quantity_sold: 0,
            },
    }

    if (!Object.keys(data).length) return {}
    else {
        body.ticket_classes.maximum_quantity = data.capacity
        body.ticket_classes.sales_end = `${data.end}:00Z`

        if (data.isFree === "true") {
            body.ticket_classes.cost= "GBP,0.00"
            body.ticket_classes.is_free= true
        } else if (data.isFree === "false" && data.isDonation === "false") {
            body.ticket_classes.cost= `GBP,${data.cost}.00`
            body.ticket_classes.is_free= false
            body.ticket_classes.donation= false
        } else if (data.isFree === "false" && data.isDonation === "true") {
            body.ticket_classes.is_free= true
            body.ticket_classes.donation= true
            body.ticket_classes.minimum_price= 'GBP,0.00'
            body.ticket_classes.suggested_price= `GBP,${data.suggested_cost}.00`
        }
    }
  return body
  
}
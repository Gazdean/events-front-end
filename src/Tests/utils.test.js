const { formatCreateEventData, formatCreateTicketClassData } = require("../utils");

describe("formatCreateEventData", () => {
    test("when passed an empty object it should return an object", ()=> {
        // assign
        const input = {}
        const expected = {}
        // act
        const output = formatCreateEventData(input)
        // assert
        expect(output).toEqual(expected)
    })
    test("when passed an object with key of name it should the correctly formatted object", ()=> {
        // assign
        const input = {name: "go run"}
        const expected = {event:{name:{html: "<p>go run</p>"}}}
        //act
        const output = formatCreateEventData(input)
        // assert
        expect(output).toMatchObject(expected)
    })
    test("when passed an object with key of description it should the correctly formatted object", ()=> {
        // assign
        const input = {description: "running for all"}
        const expected = {event:{description:{html: "<p>running for all</p>"}}}
        // act
        const output = formatCreateEventData(input)
        // assert
        expect(output).toMatchObject(expected)
    })
    test("when passed an object with key of start it should the correctly formatted object", ()=> {
        // assign
        const input = {start: "2024-05-30T18:21"}
        const expected = {event: {
                            start: {
                                timezone: "Europe/London",
                                utc: "2024-05-30T18:21:00Z" 
                                }
                            }
                        }
        // act
        const output = formatCreateEventData(input)
        // assert
        expect(output).toMatchObject(expected)
    })
    test("when passed an object with key of end it should the correctly formatted object", ()=> {
        // assign
        const input = {end: "2024-05-30T20:21"}
        const expected = {event: {
                            end: {
                                timezone: "Europe/London",
                                utc: "2024-05-30T20:21:00Z" 
                                }
                            }
                        }
        // act
        const output = formatCreateEventData(input)
        // assert
        expect(output).toMatchObject(expected)
    })
    test("when passed an object with key of capacity it should the correctly formatted object", ()=> {
        // assign
        const input = {capacity: "4"}
        const expected = {event: {capacity:4}}
        // act
        const output = formatCreateEventData(input)
        // assert
        expect(output).toMatchObject(expected)
        expect(typeof output.event.capacity).toBe("number")
    })
    test("when passed an object with key of category_id it should the correctly formatted object", ()=> {
        // assign
        const input = {category_id: "108"}
        const expected = {event: {
                            category_id:"108"
                            }
                        }
        // act
        const output = formatCreateEventData(input)
        // assert
        expect(output).toMatchObject(expected)
        expect(typeof output.event.category_id).toBe("string")
    })
    test("when passed an non empty object, listed: false should be added to the formatted object", ()=> {
        // assign
        const input = {category_id: "108"}
        const expected = {event: {
                            listed:false
                            }
                        }
        // act
        const output = formatCreateEventData(input)
        // assert
        expect(output).toMatchObject(expected)
    })
    // 

    test("passed the full basic data object from the create event form it should return the correct object", ()=> {
        // assign
        const input = {
            name: "go run",
            description: "running for all",
            capacity: "15",
            category_id: "108",
            start: "2024-05-30T18:21",
            end: "2024-05-30T18:21",
        }
        const expected = {
            event: {
                name: {
                    html: "<p>go run</p>" 
                },
                description: {
                    html: "<p>running for all</p>" 
                },
                start: {
                    timezone: "Europe/London",
                    utc: "2024-05-30T18:21:00Z" 
                },
                end: {
                    "timezone": "Europe/London",
                    "utc": "2024-05-30T18:21:00Z"  
                },
                capacity: 15,
                listed: false,
                category_id: "108", 
                currency: 'GBP', 
            }
        };
        // act
        const output = formatCreateEventData(input)
        // assert
        expect(output).toEqual(expected)
    })
})

describe.only("formatTicketClassData", () => {
    test("when passed an empty object it should return an object", ()=> {
        // assign
        const input = {}
        const expected = {}
        // act
        const output = formatCreateTicketClassData(input)
        // assert
        expect(output).toEqual(expected)
    })

test("when passed an object with key of end it should the correctly formatted object", ()=> {
        // assign
        const input = {end: "2024-05-30T20:21"}
        const expected = {ticket_class: {
            sales_end: "2024-05-30T20:21:00Z"
            }
        }
        // act
        const output = formatCreateTicketClassData(input)
        // assert
        expect(output).toMatchObject(expected)
       
    })
test("when passed an object with key of isFree and value true it should the correctly formatted object", ()=> {
        // assign
        const input = {isFree: "true"}
        const expected = {ticket_class: {
            cost: 'GBP,0',
            free: true,
            }
        }
        // act
        const output = formatCreateTicketClassData(input)
        // assert
        expect(output).toMatchObject(expected)
    })
    test("when passed an object with key of isFree is false and donation is false it should the correctly formatted object including the cost of a ticket", ()=> {
        // assign
        const input = {
            isFree: "false",
           donation: "false",
            cost: "44"
        }
        const expected = {ticket_class: {
            cost: 'GBP,4400',
            free: false,
            donation: false
           }
        }
        // act
        const output = formatCreateTicketClassData(input)
        // assert
        expect(output).toMatchObject(expected)
    })
    test("when passed an object with key of isFree and value false and donation is true it should the correctly formatted object including the cost of a ticket", ()=> {
        // assign
        const input = {
            isFree: "false",
           donation: "true",
        }
        const expected = {ticket_class: {
            free: false,
            donation: true
            }
        }
        // act
        const output = formatCreateTicketClassData(input)
        // assert
        expect(output).toMatchObject(expected)
    })
})
const { formatCreateEventData, formatCreateTicketClassData, isEventOld, handleFormatDate } = require("../utils");

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

describe("formatTicketClassData", () => {
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

describe("handleFormatDate" , ()=>{
    test("when passed a Strings it should return an empty object", ()=> {
        // assign
        const input1 = ''
        const input2 = ''
        const expected = {}
        // act
        const output = handleFormatDate(input1, input2)
        // assert
        expect(output).toEqual(expected)
    })
    test("when passed an empty startDateString it should return an empty object", ()=> {
        // assign
        const input1 = ''
        const input2 = '2024-06-13T10:05:21Z'
        const expected = {}
        // act
        const output = handleFormatDate(input1, input2)
        // assert
        expect(output).toEqual(expected)
    })
    test("when passed an empty endDateString it should return an empty object", ()=> {
        // assign
        const input1 = '2024-06-13T10:05:21Z'
        const input2 = ''
        const expected = {}
        // act
        const output = handleFormatDate(input1, input2)
        // assert
        expect(output).toEqual(expected)
    })
    test("when passed an correct string it should return an empty correct object", ()=> {
        // assign
        const input1 = '2024-06-13T10:05:21Z'
        const input2 = '2024-06-13T12:05:21Z'
        const expected = {
            startDate: 'Thu Jun 13 2024 11:05',
            endDate: 'Thu Jun 13 2024 13:05'
          }
        // act
        const output = handleFormatDate(input1, input2)
        console.log('test', output)
        // assert
        expect(output).toEqual(expected)
    })
    test("when passed an incorrect format string it should return an empty correct object", ()=> {
        // assign
        const input1 = '2024-0613T10:05:21Z'
        const input2 = '2024-0613T12:05:21Z'
        const expected = {}
        // act
        const output = handleFormatDate(input1, input2)
        console.log('test', output)
        // assert
        expect(output).toEqual(expected)
    })
})
describe("eventIsOld" , ()=>{
    test("when passed an empty string it should return 'no date passed to function'", ()=> {
        // assign
        const input = ''
        const expected = "no date passed to function"
        // act
        const output = isEventOld(input)
        // assert
        expect(output).toBe(expected)
    })
    test("when passed a date the in the past it should return false", ()=> {
        // assign
        const input = "2024-06-13T10:05:21Z"
        const expected = true
        // act
        const output = isEventOld(input)
        // assert
        expect(output).toBe(expected)
    })
    test("when passed a date the in the future it should return true", ()=> {
        // assign
        const input = "9999-06-13T10:05:21Z"
        const expected = false
        // act
        const output = isEventOld(input)
        // assert
        expect(output).toBe(expected)
    })
})
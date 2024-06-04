const { formatCreateEventData, formatCreateTicketClassesData } = require("../utils");

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
        const output = formatCreateTicketClassesData(input)
        // assert
        expect(output).toEqual(expected)
    })

test("when passed an object with key of end it should the correctly formatted object", ()=> {
        // assign
        const input = {end: "2024-05-30T20:21"}
        const expected = {ticket_classes: {
            sales_end: "2024-05-30T20:21:00Z"
            }
        }
        // act
        const output = formatCreateTicketClassesData(input)
        // assert
        expect(output).toMatchObject(expected)
       
    })
test("when passed an object with key of isFree and value true it should the correctly formatted object", ()=> {
        // assign
        const input = {isFree: true}
        const expected = {ticket_classes: {
            cost: 'GBP,0.00',
            is_free: true,
            }
        }
        // act
        const output = formatCreateTicketClassesData(input)
        // assert
        expect(output).toMatchObject(expected)
    })
    test("when passed an object with key of isFree is false and donation is false it should the correctly formatted object including the cost of a ticket", ()=> {
        // assign
        const input = {
            isFree: false,
            donation: false,
            cost: "440"
        }
        const expected = {ticket_classes: {
            cost: 'GBP,440.00',
            is_free: false,
            donation: false
            }
        }
        // act
        const output = formatCreateTicketClassesData(input)
        // assert
        expect(output).toMatchObject(expected)
    })
    test("when passed an object with key of isFree and value false and donation is true it should the correctly formatted object including the cost of a ticket", ()=> {
        // assign
        const input = {
            isFree: false,
            donation: true,
            suggested_cost: "40"
        }
        const expected = {ticket_classes: {
            minimum_price: 'GBP,0.00',
            suggested_price: 'GBP,40.00',
            is_free: true,
            donation: true
            }
        }
        // act
        const output = formatCreateTicketClassesData(input)
        // assert
        expect(output).toMatchObject(expected)
    })
})




    // test("when passed an object with address data it should the correctly formatted object", ()=> {
    //     // assign
    //     const input = {
    //         venueName: "gogo",
    //         address_1: "here",
    //         address_2: "there",
    //         city: "manchester",
    //         region: "lancashire",
    //         postal_code: "m60",

    //     }
    //     const expected = {event: {
    //             venue:{
    //                 name: "gogo",
    //                 address: {
    //                     address_1: "here",
    //                     address_2: "there",
    //                     city: "manchester",
    //                     region: "lancashire",
    //                     postal_code: "m60",
    //                     country: "UK"
    //                 }
    //             }
    //         }
    //     }
    //     const output = formatCreateTicketClassesData(input)
    //     // assert
    //     expect(output).toMatchObject(expected)
    // })

    // // -----   added image test to be added?  ------
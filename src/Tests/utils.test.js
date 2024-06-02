const { formatCreateEventData } = require("../utils");

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
        const output = formatCreateEventData(input)
        // assert
        expect(output).toMatchObject(expected)
    })
    test("when passed an object with key of descrioption it should the correctly formatted object", ()=> {
        // assign
        const input = {description: "running for all"}
        const expected = {event:{description:{html: "<p>running for all</p>"}}}
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
        const output = formatCreateEventData(input)
        // assert
        expect(output).toMatchObject(expected)
    })
    test("when passed an object with key of start it should the correctly formatted object", ()=> {
        // assign
        const input = {end: "2024-05-30T20:21"}
        const expected = {event: {
                            end: {
                                timezone: "Europe/London",
                                utc: "2024-05-30T20:21:00Z" 
                                }
                            }
                        }
        const output = formatCreateEventData(input)
        // assert
        expect(output).toMatchObject(expected)
    })
    test("when passed an object with key of capacity it should the correctly formatted object", ()=> {
        // assign
        const input = {capacity: "4"}
        const expected = {event: {
                            capacity:4
                            }
                        }
        const output = formatCreateEventData(input)
        // assert
        // expect(output).toMatchObject(expected)
        expect(typeof output.event.capacity).toBe("number")
    })
    test("when passed an object with key of category_id it should the correctly formatted object", ()=> {
        // assign
        const input = {category_id: "108"}
        const expected = {event: {
                            category_id:"108"
                            }
                        }
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
        const output = formatCreateEventData(input)
        // assert
        expect(output).toMatchObject(expected)
    })
    test("when passed an object with key of isFree and value true it should the correctly formatted object", ()=> {
        // assign
        const input = {isFree: true}
        const output = formatCreateEventData(input)
        // assert
        expect(output.event.ticket_classes[0].free).toBe(true)
        expect(output.event.ticket_classes[0].cost.value).toBe("0")
    })
    test("when passed an object with key of isFree and value false it should the correctly formatted object including the cost of a ticket", ()=> {
        // assign
        const input = {
            isFree: false,
            cost: "440"
        }
        const output = formatCreateEventData(input)
        // assert
        expect(output.event.ticket_classes[0].free).toBe(false)
        expect(output.event.ticket_classes[0].cost.value).toBe("440")
    })
    test("when passed an object with address data it should the correctly formatted object", ()=> {
        // assign
        const input = {
            venueName: "gogo",
            address_1: "here",
            address_2: "there",
            city: "manchester",
            region: "lancashire",
            postal_code: "m60",

        }
        const expected = {event: {
                venue:{
                    name: "gogo",
                    address: {
                        address_1: "here",
                        address_2: "there",
                        city: "manchester",
                        region: "lancashire",
                        postal_code: "m60",
                        country: "UK"
                    }
                }
            }
        }
        const output = formatCreateEventData(input)
        // assert
        expect(output).toMatchObject(expected)
    })

    // -----   added image test to be added?  ------

    test("passed the basic data object from the create event form it should return the correct object", ()=> {
        // assign
        const input = {
            name: "go run",
            description: "running for all",
            address_1: "here",
            address_2: "there",
            capacity: "15",
            city: "manchester",
            category_id: "108",
            isFree: "yes",
            postal_code: "m60",
            region: "lancashire",
            start: "2024-05-30T18:21",
            end: "2024-05-30T18:21",
            venueName: "field"
        }
        const expected = {
            "event": {
                "name": {
                    "html": "<p>go run</p>" 
                },
                "description": {
                    "html": "<p>running for all</p>" 
                },
                "start": {
                    "timezone": "GMT",
                    "utc": "2024-05-30T18:21:00Z" 
                },
                "end": {
                    "timezone": "GMT",
                    "utc": "2024-05-30T18:21:00Z"  
                },
                "capacity": 15,
                "organizer_id": "123456789",
                "listed": true,
                "category_id": "108", 
                "ticket_classes": [
                    {
                        "name": "General Admission",
                        "quantity_total": 15, 
                        "free": true 
                    }
                ],
                "online_event": false, 
                "venue": {
                    "name": "field",
                    "address": {
                        "address_1": "here",
                        "address_2": "there",
                        "city": "manchester",
                        "region": "lancashire",
                        "postal_code": "m60",
                        "country": "GB" 
                    }
                }
            }
        };
        // act
        const output = formatCreateEventData(input)
        // assert
        expect(output).toEqual(expected)
    })
})

const {test,expect} = require('@playwright/test');
const data = require('../testData/data.json');
var placeId;

test("Post: Add Place", async({request}) => {
    const response = await request.post(data.apiBaseUrl+'/add/json?'+data.queryParam,
                                            {
                                               data:{ "location": {
                                                    "lat": -38.383494,   
                                                    "lng": 33.427362 
                                                    },  
                                                    "accuracy": 50,  
                                                    "name": "Frontline house",  
                                                    "phone_number": "(+91) 983 893 3937",  
                                                    "address": "29, side layout, cohen 09",  
                                                    "types": [    
                                                        "shoe park",   
                                                        "shop"  
                                                    ],  
                                                    "website": "http://google.com",  
                                                    "language": "French-IN"
                                                },
                                                headers: { "Content-Type": "application/json" }
                                            })
    var resp = await response.json()
    console.log(resp) 
    placeId = resp.place_id     
    console.log('--------------------'+placeId)                       
})

test("Get: Place API", async ({request}) => {
    const response = await request.get(data.apiBaseUrl+'/get/json?+place_id='+placeId+'&'+data.queryParam)
    expect(response.status()).toBe(200)
    console.log(await response.json())
})

test("Update: Place API", async({request}) => {
    const response = await request.put(data.apiBaseUrl+'/update/json??'+data.queryParam,
                                            {
                                                data:{"place_id":placeId,
                                                "address":"Bangalore",
                                                "key":"qaclick123"
                                            },
                                            headers: { "Content-Type": "application/json" }
                                            })
    console.log(await response.json())
    expect(response.status()).toBe(200)               
})

test("Get: Place API After Updating Address", async ({request}) => {
    const response = await request.get(data.apiBaseUrl+'/get/json?+place_id='+placeId+'&'+data.queryParam)
    expect(response.status()).toBe(200)
    console.log(await response.json())
})

test("Delete: Place API", async({request}) => {
    const response = await request.delete(data.apiBaseUrl+'/delete/json?'+data.queryParam,
                                            {
                                                data:{"place_id":placeId},
                                                headers: { "Content-Type": "application/json" }
                                            })
    console.log(await response.json())
    expect(response.status()).toBe(200)               
})
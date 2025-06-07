import http from 'k6/http';
import { check } from 'k6';
import { randomString } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';  // Import randomString utility

export const options = {
    vus: 10,  // Number of virtual users
    duration: '5s'  // Test duration
};

const url = "https://reqres.in/api/users";

export default function () {
    // Correctly generate random string and concatenate with 'Meghla'
    const randomName = randomString(10);  // Generate a random string of length 10
    const name = "Meghla_" + randomName;  // Add 'Meghla_' as a prefix
    
    const payload = {
        "name": name,  // Use the dynamically generated name with 'Meghla_' prefix
        "job": "Software Test Engineer 1"
    };

    console.log('Sending Payload:', JSON.stringify(payload));  // Print the payload being sent

    // Send POST request with the dynamically generated payload
    const response = http.post(url, JSON.stringify(payload), {
        headers: {
            'Content-Type': 'application/json'
        }
    });

    console.log('Response Status:', response.status);  // Print the response status code
    console.log('Response Body:', response.body);  // Print the response body

    // Check validations
    check(response, {
        'status code validation': (response) => response.status === 201,
        'Response Id validation': (response) => response.json().hasOwnProperty('id')
    });
}
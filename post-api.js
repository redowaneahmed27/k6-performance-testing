// Import the HTTP module from K6 to perform API requests
import http from 'k6/http';

// Import the 'check' function to validate responses
import { check } from 'k6';

// Define test execution options
export const options = {
    vus: 10,  // Number of Virtual Users (VUs) running concurrently
    duration: '5s'  // The test will run for 5 seconds
};

// Define the target API endpoint
const url = "https://reqres.in/api/users";

export default function () {
    // Define the request payload (JSON body) to send in the POST request
    const payload = {
        "name": "Meghla",
        "job": "Software Test Engineer 1"
    };

    // Log the payload being sent to the console
    console.log('Sending Payload:', JSON.stringify(payload));

    // Perform a POST request with the JSON payload and headers
    const response = http.post(url, JSON.stringify(payload), {
        headers: {
            'Content-Type': 'application/json'  // Setting the content type to JSON
        }
    });

    // Log the response status code to the console
    console.log('Response Status:', response.status);
    
    // Log the response body to the console
    console.log('Response Body:', response.body);

    // Validate the API response using check()
    check(response, {
        'status code validation': (response) => response.status === 201,  // Check if status code is 201 (Created)
        'Response Id validation': (response) => response.json().hasOwnProperty('id')  // Check if the response contains an 'id'
    });
}
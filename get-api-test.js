// Import the HTTP module from K6 to make API calls
import http from 'k6/http';

// Import the 'check' function to validate responses
import { check } from 'k6';

// Define the test execution options
export const options = {
    vus: 10,          // Simulate 10 Virtual Users (VUs) running concurrently
    iterations: 20    // Total of 20 iterations (requests)
};

// Define the request headers with an authorization token
const params = {
    headers: {
        'Authorization': 'Bearer 737433476' 
    }
};

// Define the target API endpoint
const url = "https://gorest.co.in/public/v2/users/";

export default function () {
    // Send a GET request to the API with headers
    const response = http.get(url, params);

    // Check if the response status is 200 (Success)
    check(response, {
        'Status Code is 200': (res) => res.status === 200
    });
}
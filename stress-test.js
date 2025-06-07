import http from 'k6/http';
import { sleep } from 'k6';

export const options = {  
    stages: [
        { duration: '1m', target: 200 },  // Ramp up to 200 users in 1 minute
        { duration: '5m', target: 200 },  // Maintain 200 users for 5 minutes
        { duration: '35m', target: 0 }    // Gradually ramp down to 0 users over 35 minutes
    ]
};

export default function () {
    http.get('https://test.k6.io'); // Sends a GET request to the test API
    sleep(1); // Waits for 1 second before the next iteration
}

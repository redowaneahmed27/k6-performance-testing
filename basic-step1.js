import http from 'k6/http';
import { sleep } from 'k6';

export default function () {
    http.get('https://test.k6.io'); // Test API call
    sleep(1); // Pause for 1 second
}
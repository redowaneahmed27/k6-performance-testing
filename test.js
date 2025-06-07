import { check } from 'k6';
import http from 'k6/http';

export default function () {
  // Define the URL to test
  const url = 'http://example.com';

  // Make an HTTP GET request
  const response = http.get(url);

  // Check the response status
  check(response, {
    'is status 200': (r) => r.status === 200,
    

  });
}
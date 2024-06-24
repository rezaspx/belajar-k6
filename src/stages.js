import http from 'k6/http';
import { sleep } from 'k6';

// export const options = {
//   // A number specifying the number of VUs to run concurrently.
//   vus: 100,
//   // A string specifying the total duration of the test run.
//   duration: '30s',
//   summaryTrendStats: ['avg', 'min', 'max']

// };

export const options = {
  stages: [
    { duration: '10s', target: 20 },
    { duration: '10s', target: 30 },
    { duration: '10s', target: 0 },
    
  ],
};

export default function() {
  http.get('http://localhost:3000/ping');
  //  sleep(1);
}

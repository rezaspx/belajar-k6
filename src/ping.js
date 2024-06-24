import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  // A number specifying the number of VUs to run concurrently.
  vus: 100,
  // A string specifying the total duration of the test run.
  duration: '30s',
  summaryTrendStats: ['avg', 'min', 'max']

};



export default function() {
  http.get('http://localhost:8080/api/system/ping');
  //  sleep(1);
}

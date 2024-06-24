import http from 'k6/http';
import { check } from 'k6';

export let options = {
  stages: [
    { duration: '10s', target: 10 }, // ramp-up to 10 users
    { duration: '10s', target: 10 },  // stay at 10 users for 1 minute
    { duration: '10s', target: 0 },  // ramp-down to 0 users
  ],
  ext: {
    influxdb: {
      // InfluxDB server URL
      url: 'http://localhost:8086',
      // InfluxDB database name
      database: 'k6',
      // Additional configuration options
      retentionPolicy: '',
      precision: 's',
      tags: { region: 'us' },
      includeDefaultTags: true,
    },
  },
};

export default function () {
  let res = http.get('https://test.k6.io');
  check(res, {
    'status was 200': (r) => r.status == 200,
  });
}
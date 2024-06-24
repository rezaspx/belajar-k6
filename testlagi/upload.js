import http from 'k6/http';
import { check } from 'k6';
import { Trend } from 'k6/metrics';
import { sleep } from 'k6';
import { Counter, Rate } from 'k6/metrics';
// import { open } from 'k6/fs';

// Define custom metrics
const uploadTime = new Trend('upload_time');
const secretKey = 'e302b78ebe840dad3debd07e02fed84daada72988289e83d5f8bd20ef7198b9c';  // Replace with your actual X-Secret-Key
const filePath = 'D:/Win 11/Documents/VSCODE/K6/belajar-k6/testlagi/file1MB.bin';  // Replace with the path to your file

// Define the file to be uploaded
// const filePath = './testlagi/file1MB.bin';  // Replace with the path to your file

export let options = {
    stages: [
        { duration: '30s', target: 10 },  // Ramp-up to 10 users over 30 seconds
        { duration: '1m', target: 100 },   // Stay at 10 users for 1 minute
        // { duration: '1m', target: 2000 },   // Ramp-down to 0 users over 30 seconds
        { duration: '10s', target: 10}
      ],
    thresholds: {
        'upload_time': ['p(95)<2000'],  // 95% of upload times should be below 2s
    },
};

//Inisialisasi
const binFile = open('file.pdf', 'b');
// const requests = new Counter('http_reqs');
// const successfulRequests = new Rate('successful_requests');

export default function () {
  const data = {
    field: 'this is a standard form field',
    file: http.file(binFile, 'file.pdf'),
  };

  // console.info('Data prepared for the request:', data);

  const headers = {
    'X-Secret-Key': secretKey,
    // Add other headers if needed
  };

  console.info('Headers prepared for the request:', headers);

  const res = http.post('http://10.14.152.17:8081/api/pln-mobile/upload', data, {headers});
  if (res.status !== 200) {
    console.error(`Request failed. Status: ${res.status}, Body: ${res.body}`);
  }
  
  console.info('Request sent, awaiting response...');

    let startTime = new Date().getTime();
    // let response = http.post(url, formData, params);
    let endTime = new Date().getTime();

    uploadTime.add(endTime - startTime);

  // Check the response status and handle errors if needed
  if (res.status !== 200) {
    console.error(`Request failed. Status: ${res.status}, Body: ${res.body}`);
  } else {
    console.info('Request successful. Status:', res.status);
  }

  // Menambahkan hasil ke metrik
  // requests.add(1);
  // successfulRequests.add(success);

  sleep(1);
}


// export default function () {
//     const url = 'http://10.14.152.17:8081/api/pln-mobile/upload';  // Replace with your actual upload URL

//     // Prepare the file data
//     const payload = {
//         file: http.file(("D:\Win 11\Documents\VSCODE\K6\belajar-k6\testlagi\file1MB.bin", 'b'), 'file1MB.bin'),  // Adjust filename as necessary
//     };
//     // Perform the file upload
//     const response = http.post(url,{ 
//         headers: {
//             'X-Secret-Key': secretKey,
//                 // Add other headers if needed
//             },
//         }, payload);

//     // Record custom metric
//     uploadTime.add(response.timings.duration);

//     // Check the response
//     check(response, {
//         'is status 200': (r) => r.status === 200,
//     });
// }

// export default function () {
//     const url = 'http://10.14.152.17:8081/api/pln-mobile/upload';  // Replace with your actual upload URL
//     // Prepare the file data
//     const payload = {
//         file: http.file(filePath, 'file1MB.bin'),  // Adjust filename as necessary
//     };

//     // Prepare headers
//     // const headers = {
//     //     'X-Secret-Key': secretKey,
//     // };

//     // Perform the file upload
//     // const response = http.post(url,{ headers: headers }, payload );
//     const response = http.post(url,{ 
//                 headers: {
//                     'X-Secret-Key': secretKey,
//                         // Add other headers if needed
//                     },
//                 }, payload);

//     // Record custom metric
//     uploadTime.add(response.timings.duration);

//     // Check the response
//     check(response, {
//         'is status 200': (r) => r.status === 200,
//     });

    
// }

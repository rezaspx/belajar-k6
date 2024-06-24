import http from 'k6/http';
import { sleep } from 'k6';

const baseURL = 'http://10.14.152.17:8081';
const secretKey = 'e302b78ebe840dad3debd07e02fed84daada72988289e83d5f8bd20ef7198b9c';  // Replace with your actual X-Secret-Key

export const options = {
  vus: 10,
  duration: '30s',
};
// export default function () {
//     // Example GET request
//     const response = http.get(baseURL + '/api/pln-mobile/get-dil-by-idpel?idpel=538710060082', {
//         headers: {
//             'X-Secret-Key': secretKey,
//             // Add other headers if needed
//         },
        
//     });
export default function () {
    http.get(baseURL + '/api/pln-mobile/get-dil-by-idpel?idpel=538710060082',{ 
        headers: {
            'X-Secret-Key': secretKey,
                // Add other headers if needed
            },
        });
        // sleep(1);
      }

//     // Process the response as needed
//     console.log('Response status:', response.status);
// }
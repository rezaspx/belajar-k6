import http from 'k6/http';
import { check, fail, sleep } from 'k6';

export function createContact(accessToken, contact){
    const response = http.post('http://localhost:3000/api/contacts', JSON.stringify(contact), {
      headers: {
        'Content-Type' : 'application/json',
        'Accept' : 'application/json',
        'Authorization' : `Bearer ${accessToken}`
      }
    })
    check(response,{
     'create contact status is 200' : (response) => response.status === 200 
    });
    return response;
}

import http from 'k6/http';
import { check, fail, sleep } from 'k6';
import execution from 'k6/execution';
import { loginUser } from './helper/user.js';
import { createContact } from './helper/contact.js';

export const options = {
  // A number specifying the number of VUs to run concurrently.
  vus: 10,
  // A string specifying the total duration of the test run.
  duration: '10s'
  

};

export function setup(){
  const totalContact = Number(__ENV.TOTAL_CONTACT) || 10;
  const data = [];
  for (let i = 0; i < totalContact; i++){
      data.push({
          "first_name" : "Azer",
          "last_name" : `ke-${i}`,
          "email" : `contact-${i}@gmail.com`,
          // "phone" : "32423423434"
      })
    }
      return data;
  }

export function getToken(){
  const username = `contoh${execution.vu.idInInstance}`
  const loginRequest = {
    "username" : username,
    "password" : "123QWEasd$",
  }

  const loginResponse = loginUser(loginRequest);

  const loginBodyResponse = loginResponse.json();
  return loginBodyResponse.data.token;
}


export default function(data) {
  const token = getToken();
  for (let i = 0; i < data.length; i++) {
    const contact = data[i];
    createContact(token, contact);
    
  }
  
}

export function teardown(data){
  console.info(`Finish create ${data.length} contacts`);
}

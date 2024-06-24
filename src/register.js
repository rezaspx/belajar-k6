import http from 'k6/http';
import { check, fail, sleep } from 'k6';

export const options = {
  // A number specifying the number of VUs to run concurrently.
  vus: 10,
  // A string specifying the total duration of the test run.
  duration: '10s'
  

};

export default function() {
  const uniqueID = new Date().getTime();
  const registerRequest = {
    "username" : `user-${uniqueID}`,
    "password" : "rahasia",
    "name" : "Azer"
  };

  

  const registerResponse = http.post('http://localhost:3000/api/users', JSON.stringify(registerRequest), {
    headers: {
      "Accept" : "application/json",
      "Content-Type" : "application/json",
    }
  })

  const checkRegister = check(registerResponse, {
     'Register response status must 200' : (response) => response.status === 200,
     'Register response data must not null' : (response) => response.json().data != null
  })

  if(!checkRegister){
    fail(`Failed to Register  user-${uniqueID}`);
  }

  const loginRequest = {
    "username" : `user-${uniqueID}`,
    "password" : "rahasia",
  }

  const loginResponse = http.post('http://localhost:3000/api/users/login', JSON.stringify(loginRequest), {
    headers: {
      "Accept" : "application/json",
      "Content-Type" : "application/json",
    }
  })

  const checkLogin = check(loginResponse, {
    'Login response status must 200' : (response) => response.status === 200,
    'Login response token must exist' : (response) => response.json().data.token != null

  })

  if (!checkLogin){
    fail(`Failed to get  user-${uniqueID}`);
  }


  const loginBodyResponse = loginResponse.json();
  
  const currentResponse = http.get('http://localhost:3000/api/users/current', {
    headers: {
      "Accept" : "application/json",
      "Authorization" : loginBodyResponse.data.token,
    }
  })

  const checkCurrent = check(currentResponse, {
    'Current response status must 200' : (response) => response.status === 200,
    'Current response data must not null' : (response) => response.json().data != null
 })

  if(!checkCurrent){
    fail(`Failed to get  user-${uniqueID}`);
  }
}

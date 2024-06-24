import http from 'k6/http';
import { check, fail, sleep } from 'k6';

export function registerUser(body){
    // const registerResponse = http.post('http://localhost:3000/api/users', JSON.stringify(body),
    const registerResponse = http.post('http://10.14.152.17:8081/api/auth/login', JSON.stringify(body), {
    headers: {
      "Accept" : "application/json",
      "Content-Type" : "application/json",
    }
  })

  check(registerResponse, {
     'Register response status must 200' : (response) => response.status === 200,
     'Register response data must not null' : (response) => response.json().data != null
  })
  
  return registerResponse;
  
  

  

  
}


export function loginUser(body){
    const loginResponse = http.post('http://localhost:3000/api/users/login', JSON.stringify(body), {
    headers: {
      "Accept" : "application/json",
      "Content-Type" : "application/json",
    }
  })

  check(loginResponse, {
    'Login response status must 200' : (response) => response.status === 200,
    'Login response token must exist' : (response) => response.json().data.token != null

  })

  return loginResponse;
}

export function getUser(token){
    const currentResponse = http.get('http://localhost:3000/api/users/current', {
    headers: {
      "Accept" : "application/json",
      "Authorization" : token
    }
  })

  check(currentResponse, {
    'Current response status must 200' : (response) => response.status === 200,
    'Current response data must not null' : (response) => response.json().data != null
 });
 return currentResponse;
}
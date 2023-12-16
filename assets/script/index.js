'use strict';

import { onEvent, select, selectAll } from './utils.js';

// Fetch data from the Random User API (start)
fetch('https://randomuser.me/api/?nat=CA&results=10')
.then(response => response.json())
.then(data => {
  const connectionsList = document.getElementById('connections-list');

  data.results.forEach(user => {
    const connectionItem = document.createElement('li');
    connectionItem.classList.add('connection-item');

    const connectionPic = document.createElement('img');
    connectionPic.classList.add('connection-pic');
    connectionPic.src = user.picture.thumbnail;
    connectionPic.alt = 'Connection Profile Picture';

    const connectionInfo = document.createElement('div');
    connectionInfo.innerHTML = `<h3>${user.name.first} ${user.name.last}</h3><p>${user.location.city}</p>`;

    connectionItem.appendChild(connectionPic);
    connectionItem.appendChild(connectionInfo);

    connectionsList.appendChild(connectionItem);
  });
})
.catch(error => console.error('Error fetching data:', error));
// (end)

// Login (start)
const testEmail = 'mc-robyn@pulse.ca'; 
const testPassword = 'thisisasafepassword';
const errorOutput = select('#error-message');
const inputEmail = select('#email');
const inputPassword = select('#password');
const loginButton = select('#login');

function saveLogin() {
    localStorage.setItem('email', testEmail);
    localStorage.setItem('password', testPassword);
}

saveLogin();

function validEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validPassword(password) {
    return password === testPassword;
}

function validateLogin(email, password) {
    const validations = [
        { condition: !email, message: 'Please enter your email' },  
        { condition: !email, message: 'Please enter your email' },      // found online --- found a new way to avoid if/elseif
        { condition: !validEmail(email), message: 'Invalid email format, please try again' },
        { condition: !password, message: 'Please enter your password' },
        { condition: !validPassword(password), message: 'Invalid password, please try again' }
    ];

    const invalidLogin = validations.find(validation => validation.condition);

    if (invalidLogin) {
        errorMessage(`<i class="fa-solid fa-circle-exclamation"></i> ${invalidLogin.message}`);
    } else {
        clearErrorMessage();
        return true;
    }

    return false;
}

function errorMessage(message) {
    errorOutput.innerHTML = message;
}

function clearErrorMessage() {
    errorOutput.innerHTML = '';
}

function login() {   
    const emailValue = inputEmail.value;
    const passwordValue = inputPassword.value;

    if (validateLogin(emailValue, passwordValue)) {
        const loginEmail = localStorage.getItem('email');
        const loginPassword = localStorage.getItem('password');

        clearErrorMessage();
        
        if (emailValue === loginEmail && passwordValue === loginPassword) {
            window.location.href = '/pulse/index.html';
        } else {
            errorOutput.innerHTML = `<i class="fa-solid fa-circle-exclamation"></i> Wrong password. Try again or click Forgot password to reset it`;
        }
    }
}

onEvent('click', loginButton, login);
onEvent('input', inputEmail, clearErrorMessage);
onEvent('input', inputPassword, clearErrorMessage);
// Login (end)

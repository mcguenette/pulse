'use strict';

import { onEvent, select, selectAll } from './utils.js';



// Fetch data from the Random User API
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
    connectionInfo.innerHTML = `<strong>${user.name.first} ${user.name.last}</strong><br>${user.location.city}`;

    connectionItem.appendChild(connectionPic);
    connectionItem.appendChild(connectionInfo);

    connectionsList.appendChild(connectionItem);
  });
})
.catch(error => console.error('Error fetching data:', error));
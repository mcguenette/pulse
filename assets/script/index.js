'use strict';

import { onEvent, select, selectAll } from './utils.js';

$.ajax({
    url: 'https://randomuser.me/api/',
    dataType: 'json',
    success: function(data) {
      console.log(data);
    }
  });
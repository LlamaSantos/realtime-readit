'use strict';

import messages from './messages';
import constants from './constants';

let value = messages.reduce((state, message) => {
  let umessage = message.toUpperCase();
  state[umessage] = Symbol(umessage);
  return state;
}, {});

export default Object.keys(constants).reduce((state, key) => {
  state[key] = constants[key];
  return state;
}, value);

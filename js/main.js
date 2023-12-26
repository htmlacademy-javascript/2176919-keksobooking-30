import './modules/validation.js';
import './modules/map.js';

import { showsDataError, showMessage } from './modules/messages.js';
import { setPoints } from './modules/map.js';
import { disablesAdForm, disablesMapForm, activatesAdForm, activatesMapForm } from './modules/form-activity-switch.js';
import { togglesSubmitLock, resetsForm } from './modules/validation.js';
import { MARKS } from './data/data.js';
import { setFormSubmit } from './modules/validation.js';

const BASE_URL = 'https://30.javascript.pages.academy/keksobooking';

const Route = {
  GET_DATA: '/data',
  SEND_DATA: '/',
};

const Method = {
  GET: 'GET',
  POST: 'POST',
};

const load = (route, method = Method.GET, body = null) =>
  fetch(`${BASE_URL}${route}`, { method, body })
    .then((response) => {
      if (!response.ok) {
        throw new Error();
      }
      return response.json();
    });

disablesAdForm();
disablesMapForm();

const getData = () => (load(Route.GET_DATA));
const sendData = (body) => load(Route.SEND_DATA, Method.POST, body);

const isSuccess = () => showMessage('success');
const isError = () => showMessage('error');

getData()
  .then((data) => setPoints(data.slice(0, MARKS)))
  .then(activatesMapForm)
  .catch(showsDataError)
  .finally(activatesAdForm);
setFormSubmit();

document.addEventListener('formdata', (event) => {
  togglesSubmitLock(true);
  sendData(event.formData)
    .then(isSuccess)
    .then(resetsForm)
    .catch(isError)
    .finally(togglesSubmitLock(false));
});

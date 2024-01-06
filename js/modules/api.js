
import { BASE_URL, Route, Method } from '../data/data.js';
import { showMessage } from './messages.js';

const load = (route, method = Method.GET, body = null) =>
  fetch(`${BASE_URL}${route}`, { method, body })
    .then((response) => {
      if (!response.ok) {
        throw new Error();
      }
      return response.json();
    });

const getData = () => (load(Route.GET_DATA));
const sendData = (body) => load(Route.SEND_DATA, Method.POST, body);

const isSuccess = () => showMessage('success');
const isError = () => showMessage('error');

export { getData, sendData, isError, isSuccess }

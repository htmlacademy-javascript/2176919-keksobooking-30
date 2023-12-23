import './modules/validation.js';
import './modules/map.js';
import { showsDataError, hidesDataError } from './modules/messages-errors.js';
import { request } from './utils/utils.js';
import { BASE_URL, Route, Method, MARKS } from './data/data.js';
import { setPoints } from './modules/map.js';
import { disablesAdForm, disablesMapForm, activatesAdForm, activatesMapForm } from './modules/form-activity-switch.js';

disablesAdForm();
disablesMapForm();

request(`${BASE_URL}${Route.GET_DATA}`)
  .then((data) => setPoints(data.slice(0, MARKS)))
  .then(activatesMapForm)
  .catch(showsDataError)
  .finally(activatesAdForm);

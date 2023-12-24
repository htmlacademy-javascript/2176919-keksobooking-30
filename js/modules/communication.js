import { showsDataError, showMessage } from './messages.js';
import { request } from '../utils/utils.js';
import { BASE_URL, Route, MARKS } from '../data/data.js';
import { setPoints } from './map.js';
import { disablesAdForm, disablesMapForm, activatesAdForm, activatesMapForm } from './form-activity-switch.js';
import { togglesSubmitLock, resetsForm } from './validation.js';

disablesAdForm();
disablesMapForm();

request(`${BASE_URL}${Route.GET_DATA}`)
  .then((data) => setPoints(data.slice(0, MARKS)))
  .then(activatesMapForm)
  .catch(showsDataError)
  .finally(activatesAdForm);

document.addEventListener('formdata', async (event) => {
  try {
    togglesSubmitLock(true);
    await request(BASE_URL, { method: 'post', body: event.formData });
    showMessage('success');
    resetsForm();
  } catch {
    showMessage('error');
  } finally {
    togglesSubmitLock(false);
  }
});

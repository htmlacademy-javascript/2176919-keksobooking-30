import { renderMap, initMapMarker, setPoints, initMarkerGroup } from './modules/map.js';
import { MARKS } from './data/data.js';
import { showsDataError } from './modules/messages.js';
import { disablesAdForm, disablesMapForm, activatesAdForm, activatesMapForm } from './modules/form-activity-switch.js';
import { togglesSubmitLock, resetsForm, setFormSubmit } from './modules/validation.js';
import { getData, sendData, isError, isSuccess } from './modules/api.js';
import { getDataFilter } from './modules/filters.js';
import './modules/upload.js';

renderMap();
initMapMarker();
initMarkerGroup();
disablesAdForm();
disablesMapForm();

getData()
  .then((data) => {
    getDataFilter(data);
    setPoints(data.slice(0, MARKS));
  })
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

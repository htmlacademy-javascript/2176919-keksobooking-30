import { returnAdvertisements } from './modules/advertisements.js';
import { MARKS } from './data/data.js';
import { creatingSimilarAds } from './modules/creating-similar-ads.js';
import { disablesAdForm, disablesMapForm, activatesAdForm, activatesMapForm } from './modules/form-activity-switch.js';
import './modules/validation.js';

const data = returnAdvertisements(MARKS);

creatingSimilarAds(data[3]);
disablesAdForm();
disablesMapForm();
activatesAdForm();
activatesMapForm();

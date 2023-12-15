import './modules/validation.js';
import './modules/map.js';
import { returnAdvertisements } from './modules/advertisements.js';
import { MARKS } from './data/data.js';
import { creatingSimilarAds } from './modules/creating-similar-ads.js';

const data = returnAdvertisements(MARKS);//генерирует 10 объектов объявлений

creatingSimilarAds(data[3]);//показывает одно объявление
console.log(data)
//offer.title и location.lat location.lng

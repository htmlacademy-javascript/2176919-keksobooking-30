import { returnAdvertisements } from './modules/advertisements.js';
import { MARKS } from './data/data.js';
import { creatingSimilarAds } from './modules/creating-similar-ads.js';

const data = returnAdvertisements(MARKS);

creatingSimilarAds(data[3]);

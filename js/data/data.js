
const MARKS = 10;

const FILE_TYPES = ['.jpg', '.jpeg', '.png', '.webp'];

const URLS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];

const typeHousing = {
  'flat': 'Квартира',
  'bungalow': 'Бунгало',
  'house': 'Дом',
  'palace': 'Дворец',
  'hotel': 'Отель',
};

const minLengthTitle = 30;
const maxLengthTitle = 100;

const minPriceHousing = {
  'flat': 1000,
  'bungalow': 0,
  'house': 5000,
  'palace': 10000,
  'hotel': 3000,
};

const roomsOption = {
  '1': ['1'],
  '2': ['2', '1'],
  '3': ['3', '2', '1'],
  '100': ['0'],
};

const sliderOptions = {
  min: 0,
  max: 100000,
  start: 0,
  step: 1000,
};

const BASE_URL = 'https://30.javascript.pages.academy/keksobooking';

const Route = {
  GET_DATA: '/data',
  SEND_DATA: '/',
};

const Method = {
  GET: 'GET',
  POST: 'POST',
};

export { MARKS, FILE_TYPES, URLS, typeHousing, minLengthTitle, maxLengthTitle, minPriceHousing, roomsOption, sliderOptions, BASE_URL, Method, Route };

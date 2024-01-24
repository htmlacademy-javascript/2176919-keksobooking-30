
const MARKS = 10;
const MAX_PRICE_HOUSING = 100000;
const FILE_TYPES = ['.jpg', '.jpeg', '.png', '.webp'];

const typeHousing = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель',
};

const minLengthTitle = 30;
const maxLengthTitle = 100;

const minPriceHousing = {
  flat: 1000,
  bungalow: 0,
  house: 5000,
  palace: 10000,
  hotel: 3000,
};

const roomsOption = {
  1: ['1'],
  2: ['2', '1'],
  3: ['3', '2', '1'],
  100: ['0'],
};

const sliderOptions = {
  min: 0,
  max: 100000,
  start: 0,
  step: 1,
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

const PriceFilterOptions = {
  LOW: [0, 10000],
  MIDDLE: [10000, 50000],
  HIGH: [50000],
};

const DEFAULT_OPTION = 'any';

const filterOptions = [
  {
    filter: 'type',
    selectedValue: DEFAULT_OPTION,
  },
  {
    filter: 'price',
    selectedValue: DEFAULT_OPTION,
  },
  {
    filter: 'rooms',
    selectedValue: DEFAULT_OPTION,
  },
  {
    filter: 'guests',
    selectedValue: DEFAULT_OPTION,
  },
  {
    filter: 'features',
    selectedValue: [],
  },
];

export { MARKS, FILE_TYPES, typeHousing, minLengthTitle, maxLengthTitle, minPriceHousing, roomsOption, sliderOptions, BASE_URL, Route, Method, PriceFilterOptions, DEFAULT_OPTION, filterOptions, MAX_PRICE_HOUSING };

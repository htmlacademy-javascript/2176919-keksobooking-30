import Pristine from 'pristinejs';
import * as noUiSlider from 'nouislider';
import 'nouislider/dist/nouislider.css';
import { FILE_TYPES, minPriceHousing, roomsOption } from '../data/data.js';

const adForm = document.querySelector('.ad-form');
const headline = adForm.querySelector('#title');
const adFormSlider = adForm.querySelector('.ad-form__slider');
const price = adForm.querySelector('#price');
const housingType = adForm.querySelector('#type');
const roomNumberSelect = adForm.querySelector('#room_number');
const guestsNumber = adForm.querySelector('#capacity');
const time = adForm.querySelector('.ad-form__element--time');
const checkInTime = time.querySelector('#timein');
const checkOutTime = time.querySelector('#timeout');
const photoOwner = adForm.querySelector('#avatar');
const photosRealEstate = adForm.querySelector('#images');

const validateHeadline = (value) => value.length >= 30 && value.length <= 100;
const validatePrice = (value) => !(value < minPriceHousing[housingType.value]);
const validateGuestsNumber = () => roomsOption[roomNumberSelect.value].includes(guestsNumber.value);
const validateTime = () => checkInTime.value === checkOutTime.value;
const validateOwnerPhoto = () => {
  if (photoOwner.files) {
    const file = photoOwner.files[0];
    const fileName = file.name.toLowerCase();
    FILE_TYPES.some((it) => fileName.includes(it));
  }
};
const validateRealEstatePhoto = () => {
  if (photosRealEstate.files) {
    const file = photosRealEstate.files[0];
    const fileName = file.name.toLowerCase();
    FILE_TYPES.some((it) => fileName.includes(it));
  }
};

const pristine = new Pristine(adForm, {
  classTo: 'ad-form__element',
  errorClass: 'ad-form__element--invalid',
  errorTextParent: 'ad-form__element',
  errorTextTag: 'span',
});

pristine.addValidator(headline, validateHeadline, 'Длина комментария должна быть больше 30 и меньше 100 символов.');
pristine.addValidator(price, validatePrice, 'Цена меньше минимальной.');
pristine.addValidator(guestsNumber, validateGuestsNumber, 'Не верное количество гостей.');
guestsNumber.addEventListener('change', validateGuestsNumber);
time.addEventListener('change', validateTime);
pristine.addValidator(checkInTime, validateTime, 'Не совпадает время въезда и выезда');
pristine.addValidator(checkOutTime, validateTime, 'Не совпадает время въезда и выезда');
photoOwner.addEventListener('change', validateOwnerPhoto);
pristine.addValidator(photoOwner, validateOwnerPhoto, 'Это не изображение');
photosRealEstate.addEventListener('change', validateRealEstatePhoto);
pristine.addValidator(photosRealEstate, validateRealEstatePhoto, 'Это не изображение');

noUiSlider.create(adFormSlider, {
  range: {
    min: 0,
    max: 100000,
  },
  start: 1000,
  step: 1000,
  connect: 'lower',
});

adFormSlider.noUiSlider.on('update', () => {
  price.value = `${Number(adFormSlider.noUiSlider.get())}`;
  price.placeholder = price.value;
});

housingType.addEventListener('change', () => {
  const selected = minPriceHousing[housingType.value];
  adFormSlider.noUiSlider.set(selected);
});

adForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});

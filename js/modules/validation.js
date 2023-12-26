import Pristine from 'pristinejs';
import * as noUiSlider from 'nouislider';
import 'nouislider/dist/nouislider.css';
import { FILE_TYPES, minLengthTitle, maxLengthTitle, minPriceHousing, roomsOption, sliderOptions } from '../data/data.js';
import { resetMarker } from './map.js';

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
const submitButton = adForm.querySelector('.ad-form__submit');
const address = document.querySelector('#address');

Pristine.addMessages('ru', {
  required: 'Обязательное поле',
  email: 'Не правильный адрес',
  number: 'Введите число',
  integer: 'Введите целое число',
  url: 'Не правильный адрес сайта',
  tel: 'Не валидный номер телефона',
  maxlength: 'Длина должна быть меньше',
  minlength: 'Длина должна быть больше',
  min: 'Минимальное значение',
  max: 'Максимальное значение',
  pattern: 'Пожалуйста воспользуйтесь правильным форматом',
  equals: 'Два поля не совпадают',
  defoult: 'Пожалуйста введите корректное значение',
});

Pristine.setLocale('ru');

const validateHeadline = (value) => value.length >= minLengthTitle && value.length <= maxLengthTitle;
const validatePrice = (value) => !(value < minPriceHousing[housingType.value]);
const validateGuestsNumber = () => roomsOption[roomNumberSelect.value].includes(guestsNumber.value);

const validateTime = () => {
  checkInTime.addEventListener('change', () => {
    checkOutTime.value = checkInTime.value;
  });

  checkOutTime.addEventListener('change', () => {
    checkInTime.value = checkOutTime.value;
  });
};

const validateOwnerPhoto = () => {
  if (photoOwner.files.length !== 0) {
    const file = photoOwner.files[0];
    const fileName = file.name.toLowerCase();
    return FILE_TYPES.some((it) => fileName.includes(it));
  }
  return true;
};
const validateRealEstatePhoto = () => {
  if (photosRealEstate.files.length !== 0) {
    const file = photosRealEstate.files[0];
    const fileName = file?.name.toLowerCase();
    return FILE_TYPES.some((it) => fileName?.includes(it));
  }
  return true;
};

const pristine = new Pristine(adForm, {
  classTo: 'ad-form__element',
  errorClass: 'ad-form__element--invalid',
  errorTextParent: 'ad-form__element',
  errorTextTag: 'span',
});

pristine.addValidator(headline, validateHeadline, `Длина комментария должна быть больше ${minLengthTitle} и меньше ${maxLengthTitle} символов.`);
pristine.addValidator(price, validatePrice, 'Цена меньше минимальной.');
pristine.addValidator(guestsNumber, validateGuestsNumber, 'Не верное количество гостей.');
guestsNumber.addEventListener('change', validateGuestsNumber);
time.addEventListener('input', validateTime);
photoOwner.addEventListener('change', validateOwnerPhoto);
pristine.addValidator(photoOwner, validateOwnerPhoto, 'Это не изображение');
photosRealEstate.addEventListener('change', validateRealEstatePhoto);
pristine.addValidator(photosRealEstate, validateRealEstatePhoto, 'Это не изображение');

const resetValidity = () => pristine.reset();
const resetSlider = () => adFormSlider.noUiSlider.reset();

noUiSlider.create(adFormSlider, {
  range: {
    min: sliderOptions.min,
    max: sliderOptions.max,
  },
  start: sliderOptions.start,
  step: sliderOptions.step,
  connect: 'lower',
});

adFormSlider.noUiSlider.on('update', () => {
  price.value = `${Number(adFormSlider.noUiSlider.get())}`;
  price.placeholder = price.value;
});

price.addEventListener('input', () => adFormSlider.noUiSlider.set(price.value));

const setFormSubmit = () => {
  adForm?.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();
    if (isValid) {
      new FormData(adForm);
    }
  });
};

adForm.addEventListener('reset', () => {
  resetValidity();
  resetSlider();
  resetMarker();
});

const resetsForm = () => {
  adForm.reset();
};

const togglesSubmitLock = (flag) => {
  submitButton.disabled = flag;
};

export { togglesSubmitLock, resetsForm, setFormSubmit };

const adForm = document.querySelector('.ad-form');
const adFormFieldsets = adForm.querySelectorAll('.ad-form__element');
const mapFilter = document.querySelector('.map__filters');
const mapFiltersItems = mapFilter.querySelectorAll('.map__filters .map__filter, .map__filters .map__features');

const disablesAdForm = () => {
  adForm.classList.add('ad-form--disabled');
  adFormFieldsets.forEach((item) => item.setAttribute('disabled', ''));
};

const disablesMapForm = () => {
  mapFilter.classList.add('ad-form--disabled');
  mapFiltersItems.forEach((item) => item.setAttribute('disabled', ''));
};

const activatesAdForm = () => {
  adForm.classList.remove('ad-form--disabled');
  adFormFieldsets.forEach((item) => item.removeAttribute('disabled', ''));
};

const activatesMapForm = () => {
  mapFilter.classList.remove('ad-form--disabled');
  mapFiltersItems.forEach((item) => item.removeAttribute('disabled', ''));
};

export { disablesAdForm, disablesMapForm, activatesAdForm, activatesMapForm };

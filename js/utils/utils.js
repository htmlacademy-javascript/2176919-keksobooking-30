const returnsArray = (num) => {
  const arrayGivenLength = new Array(num).fill(1).map((start, index) => start + index);
  return arrayGivenLength.map((item) => `${item}`.padStart(2, '0'));
};

const getRandomInteger = (a = 0, b = 50) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

const returnsRandomStrings = (items) => {
  const selectedAmenities = [];
  const counter = getRandomInteger(1, items.length);
  while (selectedAmenities.length < counter) {
    const convenience = getRandomArrayElement(items);
    if (!selectedAmenities.includes(convenience)) {
      selectedAmenities.push(convenience);
    }
  }
  return selectedAmenities;
};

const isEscapeKey = (evt) => evt.key === 'Escape';

const pressesKeydown = (handler) => {
  const close = handler;
  return function (evt) {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      close();
    }
  };
};

export { returnsArray, getRandomInteger, getRandomArrayElement, returnsRandomStrings, pressesKeydown };

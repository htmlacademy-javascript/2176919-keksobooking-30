import { PriceFilterOptions, DEFAULT_OPTION, filterOptions, MARKS } from '../data/data';
import { setPoints } from './map';

const mapFilters = document.querySelector('.map__filters');

const ads = [];
let copyAds;
let filterType;

const getDataFilter = (data) => {
  ads.push(...data);
};

const createFilterOptions = (options, filter, selectedValue) => {
  const index = options.findIndex((item) => item.filter === filter);
  if (filter === 'features') {
    const featureIndex = options[index].selectedValue.indexOf(selectedValue);
    if (featureIndex === -1) {
      options[index].selectedValue.push(selectedValue);
    } else {
      options[index].selectedValue.splice(featureIndex, 1);
    }
  } else {
    options[index].selectedValue = selectedValue;
  }
  return options;
};

const findByHousingType = (arr, filter, value) => arr.filter((item) => {
  if (item.offer[filter] === value) {
    return item;
  }
});

const findByPrice = (arr, filter, value) => arr.filter((item) => {
  if (item.offer[filter] > PriceFilterOptions[value.toUpperCase()][0] && item.offer[filter] < PriceFilterOptions[value.toUpperCase()][1]) {
    return item;
  }
});

const findByFill = (arr, filter, value) => arr.filter((item) => {
  if (item.offer[filter] === +value) {
    return item;
  }
});

const findByFeatures = (arr, filter, value) => arr.filter((item) => value.every((elem) => item.offer[filter]?.includes(elem)));

const filters = (arr, options = {}) => {
  let intermediateResult = [];
  copyAds = structuredClone(arr);
  options.forEach(({ filter, selectedValue }) => {
    if (filter === 'type' && selectedValue !== DEFAULT_OPTION) {
      const currentFilter = findByHousingType(copyAds, filter, selectedValue);
      intermediateResult.push(...currentFilter);
      copyAds = intermediateResult;
      intermediateResult = [];
    }
    if (filter === 'price' && selectedValue !== DEFAULT_OPTION) {
      const currentFilter = findByPrice(copyAds, filter, selectedValue);
      intermediateResult.push(...currentFilter);
      copyAds = intermediateResult;
      intermediateResult = [];
    }
    if (filter === 'rooms' && selectedValue !== DEFAULT_OPTION) {
      const currentFilter = findByFill(copyAds, filter, selectedValue);
      intermediateResult.push(...currentFilter);
      copyAds = intermediateResult;
      intermediateResult = [];
    }
    if (filter === 'guests' && selectedValue !== DEFAULT_OPTION) {
      const currentFilter = findByFill(copyAds, filter, selectedValue);
      intermediateResult.push(...currentFilter);
      copyAds = intermediateResult;
      intermediateResult = [];
    }
    if (filter === 'features' && selectedValue.length > 0) {
      const currentFilter = findByFeatures(copyAds, filter, selectedValue);
      intermediateResult.push(...currentFilter);
      copyAds = intermediateResult;
      intermediateResult = [];
    }
  });
};

const onChangeFilter = (evt) => {
  const selectedValue = evt.target.value;
  const options = createFilterOptions(filterOptions, filterType, selectedValue);
  filters(ads, options);
  setPoints(copyAds.slice(0, MARKS));
};

mapFilters.addEventListener('click', (evt) => {
  filterType = evt.target.name?.replace('housing-', '');
  const select = evt.target;
  select.addEventListener('change', onChangeFilter);
});

export { getDataFilter, copyAds };

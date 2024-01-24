import { PriceFilterOptions, DEFAULT_OPTION, filterOptions, MARKS } from '../data/data.js';
import { setPoints } from './map.js';
import { debounce } from '../utils/utils.js';

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

const findByPrice = (arr, filter, value) => arr.filter(({ offer }) =>
  offer[filter] > PriceFilterOptions[value.toUpperCase()][0] &&
  offer[filter] < PriceFilterOptions[value.toUpperCase()][1]
);

const findByFill = (arr, filter, value) => arr.filter((item) => {
  if (item.offer[filter] === +value) {
    return item;
  }
});

const findByFeatures = (arr, filter, value) => arr.filter((item) => value.every((elem) => item.offer[filter]?.includes(elem)));

const filters = (arr, options = {}) => {
  const filterFunctions = {
    type: findByHousingType,
    price: findByPrice,
    rooms: findByFill,
    guests: findByFill,
    features: findByFeatures,
  };

  let intermediateResult = [];
  copyAds = structuredClone(arr);

  options.forEach(({ filter, selectedValue }) => {
    const filterFunction = filterFunctions[filter];
    if (filterFunction && selectedValue !== DEFAULT_OPTION) {
      const currentFilter = filterFunction(copyAds, filter, selectedValue);
      intermediateResult.push(...currentFilter);
      copyAds = structuredClone(intermediateResult);
      intermediateResult = [];
    }
  });
  return copyAds;
};

const renderPoints = (points) => {
  setPoints(points.slice(0, MARKS));
};

const debouncedRenderPoints = debounce(renderPoints);

const onChangeFilter = (evt) => {
  const selectedValue = evt.target.value;
  const options = createFilterOptions(filterOptions, filterType, selectedValue);
  filters(ads, options);
  debouncedRenderPoints(copyAds);
};

mapFilters.addEventListener('click', (evt) => {
  filterType = evt.target.name?.replace('housing-', '');
  const select = evt.target;
  select.addEventListener('change', onChangeFilter);
});

const resetFilters = () => {
  mapFilters.reset();
  debouncedRenderPoints(ads);
};

export { getDataFilter, copyAds, resetFilters };

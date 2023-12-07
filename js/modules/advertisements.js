import { TYPES_HOUSES, CONTROL_TIMESTAMPS, FACILITIES, URLS } from '../data/data';
import { returnsArray, getRandomInteger, getRandomArrayElement, returnsRandomStrings } from '../utils/utils';


const returnAdvertisements = (quantity) => {
  const advertisements = returnsArray(quantity).map((item) => {
    const lat = Number(`35.${getRandomInteger(65000, 70000)}`);
    const lng = Number(`139.${getRandomInteger(70000, 80000)}`);
    return {
      author: {
        avatar: `img/avatars/user${item}.png`,
      },
      offer: {
        title: `Заголовок ${item}`,
        address: `${lat}, ${lng}`,
        price: getRandomInteger(),
        type: `${getRandomArrayElement(TYPES_HOUSES)}`,
        rooms: getRandomInteger(),
        guests: getRandomInteger(),
        checkin: getRandomArrayElement(CONTROL_TIMESTAMPS),
        checkout: getRandomArrayElement(CONTROL_TIMESTAMPS),
        features: returnsRandomStrings(FACILITIES),
        description: `Описание как у нас круто ${item}`,
        photos: returnsRandomStrings(URLS),
      },
      location: {
        lat,
        lng,
      },
    };
  });
  return advertisements;
};


export {returnAdvertisements};

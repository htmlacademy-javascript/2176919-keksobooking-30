import { typeHousing } from '../data/data.js';

const cardTemplate = document.querySelector('#card').content.querySelector('.popup');

const creatingSimilarAds = ({ offer, author }) => {
  const popupSimilarAds = cardTemplate.cloneNode(true);
  const popupTitle = popupSimilarAds.querySelector('.popup__title');
  const popupAddress = popupSimilarAds.querySelector('.popup__text--address');
  const popupPrice = popupSimilarAds.querySelector('.popup__text--price');
  const popupType = popupSimilarAds.querySelector('.popup__type');
  const housing = typeHousing[offer.type];
  const popupCapacity = popupSimilarAds.querySelector('.popup__text--capacity');
  const popupTime = popupSimilarAds.querySelector('.popup__text--time');
  const popupFeatures = popupSimilarAds.querySelector('.popup__features');
  const popupListFeatures = popupFeatures.querySelectorAll('.popup__feature');
  const popupDescription = popupSimilarAds.querySelector('.popup__description');
  const popupPhotos = popupSimilarAds.querySelector('.popup__photos');
  const popupPhoto = popupPhotos.querySelector('.popup__photo');
  const templatePhoto = popupPhoto.cloneNode(true);
  const popupAvatar = popupSimilarAds.querySelector('.popup__avatar');

  popupTitle.textContent = `${offer.title}`;
  popupAddress.textContent = `${offer.address}`;
  popupPrice.textContent = `${offer.price} ₽/ночь`;
  popupType.textContent = `${housing}`;
  popupCapacity.textContent = `${offer.rooms} комнаты для ${offer.guests} гостей`;
  popupTime.textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;
  popupListFeatures.forEach((popupListItem) => {
    const isFeatures = offer.features?.some((feature) => popupListItem.classList.contains(`popup__feature--${feature}`),
    );
    if (!isFeatures) {
      popupListItem.remove();
    }
  });
  popupDescription.textContent = offer.description ? `${offer.description}` : popupDescription.remove();
  popupPhoto.remove();
  offer.photos?.forEach((photo) => {
    const offerPhoto = templatePhoto.cloneNode(true);
    offerPhoto.src = `${photo}`;
    popupPhotos.insertAdjacentElement('beforeend', offerPhoto);
  });
  popupAvatar.src = `${author.avatar}`;

  return popupSimilarAds;
};

export { creatingSimilarAds };

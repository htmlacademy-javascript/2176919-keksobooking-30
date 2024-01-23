const FILE_TYPES = ['.jpg', '.jpeg', '.png', '.webp'];
const SIZE_IMAGE = '70';
const avatarUploadInput = document.querySelector('.ad-form-header__input');
const avatarUploadPreview = document.querySelector('.ad-form-header__preview img');
const photographyHousingUploadInput = document.querySelector('.ad-form__input');
const photographyHousingContainer = document.querySelector('.ad-form__photo');

const initializesPhotoLoading = () => {

  avatarUploadInput?.addEventListener('change', () => {
    if (avatarUploadInput.files) {
      const file = avatarUploadInput.files[0];
      const fileName = file.name.toLowerCase();
      const checksType = FILE_TYPES.some((item) => fileName.includes(item));
      if (checksType && avatarUploadPreview) {
        avatarUploadPreview.src = URL.createObjectURL(file);
      }
    }
  });

  photographyHousingUploadInput?.addEventListener('change', () => {
    if (photographyHousingUploadInput.files) {
      const file = photographyHousingUploadInput.files[0];
      const fileName = file.name.toLowerCase();
      const checksType = FILE_TYPES.some((item) => fileName.includes(item));
      const newImg = document.createElement('img');
      if (checksType && newImg) {
        newImg.src = URL.createObjectURL(file);
        newImg.alt = 'Вот здесь вы можете побывать.';
        newImg.width = SIZE_IMAGE;
        newImg.height = SIZE_IMAGE;
        newImg.classList.add('photo-housing');
        photographyHousingContainer.insertAdjacentElement('afterBegin', newImg);
      }
    }
  });
};

const resetsPhoto = () => {
  const photoHousing = document.querySelector('.photo-housing');
  if (avatarUploadPreview || photoHousing) {
    avatarUploadPreview.src = 'img/muffin-grey.svg';
    photoHousing?.remove();
  }
};

export { initializesPhotoLoading, resetsPhoto };

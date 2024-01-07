const FILE_TYPES = ['.jpg', '.jpeg', '.png', '.webp'];
const avatarUploadInput = document.querySelector('.ad-form-header__input');
const avatarUploadPreview = document.querySelector('.ad-form-header__preview img');
const photographyHousingUploadInput = document.querySelector('.ad-form__input');
const photographyHousingContainer = document.querySelector('.ad-form__photo');

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
      newImg.width = '70';
      newImg.height = '70';
      photographyHousingContainer.insertAdjacentElement('afterBegin', newImg);
    }
  }
});

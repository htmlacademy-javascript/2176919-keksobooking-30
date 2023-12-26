import { pressesKeydown } from '../utils/utils';
const showsDataError = () => {
  const dataError = () => document.body.insertAdjacentHTML('afterbegin', '<p class = "data-error"> получение похожих объвлений не удалось, но вы все еще можете отправить своё <p>');
  if (dataError) {
    dataError();
  }
};

const hideMessage = () => {
  const existItem = document.querySelector('.success') || document.querySelector('.error');
  existItem?.remove();
  document.removeEventListener('keydown', onMessageKeydown);
};

const showMessage = (element) => {
  document.body.append(document.querySelector(`#${element}`).content.cloneNode(true));
  document.addEventListener('keydown', onMessageKeydown);
  document.addEventListener('click', (event) => {
    if (event.target.matches('.success', '.success__message') || event.target.matches('.error__button')) {
      hideMessage();
    }
  });
};

const onMessageKeydown = pressesKeydown(hideMessage);

export { showsDataError, showMessage };

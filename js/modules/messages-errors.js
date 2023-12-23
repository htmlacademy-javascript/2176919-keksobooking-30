const showsDataError = () => {
  const dataError = () => document.body.insertAdjacentHTML('afterbegin', '<p class = "data-error"> получение похожих объвлений не удалось, но вы все еще можете отправить своё <p>');
  if (dataError) {
    dataError();
  }
};

const hidesDataError = () => {
  const error = document.querySelector('.data-error');
  if (error) {
    document.body.removeChild(error);
  }
};

export { showsDataError, hidesDataError }

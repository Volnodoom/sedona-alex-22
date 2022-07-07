const mainPage = document.querySelector('.page-main');
const searchBtn = mainPage.querySelector('.hotel-search__button-initialization');
const modalWindow = document.querySelector('.modal');
const modalOutside = modalWindow.querySelector('.modal__overlay');
const submitBtn = modalWindow.querySelector('.modal-search-form')

const handleModalClick = () => {
  modalWindow.classList.toggle('is-active');
}

const handleModalOutsideClick = () => {
  modalWindow.classList.toggle('is-active');
}

const handleFormSubmit = (evt) => {
  evt.preventDefault();
  modalWindow.classList.toggle('is-active');
}

searchBtn.addEventListener('click', handleModalClick);
modalOutside.addEventListener('click', handleModalClick);
submitBtn.addEventListener('click', handleFormSubmit);

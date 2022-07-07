const LEFT = 'ArrowLeft';
const RIGHT = 'ArrowRight';
const ESC = 'Escape';
const ENTER = 'Enter';
const NINETY_FOUR = 94;
const MIN_TOGGLE_DISTANCE = 7;
const PRICE_RANGE = 50000;

const mainPage = document.querySelector('.page-main');
const container = mainPage.querySelector('.filter-price__container-slider');
const bar = mainPage.querySelector('.filter-price__bar');
const minToggle = mainPage.querySelector('.toggle-min');
const maxToggle = mainPage.querySelector('.toggle-max');
const minPrice =  mainPage.querySelector('#min-price');
const maxPrice = mainPage.querySelector('#max-price');
// const liveRegion = mainPage.querySelector('[role="status"]');
const btnShowResult = mainPage.querySelector('.filter-results-button');

const containerLength = container.offsetWidth;

let minToggleValue = 30;
let maxToggleValue = 70;
let minPriceValue;
let maxPriceValue;

const setBarParams = () => {
  const width = maxToggleValue - minToggleValue;
  const left = minToggleValue;
  bar.style.marginLeft = left + '%';
  bar.style.width = width + '%';
}

const setMinPrice = () => {
  minPriceValue = Math.round (minToggleValue * PRICE_RANGE / 100);
  minPrice.value = minPriceValue;
  minToggle.setAttribute('aria-valuenow', String(minPriceValue));
}

const setMaxPrice = () => {
  maxPriceValue = Math.round (maxToggleValue * PRICE_RANGE/ 100);
  maxPrice.value = maxPriceValue;
  maxToggle.setAttribute('aria-valuenow', String(maxPriceValue));

}

// const setLiveRegionMessage = () => {
//   liveRegion.textContent = `Установлен ценовой интервал для поиска, который начинается от ${minPriceValue} рублей до ${maxPriceValue} рублей.`;
// }

const handleMouseMove = (evt) => {
  const isMinToggleFocus = minToggle === document.activeElement;
  const isMaxToggleFocus = maxToggle === document.activeElement;
  let correction = (evt.clientX - container.getBoundingClientRect().left) * NINETY_FOUR / containerLength;

  if(isMinToggleFocus) {
    if(correction < 0) {
      minToggleValue = 0;
      minToggle.style.left = 0 + '%';
    } else if (maxToggleValue - correction > MIN_TOGGLE_DISTANCE) {
      minToggleValue = correction; 
      minToggle.style.left = correction + '%';
    }

    setBarParams();
    setMinPrice();
  }

  if(isMaxToggleFocus) {
    if(correction - minToggleValue > MIN_TOGGLE_DISTANCE) {
      maxToggleValue = correction; 
      maxToggle.style.left = correction + '%';
    }

    if(correction > NINETY_FOUR) {
      maxToggleValue = NINETY_FOUR;
      maxToggle.style.left = NINETY_FOUR + '%';
    }

    setBarParams();
    setMaxPrice();
  }
}

const handleMouseUpToggleClick = () => {
  // setLiveRegionMessage();

  document.removeEventListener('mousemove', handleMouseMove);
  document.removeEventListener('mouseup', handleMouseUpToggleClick);
}

const handleMouseDownToggleClick = () => {
  document.addEventListener('mousemove', handleMouseMove);
  document.addEventListener('mouseup', handleMouseUpToggleClick);
}


const handleMinToggleKeyboardMove = (evt) => {
  const isMinToggleFocus = minToggle === document.activeElement;
  
  if(evt.key === LEFT && isMinToggleFocus) {
    if(minToggleValue <= 0) {
      minToggleValue = 0;
      
    } else {
      minToggleValue = minToggleValue - 1;
      minToggle.style.left = `${minToggleValue}%`;
    }

    setMinPrice();
    setBarParams();
    // setLiveRegionMessage();
  } else if(evt.key === RIGHT && isMinToggleFocus) {
    if(maxToggleValue - minToggleValue > MIN_TOGGLE_DISTANCE) {
      minToggleValue = minToggleValue + 1;
      minToggle.style.left = `${minToggleValue}%`;

      setMinPrice();
      setBarParams();
      // setLiveRegionMessage();
    } 
  }
  

}

const handleMaxToggleKeyboardMove = (evt) => {
  const isMaxToggleFocus = maxToggle === document.activeElement;

  if(evt.key === LEFT && isMaxToggleFocus) {
    if(maxToggleValue - minToggleValue > MIN_TOGGLE_DISTANCE) {
      maxToggleValue = maxToggleValue - 1;
      maxToggle.style.left = `${maxToggleValue}%`;

      setMaxPrice();
      setBarParams();
      // setLiveRegionMessage();
    }
  } else if(evt.key === RIGHT && isMaxToggleFocus) {
    if(maxToggleValue >= NINETY_FOUR) {
      maxToggleValue = NINETY_FOUR;
    } else {
      maxToggleValue = maxToggleValue + 1;
      maxToggle.style.left = `${maxToggleValue}%`;
    } 

    setMaxPrice();
    setBarParams();
    // setLiveRegionMessage();
  }


}


setMinPrice();
setMaxPrice();

document.addEventListener('keydown', handleMinToggleKeyboardMove);
document.addEventListener('keydown', handleMaxToggleKeyboardMove);

minToggle.addEventListener('mousedown', handleMouseDownToggleClick);
maxToggle.addEventListener('mousedown', handleMouseDownToggleClick);

btnShowResult.addEventListener('click', (evt) => evt.preventDefault());
btnShowResult.addEventListener('keydown', (evt) => {if(evt.key === ENTER) {preventDefault()}});


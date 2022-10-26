// Select all the DOM Variables
const btn = document.querySelector('.btn');
const countriesContainer = document.querySelector('.countries');
const formGroup = document.querySelector('.form-group');
const errorMsg = document.querySelector('.error-msg');

// Function to Display the Data on the Webpage.
const renderCountry = function (data, className = '') {
  const name = data.name.common;
  const flag = data.flags.svg;
  const region = data.continents;
  const language = Object.values(data.languages)[0];
  const currency = Object.values(data.currencies)[0].name;
  const area = data.area;
  const capital = data.capital;

  const html = `
  <article class="country ${className}">
    <img class="country__img" src="${flag}" />
    <div class="country__data">
      <h3 class="country__name">${name}</h3>
      <p class="country__row"><span>CONTINENT:</span>${region}</p>
      <p class="country__row"><span>CAPITAL:</span>${capital}</p>
      <p class="country__row"><span>POPULATION:</span>${(
      +data.population / 1000000).toFixed(1)}million</p>
      <p class="country__row"><span>LANGUAGE:</span>${language}</p>
      <p class="country__row"><span>CURRENCY:</span>${currency}</p>
      <p class="country__row"><span>AREA:</span>${area} sq. km.</p>
    </div>
  </article>
  <button class="reset_btn" onClick="window.location.reload()">RESET</button>
  `;
  countriesContainer.insertAdjacentHTML('beforeend', html);
  formGroup.style.display = 'none';
};

// Function to Dispaly the Error Message
const renderError = function (msg) {
  errorMsg.insertAdjacentText('beforeend', msg);
};

// Get the Country Data using fetch API
const getCountryData = function (country) {
  fetch(`https://restcountries.com/v3.1/name/${country}`)
    .then(response => {
      if (!response.ok)
        throw new Error(`Please enter a valid country name`);
        return response.json();
      })
      .then(data => {
        renderCountry(data[0]);
      })
      .catch(err => {
        renderError(`${err.message}`);
      })
      .finally(() => {
        countriesContainer.style.opacity = 1;
      });
};

// Button to call the Get the Country Data Function
btn.addEventListener('click', function() {
  getCountryData(document.getElementById('input').value);
});

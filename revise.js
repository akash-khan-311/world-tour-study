const cardContainer = document.getElementById("card-container");

const loadCountries = async (isSeeMore) => {
  const res = await fetch("https://restcountries.com/v3.1/all");
  const data = await res.json();

  showCountry(data, isSeeMore);
  //   handleSpinner(true);
};

const showCountry = (countries, isSeeMore) => {
  const seeMoreBtn = document.getElementById("see-more");
  if (countries.length > 12 && !isSeeMore) {
    seeMoreBtn.classList.remove("hidden");
  } else {
    seeMoreBtn.classList.add("hidden");
  }

  if (!isSeeMore) {
    countries = countries.slice(0, 12);
  }

  console.log(countries);
  countries.forEach((country) => {
    const card = document.createElement("div");
    card.classList = "card card-bg text-white shadow-xl";
    card.innerHTML = `
    
    
        <figure><img src="${country.flags.png}" alt="Shoes" /></figure>
            <div class="card-body">
              <h2 class="card-title">${country.name.common}</h2>
              <p>Capital: ${country.capital}</p>
              
              </div>
            </div>
    
    `;

    cardContainer.appendChild(card);
    handleSpinner(false);
  });
};

const handleSearch = (name) => {
  fetch(`https://restcountries.com/v3.1/name/${name}`)
    .then((res) => res.json())
    .then((data) => showSearchCountry(data[0]));
};
const getSearchText = () => {
  const searchInput = document.getElementById("search-field");
  const searchText = searchInput.value;
  handleSearch(searchText);
  handleSpinner(true);
};

const showSearchCountry = (country) => {
  console.log(country);
  cardContainer.textContent = "";
  const countryCard = document.createElement("div");
  countryCard.classList = "card card-bg text-white shadow-xl";

  countryCard.innerHTML = `
  
  <figure><img src="${country?.flags?.png}" alt="Shoes" /></figure>
            <div class="card-body">
              <h2 class="card-title">${country?.name.common}</h2>
              <p>Capital: ${country?.capital[0]}</p>
              </div>
            </div>
  
  
  `;
  cardContainer.appendChild(countryCard);
  handleSpinner(false);
};

const handleSpinner = (isLoading) => {
  const spinner = document.getElementById("spinner");

  if (isLoading) {
    spinner.classList.remove("hidden");
  } else {
    spinner.classList.add("hidden");
  }
};

const handleSeeMore = () => {
  loadCountries(true);
};
loadCountries();

import './style.css';

(async () => {
  const setContainerInnerHtml = (str) =>
    (document.querySelector('.country-list-container').innerHTML = str);
  setContainerInnerHtml('Loading...');

  const countryRawData = await (
    await fetch('https://restcountries.com/v3.1/all')
  ).json();
  const countryMappedData = countryRawData.map((country) => ({
    name: country.name,
    region: country.region,
    subregion: country.subregion,
    capital: country.capital,
    flags: country.flags,
    language: country.languages ? Object.keys(country.languages)[0] : null,
  }));

  const handleDataForTemplate = (data) => data ?? '---';
  const renderTemplate = (countryList) => {
    return `
    <h1>Country List</h1>
    <ul class="country-list">
      ${countryList
        .map(
          (country) => `
        <li class="country-list__card ${country.region}">
          <div class="country-list__flag">
            <div class="country-list__flag--front">
              <img src="${
                country.flags.svg
              }" alt="flag of ${handleDataForTemplate(country.name.common)}"/>
            </div>
            <div class="country-list__flag--flipped">
              <h2>${handleDataForTemplate(country.name.common)}</h2>
              <span>Native name: 
                ${handleDataForTemplate(
                  country.language
                    ? country.name.nativeName[country.language]?.common
                    : null
                )}</span>
              <span>Capital: ${handleDataForTemplate(country.capital)}</span>
              <span>Region: ${handleDataForTemplate(country.region)}</span>
              <span>Sub-region: ${handleDataForTemplate(
                country.subregion
              )}</span>
            </div>
          </div>
        </li>
      `
        )
        .join('')}
    </ul>`;
  };
  setContainerInnerHtml(renderTemplate(countryMappedData));
})();

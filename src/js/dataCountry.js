import createElement from './domElementFactory';

export default class DataCountry {
    dataCountry;

    createdataCountryTable() {
        this.dataCountry = document.createElement('div');
        this.dataCountry.classList.add('dataCountry');

        return this.dataCountry;
    }

    showCountryInfo(country) {
        console.log(country);
        this.dataCountry.innerHTML = '';
        const countryName = createElement('div');
        countryName.append(country.Country);

        const totalCases = createElement('div');
        totalCases.append(country.TotalConfirmed);

        const totalDeaths = createElement('div');
        totalDeaths.append(country.TotalDeaths);

        const totalRecovered = createElement('div');
        totalRecovered.append(country.TotalRecovered);

        this.dataCountry.append(countryName);
        this.dataCountry.append(totalCases);
        this.dataCountry.append(totalDeaths);
        this.dataCountry.append(totalRecovered);
    }
}

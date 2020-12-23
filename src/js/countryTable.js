import createElement from './domElementFactory';

export default class CountryTable {
    tableCountriesTotalCases;

    dataService;

    isCheckedNew;

    tableBody;

    selectCountry;

    constructor(dataService, isCheckedNew, dashboard, selectCountry) {
        this.dataService = dataService;
        this.isCheckedNew = isCheckedNew;
        this.selectCountry = selectCountry.bind(dashboard);
    }

    createElement() {
        this.tableCountriesTotalCases = document.createElement('table');
        this.tableCountriesTotalCases.classList.add('tableGlobal');
        this.createTable();
        return this.tableCountriesTotalCases;
    }

    createTable() {
        this.tableCountriesTotalCases.innerHTML = '';
        const tableHeader = this.tableCountriesTotalCases.createTHead();
        this.tableBody = this.tableCountriesTotalCases.createTBody();

        const headerRow = tableHeader.insertRow();
        const countryHeader = createElement('th');
        countryHeader.innerText = 'Country';
        const totalCases = createElement('th');
        totalCases.innerText = 'Total Cases';

        headerRow.append(countryHeader);
        headerRow.append(totalCases);

        this.createRows();
    }

    createRows(checked100k, checkedNew, countryParam) {
        this.tableBody.innerHTML = '';
        const totalCountriesList = Array.from(this.dataService.getCountriesList());
        const sortParam = CountryTable.getSortParam(checked100k, checkedNew, countryParam);
        totalCountriesList.sort((a, b) => b[sortParam] - a[sortParam]);
        for (let i = 0; i < totalCountriesList.length; i += 1) {
            const rowTotal = this.tableBody.insertRow(i);
            rowTotal.addEventListener('click', () => this.selectCountry(totalCountriesList[i]));
            const countryFlag = rowTotal.insertCell(0);
            countryFlag.classList.add('countryFlag');
            const imageCountryFlag = document.createElement('img');
            imageCountryFlag.setAttribute('src', totalCountriesList[i].flag);
            countryFlag.append(imageCountryFlag);
            const cellCountryTotal = rowTotal.insertCell(1);
            cellCountryTotal.classList.add('countryName');
            const cellCases = rowTotal.insertCell(2);
            cellCases.classList.add('countryInfo');
            cellCountryTotal.innerHTML = totalCountriesList[i].Country;
            if (checkedNew) {
                if (checked100k) {
                    if (countryParam === 'cases') {
                        cellCases.innerHTML = totalCountriesList[i].TotalConfirmedNew100;
                    } else if (countryParam === 'deaths') {
                        cellCases.innerHTML = totalCountriesList[i].TotalDeathsNew100;
                    } else {
                        cellCases.innerHTML = totalCountriesList[i].TotalRecoveredNew100;
                    }
                } else if (countryParam === 'cases') {
                    cellCases.innerHTML = totalCountriesList[i].NewConfirmed;
                } else if (countryParam === 'deaths') {
                    cellCases.innerHTML = totalCountriesList[i].NewDeaths;
                } else {
                    cellCases.innerHTML = totalCountriesList[i].NewRecovered;
                }
            } else if (checked100k) {
                if (countryParam === 'cases') {
                    cellCases.innerHTML = totalCountriesList[i].TotalConfirmed100;
                } else if (countryParam === 'deaths') {
                    cellCases.innerHTML = totalCountriesList[i].TotalDeaths100;
                } else {
                    cellCases.innerHTML = totalCountriesList[i].TotalRecovered100;
                }
            } else if (countryParam === 'cases') {
                cellCases.innerHTML = totalCountriesList[i].TotalConfirmed;
            } else if (countryParam === 'deaths') {
                cellCases.innerHTML = totalCountriesList[i].TotalDeaths;
            } else {
                cellCases.innerHTML = totalCountriesList[i].TotalRecovered;
            }
        }
    }

    showRow(country, checked100k, checkedNew, countryParam) {
        this.tableBody.innerHTML = '';
        const row = this.tableBody.insertRow();
        row.addEventListener('click', () => this.selectCountry(country));
        const countryFlag = row.insertCell(0);
        countryFlag.classList.add('countryFlag');
        const imageCountryFlag = document.createElement('img');
        imageCountryFlag.setAttribute('src', country.flag);
        countryFlag.append(imageCountryFlag);
        const cellCountryTotal = row.insertCell(1);
        cellCountryTotal.classList.add('countryName');
        const cellCases = row.insertCell(2);
        cellCases.classList.add('countryInfo');
        cellCountryTotal.innerHTML = country.Country;

        if (checkedNew) {
            if (checked100k) {
                if (countryParam === 'cases') {
                    cellCases.innerHTML = country.TotalConfirmedNew100;
                } else if (countryParam === 'deaths') {
                    cellCases.innerHTML = country.TotalDeathsNew100;
                } else {
                    cellCases.innerHTML = country.TotalRecoveredNew100;
                }
            } else if (countryParam === 'cases') {
                cellCases.innerHTML = country.NewConfirmed;
            } else if (countryParam === 'deaths') {
                cellCases.innerHTML = country.NewDeaths;
            } else {
                cellCases.innerHTML = country.NewRecovered;
            }
        } else if (checked100k) {
            if (countryParam === 'cases') {
                cellCases.innerHTML = country.TotalConfirmed100;
            } else if (countryParam === 'deaths') {
                cellCases.innerHTML = country.TotalDeaths100;
            } else {
                cellCases.innerHTML = country.TotalRecovered100;
            }
        } else if (countryParam === 'cases') {
            cellCases.innerHTML = country.TotalConfirmed;
        } else if (countryParam === 'deaths') {
            cellCases.innerHTML = country.TotalDeaths;
        } else {
            cellCases.innerHTML = country.TotalRecovered;
        }
    }

    static getSortParam(checked100k, checkedNew, countryParam) {
        let sortParam;
        if (checkedNew) {
            if (checked100k) {
                if (countryParam === 'cases') {
                    sortParam = 'TotalConfirmedNew100';
                } else if (countryParam === 'deaths') {
                    sortParam = 'TotalDeathsNew100';
                } else {
                    sortParam = 'TotalRecoveredNew100';
                }
            } else if (countryParam === 'cases') {
                sortParam = 'NewConfirmed';
            } else if (countryParam === 'deaths') {
                sortParam = 'NewDeaths';
            } else {
                sortParam = 'NewRecovered';
            }
        } else if (checked100k) {
            if (countryParam === 'cases') {
                sortParam = 'TotalConfirmed100';
            } else if (countryParam === 'deaths') {
                sortParam = 'TotalDeaths100';
            } else {
                sortParam = 'TotalRecovered100';
            }
        } else if (countryParam === 'cases') {
            sortParam = 'TotalConfirmed';
        } else if (countryParam === 'deaths') {
            sortParam = 'TotalDeaths';
        } else {
            sortParam = 'TotalRecovered';
        }

        return sortParam;
    }
}

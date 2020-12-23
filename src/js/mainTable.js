import createElement from './domElementFactory';

export default class MainTable {
    dataService;

    tableCountries;

    tableBody;

    selectCountry;

    handle100k;

    constructor(dataService, dashboard, selectCountry, handle100k) {
        this.dataService = dataService;
        this.selectCountry = selectCountry.bind(dashboard);
        this.handle100k = handle100k.bind(dashboard);
    }

    createElement() {
        this.tableCountries = document.createElement('table');
        this.tableCountries.classList.add('mainTable');
        this.createTable();
        return this.tableCountries;
    }

    createTable() {
        this.tableCountries.innerHTML = '';

        const tableHeader = this.tableCountries.createTHead();
        this.tableBody = this.tableCountries.createTBody();
        const headerRow = tableHeader.insertRow();
        const totalCasesHeader = createElement('th');
        totalCasesHeader.classList.add('totalCasesHeader');
        const headerCasesText = createElement('h4');
        headerCasesText.innerText = 'Total Cases';
        totalCasesHeader.append(headerCasesText);
        const headerCasesAmount = createElement('h3');
        headerCasesAmount.innerText = this.dataService.getTotalCases();
        totalCasesHeader.append(headerCasesAmount);
        const button100kTC = document.createElement('button');
        button100kTC.classList.add('button-100k');
        button100kTC.innerText = '100k';
        totalCasesHeader.append(button100kTC);
        const totalDeathsHeader = createElement('th');
        totalDeathsHeader.classList.add('totalDeathsHeader');
        const headerDeathsText = createElement('h4');
        headerDeathsText.innerText = 'Total Deaths';
        totalDeathsHeader.append(headerDeathsText);
        const headerDeathsAmount = createElement('h3');
        headerDeathsAmount.innerText = this.dataService.getTotalDeaths();
        totalDeathsHeader.append(headerDeathsAmount);
        const button100kTD = document.createElement('button');
        button100kTD.classList.add('button-100k');
        button100kTD.innerText = '100k';
        totalDeathsHeader.append(button100kTD);
        const totalRecoveredHeader = createElement('th');
        totalRecoveredHeader.classList.add('totalRecoveredHeader');
        const headerRecoveredText = createElement('h4');
        headerRecoveredText.innerText = 'Total Recovered';
        totalRecoveredHeader.append(headerRecoveredText);
        const headerRecoveredAmount = createElement('h3');
        headerRecoveredAmount.innerText = this.dataService.getTotalRecovered();
        totalRecoveredHeader.append(headerRecoveredAmount);
        const button100kTR = document.createElement('button');
        button100kTR.classList.add('button-100k');
        button100kTR.innerText = '100k';
        totalRecoveredHeader.append(button100kTR);

        button100kTC.addEventListener('click', () => {
            this.handle100kClick();
            button100kTC.classList.toggle('button-100k-pressed');
            button100kTD.classList.toggle('button-100k-pressed');
            button100kTR.classList.toggle('button-100k-pressed');
        });

        button100kTD.addEventListener('click', () => {
            this.handle100kClick();
            button100kTC.classList.toggle('button-100k-pressed');
            button100kTD.classList.toggle('button-100k-pressed');
            button100kTR.classList.toggle('button-100k-pressed');
        });

        button100kTR.addEventListener('click', () => {
            this.handle100kClick();
            button100kTC.classList.toggle('button-100k-pressed');
            button100kTD.classList.toggle('button-100k-pressed');
            button100kTR.classList.toggle('button-100k-pressed');
        });

        headerRow.append(totalCasesHeader);
        headerRow.append(totalDeathsHeader);
        headerRow.append(totalRecoveredHeader);

        this.createRows();
    }

    createRows(checked100k, checkedNew) {
        this.tableBody.innerHTML = '';
        const countriesList = Array.from(this.dataService.getCountriesList());
        const sortParam = MainTable.getSortParam(checked100k, checkedNew);
        console.log(sortParam);
        countriesList.sort((a, b) => b[sortParam] - a[sortParam]);
        for (let i = 0; i < countriesList.length; i += 1) {
            const row = this.tableBody.insertRow(i);
            row.addEventListener('click', () => this.selectCountry(countriesList[i]));
            const cellTotalCases = row.insertCell(0);
            const cellTotalCasesAmount = createElement('p');
            const cellCountryTC = createElement('span');
            cellCountryTC.innerHTML = countriesList[i].Country;
            cellTotalCases.append(cellTotalCasesAmount);
            cellTotalCases.append(cellCountryTC);
            const cellTotalDeaths = row.insertCell(1);
            const cellTotalDeathsAmount = createElement('p');
            const cellCountryTD = createElement('span');
            cellCountryTD.innerHTML = countriesList[i].Country;
            cellTotalDeaths.append(cellTotalDeathsAmount);
            cellTotalDeaths.append(cellCountryTD);
            const cellTotalRecovered = row.insertCell(2);
            const cellTotalRecoveredAmount = createElement('p');
            const cellCountryTR = createElement('span');
            cellCountryTR.innerHTML = countriesList[i].Country;
            cellTotalRecovered.append(cellTotalRecoveredAmount);
            cellTotalRecovered.append(cellCountryTR);
            if (checkedNew) {
                if (checked100k) {
                    cellTotalCasesAmount.innerHTML = countriesList[i].TotalConfirmedNew100;
                    cellTotalRecoveredAmount.innerHTML = countriesList[i].TotalRecoveredNew100;
                    cellTotalDeathsAmount.innerHTML = countriesList[i].TotalDeathsNew100;
                } else {
                    cellTotalCasesAmount.innerHTML = countriesList[i].NewConfirmed;
                    cellTotalRecoveredAmount.innerHTML = countriesList[i].NewRecovered;
                    cellTotalDeathsAmount.innerHTML = countriesList[i].NewDeaths;
                }
            } else if (checked100k) {
                cellTotalCasesAmount.innerHTML = countriesList[i].TotalConfirmed100;
                cellTotalRecoveredAmount.innerHTML = countriesList[i].TotalRecovered100;
                cellTotalDeathsAmount.innerHTML = countriesList[i].TotalDeaths100;
            } else {
                cellTotalCasesAmount.innerHTML = countriesList[i].TotalConfirmed;
                cellTotalRecoveredAmount.innerHTML = countriesList[i].TotalRecovered;
                cellTotalDeathsAmount.innerHTML = countriesList[i].TotalDeaths;
            }
        }
    }

    handle100kClick() {
        this.handle100k();
    }

    checkNew(isCheckedNew, country) {
        this.isCheckedNew = isCheckedNew;
        if (country) {
            this.showRow(country);
        } else {
            this.createRows();
        }
    }

    showRow(country, checked100k, checkedNew) {
        this.tableBody.innerHTML = '';
        const row = this.tableBody.insertRow();
        row.addEventListener('click', () => this.selectCountry(country));
        const cellTotalCases = row.insertCell(0);
        const cellTotalCasesAmount = createElement('p');
        const cellCountryTC = createElement('span');
        cellCountryTC.innerHTML = country.Country;
        cellTotalCases.append(cellTotalCasesAmount);
        cellTotalCases.append(cellCountryTC);
        const cellTotalDeaths = row.insertCell(1);
        const cellTotalDeathsAmount = createElement('p');
        const cellCountryTD = createElement('span');
        cellCountryTD.innerHTML = country.Country;
        cellTotalDeaths.append(cellTotalDeathsAmount);
        cellTotalDeaths.append(cellCountryTD);
        const cellTotalRecovered = row.insertCell(2);
        const cellTotalRecoveredAmount = createElement('p');
        const cellCountryTR = createElement('span');
        cellCountryTR.innerHTML = country.Country;
        cellTotalRecovered.append(cellTotalRecoveredAmount);
        cellTotalRecovered.append(cellCountryTR);

        if (checkedNew) {
            if (checked100k) {
                cellTotalCasesAmount.innerHTML = country.TotalConfirmedNew100;
                cellTotalRecoveredAmount.innerHTML = country.TotalRecoveredNew100;
                cellTotalDeathsAmount.innerHTML = country.TotalDeathsNew100;
            } else {
                cellTotalCasesAmount.innerHTML = country.NewConfirmed;
                cellTotalRecoveredAmount.innerHTML = country.NewRecovered;
                cellTotalDeathsAmount.innerHTML = country.NewDeaths;
            }
        } else if (checked100k) {
            cellTotalCasesAmount.innerHTML = country.TotalConfirmed100;
            cellTotalRecoveredAmount.innerHTML = country.TotalRecovered100;
            cellTotalDeathsAmount.innerHTML = country.TotalDeaths100;
        } else {
            cellTotalCasesAmount.innerHTML = country.TotalConfirmed;
            cellTotalRecoveredAmount.innerHTML = country.TotalRecovered;
            cellTotalDeathsAmount.innerHTML = country.TotalDeaths;
        }
    }

    static getSortParam(checked100k, checkedNew) {
        let sortParam;
        if (checkedNew) {
            if (checked100k) {
                sortParam = 'TotalConfirmedNew100';
            } else {
                sortParam = 'NewConfirmed';
            }
        } else if (checked100k) {
            sortParam = 'TotalConfirmed100';
        } else {
            sortParam = 'TotalConfirmed';
        }

        return sortParam;
    }
}

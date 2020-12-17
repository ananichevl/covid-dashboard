export default class TableDataCountries {
    dataService;

    dataCountry;

    isChecked100;

    isCheckedNew;

    tableCountries;

    constructor(dataService, dataCountry, isChecked100, isCheckedNew) {
        this.dataService = dataService;
        this.dataCountry = dataCountry;
        this.isChecked100 = isChecked100;
        this.isCheckedNew = isCheckedNew;
    }

    createTable() {
        this.tableCountries = document.createElement('table');
        this.createRows();
        return this.tableCountries;
    }

    createRows() {
        this.tableCountries.innerHTML = '';
        const countriesList = this.dataService.getCountriesList();
        for (let i = 0; i < countriesList.length; i += 1) {
            const row = this.tableCountries.insertRow(i);
            row.addEventListener('click', () => this.dataCountry.showCountryInfo(countriesList[i]));
            const tableHeader = this.tableCountries.createTHead();
            tableHeader.innerHTML = 'Total Cases';
            const cellCountry = row.insertCell(0);
            const cellTotalCases = row.insertCell(1);
            const cellTotalDeaths = row.insertCell(2);
            const cellTotalRecovered = row.insertCell(3);
            cellCountry.innerHTML = countriesList[i].Country;

            if (this.isCheckedNew) {
                if (this.isChecked100) {
                    cellTotalCases.innerHTML = countriesList[i].TotalConfirmedNew100;
                    cellTotalRecovered.innerHTML = countriesList[i].TotalRecoveredNew100;
                    cellTotalDeaths.innerHTML = countriesList[i].TotalDeathsNew100;
                } else {
                    cellTotalCases.innerHTML = countriesList[i].NewConfirmed;
                    cellTotalRecovered.innerHTML = countriesList[i].NewRecovered;
                    cellTotalDeaths.innerHTML = countriesList[i].NewDeaths;
                }
            } else if (this.isChecked100) {
                cellTotalCases.innerHTML = countriesList[i].TotalConfirmed100;
                cellTotalRecovered.innerHTML = countriesList[i].TotalRecovered100;
                cellTotalDeaths.innerHTML = countriesList[i].TotalDeaths100;
            } else {
                cellTotalCases.innerHTML = countriesList[i].TotalConfirmed;
                cellTotalRecovered.innerHTML = countriesList[i].TotalRecovered;
                cellTotalDeaths.innerHTML = countriesList[i].TotalDeaths;
            }
        }
    }

    check100(isChecked100) {
        this.isChecked100 = isChecked100;
        this.createRows();
    }

    checkNew(isCheckedNew) {
        this.isCheckedNew = isCheckedNew;
        this.createRows();
    }
}

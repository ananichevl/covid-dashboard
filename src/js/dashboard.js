import createElement from './domElementFactory';
import DataService from './data';
import MainTable from './mainTable';
import MainGlobal from './mainGlobal';
import CountryTable from './countryTable';
import CountryDate from './countryDate';
import Map from './map';
import Search from './search';

export default class Dashboard {
    country;

    mainTable;

    countryTable;

    map;

    createElement() {
        const dataService = new DataService('https://api.covid19api.com/summary');

        const dashboardWrapper = createElement('div');
        dashboardWrapper.classList.add('dashboard-wrapper');

        const dashboardHeader = createElement('div');
        dashboardHeader.classList.add('dashboard-header');

        const dashboardHeaderTitle = createElement('div');
        dashboardHeaderTitle.classList.add('dashboard-header__title');
        dashboardHeaderTitle.innerText = 'COVID-19 Dashboard'.toUpperCase();

        dashboardHeader.append(dashboardHeaderTitle);

        const dashboard = createElement('div');
        dashboard.classList.add('dashboard');

        (async () => {
            try {
                await dataService.getContent();

                const search = new Search(
                    dataService.getCountriesList(),
                    this,
                    this.selectCountry,
                );
                dashboardHeader.append(search.createElement());

                const checkbox100 = createElement('input');
                checkbox100.setAttribute('type', 'checkbox');

                const checkboxNew = createElement('input');
                checkboxNew.setAttribute('type', 'checkbox');

                this.mainTable = new MainTable(
                    dataService,
                    checkbox100.checked,
                    checkboxNew.checked,
                    this,
                    this.selectCountry,
                );

                this.countryTable = new CountryTable(
                    dataService,
                    checkbox100.checked,
                    checkboxNew.checked,
                    this,
                    this.selectCountry,
                );

                this.map = new Map(this, this.selectCountry);

                checkbox100.addEventListener('click', () => this.mainTable.check100(checkbox100.checked, this.country));
                checkboxNew.addEventListener('click', () => this.mainTable.checkNew(checkboxNew.checked, this.country));

                const dashboardMain = createElement('div');
                dashboardMain.classList.add('dashboard-main');

                const dasboardMainInfo = createElement('div');
                dasboardMainInfo.classList.add('dashboard-main__info');

                const main = createElement('div');
                main.classList.add('main');

                const mainGraph = createElement('div');
                mainGraph.classList.add('main__graph');

                const mainGlobal = new MainGlobal(dataService.getTotalCases());

                main.append(mainGlobal.createElement());
                main.append(mainGraph);

                dasboardMainInfo.append(main);
                dasboardMainInfo.append(Map.createElement());

                const dashboardMainTable = createElement('div');
                dashboardMainTable.classList.add('dashboard-main__table');

                dashboardMainTable.append(this.mainTable.createElement());

                dashboardMain.append(dasboardMainInfo);
                dashboardMain.append(dashboardMainTable);
                dashboardMain.append(checkbox100);
                dashboardMain.append(checkboxNew);

                const dashboardCountry = createElement('div');
                dashboardCountry.classList.add('dashboard-country');

                const countryDate = new CountryDate(dataService.getDate());

                const dashboardCountryTable = createElement('div');
                dashboardCountryTable.classList.add('dashboard-country__table');
                dashboardCountryTable.append(this.countryTable.createElement());

                dashboardCountry.append(countryDate.createElement());
                dashboardCountry.append(dashboardCountryTable);

                dashboard.append(dashboardMain);
                dashboard.append(dashboardCountry);

                this.map.initializeMap(dataService.getCountriesList());
            } catch (error) {
                console.log(error);
            }
        })();

        dashboardWrapper.append(dashboardHeader);
        dashboardWrapper.append(dashboard);

        return dashboardWrapper;
    }

    selectCountry(country) {
        if (country === this.country) {
            this.country = null;
            this.mainTable.createRows();
            this.countryTable.createRows();
            this.map.showCountry(country);
        } else {
            this.country = country;
            this.mainTable.showRow(this.country);
            this.countryTable.showRow(this.country);
            this.map.showCountry(this.country);
        }
    }
}

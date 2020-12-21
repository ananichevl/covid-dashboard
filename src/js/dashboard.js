import createElement from './domElementFactory';
import DataService from './data';
import MainTable from './mainTable';
import MainGlobal from './mainGlobal';
import CountryTable from './countryTable';
import CountryDate from './countryDate';
import Map from './map';

export default class Dashboard {
    static createElement() {
        const dashboardWrapper = createElement('div');
        dashboardWrapper.classList.add('dashboard-wrapper');

        const dashboardHeader = createElement('div');
        dashboardHeader.classList.add('dashboard-header');

        const dashboardHeaderTitle = createElement('div');
        dashboardHeaderTitle.classList.add('dashboard-header__title');
        dashboardHeaderTitle.innerText = 'COVID-19 Dashboard'.toUpperCase();

        const dashboardHeaderSearch = createElement('div');
        dashboardHeaderSearch.classList.add('dashboard-header__search');

        dashboardHeader.append(dashboardHeaderTitle);
        dashboardHeader.append(dashboardHeaderSearch);

        const dashboard = createElement('div');
        dashboard.classList.add('dashboard');

        const dataService = new DataService('https://api.covid19api.com/summary');

        (async () => {
            try {
                await dataService.getContent();

                const checkbox100 = createElement('input');
                checkbox100.setAttribute('type', 'checkbox');

                const checkboxNew = createElement('input');
                checkboxNew.setAttribute('type', 'checkbox');

                const mainTable = new MainTable(
                    dataService,
                    checkbox100.checked,
                    checkboxNew.checked,
                );

                const countryTable = new CountryTable(
                    dataService,
                    checkbox100.checked,
                    checkboxNew.checked,
                    mainTable,
                );

                checkbox100.addEventListener('click', () => mainTable.check100(checkbox100.checked));
                checkboxNew.addEventListener('click', () => mainTable.checkNew(checkboxNew.checked));

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

                dashboardMainTable.append(mainTable.createTable());

                dashboardMain.append(dasboardMainInfo);
                dashboardMain.append(dashboardMainTable);
                dashboardMain.append(checkbox100);
                dashboardMain.append(checkboxNew);

                const dashboardCountry = createElement('div');
                dashboardCountry.classList.add('dashboard-country');

                const countryDate = new CountryDate(dataService.getDate());

                const dashboardCountryTable = createElement('div');
                dashboardCountryTable.classList.add('dashboard-country__table');
                dashboardCountryTable.append(countryTable.createElement());

                dashboardCountry.append(countryDate.createElement());
                dashboardCountry.append(dashboardCountryTable);

                dashboard.append(dashboardMain);
                dashboard.append(dashboardCountry);

                Map.initializeMap(dataService.getCountriesList());
            } catch (error) {
                console.log(error);
            }
        })();

        dashboardWrapper.append(dashboardHeader);
        dashboardWrapper.append(dashboard);

        return dashboardWrapper;
    }
}

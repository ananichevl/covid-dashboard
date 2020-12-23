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

    isChecked100 = false;

    isCheckedNew = false;

    countryParam = 'cases';

    mapParam = 'cases';

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
                    dataService,
                    this,
                    this.selectCountry,
                );
                dashboardHeader.append(search.createElement());

                const buttonWrapper = createElement('div');
                buttonWrapper.classList.add('button-wrapper');

                const totalButton = createElement('div');
                totalButton.classList.add('total-button');
                totalButton.innerText = 'All Period';

                const newButton = createElement('div');
                newButton.classList.add('new-button');
                [newButton.innerText] = [dataService.getDate()
                    .split('T')[0]];

                totalButton.addEventListener('click', () => {
                    this.isCheckedNew = false;
                    totalButton.classList.toggle('button-clicked', !this.isCheckedNew);
                    newButton.classList.toggle('button-clicked', this.isCheckedNew);
                    this.handleNew();
                });

                newButton.addEventListener('click', () => {
                    this.isCheckedNew = true;
                    totalButton.classList.toggle('button-clicked', !this.isCheckedNew);
                    newButton.classList.toggle('button-clicked', this.isCheckedNew);
                    this.handleNew();
                });

                buttonWrapper.append(totalButton);
                buttonWrapper.append(newButton);

                const checkboxNew = createElement('input');
                checkboxNew.setAttribute('type', 'checkbox');

                this.mainTable = new MainTable(
                    dataService,
                    this,
                    this.selectCountry,
                    this.handle100k,
                );

                this.countryTable = new CountryTable(
                    dataService,
                    checkboxNew.checked,
                    this,
                    this.selectCountry,
                );

                this.map = new Map(dataService, this, this.selectCountry);

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

                const mapWrapper = createElement('div');
                mapWrapper.classList.add('map-wrapper');
                mapWrapper.append(this.map.createElement());

                const mapButtonWrapper = createElement('div');
                mapButtonWrapper.classList.add('button-wrapper');

                const mapButtonCases = createElement('div');
                mapButtonCases.classList.add('button-cases');
                mapButtonCases.innerText = 'All Cases';

                const mapButtonDeaths = createElement('div');
                mapButtonDeaths.classList.add('button-deaths');
                mapButtonDeaths.innerText = 'Deaths';

                const mapButtonRecovered = createElement('div');
                mapButtonRecovered.classList.add('button-recovered');
                mapButtonRecovered.innerText = 'Recovered';

                mapButtonCases.addEventListener('click', () => {
                    this.mapParam = 'cases';
                    mapButtonDeaths.classList.toggle('button-clicked', this.mapParam === 'deaths');
                    mapButtonCases.classList.toggle('button-clicked', this.mapParam === 'cases');
                    mapButtonRecovered.classList.toggle('button-clicked', this.mapParam === 'recovered');
                    this.handleMapParamChange();
                });

                mapButtonDeaths.addEventListener('click', () => {
                    this.mapParam = 'deaths';
                    mapButtonDeaths.classList.toggle('button-clicked', this.mapParam === 'deaths');
                    mapButtonCases.classList.toggle('button-clicked', this.mapParam === 'cases');
                    mapButtonRecovered.classList.toggle('button-clicked', this.mapParam === 'recovered');
                    this.handleMapParamChange();
                });

                mapButtonRecovered.addEventListener('click', () => {
                    this.mapParam = 'recovered';
                    mapButtonDeaths.classList.toggle('button-clicked', this.mapParam === 'deaths');
                    mapButtonCases.classList.toggle('button-clicked', this.mapParam === 'cases');
                    mapButtonRecovered.classList.toggle('button-clicked', this.mapParam === 'recovered');
                    this.handleMapParamChange();
                });

                mapButtonWrapper.append(mapButtonCases);
                mapButtonWrapper.append(mapButtonDeaths);
                mapButtonWrapper.append(mapButtonRecovered);

                mapWrapper.append(mapButtonWrapper);
                dasboardMainInfo.append(mapWrapper);

                const dashboardMainTable = createElement('div');
                dashboardMainTable.classList.add('dashboard-main__table');

                dashboardMainTable.append(this.mainTable.createElement());

                dashboardMain.append(dasboardMainInfo);
                dashboardMain.append(dashboardMainTable);
                dashboardMain.append(buttonWrapper);

                const dashboardCountry = createElement('div');
                dashboardCountry.classList.add('dashboard-country');

                const countryDate = new CountryDate(dataService.getDate());

                const dashboardCountryTable = createElement('div');
                dashboardCountryTable.classList.add('dashboard-country__table');
                dashboardCountryTable.append(this.countryTable.createElement());

                const buttonCountryWrapper = createElement('div');
                buttonCountryWrapper.classList.add('button-wrapper');

                const buttonCases = createElement('div');
                buttonCases.classList.add('button-cases');
                buttonCases.innerText = 'All Cases';

                const buttonDeaths = createElement('div');
                buttonDeaths.classList.add('button-deaths');
                buttonDeaths.innerText = 'Deaths';

                const buttonRecovered = createElement('div');
                buttonRecovered.classList.add('button-recovered');
                buttonRecovered.innerText = 'Recovered';

                buttonCases.addEventListener('click', () => {
                    this.countryParam = 'cases';
                    buttonDeaths.classList.toggle('button-clicked', this.countryParam === 'deaths');
                    buttonCases.classList.toggle('button-clicked', this.countryParam === 'cases');
                    buttonRecovered.classList.toggle('button-clicked', this.countryParam === 'recovered');
                    this.handleCountryParamChange();
                });

                buttonDeaths.addEventListener('click', () => {
                    this.countryParam = 'deaths';
                    buttonDeaths.classList.toggle('button-clicked', this.countryParam === 'deaths');
                    buttonCases.classList.toggle('button-clicked', this.countryParam === 'cases');
                    buttonRecovered.classList.toggle('button-clicked', this.countryParam === 'recovered');
                    this.handleCountryParamChange();
                });

                buttonRecovered.addEventListener('click', () => {
                    this.countryParam = 'recovered';
                    buttonDeaths.classList.toggle('button-clicked', this.countryParam === 'deaths');
                    buttonCases.classList.toggle('button-clicked', this.countryParam === 'cases');
                    buttonRecovered.classList.toggle('button-clicked', this.countryParam === 'recovered');
                    this.handleCountryParamChange();
                });

                buttonCountryWrapper.append(buttonCases);
                buttonCountryWrapper.append(buttonDeaths);
                buttonCountryWrapper.append(buttonRecovered);

                dashboardCountry.append(countryDate.createElement());
                dashboardCountry.append(dashboardCountryTable);
                dashboardCountry.append(buttonCountryWrapper);

                dashboard.append(dashboardMain);
                dashboard.append(dashboardCountry);

                this.map.initializeMap(this.isChecked100, this.isCheckedNew, this.mapParam);

                mapButtonCases.click();
                buttonCases.click();
                totalButton.click();
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
            this.mainTable.createRows(this.isChecked100, this.isCheckedNew);
            this.countryTable.createRows(this.isChecked100, this.isCheckedNew, this.countryParam);
            this.map.showCountry(country);
        } else {
            this.country = country;
            this.mainTable.showRow(this.country, this.isChecked100, this.isCheckedNew);
            this.countryTable.showRow(
                this.country,
                this.isChecked100,
                this.isCheckedNew,
                this.countryParam,
            );
            this.map.showCountry(this.country, this.isChecked100, this.isCheckedNew);
        }
    }

    handle100k() {
        this.isChecked100 = !this.isChecked100;
        if (this.country) {
            this.mainTable.showRow(this.country, this.isChecked100, this.isCheckedNew);
            this.countryTable.showRow(
                this.country,
                this.isChecked100,
                this.isCheckedNew,
                this.countryParam,
            );
            this.map.createMarkers(this.isChecked100, this.isCheckedNew, this.mapParam);
        } else {
            this.mainTable.createRows(this.isChecked100, this.isCheckedNew);
            this.countryTable.createRows(this.isChecked100, this.isCheckedNew, this.countryParam);
            this.map.createMarkers(this.isChecked100, this.isCheckedNew, this.mapParam);
        }
    }

    handleNew() {
        if (this.country) {
            this.mainTable.showRow(this.country, this.isChecked100, this.isCheckedNew);
            this.countryTable.showRow(
                this.country,
                this.isChecked100,
                this.isCheckedNew,
                this.countryParam,
            );
            this.map.createMarkers(this.isChecked100, this.isCheckedNew, this.mapParam);
        } else {
            this.mainTable.createRows(this.isChecked100, this.isCheckedNew);
            this.countryTable.createRows(this.isChecked100, this.isCheckedNew, this.countryParam);
            this.map.createMarkers(this.isChecked100, this.isCheckedNew, this.mapParam);
        }
    }

    handleCountryParamChange() {
        if (this.country) {
            this.countryTable.showRow(
                this.country,
                this.isChecked100,
                this.isCheckedNew,
                this.countryParam,
            );
        } else {
            this.countryTable.createRows(this.isChecked100, this.isCheckedNew, this.countryParam);
        }
    }

    handleMapParamChange() {
        this.map.createMarkers(this.isChecked100, this.isCheckedNew, this.mapParam);
    }
}

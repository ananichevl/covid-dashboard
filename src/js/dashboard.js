import createElement from './domElementFactory';
import DataService from './data';
import Header from './header';
import TableDataCountries from './tableDataCountries';
import DataCountry from './dataCountry';

export default class Dashboard {
    static createElement() {
        const dashboard = createElement('div');

        (async () => {
            const dataService = new DataService('https://api.covid19api.com/summary');
            try {
                await dataService.getContent();
                const header = new Header(dataService);
                dashboard.append(header.createElement());
                const dataCountry = new DataCountry();
                const countryTable = dataCountry.createdataCountryTable();

                const checkbox100 = createElement('input');
                checkbox100.setAttribute('type', 'checkbox');

                const checkboxNew = createElement('input');
                checkboxNew.setAttribute('type', 'checkbox');

                const tableDataCountries = new TableDataCountries(
                    dataService,
                    dataCountry,
                    checkbox100.checked,
                    checkboxNew.checked,
                );

                checkbox100.addEventListener('click', () => tableDataCountries.check100(checkbox100.checked));
                checkboxNew.addEventListener('click', () => tableDataCountries.checkNew(checkboxNew.checked));

                dashboard.append(checkbox100);
                dashboard.append(checkboxNew);
                dashboard.append(tableDataCountries.createTable());
                dashboard.append(countryTable);
            } catch (error) {
                console.log(error);
            }
        })();
        return dashboard;
    }
}

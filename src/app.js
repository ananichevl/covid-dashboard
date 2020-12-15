import './scss/base.scss';
import Table from './js/table';
import DataService from './js/data';

window.addEventListener('DOMContentLoaded', () => {
    const table = new Table('EXAMPLE TEXT');
    document.body.appendChild(table.createElement());
});

const date = document.createElement('div');
const totalAmountConfirmed = document.createElement('div');
const totalDeaths = document.createElement('div');
const totalAmountRecovered = document.createElement('div');
const amountConfirmedPerDay = document.createElement('div');
const amountDeathsPerDay = document.createElement('div');
const amountRecoveredPerDay = document.createElement('div');

document.body.append(date);
document.body.append(totalAmountConfirmed);
document.body.append(totalDeaths);
document.body.append(totalAmountRecovered);
document.body.append(amountConfirmedPerDay);
document.body.append(amountDeathsPerDay);
document.body.append(amountRecoveredPerDay);

function createElement(el, child, ...dataAttr) {
    let elem = null;
    try {
        elem = document.createElement(el);
    } catch (error) {
        throw new Error('Unable to create HTML element');
    }

    if (child && Array.isArray(child)) {
        child.forEach((childEl) => childEl && elem.appendChild(document.createElement(child[0])));
    } else if (child && typeof child === 'string') {
        elem.appendChild(document.createElement(child));
    }

    if (dataAttr.length) {
        dataAttr.forEach(([attrName, attrValue]) => {
            if (attrValue === '') {
                elem.setAttribute(attrName, '');
            }
            if (attrName.match(/value|id|placeholder|cols|rows|autocorrect|spellcheck|src/)) {
                elem.setAttribute(attrName, attrValue);
            } else {
                elem.dataset[attrName] = attrValue;
            }
        });
    }

    return elem;
}

const selectGlobally = createElement('select', ['option', 'option', 'option']);
document.body.append(selectGlobally);

const tableCountries = createElement('table');
document.body.append(tableCountries);

(async () => {
    const dataService = new DataService('https://api.covid19api.com/summary');
    try {
        let currentDate = await dataService.getDate();
        currentDate = await dataService.getDate();
        currentDate = await dataService.getDate();
        currentDate = await dataService.getDate();
        const totalCases = await dataService.getTotalCases();
        const globalDeaths = await dataService.getTotalDeaths();
        const totalRecovered = await dataService.getTotalRecovered();
        const confirmedPerDay = await dataService.getCasesPerDay();
        const deathsPerDay = await dataService.getDeathsPerDay();
        const recoveredPerDay = await dataService.getRecoveredPerDay();
        date.append(`Last Updated at: ${currentDate}`);
        totalAmountConfirmed.append(`Global Cases: ${totalCases}`);
        totalDeaths.append(`Global Deaths: ${globalDeaths}`);
        totalAmountRecovered.append(`Global Recovered: ${totalRecovered}`);
        amountConfirmedPerDay.append(`Cases confirmed per the last day: ${confirmedPerDay}`);
        amountDeathsPerDay.append(`Deaths per the last day: ${deathsPerDay}`);
        amountRecoveredPerDay.append(`Recoveries per the last day: ${recoveredPerDay}`);
        const countriesList = await dataService.getCountriesList();

        for (let i = 0; i < countriesList.length; i += 1) {
            const row = tableCountries.insertRow(i);
            const header = tableCountries.createTHead();
            header.innerHTML = 'Total Cases';
            const cellTotalCases = row.insertCell(0);
            const cellDailyCases = row.insertCell(1);
            const cellTotalDeaths = row.insertCell(2);
            const cellCountry = row.insertCell(3);
            cellTotalCases.innerHTML = countriesList[i].TotalConfirmed;
            cellDailyCases.innerHTML = countriesList[i].NewConfirmed;
            cellTotalDeaths.innerHTML = countriesList[i].TotalDeaths;
            cellCountry.innerHTML = countriesList[i].Country;
        }
    } catch (error) {
        console.log(error);
    }
})();

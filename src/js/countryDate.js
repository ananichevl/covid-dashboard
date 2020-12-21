import createElement from './domElementFactory';

export default class CountryDate {
    date;

    constructor(date) {
        this.date = date;
    }

    createElement() {
        const dashboardCountryDate = createElement('div');
        dashboardCountryDate.classList.add('dashboard-country__date');

        const title = createElement('span');
        title.classList.add('title');
        title.innerText = 'Last Updated at (M/D/YYYY)';

        const dateText = createElement('span');
        dateText.classList.add('date-text');
        dateText.innerText = this.date;

        dashboardCountryDate.append(title);
        dashboardCountryDate.append(dateText);

        return dashboardCountryDate;
    }
}

import createElement from './domElementFactory';
import Keyboard from './keyboard';

export default class Search {
    searchListUl;

    countries;

    input;

    selectCountry;

    keyboard;

    constructor(countries, dashboard, selectCountry) {
        this.countries = countries;
        this.selectCountry = selectCountry.bind(dashboard);
    }

    createElement() {
        const dashboardHeaderSearch = createElement('div');
        dashboardHeaderSearch.classList.add('dashboard-header__search');

        this.input = createElement('input');
        this.input.type = 'text';
        this.input.placeholder = 'Search by country';
        this.input.addEventListener('keyup', () => this.filterList());
        this.input.addEventListener('focusout', () => this.handleFocusOut());
        this.input.addEventListener('focus', () => this.handleFocus());

        const searchList = createElement('div');
        searchList.classList.add('search-list');

        this.searchListUl = createElement('ul');

        for (let i = 0; i < this.countries.length; i += 1) {
            const item = createElement('li');
            item.innerText = this.countries[i].Country;
            item.style.display = 'none';
            item.addEventListener('mousedown', () => this.handleListClick(this.countries[i]));

            this.searchListUl.append(item);
        }

        searchList.append(this.searchListUl);

        dashboardHeaderSearch.append(this.input);
        dashboardHeaderSearch.append(searchList);
        this.keyboard = new Keyboard(this.input);

        dashboardHeaderSearch.append(this.keyboard.createElement());

        return dashboardHeaderSearch;
    }

    handleFocus() {
        this.filterList();
        this.keyboard.open();
    }

    handleListClick(country) {
        this.input.value = country.Country;
        this.selectCountry(country);
    }

    handleFocusOut() {
        for (let i = 0; i < this.searchListUl.childNodes.length; i += 1) {
            this.searchListUl.childNodes[i].style.display = 'none';
        }
        this.keyboard.close();
    }

    filterList() {
        for (let i = 0; i < this.searchListUl.childNodes.length; i += 1) {
            const value = this.searchListUl.childNodes[i].innerText.toLowerCase();
            if (value.indexOf(this.input.value.toLowerCase()) > -1
                && this.input.value.toLowerCase()
            ) {
                this.searchListUl.childNodes[i].style.display = '';
            } else {
                this.searchListUl.childNodes[i].style.display = 'none';
            }
        }
    }
}

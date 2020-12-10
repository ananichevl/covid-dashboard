export default class Table {
    // example
    text;

    constructor(text) {
        this.text = text;
    }

    createElement() {
        const table = document.createElement('div');
        table.classList.add('table-class');
        table.innerText = this.text;

        return table;
    }
}

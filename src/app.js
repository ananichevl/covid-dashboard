import './scss/base.scss';
import Table from "./js/table";

window.addEventListener('DOMContentLoaded', () => {
    const table = new Table('EXAMPLE TEXT');
    document.body.appendChild(table.createElement());
});

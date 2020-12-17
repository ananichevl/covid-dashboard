import './scss/base.scss';
import Dashboard from './js/dashboard';

window.addEventListener('DOMContentLoaded', () => {
    document.body.append(Dashboard.createElement());
});

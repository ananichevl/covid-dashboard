import './scss/base.scss';
import Dashboard from './js/dashboard';

window.addEventListener('DOMContentLoaded', () => {
    const dashboard = new Dashboard();
    document.body.append(dashboard.createElement());
});

export default class Header {
    dataService;

    constructor(dataService) {
        this.dataService = dataService;
    }

    createElement() {
        const header = document.createElement('div');
        const date = document.createElement('div');
        const totalAmountConfirmed = document.createElement('div');
        const totalDeaths = document.createElement('div');
        const totalAmountRecovered = document.createElement('div');
        const amountConfirmedPerDay = document.createElement('div');
        const amountDeathsPerDay = document.createElement('div');
        const amountRecoveredPerDay = document.createElement('div');

        const currentDate = this.dataService.getDate();
        const totalCases = this.dataService.getTotalCases();
        const globalDeaths = this.dataService.getTotalDeaths();
        const totalRecovered = this.dataService.getTotalRecovered();
        const confirmedPerDay = this.dataService.getCasesPerDay();
        const deathsPerDay = this.dataService.getDeathsPerDay();
        const recoveredPerDay = this.dataService.getRecoveredPerDay();

        date.append(`Last Updated at: ${currentDate}`);
        totalAmountConfirmed.append(`Global Cases: ${totalCases}`);
        totalDeaths.append(`Global Deaths: ${globalDeaths}`);
        totalAmountRecovered.append(`Global Recovered: ${totalRecovered}`);
        amountConfirmedPerDay.append(`Cases confirmed per the last day: ${confirmedPerDay}`);
        amountDeathsPerDay.append(`Deaths per the last day: ${deathsPerDay}`);
        amountRecoveredPerDay.append(`Recoveries per the last day: ${recoveredPerDay}`);

        header.append(date);
        header.append(totalAmountConfirmed);
        header.append(totalDeaths);
        header.append(totalAmountRecovered);
        header.append(amountConfirmedPerDay);
        header.append(amountDeathsPerDay);
        header.append(amountRecoveredPerDay);

        header.style = 'display:none';
        return header;
    }
}

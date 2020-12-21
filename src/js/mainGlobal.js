import createElement from './domElementFactory';

export default class MainGlobal {
    globalCases;

    constructor(globalCases) {
        this.globalCases = globalCases;
    }

    createElement() {
        const mainGlobal = createElement('div');
        mainGlobal.classList.add('main__global');

        const title = createElement('span');
        title.classList.add('title');
        title.innerText = 'Total cases';

        const globalText = createElement('span');
        globalText.classList.add('global-text');
        globalText.innerText = this.globalCases;

        mainGlobal.append(title);
        mainGlobal.append(globalText);

        return mainGlobal;
    }
}

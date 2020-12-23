import backspaceSound from '../assets/scissors.wav';
import capsSound from '../assets/caps.wav';
import enterSound from '../assets/boom.wav';
import spaceSound from '../assets/space.wav';
import shiftSound from '../assets/shift.wav';
import sound from '../assets/keyboard.wav';
import ruSound from '../assets/ru_keyboard.wav';

const digitSymbols = {
    1: '!',
    2: '@',
    3: '#',
    4: '$',
    5: '%',
    6: '^',
    7: '&',
    8: '*',
    9: '(',
    0: ')',
    '[': '{',
    ']': '}',
    ',': '<',
    '.': '>',
    '/': '?',
    ';': ':',
    '\'': '"',
    '\\': '|',
};

const alphabetSymbols = {
    q: 'й',
    w: 'ц',
    e: 'у',
    r: 'к',
    t: 'е',
    y: 'н',
    u: 'г',
    i: 'ш',
    o: 'щ',
    p: 'з',
    '[': 'х',
    ']': 'ъ',
    a: 'ф',
    s: 'ы',
    d: 'в',
    f: 'а',
    g: 'п',
    h: 'р',
    j: 'о',
    k: 'л',
    l: 'д',
    ';': 'ж',
    '\'': 'э',
    '\\': 'ё',
    z: 'я',
    x: 'ч',
    c: 'с',
    v: 'м',
    b: 'и',
    n: 'т',
    m: 'ь',
    ',': 'б',
    '.': 'ю',
    '/': '/',
    '{': 'Х',
    '}': 'Ъ',
    ':': 'Ж',
    '"': 'Э',
    '|': 'Ё',
    '<': 'Б',
    '>': 'Ю',
};

const audioBackspace = new Audio(backspaceSound);
const audioCaps = new Audio(capsSound);
const audioEnter = new Audio(enterSound);
const audioSpace = new Audio(spaceSound);
const audioShift = new Audio(shiftSound);
const audio = new Audio(sound);
const audioRu = new Audio(ruSound);

export default class Keyboard {
    elements = {
        main: null,
        keysContainer: null,
        keys: [],
    };

    input = '';

    capsLock = false;

    shift = false;

    language = 'en';

    sound = false;

    keyboardInput;

    constructor(keyboardInput) {
        this.keyboardInput = keyboardInput;
        console.log(this.keyboardInput);
    }

    createElement() {
        this.elements.main = document.createElement('div');
        const keysContainer = document.createElement('div');

        this.elements.main.classList.add('keyboard', 'keyboard--hidden');
        keysContainer.classList.add('keyboard__keys');
        keysContainer.appendChild(this.createKeys());

        this.elements.keys = keysContainer.querySelectorAll('.keyboard__key');

        this.elements.main.appendChild(keysContainer);

        return this.elements.main;
    }

    createKeys() {
        const fragment = document.createDocumentFragment();
        const keyLayout = [
            'sound', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'backspace',
            'en', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']',
            'caps', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', '\'', '\\', 'enter',
            'shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', 'done',
            'space', 'left', 'right',
        ];

        const createIconHTML = (iconName) => `<i class="material-icons">${iconName}</i>`;

        keyLayout.forEach((key) => {
            const keyElement = document.createElement('span');
            const insertLineBreak = ['backspace', ']', 'enter', 'done'].indexOf(key) !== -1;

            keyElement.classList.add('keyboard__key');

            switch (key) {
            case 'backspace':
                keyElement.classList.add('keyboard__key--wide');
                keyElement.innerHTML = createIconHTML('backspace');

                keyElement.addEventListener('click', () => {
                    if (this.sound) {
                        audioBackspace.currentTime = 7.6;
                        audioBackspace.play();

                        setTimeout(() => audioBackspace.pause(), 350);
                    }

                    const position = this.keyboardInput.selectionStart;
                    this.input = [this.input.substring(0, position - 1), this.input.substring(position)].join('');
                    this.keyboardInput.value = this.input;
                    this.keyboardInput.focus();
                    this.keyboardInput.selectionEnd = position - 1;
                });
                break;
            case 'caps':
                keyElement.classList.add('keyboard__key--wide', 'keyboard__key--activatable');

                keyElement.addEventListener('click', () => {
                    if (this.sound) {
                        audioCaps.currentTime = 0;
                        audioCaps.play();

                        setTimeout(() => audioCaps.pause(), 350);
                    }

                    this.handleCapsLockClick();
                    keyElement.classList.toggle('keyboard__key--active', this.capsLock);
                    this.keyboardInput.focus();
                });

                break;
            case 'sound':
                keyElement.classList.add('keyboard__key--wide', 'keyboard__key--activatable');

                keyElement.addEventListener('click', () => {
                    this.handleSoundClick();
                    keyElement.classList.toggle('keyboard__key--active', this.sound);
                    this.keyboardInput.focus();
                });

                break;

            case 'enter':
                keyElement.classList.add('keyboard__key--wide');
                keyElement.addEventListener('click', () => {
                    if (this.sound) {
                        audioEnter.currentTime = 0;
                        audioEnter.play();

                        setTimeout(() => audioEnter.pause(), 350);
                    }

                    const position = this.keyboardInput.selectionStart;
                    this.input = [this.input.slice(0, position), '\n', this.input.slice(position)].join('');
                    this.keyboardInput.value = this.input;
                    this.keyboardInput.focus();
                    this.keyboardInput.selectionEnd = position + 1;
                });
                break;

            case 'space':
                keyElement.classList.add('keyboard__key--extra-wide');
                keyElement.addEventListener('click', () => {
                    if (this.sound) {
                        audioSpace.currentTime = 0;
                        audioSpace.play();

                        setTimeout(() => audioSpace.pause(), 350);
                    }

                    const position = this.keyboardInput.selectionStart;
                    this.input = [this.input.slice(0, position), ' ', this.input.slice(position)].join('');
                    this.keyboardInput.value = this.input;
                    this.keyboardInput.focus();
                    this.keyboardInput.selectionEnd = position + 1;
                });
                break;

            case 'done':
                keyElement.classList.add('keyboard__key--wide', 'keyboard__key--dark');
                keyElement.addEventListener('click', () => {
                    this.close();
                });
                break;
            case 'shift':
                keyElement.classList.add('keyboard__key--wide', 'keyboard__key--activatable');
                keyElement.addEventListener('click', () => {
                    if (this.sound) {
                        audioShift.currentTime = 0;
                        audioShift.play();

                        setTimeout(() => audioShift.pause(), 350);
                    }

                    this.handleShiftClick();
                    keyElement.classList.toggle('keyboard__key--active', this.shift);
                    this.keyboardInput.focus();
                });

                break;
            case 'en':
                keyElement.classList.add('keyboard__key--wide');
                keyElement.addEventListener('click', () => {
                    this.handleEnClick();
                    this.keyboardInput.focus();
                });

                break;
            case 'left':
                keyElement.classList.add('keyboard__key--wide');
                keyElement.addEventListener('click', () => {
                    this.keyboardInput.focus();
                    this.keyboardInput.selectionEnd -= 1;
                });
                break;
            case 'right':
                keyElement.classList.add('keyboard__key--wide');
                keyElement.addEventListener('click', () => {
                    this.keyboardInput.focus();
                    this.keyboardInput.selectionStart += 1;
                });
                break;
            default:
                keyElement.dataset.key = key.charCodeAt(0);

                keyElement.textContent = key.toLowerCase();
                keyElement.addEventListener('click', () => {
                    const position = this.keyboardInput.selectionStart;

                    if (Object.keys(alphabetSymbols)
                        .includes(key)) {
                        if (this.language === 'en') {
                            if (this.sound) {
                                audio.currentTime = 0;
                                audio.play();

                                setTimeout(() => audio.pause(), 350);
                            }

                            if (key.match('[a-zA-Z]')) {
                                const addition = (this.capsLock ? !this.shift : this.shift)
                                    ? key.toUpperCase()
                                    : key.toLowerCase();
                                this.input = [this.input.slice(0, position), addition, this.input.slice(position)].join('');
                            } else {
                                const addition = this.shift ? digitSymbols[key] : key;
                                this.input = [this.input.slice(0, position), addition, this.input.slice(position)].join('');
                            }
                        } else {
                            if (this.sound) {
                                audioRu.currentTime = 0;
                                audioRu.play();

                                setTimeout(() => audioRu.pause(), 350);
                            }

                            const addition = (this.capsLock ? !this.shift : this.shift)
                                ? alphabetSymbols[key.toLowerCase()].toUpperCase()
                                : alphabetSymbols[key.toLowerCase()].toLowerCase();
                            this.input = [this.input.slice(0, position), addition, this.input.slice(position)].join('');
                        }
                    } else {
                        if (this.sound) {
                            audio.currentTime = 0;
                            audio.play();

                            setTimeout(() => audio.pause(), 350);
                        }

                        const addition = this.shift ? digitSymbols[key] : key;
                        this.input = [this.input.slice(0, position), addition, this.input.slice(position)].join('');
                    }
                    this.keyboardInput.value = this.input;
                    this.keyboardInput.focus();
                    this.keyboardInput.selectionEnd = position + 1;
                });
                break;
            }

            keyElement.textContent = key.toLowerCase();

            fragment.appendChild(keyElement);

            if (insertLineBreak) {
                fragment.appendChild(document.createElement('br'));
            }
        });

        return fragment;
    }

    open() {
        this.elements.main.classList.remove('keyboard--hidden');
    }

    close() {
        this.elements.main.classList.add('keyboard--hidden');
    }

    handleCapsLockClick() {
        this.capsLock = !this.capsLock;
        for (let i = 0; i < this.elements.keys.length; i += 1) {
            if (this.elements.keys[i].textContent.match('[a-zA-Zа-яА-ЯёЁ]') && this.elements.keys[i].textContent.length === 1) {
                this.elements.keys[i].textContent = (this.capsLock ? !this.shift : this.shift)
                    ? this.elements.keys[i].textContent.toUpperCase()
                    : this.elements.keys[i].textContent.toLowerCase();
            }
        }
    }

    handleSoundClick() {
        this.sound = !this.sound;
    }

    handleShiftClick() {
        this.shift = !this.shift;

        for (let i = 0; i < this.elements.keys.length; i += 1) {
            if (this.elements.keys[i].textContent.match('[a-zA-Zа-яА-ЯёЁ]') && this.elements.keys[i].textContent.length === 1) {
                this.elements.keys[i].textContent = (this.capsLock ? !this.shift : this.shift)
                    ? this.elements.keys[i].textContent.toUpperCase()
                    : this.elements.keys[i].textContent.toLowerCase();
            }

            Object.entries(digitSymbols)
                .forEach((entry) => {
                    if (entry[0] === this.elements.keys[i].textContent) {
                        [this.elements.keys[i].textContent] = [entry[1]];
                    } else if (entry[1] === this.elements.keys[i].textContent) {
                        [this.elements.keys[i].textContent] = [entry[0]];
                    }
                });
        }
    }

    handleEnClick() {
        if (this.language === 'en') {
            this.language = 'ru';
        } else {
            this.language = 'en';
        }

        for (let i = 0; i < this.elements.keys.length; i += 1) {
            if (this.elements.keys[i].textContent === 'en' || this.elements.keys[i].textContent === 'ru') {
                this.elements.keys[i].textContent = this.language;
            }

            Object.entries(alphabetSymbols)
                .forEach((entry) => {
                    if (entry[0] === this.elements.keys[i].textContent.toLowerCase()) {
                        this.elements.keys[i].textContent = (
                            this.capsLock ? !this.shift : this.shift
                        )
                            ? entry[1].toUpperCase()
                            : entry[1].toLowerCase();
                    } else if (entry[1] === this.elements.keys[i].textContent.toLowerCase()) {
                        this.elements.keys[i].textContent = (
                            this.capsLock ? !this.shift : this.shift
                        )
                            ? entry[0].toUpperCase()
                            : entry[0].toLowerCase();
                    }
                });
        }
    }
}

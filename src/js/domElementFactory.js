export default function createElement(el, child, ...dataAttr) {
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

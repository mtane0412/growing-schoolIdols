'use strict';

const schoolIdols = ['kotori', 'yo'];
const fragment = document.createDocumentFragment();

for (let i = 0; i < schoolIdols.length; i++) {
    const schoolIdol = schoolIdols[i];
    const img = document.createElement('img');
    img.setAttribute("src", chrome.extension.getURL(`img/${schoolIdol}128.png`));
    img.setAttribute("id", `${schoolIdol}`);
    chrome.storage.local.get([`${schoolIdol}`], (items) => {
        if (!items[`${schoolIdol}`]) {
            img.setAttribute("data-growing", 'true');
        } else {
            img.setAttribute("data-growing", items[`${schoolIdol}`]);
        }
    });

    const storage = {};
    storage[`${schoolIdol}`] = true;
    img.addEventListener('click', () => {
        const setObj = {};
        if (img.dataset.growing === 'false') {
            img.dataset.growing = 'true'
            setObj[`${schoolIdol}`] = 'true';
            chrome.storage.local.set(setObj);
        } else {
            img.dataset.growing = 'false'
            setObj[`${schoolIdol}`] = 'false';
            chrome.storage.local.set(setObj);
        }
        chrome.storage.local.get(null, function (items) {
            console.log(items);
        });
    })
    fragment.appendChild(img);
}

const div = document.getElementById('list');
div.appendChild(fragment);
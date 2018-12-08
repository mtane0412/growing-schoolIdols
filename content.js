'use strict';

const schoolIdols = ['kotori', 'yo'];
const fragment = document.createDocumentFragment();

const createImage = (schoolIdol) => {
    const img = document.createElement('img');
    img.classList.add('growing');
    img.setAttribute("id", `growing-${schoolIdol}`);
    img.setAttribute("src", chrome.extension.getURL(`img/${schoolIdol}.png`) + `?` + new Date().getTime());
    chrome.storage.local.get([`${schoolIdol}`], (item) => {
        img.setAttribute("data-growing", item[`${schoolIdol}`]);
    });
    img.addEventListener('click', () => {
        img.classList.add('growing-hide');
    });
    return img;
}

for (let i = 0; i < schoolIdols.length; i++) {
    let schoolIdol = schoolIdols[i];
    const img = createImage(schoolIdol);
    fragment.appendChild(img);
}


const growing = () => {
    console.log('ちゅんちゅん');
    console.log('ヨーソロー！');
    document.body.appendChild(fragment);
};


chrome.storage.onChanged.addListener(changes => {
    for (let schoolIdol in changes) {
        try {
            const img = document.getElementById(`growing-${schoolIdol}`);
            if (changes[schoolIdol].oldValue === 'false') {
                img.parentNode.removeChild(img);
                const newImg = createImage(schoolIdol);
                document.body.appendChild(newImg);
                console.log('regenerated');
            } else {
                img.setAttribute("data-growing", changes[schoolIdol].newValue);
                console.log(`Changed: ${schoolIdol} --> ${changes[schoolIdol].newValue}`);
            }
        } catch (TypeError) {
            fragment.getElementById(`growing-${schoolIdol}`).setAttribute("data-growing", changes[schoolIdol].newValue);
            console.log(`Changed: ${schoolIdol} --> ${changes[schoolIdol].newValue}`);
        }
    }
});


window.onload = () => {
    // スクロールさせる要素を取得
    let scrolled = false;

    const body = document.body;
    // 要素の表示領域を取得
    const height = window.innerHeight;

    body.onscroll = () => {
        // 要素のスクロール分を含めた高さを取得
        const scrollHeight = body.scrollHeight;
        // 要素のスクロール位置を取得
        const scrollTop = document.documentElement.scrollTop;
        // 現在の表示位置の高さ 
        const scrollPosition = height + scrollTop;
        // どれだけ近づいたかを判断する値
        // 0に近いほど、スクロールの最終が近い
        const proximity = 0;

        if ((scrollHeight - scrollPosition) / scrollHeight <= proximity) {
            if (!scrolled) setTimeout(growing, 1000);
            scrolled = true;
        }
    }
}
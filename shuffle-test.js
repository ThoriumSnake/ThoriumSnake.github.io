var ul = document.getElementById('testul');

function shuffle(parent) {
    for (var i = parent.children.length; i >= 0; i--) {
        parent.appendChild(parent.children[Math.random() * i | 0]);
    }
}

let count = {};

for (let i = 0; i < 600000; i++) {
    shuffle(ul);

    const res = Array.from(ul.children, ({ textContent }) => textContent.trim()).filter(Boolean).join('');

    if (res in count)
        count[res]++;
    else
        count[res] = 0;
}

for (let key in count) {
    console.log(`${key}: ${count[key]}`);
}

console.log(typeof count);

document.getElementById("test-shuffle-button").addEventListener("click", () => {
    //Tests like this should be done with small arrays, as the amount of combinations for an array is the factorial of the length, so the amount of combinations for a playlist of 789 items would be so big even a million iterations would each result in an unique order, which would make a bias test useless
    let elArray = [...document.getElementsByClassName("playlist-item")].slice(0, 5);
    let count = [];

    for (let i = 0; i < 1000000; i++) {
        shuffle(elArray);

        let exists = false;
        for (let j = 0; j < count.length; j++) {
            if (arraysEqual(elArray, count[j].items)) {
                count[j].count += 1;
                exists = true;
                break;
            }
        }

        if (!exists) {
            count.push({
                items: elArray.slice(),
                count: 1
            });

        }

    }

    for (let i = 0; i < count.length; i++) {
        console.log(`Order ${i + 1}: ${count[i].count}`);
    }

    // console.log(count);
});


function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1)); // random index from 0 to i

        // swap elements array[i] and array[j]
        // we use "destructuring assignment" syntax to achieve that
        // you'll find more details about that syntax in later chapters
        // same can be written as:
        // let t = array[i]; array[i] = array[j]; array[j] = t
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function arraysEqual(a, b) {
    // if (a === b) return true;
    if (a == null || b == null) return false;
    if (a.length !== b.length) return false;

    // If you don't care about the order of the elements inside
    // the array, you should sort both arrays here.
    // Please note that calling sort on an array will modify that array.
    // you might want to clone your array first.

    for (var i = 0; i < a.length; ++i) {
        if (a[i] !== b[i]) return false;
    }
    return true;
}

// var ul = document.getElementById('testul');

// function shuffle(parent) {
//     for (var i = parent.children.length; i >= 0; i--) {
//         parent.appendChild(parent.children[Math.random() * i | 0]);
//     }
// }

// let count = {};

// for (let i = 0; i < 600000; i++) {
//     shuffle(ul);

//     const res = Array.from(ul.children, ({ textContent }) => textContent.trim()).filter(Boolean).join('');

//     if (res in count)
//         count[res]++;
//     else
//         count[res] = 0;
// }

// for (let key in count) {
//     console.log(`${key}: ${count[key]}`);
// }

// console.log(typeof count);

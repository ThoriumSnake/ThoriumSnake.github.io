import { playlistItemElements } from "./playlist-panel.js";
export { shuffleButton };

const shuffleButton = document.getElementById("shuffle-button");
shuffleButton.disabled = true;

shuffleButton.addEventListener("click", () => {
    shuffle(playlistItemElements);

    let numberOfContainers = playlistItemElements.length / maxElementsPerPage;

    for (let i = 0; i < numberOfContainers; i++) {
        let items = [];

        for (let j = 0; j < maxElementsPerPage; j++) {
            let item = playlistItemElements[j + (i * maxElementsPerPage)];
            //Doing this for pages with less than 50 items
            if (typeof item == "undefined")
                break;

            items[j] = item;
        }

        const pageContainer = document.querySelector(`div[data-page-number="${i + 1}"]`);
        //Expanding with spread operator
        pageContainer.replaceChildren(...items);
    }
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

function test_shuffle() {
    let count = {
    };

    for (let i = 0; i < 600000; i++) {
        let array = [1, 2, 3, 4, 5];
        shuffle(array);
        // count[array.join('')]++;
        if (array.join('') in count)
            count[array.join('')]++;
        else
            count[array.join('')] = 0;
    }

    for (let key in count) {
        console.log(`${key}: ${count[key]}`);
    }

    console.log(typeof count);
}

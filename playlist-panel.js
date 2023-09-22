//Try it the shitty way, think about performance later
//Array of all videos, shift 'em, make brand new pages from that

//TODO
//Make left and right buttons work
//Limit displayed pagination buttons to 5(?)
//Add playlist element moving (later tho, gonna need to add playlist updating)
//Style this ugly bitch

//Make an array of the playlist items' ELEMENTS, this way you can shuffle those instead of making new ones

//Code next video on video end

//Idea: random queue, basically get x random videos from the list (that haven't been played in a while)

//In case of failing to fetch new playlist keep showing old stuff

//If video is unavailable auto-skip (check if first vid is unavailable)

//Properly sized player, otherwise black bars show up

//Add loading bar for "Get playlist" and pagination

export { playlistItemElements, createFirstPage, createPlaylistPage };

const pageNumbersContainer = document.getElementById("page-number-cont");
const playlistPagesContainer = document.getElementById("playlist-pages-container");
const paginationContainer = document.getElementById("pagination-container");

let currentPageElement;
let pages = [];
let playlistItemElements = [];

function createFirstPage(videos) {
    pageNumbersContainer.innerHTML = "";
    playlistPagesContainer.innerHTML = ""; // Clear the video list if already present
    //Using this method of emptying as it's fast and has no side effects
    pages.length = 0;
    playlistItemElements.length = 0;

    player.cueVideoById({
        "videoId": videos[0].snippet.resourceId.videoId,
    })

    paginationContainer.classList.remove("invisible");

    createPlaylistPage(videos, 1);
    currentPageElement = pages[0];
    currentPageElement.style.display = "block";
}

function createPlaylistPage(videos, index) {
    if (!index || index < 1)
        throw new RangeError("Index must be one or higher!")

    const pageContainer = document.createElement("div");
    pageContainer.dataset.pageNumber = index;
    pageContainer.classList.add("playlist-page");

    for (const video of videos) {
        const videoId = video.snippet.resourceId.videoId;
        const videoTitle = video.snippet.title;
        let itemElement = createPlaylistElement(videoId, videoTitle)

        pageContainer.appendChild(itemElement);
        playlistItemElements.push(itemElement);
    }

    pageContainer.style.display = "none";
    createPageButton(index);
    let childNode = playlistPagesContainer.appendChild(pageContainer)
    pages.push(childNode);
}

function createPlaylistElement(id, title) {
    const itemContainer = document.createElement("div");
    const titleElement = document.createElement("p");

    titleElement.textContent = title;
    itemContainer.dataset.videoId = id;
    itemContainer.classList.add("playlist-item");

    itemContainer.appendChild(titleElement);
    itemContainer.appendChild(document.createElement("br"));

    itemContainer.addEventListener("click", setVideo);

    return itemContainer;
}

function createPageButton(index) {
    const pageButton = document.createElement("li");
    pageButton.dataset.pageNumber = index;
    pageButton.textContent = index;
    pageButton.classList.add("page-button")
    pageButton.addEventListener("click", (event) => {
        setPage(event.target.dataset.pageNumber);
    })

    pageNumbersContainer.appendChild(pageButton);
}

function setPage(index) {
    currentPageElement.style.display = "none";

    // pageIndex = index;
    currentPageElement = pages[index - 1]

    currentPageElement.style.display = "block";
    console.log(pages);
    console.log(currentPageElement);
}

function setVideo() {
    player.loadVideoById({
        "videoId": this.dataset.videoId,
    })
}
//Try it the shitty way, think about performance later
//Array of all videos, shift 'em, make brand new pages from that

var playerDiv = document.getElementById("player");
var testButton = document.getElementById("test-button").addEventListener("click", (e) => {
    var src = playerDiv.src;
    playerDiv.src = src.concat("&controls=0");
    console.log(playerDiv.src);
});

var paginationContainer = document.getElementsByClassName("page-number-cont")[0];

var pageIndex = 1;
var currentPageElement;
var pages = [];

export function createFirstPage(videos) {
    const panelContainer = document.getElementById("videoList");

    paginationContainer.innerHTML = "";
    panelContainer.innerHTML = ""; // Clear the video list if already present
    player.cueVideoById({
        "videoId": videos[0].snippet.resourceId.videoId,
    })
    createPlaylistPage(videos, 1);
    currentPageElement = pages[0];
    currentPageElement.style.display = "block";
}

export function createPlaylistPage(videos, index) {
    if (!index || index < 1)
        throw new RangeError("Index must be one or higher!")

    const panelContainer = document.getElementById("videoList");

    var pageContainer = document.createElement("div");
    pageContainer.dataset.pageNumber = index;
    pageContainer.classList.add("playlist-page-cont");

    for (const video of videos) {

        const videoId = video.snippet.resourceId.videoId;
        const videoTitle = video.snippet.title;

        var itemContainer = document.createElement("div");
        var title = document.createElement("p");

        title.textContent = videoTitle;
        itemContainer.dataset.videoId = videoId;
        itemContainer.classList.add("playlist-item-cont");

        itemContainer.appendChild(title);
        itemContainer.appendChild(document.createElement("br"));

        itemContainer.addEventListener("click", setVideo);

        pageContainer.appendChild(itemContainer);
    }

    pageContainer.style.display = "none";
    createPageButton(index);
    pages.push(panelContainer.appendChild(pageContainer));
}

function createPageButton(index) {
    var pageButton = document.createElement("li");
    pageButton.dataset.pageNumber = index;
    pageButton.textContent = index;
    pageButton.classList.add("page-button")
    pageButton.addEventListener("click", (event) => {
        setPage(event.target.dataset.pageNumber);
    })

    paginationContainer.appendChild(pageButton);
}

function setPage(index) {
    currentPageElement.style.display = "none";

    pageIndex = index;
    currentPageElement = pages[index - 1]

    currentPageElement.style.display = "block";
    console.log(pages);
    console.log(currentPageElement);
}

function setVideo() {
    // playerDiv.setAttribute("src", this.dataset.url);

    // console.log(this.dataset.url);

    player.loadVideoById({
        "videoId": this.dataset.videoId,
    })
    console.log(playerDiv.src);
}
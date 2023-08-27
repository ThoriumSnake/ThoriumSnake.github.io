
var playerDiv = document.getElementById("player");
var testButton = document.getElementById("test-button").addEventListener("click", (e) => {
    var src = playerDiv.src;
    playerDiv.src = src.concat("&controls=0");
    console.log(playerDiv.src);
});


export function createFirstPage(videos) {
    const panelContainer = document.getElementById("videoList");

    if (videos) {
        panelContainer.innerHTML = ""; // Clear the video list if already present
        player.cueVideoById({
            "videoId": videos[0].snippet.resourceId.videoId,
        })
        createPlaylistPage(videos);
    }
    else {
        panelContainer.textContent = "No videos found, is the playlist empty?";
    }
}

export function createPlaylistPage(videos) {
    if (videos) {
        const panelContainer = document.getElementById("videoList");

        var pageContainer = document.createElement("div");
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

        panelContainer.appendChild(pageContainer);
    }
}

function setVideo() {
    // playerDiv.setAttribute("src", this.dataset.url);

    // console.log(this.dataset.url);

    player.loadVideoById({
        "videoId": this.dataset.videoId,
    })
    console.log(playerDiv.src);
}
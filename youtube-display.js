// var requestButton = document.getElementById("request-button");

// requestButton.addEventListener("click", (event) => {
//     execute();
// })

// var videoElement = document.getElementById("player");
var player = document.getElementById("player");

export function displayPlaylist(playlistItems) {
    const videoList = document.getElementById("videoList");
    videoList.innerHTML = ""; // Clear the video list if already present

    if (playlistItems) {
        player.setAttribute("src", `https://www.youtube.com/embed/${playlistItems[0].snippet.resourceId.videoId}`);

        for (const item of playlistItems) {
            const videoId = item.snippet.resourceId.videoId;
            const videoTitle = item.snippet.title;

            var itemContainer = document.createElement("div");
            var title = document.createElement("p");

            title.textContent = videoTitle;
            itemContainer.dataset.url = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
            itemContainer.classList.add("playlist-item-cont");

            itemContainer.appendChild(title);
            itemContainer.appendChild(document.createElement("br"));

            itemContainer.addEventListener("click", setVideo);

            videoList.appendChild(itemContainer);
        }
    }
    else {
        videoList.textContent = "No videos found in the playlist.";
    }

    function setVideo() {
        player.setAttribute("src", this.dataset.url);

        console.log(this.dataset.url);
        console.log(player.src);
    }
}
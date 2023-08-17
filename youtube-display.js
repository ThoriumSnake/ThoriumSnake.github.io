
var playerDiv = document.getElementById("player");
var testButton = document.getElementById("test-button").addEventListener("click", (e) => {
    var src = playerDiv.src;
    playerDiv.src = src.concat("&controls=0");
    console.log(playerDiv.src);
});


export function displayPlaylist(playlistItems) {
    const videoList = document.getElementById("videoList");

    if (playlistItems) {
        videoList.innerHTML = ""; // Clear the video list if already present
        // playerDiv.setAttribute("src", `https://www.youtube.com/embed/${playlistItems[0].snippet.resourceId.videoId}?autoplay=0`);
        player.loadVideoById({
            "videoId": playlistItems[0].snippet.resourceId.videoId,
        })
        player.pauseVideo();

        for (const item of playlistItems) {
            const videoId = item.snippet.resourceId.videoId;
            const videoTitle = item.snippet.title;

            var itemContainer = document.createElement("div");
            var title = document.createElement("p");

            title.textContent = videoTitle;
            itemContainer.dataset.videoId = videoId;
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
        // playerDiv.setAttribute("src", this.dataset.url);

        // console.log(this.dataset.url);

        player.loadVideoById({
            "videoId": this.dataset.videoId,
        })
        console.log(playerDiv.src);
    }
}
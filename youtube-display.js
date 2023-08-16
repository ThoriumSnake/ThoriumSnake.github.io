
var player = document.getElementById("player");
var testButton = document.getElementById("test-button").addEventListener("click", (e) => {
    var src = player.src;
    player.src = src.concat("&controls=0");
    console.log(player.src);
});


export function displayPlaylist(playlistItems) {
    const videoList = document.getElementById("videoList");

    if (playlistItems) {
        videoList.innerHTML = ""; // Clear the video list if already present
        player.setAttribute("src", `https://www.youtube.com/embed/${playlistItems[0].snippet.resourceId.videoId}?autoplay=0`);

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
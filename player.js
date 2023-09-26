import { currentVideoIndex, playlistItemElements, setCurrentVideoIndex } from "./playlist-panel.js";

//Adding these to window to make it available for global player
window.onPlayerReady = onPlayerReady;
window.onPlayerStateChange = onPlayerStateChange;
window.onPlayerError = onPlayerError;

let looping = true;

document.getElementById("loop-pl-button").addEventListener("click", () => {
    looping = !looping;
});


function onPlayerReady(event) {
}

function onPlayerStateChange(event) {
    if (player.getPlayerState() === YT.PlayerState.ENDED) {
        loadNextVideoInPlaylist(looping);
    }
}

function onPlayerError(event) {
    console.log("Player error: ", event.data);
    setTimeout(loadNextVideoInPlaylist, 2000, looping);
}

function loadNextVideoInPlaylist(looping = false) {
    let index = currentVideoIndex + 1;

    if (index > playlistItemElements.length && looping) {
        index = 1;
    }
    else if (index > playlistItemElements.length)
        return;

    setCurrentVideoIndex(index);
    player.loadVideoById(playlistItemElements[index - 1].dataset.videoId);
}
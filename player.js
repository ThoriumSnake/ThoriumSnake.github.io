import { currentVideoIndex, playlistItemElements, setCurrentVideoIndex } from "./playlist-panel.js";

window.onPlayerReady = onPlayerReady;
window.onPlayerStateChange = onPlayerStateChange;

function onPlayerReady(event) {
}

function onPlayerStateChange(event) {
    loadNextVideoInPlaylist();
    // while (player.getPlayerState() === -1)
    //     loadNextVideoInPlaylist();
}

function loadNextVideoInPlaylist(looping = false) {
    if (player.getPlayerState() === YT.PlayerState.ENDED) {
        let index = currentVideoIndex + 1;

        if (index > playlistItemElements.length && looping)
            index = 0;
        else if (index > playlistItemElements.length)
            return;

        setCurrentVideoIndex(index);
        player.loadVideoById(playlistItemElements[index].dataset.videoId);
    }
}
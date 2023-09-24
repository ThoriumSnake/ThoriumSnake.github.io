import { currentVideoIndex, playlistItemElements, setCurrentVideoIndex } from "./playlist-panel.js";

window.onPlayerReady = onPlayerReady;
window.onPlayerStateChange = onPlayerStateChange;

function onPlayerReady(event) {
}

function onPlayerStateChange(event) {
    console.log("Player state: " + player.getPlayerState());
    console.log("video index before loadnext: " + currentVideoIndex);

    if (player.getPlayerState() === YT.PlayerState.ENDED) {
        loadVideoSkipUnavailable();
        console.log("video index after loadnext: " + currentVideoIndex);
    }
}

function loadVideoSkipUnavailable() {
    loadNextVideoInPlaylist();

    let atLastVideo = currentVideoIndex === playlistItemElements.length;

    let params = {
        part: "status",
        id: playlistItemElements[currentVideoIndex - 1].dataset.videoId,
    }

    gapi.client.youtube.videos.list(params).then((response) => {
        //Recursive call
        if (response.result.pageInfo.totalResults < 1 && !atLastVideo)
            loadVideoSkipUnavailable();

        //Recursive call
        let status = response.result.items[0].status;
        console.log(response.result.items[0].status);
        let isUploaded = status.uploadStatus === "processed";
        //If adding OAuth later, should check if video is owned by user
        let isPublic = status.privacyStatus === "public" || status.privacyStatus === "unlisted";

        // console.log("playlist length: " + playlistItemElements.length);


        if (!isUploaded || !isPublic && !atLastVideo)
            loadVideoSkipUnavailable();
    });
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
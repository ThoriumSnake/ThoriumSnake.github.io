let player;
const maxElementsPerPage = 50;

function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        width: "480",
        height: "270",
        playerVars: {
            "autoplay": 0,
            "rel": 0,
            // "origin": location.origin,
        },
        events: {
            "onReady": onPlayerReady,
            "onStateChange": onPlayerStateChange,
            "onError": onPlayerError,
        }
    });
    console.log("this api loaded bruh");
}

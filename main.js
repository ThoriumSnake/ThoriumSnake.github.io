var player;

function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        width: "305",
        height: "150",
        playerVars: {
            "playsinline": 0,
        },
        events: {
            "onReady": onPlayerReady,
            "onStateChange": onPlayerStateChange
        }
    });
    console.log("this api loaded bruh");
}

function onPlayerReady(event) {
    event.target.playVideo();
}


function onPlayerStateChange(event) {
}

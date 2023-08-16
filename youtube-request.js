import { displayPlaylist } from "./youtube-display.js";

//TODO
//Add check for valid list ID
//Add OAuth to get private PLs
//Add check for restricted and privated videos so they can be skipped
//Add warning for private playslits, wrong ids, etc

// Replace 'YOUR_API_KEY' with your actual YouTube Data API key
const apiKey = "AIzaSyB8W6yAgm0yvbCmwFEn0_eRapsv3i739x8";
var loaded = false;

var playlistId = ""; // Replace with your YouTube playlist ID
var playlistUrl = "";

var requestButton = document.getElementById("playlist-fetch");
var urlTextBox = document.getElementById("playlist-url");

requestButton.addEventListener("click", () => {
    playlistUrl = urlTextBox.value;

    var url = new URL(playlistUrl);

    var valid = checkValidUrl(url);
    if (!valid) {
        console.log("Invalid URL");
        return;
    }

    playlistId = url.searchParams.get("list");
    fetchPlaylistVideos();
});


// Function to load the YouTube API client library
function loadYouTubeApi() {
    gapi.client.setApiKey(apiKey);
    gapi.client.load("youtube", "v3", function () {
        loaded = true;
        requestButton.disabled = false;
        urlTextBox.disabled = false;
    });
}

function checkValidUrl(url) {
    console.log(url.searchParams);
    console.log(url.hostname);
    console.log(url.searchParams.get("list"));

    if (URL.canParse(playlistUrl) && url.hostname == "www.youtube.com") {
        if (url.searchParams.get("list")) {
            return true;
        }
    }

    return false;
}

// Function to fetch the videos from the playlist
function fetchPlaylistVideos() {
    const request = gapi.client.youtube.playlistItems.list({
        part: "snippet",
        playlistId: playlistId,
        maxResults: 50 // Adjust the value based on your needs (maximum is 50)
    });

    request.execute(function (response) {
        const playlistItems = response.result.items;
        displayPlaylist(playlistItems);
    });

}

window.addEventListener("load", loadYouTubeApi);
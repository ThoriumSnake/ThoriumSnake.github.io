import { displayPlaylist } from "./youtube-display.js";

//TODO
//Do most tasks with the player and data api, use backend db for storing queues (or maybe local storage? a backing would be nice tho)
//Get ALL videos in a playlist, rn only 50 are fetched
//Add button to go to original youtube link
//Add comments
//Add check for valid list ID
//Add OAuth to get private PLs
//Add check for restricted and privated videos so they can be skipped
//Add warning for private playslits, wrong ids, etc
//Send request using enter button
//Call onYouTubeIframeAPIReady or make div invisible until playlist is fetched
//Paginate the playlist items (visually only, for the user's convenience)
//Search new videos function (Add to playlist sidebar after entering video)
//Search within playlist (autosearch, case insensitive, searches for words within)
//Save pagination progress on playlist pages

// Replace 'YOUR_API_KEY' with your actual YouTube Data API key
const apiKey = "AIzaSyB8W6yAgm0yvbCmwFEn0_eRapsv3i739x8";
var loaded = false;

var playlistId = ""; // Replace with your YouTube playlist ID
var playlistUrl = "";

var requestButton = document.getElementById("playlist-fetch");
var urlTextBox = document.getElementById("playlist-url");
//Disabling button and textbox here since refreshing page leaves them enabled
requestButton.disabled = true;
urlTextBox.disabled = true;

requestButton.addEventListener("click", () => {
    playlistUrl = urlTextBox.value;

    var url = new URL(playlistUrl);

    var valid = checkValidUrl(url);
    if (!valid) {
        console.log("Invalid URL");
        return;
    }

    playlistId = url.searchParams.get("list");

    if (loaded)
        fetchPlaylistVideos();
    // fetchPlaylistPage();
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
function fetchPlaylistPage(pageToken) {
    var params = {
        part: "snippet",
        playlistId: playlistId,
        maxResults: 50, // Adjust the value based on your needs (maximum is 50)
        pageToken: pageToken
    }

    return gapi.client.youtube.playlistItems.list(params);

    // request.execute(function (response) {
    //     var playlistItems = response.result.items;
    //     // console.log("Next page token: " + response.result.nextPageToken);
    //     // console.log("Prev page token: " + response.result.prevPageToken);
    //     // displayPlaylist(playlistItems);
    // }).then(function () {

    // })
}

async function fetchPlaylistVideos() {
    var pageToken;
    var playlistPages = [];
    do {
        await fetchPlaylistPage(pageToken).then(function (response) {
            playlistPages.push(response.result.items);
            pageToken = response.result.nextPageToken;
        })
    } while (pageToken);

    console.log(playlistPages);
    displayPlaylist(playlistPages)
}


window.addEventListener("load", loadYouTubeApi);
// document.addEventListener("DOMContentLoaded", loadYouTubeApi);
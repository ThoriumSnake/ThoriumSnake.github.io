
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

//Idea: get one page, display it, get others in background but don't display

//When fetching data make a page object (that goes into an array) which contains the items and whether the page has already been requested (and another for loaded)
//Fetch all pages in sequence, the user can fetch a page manually by clicking on the pagination buttons, this will be faster for later pages than waiting
//The number of videos can be fetched, use this to shuffle the playlist, add video id to an array to know whether that video has already been played (Don't play video again for x videos)

import { createFirstPage, createPlaylistPage } from "./playlist-panel.js";
import { shuffleButton } from "./panel-controls.js";

// Replace 'YOUR_API_KEY' with your actual YouTube Data API key
const apiKey = "AIzaSyB8W6yAgm0yvbCmwFEn0_eRapsv3i739x8";
let loaded = false;

let playlistId = ""; // Replace with your YouTube playlist ID
let playlistUrl = "";

let requestButton = document.getElementById("fetch-button");
let urlTextBox = document.getElementById("url-input-box");
//Disabling button and textbox here since refreshing page leaves them enabled
requestButton.disabled = true;
urlTextBox.disabled = true;

requestButton.addEventListener("click", () => {
    playlistUrl = urlTextBox.value;

    let url = new URL(playlistUrl);

    let valid = checkValidUrl(url);
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
    let params = {
        part: "snippet",
        playlistId: playlistId,
        maxResults: maxElementsPerPage, // Adjust the value based on your needs (maximum is 50)
        pageToken: pageToken
    }

    return gapi.client.youtube.playlistItems.list(params);
}

async function fetchPlaylistVideos() {
    let pageToken;
    let index = 0;

    do {
        await fetchPlaylistPage(pageToken).then(function (response) {
            let pageItems = response.result.items;
            if (!Array.isArray(pageItems) || !pageItems.length)
                throw new Error("Playlist is empty!")

            console.log(pageItems);
            pageToken = response.result.nextPageToken;

            if (index == 0)
                createFirstPage(pageItems);
            else
                createPlaylistPage(pageItems, index + 1);
            index += 1;
        })
    } while (pageToken);

    //Enabling here after all pages are created
    shuffleButton.disabled = false;
}


window.addEventListener("load", loadYouTubeApi);
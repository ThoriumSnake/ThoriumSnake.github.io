// Replace 'YOUR_API_KEY' with your actual YouTube Data API key
const apiKey = 'AIzaSyB8W6yAgm0yvbCmwFEn0_eRapsv3i739x8';
const playlistId = 'PLsKRNKqgtnEJ8dCTLquwaEwvv1xyyWmVL'; // Replace with your YouTube playlist ID

// Function to load the YouTube API client library
function loadYouTubeApi() {
    gapi.client.setApiKey(apiKey);
    gapi.client.load('youtube', 'v3', function () {
        fetchPlaylistVideos();
    });
}

// Function to fetch the videos from the playlist
function fetchPlaylistVideos() {
    const request = gapi.client.youtube.playlistItems.list({
        part: 'snippet',
        playlistId: playlistId,
        maxResults: 50 // Adjust the value based on your needs (maximum is 50)
    });

    request.execute(function (response) {
        const playlistItems = response.result.items;
        displayPlaylist(playlistItems);
    });
}
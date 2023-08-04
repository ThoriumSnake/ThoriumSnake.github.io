// var requestButton = document.getElementById("request-button");

// requestButton.addEventListener("click", (event) => {
//     execute();
// })

function displayPlaylist(playlistItems) {
    const videoList = document.getElementById('videoList');
    videoList.innerHTML = ''; // Clear the video list if already present

    if (playlistItems) {
        for (const item of playlistItems) {
            const videoId = item.snippet.resourceId.videoId;
            const videoTitle = item.snippet.title;

            // Create a link for each video
            const videoLink = document.createElement('a');
            videoLink.href = `https://www.youtube.com/watch?v=${videoId}`;
            videoLink.textContent = videoTitle;
            videoLink.target = '_blank';

            // Append the link to the video list div
            videoList.appendChild(videoLink);
            videoList.appendChild(document.createElement('br'));
        }
    }
    else {
        videoList.textContent = 'No videos found in the playlist.';
    }
}
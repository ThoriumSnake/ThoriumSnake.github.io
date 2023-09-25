let playlistItemThumbnails = new Map();
let allThumbnails = new Map();

export { fetchPlaylistItemThumbnails, playlistItemThumbnails };

//Will get the best thumbnail available from all available
function fetchPlaylistItemThumbnails(items) {
    for (let item of items) {
        let thumbnailUrl;
        try {

            thumbnailUrl = item.snippet.thumbnails["medium"].url;

        } catch (error) {

            if (error instanceof TypeError)
                thumbnailUrl = "./unavailable.png";
            else throw error;

        }

        playlistItemThumbnails.set(item.snippet.resourceId.videoId, thumbnailUrl);
    }

    // fetchAllThumbnails(items);
    console.log(playlistItemThumbnails);
}

function fetchAllThumbnails(items) {
    for (const item of items) {
        allThumbnails.set(item.snippet.resourceId.videoId, item.snippet.thumbnails);
    }
    console.log(allThumbnails);
}

function renderAllThumbnails() {
    let container = document.createElement("div");
    container.classList.add("thumbnails-container");

    for (const [key, thumbnails] of allThumbnails) {
        console.log(thumbnails);
        let videoThumbContainer = document.createElement("div");
        let videoId = document.createElement("p");
        videoId.textContent = key;

        for (let key in thumbnails) {
            // console.log(thumbnails[key]);
            let videoThumb = document.createElement("img");
            videoThumb.src = thumbnails[key].url;
            videoThumbContainer.appendChild(videoThumb);
        }
        container.append(videoId, videoThumbContainer);
    }
    document.body.appendChild(container);
}
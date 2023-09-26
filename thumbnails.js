let playlistItemThumbnails = new Map();
let allThumbnails = new Map();

export { fetchPlaylistItemThumbnails, playlistItemThumbnails };

//Will get the best thumbnail available from all available
function fetchPlaylistItemThumbnails(items, ids) {
    for (let i = 0; i < items.length; i++) {
        let thumbnailUrl;
        try {

            thumbnailUrl = items[i].snippet.thumbnails["medium"].url;
            console.log(thumbnailUrl);

        } catch (error) {

            if (error instanceof TypeError)
                thumbnailUrl = "./unavailable.png";
            else throw error;

        }

        if (ids === undefined)
            playlistItemThumbnails.set(items[i].snippet.resourceId.videoId, thumbnailUrl);
        else
            playlistItemThumbnails.set(ids[i], thumbnailUrl);
    }

}

function fetchAllThumbnails(items) {
    for (const item of items) {
        allThumbnails.set(item.snippet.resourceId.videoId, item.snippet.thumbnails);
    }
}

function renderAllThumbnails() {
    let container = document.createElement("div");
    container.classList.add("thumbnails-container");

    for (const [key, thumbnails] of allThumbnails) {
        let videoThumbContainer = document.createElement("div");
        let videoId = document.createElement("p");
        videoId.textContent = key;

        for (let key in thumbnails) {
            let videoThumb = document.createElement("img");
            videoThumb.src = thumbnails[key].url;
            videoThumbContainer.appendChild(videoThumb);
        }
        container.append(videoId, videoThumbContainer);
    }
    document.body.appendChild(container);
}
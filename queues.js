import { fetchVideosById } from "./youtube-request.js";
// export { renderQueue }
const queuesContainer = document.getElementById("queues-container");


document.addEventListener("newQueue", (event) => {
    console.log(event);
    renderQueue(event.detail.title, event.detail.ids);
})

function renderQueue(title, ids) {
    const queueTitle = document.createElement("h2");
    queueTitle.textContent = title;
    queueTitle.addEventListener("click", () => {
        // let queueIds = localStorage.getItem(queueTitle.textContent);
        fetchVideosById(ids)
    })

    queuesContainer.appendChild(queueTitle);
}

function renderExistingQueues() {
    let queueName = "Queue 1";
    let i = 1;
    let queueIds = localStorage.getItem(queueName);
    queueIds = JSON.parse(queueIds);

    while (queueIds !== null && queueIds.length > 0) {
        renderQueue(queueName, queueIds);
        i += 1;
        queueName = "Queue " + i;
        queueIds = localStorage.getItem(queueName);
        queueIds = JSON.parse(queueIds);
    }
}

renderExistingQueues();
document.addEventListener('DOMContentLoaded', function () {
    var urlForm = document.getElementById('urlForm');
    var resultDiv = document.getElementById('result');

    urlForm.addEventListener('submit', function (event) {
        event.preventDefault();

        var urlInput = document.getElementById('urlInput');
        var url = urlInput.value;

        var xhr = new XMLHttpRequest();
        xhr.open('GET', "/playlist", true);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                console.log(xhr.status);
                if (xhr.status === 200) {
                    resultDiv.innerHTML = xhr.responseText;
                } else {
                    resultDiv.innerHTML = 'An error occurred while fetching the URL.';
                }
            }
        };
        xhr.send();
    });
});

const pingUrl = 'https://api.coingecko.com/api/v3/ping';

const connectButton = document.getElementById('connect-button');

connectButton.addEventListener('click', async function () {
    await fetch(pingUrl)
        .then(function (response) {
            let status = document.getElementById('status');
            status.innerText = 'Status : ' + response.status;
            return response.json();
        }).then(function (data) {
            let ping = document.getElementById('gecko-says');
            ping.innerText = data['gecko_says'];
        });
});
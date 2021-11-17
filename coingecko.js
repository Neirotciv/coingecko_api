const pingUrl = 'https://api.coingecko.com/api/v3/ping';
const coinListUrl = 'https://api.coingecko.com/api/v3/coins/list';

const connectButton = document.getElementById('connect-button');
let isConnected = false;

connectButton.addEventListener('click', async function () {
    await fetch(pingUrl)
        .then(function (response) {
            let status = document.getElementById('status');
            if (response.status == 200) { 
                loadCoinList();
            }
            status.innerText = 'Status : ' + response.status;
            return response.json();
        }).then(function (data) {
            let ping = document.getElementById('gecko-says');
            ping.innerText = data['gecko_says'];
        });
});

const loadCoinList = function () {
    fetch(coinListUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            // console.log(data);
            // get coin list div
            let coinList = document.getElementById('coin-list');
            data.forEach(element => {
                // id, symbol, name
                let id = document.createElement('p');
                id.innerText = element['id'];
                coinList.appendChild(id);
            });
        })
}

if (isConnected) {
    loadCoinList();
}
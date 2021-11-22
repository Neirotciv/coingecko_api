const pingUrl = 'https://api.coingecko.com/api/v3/ping';
const coinListUrl = 'https://api.coingecko.com/api/v3/coins/list';
const coinMarketByIdUrl = 'https://api.coingecko.com/api/v3/coins/markets/';

const connectButton = document.getElementById('connect-button');
connectButton.addEventListener('click', async function () {
    await fetch(pingUrl)
        .then(function (response) {
            let status = document.getElementById('status');
            if (response.status == 200) { 
                // loadCoinList();
            }
            status.innerText = 'Status : ' + response.status;
            return response.json();
        })
        .then(function (data) {
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
            let coinList = document.getElementById('coin-list');
            data.forEach(element => {
                // id, symbol, name
                let id = document.createElement('p');
                id.innerText = element['id'];
                coinList.appendChild(id);
            });
        })
}

const searchButton = document.getElementById('search-button');
searchButton.addEventListener('click', async function() {
    let coinId = document.getElementById('coin-id').value;
    let vsCurrency = '?vs_currency=' + 'usd';
    let ids = '&ids=' + coinId;
    let data = await fetch(coinMarketByIdUrl + vsCurrency + ids)
        .then(function (response) {
            console.log(response.status);
            return response.json();
        })
        .then(function (data) {
            let imageTag = document.getElementById('ids-image');
            imageTag.src = data[0]['image'];

            let marketInfosDiv = document.getElementById('market-infos')
            let name = document.createElement('h3');
            name.innerText = data[0]['name']

            marketInfosDiv.appendChild(name);
            return data[0];
        });
});
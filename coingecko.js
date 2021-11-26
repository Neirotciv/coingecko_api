const pingUrl = 'https://api.coingecko.com/api/v3/ping';
const coinListUrl = 'https://api.coingecko.com/api/v3/coins/list';
const coinMarketByIdUrl = 'https://api.coingecko.com/api/v3/coins/markets/';

let coinList = [];

const connectButton = document.getElementById('connect-button');
connectButton.addEventListener('click', async function () {
    await fetch(pingUrl)
        .then(function (response) {
            let status = document.getElementById('status');
            if (response.status == 200) { 
                loadCoinList();
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
            if (response.status == 200) {
                return response.json();
            }
        })
        .then(function (data) {
            data.forEach(coin => {
                coinList.push(coin["id"]);
            });
        })
}

const searchButton = document.getElementById('search-button');
searchButton.addEventListener('click', async function() {
    let coinId = document.getElementById('coin-id').value;
    let vsCurrency = '?vs_currency=' + 'usd';
    let ids = '&ids=' + coinId;
    await fetch(coinMarketByIdUrl + vsCurrency + ids)
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

// Chercher une correspondance avec l'input de l'id
function searchId(input) {
    let filterCoin = coinList.filter(
        coin => coin.substring(0, input.length) == input
    );
    return filterCoin
}

const searchCoinId = document.getElementById("coin-id");

// A chaque nouveau caractère
searchCoinId.addEventListener('keyup' , function() {
    let filterCoin = searchId(searchCoinId.value)
    
    // Détruire la div des propositions si elle existe
    if (document.getElementById('proposal-list')) {
        let proposalDiv = document.getElementById('proposal-list');
        document.querySelector('body').removeChild(proposalDiv);
    }

    if (filterCoin.length != 0) {
        // construire la liste des propositions
        console.log(filterCoin.length);
        let proposalDiv = document.createElement('div');
        proposalDiv.id = 'proposal-list';
        for (let i = 0; i < filterCoin.length; i++) {
            let proposal = document.createElement('div');
            proposal.classList.add('proposal');
            proposal.innerText = filterCoin[i];
            proposal.addEventListener('click', function() {
                searchCoinId.value = this.innerText;
                document.querySelector('body').removeChild(proposalDiv);
            });
            proposalDiv.appendChild(proposal);
        }
        document.querySelector('body').appendChild(proposalDiv);
    }
});
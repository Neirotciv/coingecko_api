const pingUrl = 'https://api.coingecko.com/api/v3/ping';

const ping = async function () {
    await fetch(pingUrl)
        .then(function (response) {
            console.log(response.status);

            return response.json();
        }).then(function (data) {
            console.log(data["gecko_says"]);
        });
};

ping();


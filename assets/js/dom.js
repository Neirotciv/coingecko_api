const searchCoinId = document.getElementById("coin-id");

function removeChildOfDiv(parentId, childId) {
    let child = document.getElementById(childId);
    document.getElementById(parentId).removeChild(child);
}

// Filtrage d'un tableau par rapport à une saisie utilisateur
function filterArrayFromInput(arrayToFilter, input) {
    return arrayToFilter.filter(
        value => value.substring(0, input.length) == input
    );
}

// Autocompletion de l'input à chaque nouveau caractère
searchCoinId.addEventListener('keyup' , function() {
    let filterCoin = filterArrayFromInput(coinList, searchCoinId.value)
    
    // Détruire la div des propositions si elle existe
    if (document.getElementById('proposal-list')) {
        removeChildOfDiv('search-form', 'proposal-list')
    }

    if (filterCoin.length != 0) {
        // Construire la liste des propositions
        let proposalDiv = document.createElement('div');
        proposalDiv.id = 'proposal-list';

        // Positionnement de la div par rapport à l'input
        let inputRect = document.getElementById('coin-id').getBoundingClientRect();
        proposalDiv.style.top = `${inputRect.height}px`;
        proposalDiv.style.width = `${inputRect.width}px`;
        
        for (let i = 0; i < filterCoin.length; i++) {
            let proposal = document.createElement('div');
            proposal.classList.add('proposal');
            proposal.innerText = filterCoin[i];
            proposal.style.height = `${inputRect.height}px`;

            // Valider le choix en cliquant
            proposal.addEventListener('click', function() {
                searchCoinId.value = this.innerText;
                document.getElementById('search-form').removeChild(proposalDiv);
            });

            proposalDiv.appendChild(proposal);
        }
        document.getElementById('search-form').appendChild(proposalDiv);
    }
});
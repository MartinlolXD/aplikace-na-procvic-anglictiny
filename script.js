document.addEventListener('DOMContentLoaded', function () {
    loadCards();
  });
   
  // Funkce pro přidání nové kartičky
  function addCard() {
    var englishWord = document.getElementById('englishWord').value;
    var czechTranslation = document.getElementById('czechTranslation').value;
    var explanation = document.getElementById('explanation').value;
   
    if (englishWord && czechTranslation && explanation) {
      var card = {
        englishWord: englishWord,
        czechTranslation: czechTranslation,
        explanation: explanation
      };
   
      // Uložení kartičky do LocalStorage
      localStorage.setItem(englishWord, JSON.stringify(card));
   
      // Vyčištění formuláře
      document.getElementById('englishWord').value = '';
      document.getElementById('czechTranslation').value = '';
      document.getElementById('explanation').value = '';
   
      // Znovunačtení kartiček
      loadCards();
    } else {
      alert('Prosím, vyplňte všechna pole.');
    }
  }
   
  // Funkce pro načtení všech uložených kartiček
  function loadCards() {
    var cardContainer = document.getElementById('cardContainer');
    cardContainer.innerHTML = '';
   
    for (var i = 0; i < localStorage.length; i++) {
      var key = localStorage.key(i);
      var card = JSON.parse(localStorage.getItem(key));
   
      var cardElement = document.createElement('div');
      cardElement.className = 'card';
      cardElement.textContent = card.englishWord;
   
      // Přidání události pro otočení kartičky
      cardElement.addEventListener('click', function () {
        this.textContent = card.czechTranslation + ' - ' + card.explanation;
      });
   
      // Přidání tlačítka pro smazání kartičky
      var deleteButton = document.createElement('button');
      deleteButton.textContent = 'Smazat';
      deleteButton.addEventListener('click', function () {
        localStorage.removeItem(key);
        loadCards();
      });
   
      cardElement.appendChild(deleteButton);
      cardContainer.appendChild(cardElement);
    }
  }
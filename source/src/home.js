function init() {
   
  createCard(getProduct())
  updateBadge()
}

function getProduct() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const product = urlParams.get('product');
  return product
}

function createCard(product) {
    var pcItems = [];

    switch (product) {
    case 'portatili':
        pcItems = portatili;
        break;
    case 'fissi':
        pcItems = fissi;
        break;
    case 'smartphone':
        pcItems = smartphone
        break;

    default:
        break;
    }
    var container = document.getElementById('container');

    for (let i = 0; i < pcItems.length; i++) {
        var cardContent = document.createElement('div');
        cardContent.classList.add('card');
        var offerImage = document.createElement('img');
        offerImage.setAttribute('src', 'img/offer.png');
        var cardImage = document.createElement('img');
        cardImage.setAttribute('src', pcItems[i].img);
        cardImage.addEventListener('click', () => openModal(i, pcItems));
        var title = document.createElement('h2');
        title.textContent = pcItems[i].name;
        var grado = document.createElement('p');
        grado.textContent = 'Grado: ' + pcItems[i].grado;
        var prezzo = document.createElement('p');
        prezzo.textContent = 'Prezzo: ' + pcItems[i].prezzo;
        var button = document.createElement('button');
        button.classList.add('add-button');
        button.addEventListener('click', () => add(i));
        var buttonImage = document.createElement('img');
        buttonImage.setAttribute('src', 'img/icons8-cart-48.png');
        

        button.appendChild(buttonImage);
        if (pcItems[i].promozione){
           cardContent.appendChild(offerImage)
            
          // var prezzo = document.createElement('p', 'del')
          // prezzo.textContent = 'Prezzo' + pcItems[i].prezzo
          // cardContent.appendChild(prezzo)
          prezzo.textContent = 'Prezzo: ' +  '<del>' + pcItems[i].prezzo; + '</del>'
          cardContent.appendChild(prezzo)
          

           
           
          
          
          
        }
        cardContent.appendChild(cardImage);
        cardContent.appendChild(title);
        cardContent.appendChild(grado);
        cardContent.appendChild(prezzo);
        cardContent.appendChild(button);
        container.appendChild(cardContent);
    }
}



function openModal(index, pcItems) {
  var modal = document.getElementById('modal');
  modal.style.display = 'block';

  var SelezionaPC = pcItems[index];

  document.getElementById('detailImage').src = SelezionaPC.img;
  document.getElementById('detailName').textContent = SelezionaPC.name;
  document.getElementById('detailGrade').textContent = SelezionaPC.grado;

  if (SelezionaPC.promozione) {
    document.getElementById('detailPrice').innerHTML = '<p><ins>' + SelezionaPC.sconto + '</ins></p>';
  } else {
    document.getElementById('detailPrice').textContent = SelezionaPC.prezzo;
  }

  var dettagli = document.getElementById('sezioneDettagli');
  dettagli.innerHTML = '<h3>Specifiche</h3>' +
    '<ul>';

  if (SelezionaPC.promozione) {
    dettagli.innerHTML += SelezionaPC.specifiche + '<img src="img/offer.png" alt="Offerta"></img>';
  }

  for (var i = 0; i < SelezionaPC.specifiche.length; i++) {
    dettagli.innerHTML += '<li>' + SelezionaPC.specifiche[i] + '</li>';
  }

  dettagli.innerHTML += '</ul>';
}

function closeModal() {
  var modal = document.getElementById('modal');
  modal.style.display = 'none';
}

function getCartModal(cartItems) {

    
  var pcItems = portatili.concat(smartphone).concat(fissi);

  var cartContent = document.createElement('div');
  // cartContent.style.display = 'block';
  cartContent.classList.add('modal-content');
  cartContent.classList.add('cart-container');

  // Bottone esci
  var buttonClose = document.createElement('button');
  buttonClose.classList.add("dropbtn");
  buttonClose.addEventListener("click", closeCart);
  buttonClose.textContent = 'Esci';

  // Bottone paga
  var buyButton = document.createElement('button');
  buyButton.classList.add("dropbtn");
  buyButton.textContent = 'Vai alla cassa';

  // Buttons container
  var buttonContainer = document.createElement('div');
  buttonContainer.classList.add('button-container');

  buttonContainer.appendChild(buttonClose);
  buttonContainer.appendChild(buyButton);

  cartContent.appendChild(buttonContainer);

  var cartContainer = document.createElement('div');
  cartContainer.classList.add('cart-item-container');

  cartItems.forEach((v) => {
    const id = parseInt(v);

    var content = document.createElement('div');
    content.classList.add('cart-item-content');

    var image = document.createElement('img');
    image.setAttribute("id", "cart-item-image");
    image.setAttribute("src", pcItems[id]?.img);

    // Titolo
    var name = document.createElement('h2');
    name.textContent = 'Nome: ';
    var nameValue = document.createElement('span');
    nameValue.setAttribute('id', 'detailName');
    nameValue.textContent = pcItems[id]?.name;
    name.appendChild(nameValue);

    // Paragrafo
    var grade = document.createElement('p');
    grade.textContent = 'Grado: ';
    var gradeValue = document.createElement('span');
    gradeValue.setAttribute('id', 'detailGrade');
    gradeValue.textContent = pcItems[id]?.grado;
    grade.appendChild(gradeValue);

    // Prezzo
    var price = document.createElement('p');

    price.textContent = 'Prezzo: ';
    var priceValue = document.createElement('span');
    priceValue.setAttribute('id', 'detailPrice');
    if (pcItems[id]?.promozione && pcItems[id]?.sconto) {
      priceValue.textContent = pcItems[id]?.sconto;

    } else {
      priceValue.textContent = pcItems[id]?.prezzo;
    }
    price.appendChild(priceValue);

    // Rimuovi
    var removeButton = document.createElement('button');
    removeButton.addEventListener('click', function() {
      remove(id)
;
    });
    removeButton.classList.add('cart-item-button');
    removeButton.textContent = 'Rimuovi';
    
    content.appendChild(image);
    content.appendChild(name);
    content.appendChild(grade);
    content.appendChild(price);
    content.appendChild(removeButton);

    cartContainer.appendChild(content);
  });

  cartContent.appendChild(cartContainer);
  return cartContent;
}

function updateBadge() {
  var cartItems = localStorage.getItem('cartItems') ? localStorage.getItem('cartItems').split(',') : [];
  var badge = document.getElementById('badge');
  var currentValue = cartItems.length;
  badge.textContent = currentValue;
}
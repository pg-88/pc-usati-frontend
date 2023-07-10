function openModal(index) {
  var modal = document.getElementById('modal');
  modal.style.display = 'block';

  var SelezionaPC = PC[index];

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

function openCart() {
  var cartModal = document.getElementById('cart-modal');
  cartModal.style.display = 'flex';

  var cartItems = [];
  if (localStorage.getItem('cartItems')) {
    cartItems = localStorage.getItem('cartItems').split(',');
  }

  if (cartModal.firstChild) {
    cartModal.replaceChild(getCartModal(cartItems), cartModal.firstChild);
  } else {
    cartModal.appendChild(getCartModal(cartItems));
  }
}

function closeCart() {
  var modal = document.getElementById('cart-modal');
  modal.style.display = 'none';
}

function getCartModal(cartItems) {

  var cartContent = document.createElement('div');
  // cartContent.style.display = 'block';
  cartContent.classList.add('modal-content');
  cartContent.classList.add('cart-container');

  // Bottone esci
  var buttonClose = document.createElement('button');
  buttonClose.classList.add("cart-esc-button");
  buttonClose.addEventListener("click", closeCart);
  buttonClose.textContent = 'Esci';

  // Bottone paga
  var buyButton = document.createElement('button');
  buyButton.classList.add("cart-esc-button");
  buyButton.textContent = 'Paga';

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
    image.setAttribute("src", PC[id]?.img);

    // Titolo
    var name = document.createElement('h2');
    name.textContent = 'Nome: ';
    var nameValue = document.createElement('span');
    nameValue.setAttribute('id', 'detailName');
    nameValue.textContent = PC[id]?.name;
    name.appendChild(nameValue);

    // Paragrafo
    var grade = document.createElement('p');
    grade.textContent = 'Grado: ';
    var gradeValue = document.createElement('span');
    gradeValue.setAttribute('id', 'detailGrade');
    gradeValue.textContent = PC[id]?.grado;
    grade.appendChild(gradeValue);

    // Prezzo
    var price = document.createElement('p');

    price.textContent = 'Prezzo: ';
    var priceValue = document.createElement('span');
    priceValue.setAttribute('id', 'detailPrice');
    if (PC[id]?.promozione && PC[id]?.sconto) {
      priceValue.textContent = PC[id]?.sconto;

    } else {
      priceValue.textContent = PC[id]?.prezzo;
    }
    price.appendChild(priceValue);

    // Rimuovi
    var removeButton = document.createElement('button');
    removeButton.addEventListener('click', function() {
      remove(id);
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

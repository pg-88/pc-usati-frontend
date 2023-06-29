function add(index) {
    var cartItems = [];
    if (localStorage.getItem('cartItems')) {
        cartItems = localStorage.getItem('cartItems').split(',')
    } else {
        cartItems = [];
    }
    // var cartItems = localStorage.getItem('cartItems') ? localStorage.getItem('cartItems').split(',') : [];
    var newValues = cartItems;
    newValues.push(index)
    localStorage.setItem('cartItems', newValues);
    updateBadge();
}


function remove(index) {
    var cartItems = localStorage.getItem('cartItems') ? localStorage.getItem('cartItems').split(',') : [];
    var newValues = cartItems;
    if (cartItems?.length && cartItems?.includes(JSON.stringify(index))) {
        const values = [];
        cartItems.forEach((it, idx) => {
            if (idx !== cartItems.indexOf(JSON.stringify(index))) {
                values.push(it);
            }
        });
        newValues = values;
    }
    localStorage.setItem('cartItems', newValues);
    openCart();
    updateBadge();
}
       

function updateBadge() {
    var cartItems = localStorage.getItem('cartItems') ? localStorage.getItem('cartItems').split(',') : [];
    var badge = document.getElementById('badge');
    var currentValue = cartItems.length;
    badge.textContent = currentValue;
}
       

      
        
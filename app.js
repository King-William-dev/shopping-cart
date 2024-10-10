const shop = document.getElementById('shop');
const url = 'https://fakestoreapi.com/products?limit=8';
let container = JSON.parse(localStorage.getItem('data')) || [];

async function getData() {
  let response = await fetch(url);
  let data = await response.json();
  // console.log(data);

  return (shop.innerHTML = data
    .map(product => {
      //distrcution
      let { id, category, title, price, image } = product;
      let search = container.find(product => product.id === id) || [];

      // return the html file including css styles
      return `
  <div class="item" brand-name-${title} product-id= ${id}>
        <img class="product-image" src=${image} alt="" />
        <div class="product-info">
          <h3>${title}</h3>
          <p>${category}</p>
          <div class="price-quantity">
            <h2>$ ${price}</h2>
            <div class="buttons">
              <i class="bi bi-plus-lg" onclick = "priceIncrement(${id})"></i>
              <div id = ${id} class="quantity">${
        search.item === undefined ? 0 : search.item
      }</div>
              <i class="bi bi-dash-lg" onclick = "priceDecrement(${id})"></i>
            </div>
          </div>
        </div>
      </div>
  `;
    })
    .join(''));
}
getData();
//functions to increment price of item
let priceIncrement = function (id) {
  let search = container.find(product => product.id === id);
  if (search === undefined) {
    container.push({
      id: id,
      item: 1,
    });
  } else {
    search.item += 1;
  }
  // console.log(container);
  localStorage.setItem('data', JSON.stringify(container));
  updatePrice(id);
};

//function to decrement price of item
let priceDecrement = function (id) {
  let search = container.find(product => (product.id = id));
  if (search === undefined) return;
  else if (search.item === 0) return;
  else {
    search.item -= 1;
  }
  // console.log(container);
  updatePrice(id);
  container = container.filter(product => product.item !== 0);
  localStorage.setItem('data', JSON.stringify(container));
};

// function to update the price
const updatePrice = function (id) {
  let search = container.find(product => product.id === id);
  // console.log(search.item);
  document.getElementById(id).innerHTML = search.item;
  calcualtion();
};

let calcualtion = () => {
  let cartIcon = document.getElementById('cartAmount');
  cartIcon.innerHTML = container
    .map(product => product.item)
    .reduce((x, y) => x + y, 0);
};
calcualtion();

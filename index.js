const menuArray = [
  {
    title: "Pizza",
    ingredients: ["pepperoni", "mushrom", "mozarella"],
    price: 14,
    image: "pizza.jpg",
    quantity: 0,
    id: 0,
  },
  {
    title: "Hamburger",
    ingredients: ["beef", "cheese", "lettuce"],
    price: 12,
    image: "burger-icon.jpg",
    quantity: 0,
    id: 1,
  },
  {
    title: "Beer",
    ingredients: ["grain, hops, yeast, water"],
    price: 12,
    image: "beer.jpg",
    quantity: 0,
    id: 2,
  },
];

const mainRender = document.getElementById("feed");
const orders = document.getElementById("orders");
const orderProducts = document.getElementById("order-products");
const completeBtn = document.getElementById("complete-btn");
const formContainer = document.getElementById("form-container");
const ownerName = document.getElementById("owner-name");
const cardNum = document.getElementById("card-num");
const cardCvv = document.getElementById("card-cvv");
const thanksDiv = document.getElementById("thanks-div");

//initiate array to store orders
const orderSummary = [];

document.addEventListener("click", function (e) {
  if (e.target.dataset.add) {
    addButtonFunction(e.target.dataset.add);
  }
  if (e.target.dataset.remove) {
    removeOrderItem(e.target.dataset.remove);
  }
});

let totalPrice = 0;

function addButtonFunction(productId) {
  let orderArray = [];

  const targetObj = menuArray.filter(function (product) {
    return product.id == productId;
  })[0];

  //  to add selected product

  targetObj.quantity++;
  totalPrice += targetObj.price;
  orderArray.push(targetObj);

  if (orderArray.length > 0) {
    //show order section
    for (const order of orderArray) {
      let existingOrder = orderSummary.find(function (item) {
        return item.id === order.id;
      });
      if (existingOrder) {
        existingOrder.quantity += 1;
        existingOrder.price += order.price;
      } else {
        orderSummary.push({ ...order, quantity: 1 });
      }
    }
  }

  document.getElementById("line").classList.remove("hidden");
  document.getElementById("total-price-container").classList.remove("hidden");
  document.getElementById("total-price").innerText = `$` + totalPrice;
  completeBtn.classList.remove("hidden");
  orders.innerHTML = getOrderHeader();
  render();
}

function removeOrderItem(productId) {
  const targetOrderObj = orderSummary.findIndex(function (item) {
    return item.id === parseInt(productId);
  });

  let removeOrder = orderSummary[targetOrderObj];
  let itemPrice = removeOrder.price / removeOrder.quantity;

  if (removeOrder.quantity <= 1) {
    totalPrice -= removeOrder.price;
    orderSummary.splice(targetOrderObj, 1);
  } else {
    removeOrder.quantity -= 1;
    removeOrder.price -= itemPrice;
    totalPrice -= itemPrice;
  }
  if (orderSummary.length < 1) {
    orders.classList.add("hidden");
    orderProducts.classList.add("hidden");
    document.getElementById("line").classList.add("hidden");
    document.getElementById("total-price-container").classList.add("hidden");
    completeBtn.classList.add("hidden");
  }
  document.getElementById("total-price").innerText = `$` + totalPrice;

  render();
}

function completeBtnFunct() {
  formContainer.classList.remove("hidden");
}

function payBtnFunct() {
  if (ownerName.value && cardNum.value && cardCvv.value) {
    formContainer.classList.add("hidden");
    offTotalPriceSection();
    while (orderSummary.length != 0) {
      let i = 0;
      orderSummary.splice(i, 1);
      i++;
    }
    orderProducts.innerHTML = orderSummary.slice(0).join("");
    thanksDiv.classList.remove("hidden");
    let feedHtml = ``;

    menuArray.forEach(function (product) {
      let rotateIcon = `style="--fa-rotate-angle: 90deg;"`;

      feedHtml += `<div class="products">
        <div class="products-images"><img src="${product.image}"></div>
        <div class="products-info">
          <div class="products-name">${product.title}</div>
          <div class="products-ingredients">${product.ingredients}</div>
          <div class="products-price">$${product.price}</div>
        </div>
        <button  class="add-icon fa-sharp fa-solid fa-circle-plus fa-rotate-by add-btn-icon" ${rotateIcon}  data-add="${product.id}"></button>
        </div>`;
    });
    mainRender.innerHTML = feedHtml;
    thanksDiv.innerHTML = `Thanks,<span class="nameletters"> ${ownerName.value}</span>! Your order is on its way!`;
    ownerName.value = ``;
    cardNum.value = ``;
    cardCvv.value = ``;

    if (payBtnFunct) {
      setTimeout(() => {
        thanksDiv.classList.add("hidden");
      }, 6000);

      totalPrice = 0;
    }
  }
}

function getFeedHtml() {
  let feedHtml = ``;

  menuArray.forEach(function (product) {
    feedHtml += `<div class="products">
        <div class="products-images"><img src="${product.image}"></div>
        <div class="products-info">
          <div class="products-name">${product.title}</div>
          <div class="products-ingredients">${product.ingredients}</div>
          <div class="products-price">$${product.price}</div>
        </div>
        <button  class="add-icon fa-sharp fa-solid fa-circle-plus fa-rotate-by add-btn-icon"}  data-add="${product.id}"></button>
        </div>`;
  });
  return feedHtml;
}

function getOrderslist() {
  let orderedFeedHtml = "";

  orderSummary.forEach(function (order) {
    orderedFeedHtml += `<div id="${order.id}">
    <div>
      <div class="product-name" id="product-name"><div id="product-quantity">${order.quantity}x</div> <div>${order.title}</div><div class="remove-btn" data-remove="${order.id}">remove</div></div>
        </div>
      <div class="order-price">$${order.price}</div>
    </div>`;
  });
  return orderedFeedHtml;
}

function getOrderHeader() {
  let header = ``;
  header = `<h1>Your Order</h1>`;
  return header;
}

function render() {
  mainRender.innerHTML = getFeedHtml();
  orderProducts.innerHTML = getOrderslist();
}
function offTotalPriceSection() {
  document.getElementById("line").classList.add("hidden");
  document.getElementById("total-price-container").classList.add("hidden");
  document.getElementById("total-price").innerText = ``;
  completeBtn.classList.add("hidden");
  orders.innerHTML = "";
}

render();

const menuArray = [
  {
    title: "Pizza",
    ingredients: ["pepperoni", "mushrom", "mozarella"],
    isAdded: false,
    price: 14,
    image: "pizza.jpg",
    id: 0,
  },
  {
    title: "Hamburger",
    ingredients: ["beef", "cheese", "lettuce"],
    isAdded: false,
    price: 12,
    image: "burger-icon.jpg",
    id: 1,
  },
  {
    title: "Beer",
    ingredients: ["grain, hops, yeast, water"],
    isAdded: false,
    price: 12,
    image: "beer.jpg",
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

document.addEventListener("click", function (e) {
  if (e.target.dataset.add) {
    addButtonFunction(e.target.dataset.add);
  }
  if (e.target.dataset.remove) {
    removeFunction(e.target.dataset.remove);
  }
});
let totalPrice = 0;
function addButtonFunction(productId) {
  const targetObj = menuArray.filter(function (product) {
    return product.id == productId;
  })[0];

  if (targetObj.isAdded) {
    //  to remove selected product

    totalPrice -= targetObj.price;
    document.getElementById("total-price").innerText = `$` + totalPrice;
    // orderedFeedDiv = [];
    orderProducts.innerHTML = getOrdersSplice(productId);
    thanksDiv.classList.add("hidden");
    if (!getOrdersSplice(productId)) {
      offTotalPriceSection();
    }
  } else {
    //  to add selected product

    totalPrice += targetObj.price;
    document.getElementById("line").classList.remove("hidden");
    document.getElementById("total-price-container").classList.remove("hidden");
    document.getElementById("total-price").innerText = `$` + totalPrice;
    completeBtn.classList.remove("hidden");
    renderOrders(productId);
  }
  targetObj.isAdded = !targetObj.isAdded;

  render();
}

function completeBtnFunct() {
  formContainer.classList.remove("hidden");
}

function payBtnFunct() {
  if (ownerName.value && cardNum.value && cardCvv.value) {
    formContainer.classList.add("hidden");
    offTotalPriceSection();
    while (saveArrayOrders.length != 0) {
      let i = 0;
      saveArrayOrders.splice(i, 1);
      i++;
    }
    orderProducts.innerHTML = saveArrayOrders.slice(0).join("");
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
      if (product.isAdded) {
        product.isAdded = !product.isAdded;
      }
    });
    mainRender.innerHTML = feedHtml;
    thanksDiv.innerHTML = `Thanks,<span class="nameletters"> ${ownerName.value}</span>! Your order is on its way!`;
    ownerName.value = ``;
    cardNum.value = ``;
    cardCvv.value = ``;

    if (payBtnFunct) {
      setTimeout(function () {
        thanksDiv.classList.add("hidden");
      }, 6000);

      totalPrice = 0;
    }
  }
}

function getFeedHtml() {
  let feedHtml = ``;

  menuArray.forEach(function (product) {
    let rotateIcon = ``;
    if (product.isAdded) {
      rotateIcon = `style="--fa-rotate-angle: 45deg; color: darkred;"`;
    }

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
  return feedHtml;
}

let orderedFeedDiv = [];
function getOrderslist(x) {
  for (let i = 0; i < 3; i++) {
    orderedFeedDiv[menuArray[i].id] = `<div id="${menuArray[i].id}">
    <div>
      <div class="product-name">${menuArray[i].title}</div>
        </div>
      <div class="order-price">$${menuArray[i].price}</div>
    </div>`;
  }
  productInfo = menuArray.filter(function (y) {
    return y.id == x;
  })[0];
  return orderedFeedDiv[productInfo.id];
}

let saveArrayOrders = [];
let index = [];
function getOrdersPush(productId) {
  if (saveArrayOrders.length === 0) {
    index[0] = productId;
    saveArrayOrders[0] = getOrderslist(productId);
  } else if (saveArrayOrders.length === 1) {
    index[1] = productId;
    saveArrayOrders[1] = getOrderslist(productId);
  } else if (saveArrayOrders.length === 2) {
    index[2] = productId;
    saveArrayOrders[2] = getOrderslist(productId);
  }
  // saveArrayOrders.push(getOrderslist(productId));

  //saveArrayOrders[productId] = getOrderslist(productId);
  return saveArrayOrders.slice(0).join("");
}
function getOrdersSplice(productId) {
  const product = menuArray.filter(function (product) {
    return product.id == productId;
  })[0];
  //console.log(saveArrayOrders.splice(productId, 1));
  if (productId == index[0]) {
    // saveArrayOrders[0] = "";
    saveArrayOrders.splice(0, 1);
  } else if (productId == index[1]) {
    // saveArrayOrders[1] = "";
    saveArrayOrders.splice(1, 1);
  } else if (productId == index[2]) {
    // saveArrayOrders[2] = "";
    saveArrayOrders.splice(2, 1);
  }

  //saveArrayOrders.splice(productId, 1);
  return saveArrayOrders.slice(0).join("");
}

function getOrderHeader() {
  let header = ``;
  header = `<h1>Your Order</h1>`;
  return header;
}

function renderOrders(productId) {
  orders.innerHTML = getOrderHeader();
  orderProducts.innerHTML = getOrdersPush(productId);
}
function render() {
  mainRender.innerHTML = getFeedHtml();
}
function offTotalPriceSection() {
  document.getElementById("line").classList.add("hidden");
  document.getElementById("total-price-container").classList.add("hidden");
  document.getElementById("total-price").innerText = ``;
  completeBtn.classList.add("hidden");
  orders.innerHTML = "";
}

render();

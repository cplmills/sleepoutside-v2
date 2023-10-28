import { findProductById } from "./productData.mjs";
import { getLocalStorage, setLocalStorage, showCartCount } from "./utils.mjs";
import { loadHeaderFooter } from "./utils.mjs";

export default async function productDetails(productId) {
  try {
    const myProductDetails = await findProductById(productId);
    renderProductDetails(myProductDetails);
    console.log("now here");

  // add listener to Add to Cart button
  document
    .getElementById("addToCart")
    .addEventListener("click", addToCartHandler);
  } catch (err) {
    if (err instanceof TypeError) {
      alert('Product not found')
    }
  }
}

async function addToCartHandler(e) {
  const product = await findProductById(e.target.dataset.id);
  addProductToCart(product);
  animateLogo();
}

function addProductToCart(product) {
  const cartData = getLocalStorage("so-cart") || [];
  cartData.push(product);
  setLocalStorage("so-cart", cartData);
  showCartCount();
}

function renderProductDetails(myProductDetails) {
  let newTitle = document.querySelector("title");
  newTitle.innerText = myProductDetails.NameWithoutBrand;

  let newSection = document.createElement("section");
  newSection.className = "product-detail";

  let newH3 = document.createElement("h3");
  newH3.innerHTML = myProductDetails.Brand.Name;

  let newH2 = document.createElement("h2");
  newH2.className = "divider";
  newH2.innerHTML = myProductDetails.NameWithoutBrand;

  let newImg = document.createElement("img");
  newImg.className = "divider";
  newImg.src = myProductDetails.Images.PrimaryLarge;
  newImg.setAttribute("alt", myProductDetails.NameWithoutBrand);


  let newPrice = document.createElement("p");
  newPrice.className = "product-card__price";
  newPrice.innerHTML = myProductDetails.ListPrice;

  //Calculate and display discount price
  
  // let discountPrice = myProductDetails.ListPrice - myProductDetails.FinalPrice;
  let discountPercentage;
  if (myProductDetails.ListPrice > 300) {
    discountPercentage = 0.05;
  } else if (myProductDetails.ListPrice >150) {
    discountPercentage = 0.03;
  }
  const discountPrice = myProductDetails.ListPrice * discountPercentage;
  let discountElement = document.createElement("p");
  discountElement.className = "product__discount";
  discountElement.innerHTML = `Save $${discountPrice.toFixed(2)}`;
  // Calculate and display discount percentage

  // let discountPercentage = (discountPrice / myProductDetails.ListPrice) * 100;
  let discountPercentageElement = document.createElement("p");
  discountPercentageElement.className = "product__discount-percentage";
  discountPercentageElement.innerHTML = `Discount: ${discountPercentage*100}%`;

  let newColor = document.createElement("p");
  newColor.className = "product__color";
  newColor.innerHTML = myProductDetails.Colors[0].ColorName;

  let newDescription = document.createElement("p");
  newDescription.className = "product__description";
  newDescription.innerHTML = myProductDetails.DescriptionHtmlSimple;

  let newDiv = document.createElement("div");
  newDiv.className = "product-detail__add";

  let newButton = document.createElement("button");
  newButton.id = "addToCart";
  newButton.setAttribute("data-id", myProductDetails.Id);
  newButton.innerText = "Add To Cart";
  newButton.addEventListener("click", addToCartHandler);

  newSection.append(newH3);
  newSection.append(newH2);
  newSection.append(newImg);
  newSection.append(newPrice);
  newSection.append(discountElement);
  newSection.append(discountPercentageElement);
  newSection.append(newColor);
  newSection.append(newDescription);

  newDiv.append(newButton);
  newSection.append(newDiv);

  let mainTag = document.querySelector("main"); 
  mainTag.appendChild(newSection);
}

function animateLogo() {
  let cartLogo = document.querySelector(".cart-logo");
  cartLogo.setAttribute("class", "logo-spinner");

  let btnAdd = document.querySelector("#addToCart");
  btnAdd.innerHTML = "Item Added to Cart";

  setTimeout(function()
  {
      cartLogo.setAttribute("class", "cart-logo");
      btnAdd.innerHTML = "Add to Cart";

  }, 2000);
}

loadHeaderFooter();


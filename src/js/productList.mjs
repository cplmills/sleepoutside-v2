import { getData } from "./productData.mjs";
import { renderListWithTemplate, listSort, sortProduct } from "./utils.mjs";

function productCardTemplate(product) {
    return `<li class="product-card">
    <a href="../product_pages/index.html?product=${product.Id}">
      <img
        src="${product.Images.PrimarySmall}"
        alt="Image of ${product.Name}"
      />
      <h3 class="card__brand">${product.Brand.Name}</h3>
      <h2 class="card__name">${product.NameWithoutBrand}</h2>
      <p class="product-card__price">$${product.FinalPrice}</p></a
    >
  </li>`;
}


export default async function productList(selector, category) { 
    const element = document.querySelector(selector);
    const newTitle = document.getElementById("topProducts");
    newTitle.innerText = "Top Products: "+category.charAt(0).toUpperCase() + category.slice(1);
    const Allproducts = await getData(category);
    renderListWithTemplate(productCardTemplate, selector, Allproducts, "afterbegin", false);
    sortProduct(productCardTemplate, selector, Allproducts, "afterbegin", false);
}
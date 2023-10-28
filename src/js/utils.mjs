// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}

export function getParam(parameter){
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const product = urlParams.get(parameter);
  return product;
}

export function renderListWithTemplate(templateFn, parentElement, list, position = "afterbegin", clear = true) {
  if (clear) {
    parentElement.innerHTML = "";
  }
  const HTMLselector = document.querySelector(parentElement);
  let template = list.map(templateFn);
  HTMLselector.insertAdjacentHTML(position, template.join(""));
}

export function renderWithTemplate(templateFn, parentElement, data, position = "afterbegin", clear = true) {
  if (clear) {
    parentElement.innerHTML = "";
  }
  const HTMLselector = document.querySelector(parentElement);
  let template = data;
  HTMLselector.insertAdjacentHTML(position, template.join(""));
  if(callback) {
    callback(data);
  }
}

export function loadTemplate(path) {
    return async function () {
      const res = await fetch(path);
      if (res.ok) {
      const html = await res.text();
      return html;
      }
    } 
} 

export async function loadHeaderFooter(){
  let headerTag = document.getElementById("header");
  let footerTag = document.getElementById("footer");

  const headerTemplateFn = loadTemplate("/partials/header.html")
  const footerTemplateFn = loadTemplate("/partials/footer.html");
  
  headerTag.innerHTML = await headerTemplateFn();
  footerTag.innerHTML = await footerTemplateFn();
  showCartCount();
}

export function showCartCount(){
  let badge = document.querySelector(".cart-item-count");
  badge.innerHTML = getLocalStorage("so-cart").length;
}



export function listSort(list){
  let sortSelector = document.querySelector("#sort-list");
    if (sortSelector.value === "price-ascend") {
      list.sort(compareFunction)
      document.querySelector('#sort-default').style.display = "none";
      } else if (sortSelector.value === "price-descend")
      {
        list.sort(compareFunctionReverse);
        document.querySelector('#sort-default').style.display = "none";
      } else if (sortSelector.value === "brand-alphabetical-ascend")
      {
        list.sort(compareName);
        document.querySelector('#sort-default').style.display = "none";
      } else if (sortSelector.value === "brand-alphabetical-descend")
      {
        list.sort(compareNameReverse);
        document.querySelector('#sort-default').style.display = "none";
      }

  function compareFunction(a, b) {
    return a.FinalPrice - b.FinalPrice;
  }
  function compareFunctionReverse(a, b) {
    return b.FinalPrice - a.FinalPrice;
  }
  function compareName(a, b){
    let nameA = a.Brand.Name.toLowerCase();
    let nameB = b.Brand.Name.toLowerCase();

    if (nameA < nameB) return -1;
    if (nameA > nameB) return 1;
    if (nameA === nameB) return 0;
  }
  function compareNameReverse(a, b){
    let nameA = a.Brand.Name.toLowerCase();
    let nameB = b.Brand.Name.toLowerCase();

    if (nameA > nameB) return -1;
    if (nameA < nameB) return 1;
    if (nameA === nameB) return 0;
  }
  return list;
    }
  
  export function sortProduct(templateFn, parentElement, data, position, boolValue) {
    const sortChoices = document.querySelector('#sort-list');
    sortChoices.addEventListener("change", () => {
      const products = document.querySelectorAll('.product-card');
      products.forEach(item => item.remove());
      renderListWithTemplate(templateFn, parentElement, listSort(data), position, boolValue);
    })
    
  }

  export function newsLetter() {
    let closeBtn = document.querySelector('#close');
    closeBtn.addEventListener('click', () => {
      let newslettercontainer = document.querySelector('.news-letter-container')
      newslettercontainer.style.opacity = "0%";
    })
  }

  

  

  
 



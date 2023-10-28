export async function findAlert() {
  const products = await getAlert();
  renderAlert(products);
}

function getAlert(category = "alerts") {
  return fetch(`../json/${category}.json`)
    .then(convertToJson)
    .then((data) => data);
}

function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}

function renderAlert(alertObject) {
  const section = document.createElement("section");
  const main = document.querySelector("main");

  section.classList = "alert-list";

  alertObject.forEach((obj, index) => {
    const paragraph = document.createElement("p");
    paragraph.classList = `alert-${index + 1}`;
    paragraph.textContent = obj.message;
    paragraph.style.background = obj.background;
    paragraph.style.color = obj.color;
    section.appendChild(paragraph);
  });

  main.prepend(section);
}

findAlert();

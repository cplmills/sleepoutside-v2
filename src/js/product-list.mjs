import productList from "./productList.mjs";
import { loadHeaderFooter, getParam } from "./utils.mjs";

productList(".product-list", getParam("product"));
loadHeaderFooter();




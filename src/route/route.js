import Main from '../view/main/main.jsx';
import Notfound from '../view/pagenotfound.jsx';
import Product from '../view/productview/product.jsx';

const appRoute = [
  {path: '/', component: Main},
  {path: '/product/:productName', component: Product},
  {redirect: true, component: Notfound},
];

export default appRoute;

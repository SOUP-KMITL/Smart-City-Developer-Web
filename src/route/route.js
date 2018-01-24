import Main from '../view/main/main.jsx';
import Notfound from '../view/pagenotfound.jsx';
import Product from '../view/productview/product.jsx';
import Login from '../view/login/login.jsx';

const appRoute = [
  {path: '/', component: Main},
  {path: '/product/:productName', component: Product},
  {path: '/login', component: Login},
  {redirect: true, component: Notfound},
];

export default appRoute;

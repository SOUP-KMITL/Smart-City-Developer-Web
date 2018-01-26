import Main from '../view/main/main.jsx';
import Notfound from '../view/pagenotfound.jsx';
import Product from '../view/productview/product.jsx';
import Login from '../view/login/login.jsx';
import Register from '../view/register/register.jsx';
import Contact from '../view/contact/contact.jsx';

const appRoute = [
  {path: '/', component: Main},
  {path: '/product/:productName', component: Product},
  {path: '/contact-us', component: Contact},
  {path: '/signin', component: Login},
  {path: '/signup', component: Register},
  {redirect: true, component: Notfound},
];

export default appRoute;

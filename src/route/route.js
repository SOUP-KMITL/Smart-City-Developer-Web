import Main from '../view/main/main.jsx';
import Notfound from '../view/pagenotfound.jsx';
import Product from '../view/productview/product.jsx';
import Login from '../view/login/login.jsx';
import Register from '../view/register/register.jsx';
import Contact from '../view/contact/contact.jsx';
import Profile from '../view/profile/profile.jsx';

const appRoute = [
  {path: '/', component: Main},
  {path: '/product/:productName', component: Product},
  {path: '/contact-us', component: Contact},
  {path: '/profile/:profileParams?', component: Profile, requireLogin: true},
  {path: '/signin', component: Login, requirePublic: true},
  {path: '/signup', component: Register, requirePublic: true},
  {path: '/notfound', component: Notfound},
  {redirect: true, component: Notfound},
];

export default appRoute;

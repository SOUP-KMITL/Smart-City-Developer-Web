import Main from '../view/main/main.jsx';
import Notfound from '../view/pagenotfound.jsx';
import ViewCityservice from '../view/product/cityservice-view.jsx';
import ViewDatacollection from '../view/product/datacollection-view.jsx';
import Login from '../view/login/login.jsx';
import Register from '../view/register/register.jsx';
import Contact from '../view/contact/contact.jsx';
import Profile from '../view/profile/profile.jsx';
import Signout from '../view/signout/signout.jsx';
import MarketplaceCityservice from '../view/marketplace/marketplace-cityservice.jsx';
import MarketplaceDatacollection from '../view/marketplace/marketplace-datacollection.jsx';

const appRoute = [
  {path: '/', component: Main, exact: true},
  {path: '/view/cityservice/:serviceId', component: ViewCityservice},
  {path: '/view/datacollection/:collectionName', component: ViewDatacollection},
  {path: '/contact-us', component: Contact},
  {path: '/profile', component: Profile, requireLogin: false},
  {path: '/profile/my-datacollection', component: Profile, requireLogin: false},
  {path: '/marketplace/datacollection/page/:page', component: MarketplaceDatacollection, requireLogin: false},
  {path: '/marketplace/cityservice/page/:page', component: MarketplaceCityservice, requireLogin: false},
  {path: '/signin', component: Login, requirePublic: true},
  {path: '/signup', component: Register, requirePublic: true},
  {path: '/signout', component: Signout},
  {path: '/notfound', component: Notfound},
  {redirect: true, to: '/notfound'},
];

export default appRoute;

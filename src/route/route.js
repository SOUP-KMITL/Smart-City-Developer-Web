import Main from '../view/main/main.jsx';
import Notfound from '../view/pagenotfound.jsx';

const appRoute = [
  {path: '/', component: Main},
  {redirect: true, component: Notfound},
];

export default appRoute;

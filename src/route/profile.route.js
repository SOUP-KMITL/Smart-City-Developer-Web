import EditProfile from '../view/profile/editprofile/edit-profile.jsx';
import MainProfile from '../view/profile/main/main.jsx';
import MyDataCollections from '../view/profile/mydatacollections/mydatacollections.jsx';
import MyCityServices from '../view/profile/mycityservices/mycityservices.jsx';
import AddDataCollection from '../view/profile/addDatacollection/addDatacollection.jsx';
import ShowDataCollection from '../view/profile/showDatacollection/showDatacollection.jsx';
import EditDataCollection from '../view/profile/editDatacollection/editDatacollection.jsx';
import AddCityService from '../view/profile/addCityservice/addCityservice.jsx';
import ShowCityService from '../view/profile/showCityservice/showCityservice.jsx';
import EditCityService from '../view/profile/editCityservice/editCityservice.jsx';
import Notfound from '../view/pagenotfound.jsx';

const profileRoute = [
  {path: '/', component: MainProfile, exact: true},
  {path: '/edit-profile', component: EditProfile},
  {path: '/add-datacollection', component: AddDataCollection},
  {path: '/my-datacollections/page/:page', component: MyDataCollections},
  {path: '/my-datacollections/datacollection/:collectionName', component: ShowDataCollection},
  {path: '/my-datacollections/edit/:collectionName', component: EditDataCollection},
  {path: '/add-cityservice', component: AddCityService},
  {path: '/my-cityservices/page/:page', component: MyCityServices},
  {path: '/my-cityservices/cityservice/:serviceId', component: ShowCityService},
  {path: '/my-cityservices/edit/:serviceId', component: EditCityService},
  {path: '/my-cityservices', redirect: true, to: '/profile/my-cityservices/page/1'},
  {path: '/my-datacollections', redirect: true, to: '/profile/my-datacollections/page/1' },
  {redirect: true, to: '/notfound'},
];

export default profileRoute;

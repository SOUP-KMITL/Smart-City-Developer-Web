import EditProfile from '../view/profile/editprofile/edit-profile.jsx';
import MainProfile from '../view/profile/main/main.jsx';
import MyDataCollections from '../view/profile/mydatacollections/mydatacollections.jsx';
import MyCityServices from '../view/profile/mycityservices/mycityservices.jsx';
import AddDataCollection from '../view/profile/addDatacollection/addDatacollection.jsx';
import ShowDataCollection from '../view/profile/showDatacollection/showDatacollection.jsx';
import Notfound from '../view/pagenotfound.jsx';

const profileRoute = [
  {path: '/', component: MainProfile, exact: true},
  {path: '/edit-profile', component: EditProfile},
  {path: '/add-datacollection', component: AddDataCollection},
  {path: '/my-datacollections/page/:page', component: MyDataCollections},
  {path: '/my-datacollections/datacollection/:collectionName', component: ShowDataCollection},
  {path: '/my-cityservices', component: MyCityServices},
  {path: '/my-datacollections', redirect: true, to: '/profile/my-datacollections/page/1' },
  {redirect: true, to: '/notfound'},
];

export default profileRoute;

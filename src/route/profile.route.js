import EditProfile from '../view/profile/editprofile/edit-profile.jsx';
import MyDataCollections from '../view/profile/mydatacollections/mydatacollections.jsx';
import Notfound from '../view/pagenotfound.jsx';

const profileRoute = [
  {path: '', component: EditProfile},
  {path: '/', component: EditProfile},
  {path: '/my-datacollections', component: MyDataCollections},
];

export default profileRoute;

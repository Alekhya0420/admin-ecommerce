import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Addproduct from '../components/Addproduct/Addproduct';
import Admin from '../components/Admin/Admin';
import Frontpage from '../components/Frontpage/Frontpage';
import Ordertracker from '../components/Order-tracking/Ordertracker';
import Productview from '../components/Productview/Productview';
import Usercount from '../components/Usercount/Usercount';
import Userinvolve from '../components/Userinvolve/Userinvolve';
import Userorderlist from '../components/Userorderlist/Userorderlist';
import UserRegistration from '../components/Userpanel/Userregistration/UserRegistration'
import Userlogin   from     '../components/Userpanel/Userlogin/Userlogin'

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Frontpage />} />
        <Route path="/add" element={<Addproduct />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/order-tracking" element={<Ordertracker />} />
        <Route path="/productview" element={<Productview />} />
        <Route path="/total-user" element={<Usercount />} />
        <Route path="/total-user/:name" element={<Userinvolve />} />
        <Route path="/checkorder-list" element={<Userorderlist />} />
        {/*userpart starts here*/}
        <Route path="/user-reg" element={<UserRegistration/>} />
        <Route path="/user-login" element={<Userlogin/>} />
      </Routes>
    </Router>
  );
};

export default AppRouter;

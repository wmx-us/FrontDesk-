import React from 'react';
import '../src/css/normalize.css'
import './App.css';
import {HashRouter as Router,Route,Switch,Redirect} from "react-router-dom";
import Plogin from './component/Plogin/Plogin';
import MainPage from './component/MainPage/MainPage'
import MyOwn from './component/MyOwn/MyOwn'
import changePassword from './component/StaffOrderList/ChangePassword'
import Distr from './component/StaffOrderList/DistributionRecords'
// import SignFailed from './component/StaffOrderList/SignFailed'
// import SignSuccess from './component/StaffOrderList/SignSuccessfully'
// import StayDelivery from './component/StaffOrderList/StayDelivery'
// import StayPickUp from './component/StaffOrderList/StayPickUp'
import MsgList from './component/orderDetail/MsgList'
import OrderFail from './component/orderDetail/OrderFail'
import orderSuccess from './component/orderDetail/OrderSccess'
import orderWaitPick from './component/orderDetail/OrderWaitPick'
import orderWaitSend from './component/orderDetail/OrderWaitSend'
// import orderSuccess from './component/orderDetail/OrderSccess'
function App() {
  return (

        <Router>
            <div className="App">
                <Route path="/" exact render={()=><Redirect to={"/login"}/>}></Route>
                <Route path="/login" component={Plogin}></Route>
                <Route path="/index" component={MainPage}></Route>
                <Route path="/myOwn" component={MyOwn}></Route>
                <Route path="/ChangePassword" component={changePassword}></Route>
                <Route path="/ToDel" component={Distr}></Route>
                <Route path="/MsgList" component={MsgList}></Route>
                <Route path="/orderSuccess" component={orderSuccess}></Route>
                <Route path="/orderFail" component={OrderFail}></Route>
                <Route path="/orderWaitPick" component={orderWaitPick}></Route>
                <Route path="/orderWaitSend" component={orderWaitSend}></Route>
            </div>
        </Router>


  );
}

export default App;

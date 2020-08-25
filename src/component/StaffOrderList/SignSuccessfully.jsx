import React, { Component } from 'react';
import Axios from '../../util/Axios'
import { Button } from "antd";
import {withRouter} from "react-router-dom";


import '../../css/StaffOrderList/StayPickUp.css'


class SignSuccessfully extends Component {
  constructor(props) {
    super(props)
    this.state = {
      stayItems: [],
      mykey:this.props.mykey
    }
  }

  componentDidMount() {
    console.log(this.props.mykey);
    Axios.post('/DeliveryPort/okOrderList', {
      staffId: Number(sessionStorage.getItem('courierId'))
    })
      .then(res => {
        console.log(res);
        if (res.status === 200) {
          if(res.data.data){
            let itemsList = this.getItems(res.data.data);
            this.setState({
              stayItems: itemsList,
            })
          }
        
        }
      })
  }
  //得到待取货的订单列表
  getItems = (list) => {
    let item = list.map(item => {
      return <div className='items' key={item.orderId}>
        <div className='itemsTitle'>
          <p>订单编号：{item.orderId}</p>
          <p>{item.signIn}</p>
        </div>
        <div className="itemsContent">
          <p>门店：{item.siteName}</p>
          <p>
            <span>收货人：{item.consigneeName}</span>
            <span>签收时间：{item.deliveryTime}</span>
          </p>
          <p>
            <Button size='small' type="primary" onClick={() => this.jumpToDetails(item.orderId)}>详情</Button>
          </p>
        </div>
      </div>
    })
    console.log(item);
    return item
  }

  jumpToDetails = val => {
    console.log(val);
    this.props.history.push({pathname:"/orderSuccess",state:{orderId:val,mykey:this.state.mykey}})
  };
  render() {
    return (
      <div id='stayPickUp'>
        {this.state.stayItems}
      </div>
    );
  }
}

export default withRouter(SignSuccessfully);
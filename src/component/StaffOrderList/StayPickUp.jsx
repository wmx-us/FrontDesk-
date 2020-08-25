import React, { Component } from 'react';
import { Button } from "antd";
import Axios from '../../util/Axios'
import {withRouter} from "react-router-dom";
//引入css样式
import '../../css/StaffOrderList/StayPickUp.css'



// const { confirm } = Modal;
class StayPickUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stayItems: [],
      mykey:this.props.mykey
    }
  }
  UNSAFE_componentWillMount() {
    //发送axios请求得到待取货的订单列表
    // let stayItems = [
    //   { orderNum: 2020080657891, orderStatus: '待取货', store: '武侯店', consignee: '陈小姐', deliveryTime: '2020-02-25 23:02:56' },
    //   { orderNum: 2020080657892, orderStatus: '待取货', store: '青羊店', consignee: '尼玛姐', deliveryTime: '2020-02-25 23:02:56' },
    //   { orderNum: 2020080657893, orderStatus: '待取货', store: '双流店', consignee: '沙雕姐', deliveryTime: '2020-02-25 23:02:56' },
    //   { orderNum: 2020080657894, orderStatus: '待取货', store: '华阳店', consignee: '网易云姐', deliveryTime: '2020-02-25 23:02:56' },
    //   { orderNum: 2020080657895, orderStatus: '待取货', store: '青白江店', consignee: '无小姐', deliveryTime: '2020-02-25 23:02:56' },
    //   { orderNum: 2020080657896, orderStatus: '待取货', store: '白果林店', consignee: '机房姐', deliveryTime: '2020-02-25 23:02:56' },
    //   { orderNum: 2020080657897, orderStatus: '待取货', store: '蛟龙港店', consignee: '还姐', deliveryTime: '2020-02-25 23:02:56' },
    //   { orderNum: 2020080657898, orderStatus: '待取货', store: '傻逼店', consignee: '就看见小姐', deliveryTime: '2020-02-25 23:02:56' },
    //   { orderNum: 2020080657899, orderStatus: '待取货', store: '卧槽店', consignee: 'wag小姐', deliveryTime: '2020-02-25 23:02:56' }
    // ]
    // let itemsList = this.getItems(stayItems)


    // this.setState({
    //   stayItems: itemsList
    // })
  }
  componentDidMount() {
    Axios.post('/DeliveryPort/pickUpOrderList', {
      staffId: Number(sessionStorage.getItem('courierId'))
    })
      .then(res => {
        console.log(res);
        if (res.status === 200) {
          if(res.data.data){
            let itemsList = this.getItems(res.data.data)
            this.setState({
              stayItems: itemsList
            })
          }
         
        }
      })
  }

  //跳转到待取货详情
  jumpToDetails = val => {
    console.log(val);
    this.props.history.push({pathname:"/orderWaitPick",state:{orderId:val,mykey:this.state.mykey}})
  }

  //得到待取货的订单列表
  getItems = (list) => {
    let item = list.map(item => {
      return <div className='items' key={item.orderId}>
        <div className='itemsTitle'>
          <p>订单编号：{item.orderId}</p>
          <p>待取货</p>
        </div>
        <div className="itemsContent">
          <p>门店：{item.siteName}</p>
          <p>
            <span>收货人：{item.consigneeName}</span>
            <span>派单时间：{item.deliveryTime}</span>
          </p>
          <p>
            <Button size='small' type="primary" onClick={() => this.jumpToDetails(item.orderId)}>确认取货</Button>
          </p>
        </div>
      </div>
    })
    console.log(item);
    return item
  }
  render() {
    return (
      <div id='stayPickUp'>
        {this.state.stayItems}
      </div>
    );
  }
}

export default withRouter(StayPickUp);
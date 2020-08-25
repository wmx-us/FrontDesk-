import React, { Component } from 'react';
import { Button } from "antd";
import Axios from '../../util/Axios'
import {withRouter} from "react-router-dom";




//引入css样式
import '../../css/StaffOrderList/StayDelivery.css'
// const { confirm } = Modal;
// const { Option } = Select;
// const { TextArea } = Input;
class StayDelivery extends Component {
  constructor(props) {
    super(props)
    this.state = {
      toBeDelivered: [],
      signSituation: '签收成功',
      signDetails: '本人签收',
      signRemarks: '',
      mykey:this.props.mykey,
    }
  }
  UNSAFE_componentWillMount() {
    //发送axios请求得到待取货的订单列表
    // let stayItems = [
    //   { orderNum: 2020080657891, orderStatus: '待送货', store: '武侯店', consignee: '陈小姐', remainingDeliveryTime: '48小时50分', pickUpTime: '30小时' },
    //   { orderNum: 2020080657892, orderStatus: '待送货', store: '青羊店', consignee: '尼玛姐', remainingDeliveryTime: '48小时50分', pickUpTime: '30小时' },
    //   { orderNum: 2020080657893, orderStatus: '待送货', store: '双流店', consignee: '沙雕姐', remainingDeliveryTime: '48小时50分', pickUpTime: '30小时' },
    //   { orderNum: 2020080657894, orderStatus: '待送货', store: '华阳店', consignee: '网易云姐', remainingDeliveryTime: '48小时50分', pickUpTime: '30小时' },
    //   { orderNum: 2020080657895, orderStatus: '待送货', store: '青白江店', consignee: '无小姐', remainingDeliveryTime: '48小时50分', pickUpTime: '30小时' },
    //   { orderNum: 2020080657896, orderStatus: '待送货', store: '白果林店', consignee: '机房姐', remainingDeliveryTime: '48小时50分', pickUpTime: '30小时' },
    //   { orderNum: 2020080657897, orderStatus: '待送货', store: '蛟龙港店', consignee: '还姐', remainingDeliveryTime: '48小时50分', pickUpTime: '30小时' },
    //   { orderNum: 2020080657898, orderStatus: '待送货', store: '傻逼店', consignee: '就看见小姐', remainingDeliveryTime: '48小时50分', pickUpTime: '30小时' },
    //   { orderNum: 2020080657899, orderStatus: '待送货', store: '卧槽店', consignee: 'wag小姐', remainingDeliveryTime: '48小时50分', pickUpTime: '30小时' }
    // ]
    // let itemsList = this.getItems(stayItems)


    // this.setState({
    //   toBeDelivered: itemsList
    // })
  }
  componentDidMount() {
    Axios.post('/DeliveryPort/waitSendOrderList', {
      staffId: Number(sessionStorage.getItem('courierId'))
    })
      .then(res => {
        console.log(res);
        if (res.status === 200) {
          if(res.data.data){
            let itemsList = this.getItems(res.data.data)
            this.setState({
              toBeDelivered: itemsList
            })
          }
         
        }
      })
  }

  //得到待送货的订单列表
  getItems = (list) => {
    let item = list.map(item => {
      return <div className='items' key={item.orderId}>
        <div className='itemsTitle'>
          <p>订单编号：{item.orderId}</p>
          <p>待送货</p>
        </div>
        <div className="itemsContent">
          <p>
            <span>门店：{item.siteName}</span>
            <span>剩余送货时间：{item.lastSendTime}</span>
          </p>
          <p>
            <span>收货人：{item.consigneeName}</span>
            <span>取货时间：{item.deliveryTime}</span>
          </p>
          <p>
            <Button size='small' type="primary" onClick={() => this.jumpToDetails(item.orderId)}>确认签收</Button>
          </p>
        </div>
      </div>
    });
    console.log(item);
    return item
  };
  //跳转到待配送详情
  jumpToDetails = val => {
    console.log(val);
    this.props.history.push({pathname:"/orderWaitSend",state:{orderId:val,mykey:this.state.mykey}})
  };
  //弹出模态框
  // isConfirm = val => {
  //   let content = <div id='signM'>
  //     <div className='signModleRow'>
  //       <span>签收情况：</span>
  //       <Select size='small' defaultValue='签收成功' onChange={this.handleSelect}>
  //         <Option value="签收成功">签收成功</Option>
  //         <Option value="签收失败">签收失败</Option>
  //       </Select></div>
  //     <div className='signModleRow'>
  //       <span>详情：</span>
  //       <Select size='small' defaultValue='本人签收' onChange={this.handleSelect1}>
  //         <Option value="本人签收">本人签收</Option>
  //         <Option value="物业签收">物业签收</Option>
  //         <Option value="自提柜签收">自提柜签收</Option>
  //         <Option value="他人代签收">他人代签收</Option>
  //         <Option value="其他">其他</Option>
  //       </Select>
  //     </div>
  //     <div>
  //       <span>备注：</span>
  //       <TextArea rows={4} onChange={this.signRemarks} />
  //     </div>
  //   </div>
  //   confirm({
  //     title: '是否确认签收?',
  //     content: content,
  //     okText: '确认',
  //     cancelText: '取消',
  //     centered: 'true',
  //     onOk: () => {
  //       console.log(this.state);
  //       console.log(val);
  //     },
  //     onCancel:() => {
  //       this.setState({
  //         signSituation: '签收成功',
  //         signDetails: '本人签收',
  //         signRemarks: ''
  //       })
  //       console.log('Cancel');
  //     },
  //   });
  // }
  //得到签收情况的值
  handleSelect = (value) => {
    this.setState({
      signSituation: value
    })
  }
  //得到签收详情的值
  handleSelect1 = (value) => {
    this.setState({
      signDetails: value
    })
  }
  //得到签收备注的值
  signRemarks = (e) => {
    // console.log(e.target.value);
    this.setState({
      signRemarks: e.target.value
    })
  }
  render() {
    return (
      <div id='stayDelivery'>
        {this.state.toBeDelivered}
      </div>
    );
  }
}

export default withRouter(StayDelivery);
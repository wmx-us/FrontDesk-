import React, { Component } from "react";
import { Card, Table, message } from "antd";
import { LeftOutlined } from "@ant-design/icons";
import Axios from "../../util/Axios";
import "../../css/orderDetail/OrderSccess.css";
// import ReactDOM from "react-dom";
export default class OrderSccess extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orderData: [],
      normalColumns: [
        {
          title: "商品种类",
          dataIndex: "parentName",
        },
        {
          title: "商品细类",
          dataIndex: "sonName",
        },
        {
          title: "数量",
          dataIndex: "count",
        },
      ],
      freshColumns: [
        {
          title: "商品种类",
          dataIndex: "parentName",
        },
        {
          title: "商品细类",
          dataIndex: "sonName",
        },
        {
          title: "数量",
          dataIndex: "count",
        },
      ],
      //订单基本信息
      orderBasic: {
        consigneeAddress: "欢乐颂3栋二单元303",
        consigneeName: "陈大爷",
        finishTime: "2020-08-02 15:50:56",
        logisticsId: "20200802000002-2",
        orderId: "20200802000002",
        orderStatus: "待取货",
        sendTime: "2020-08-02 15:50:56",
        signIn: "本人签收",
        siteName: "华阳店",
        consigneePhoneNumber: "12222222222",
        standbyPhoneNumber: "14744444444",
      },
      // normalBasic: {},
      normalBasic: {
        Temperature: [],
        heavy: 3,
        price: 7,
        supCount: 3,
      },
      // normalList: [],
      normalList: [
        {
          agingCode: "常温",
          count: 3,
          heavy: 3,
          parentName: "豆制品",
          price: 7,
          sonName: "豆腐乳",
        },
      ],
      // freshBasic: {},
      freshBasic: { fresh: [], heavy: 3, price: 88, supCount: 3 },
      // freshList: [],
      freshList: [
        {
          agingCode: "生鲜",
          count: 3,
          heavy: 3,
          parentName: "食物",
          price: 88,
          sonName: "娃哈哈",
        },
      ],
    };
  }
  componentDidMount() {
    this.renderAll();
  }
  renderAll = () => {
    console.log(this.props);
    Axios.post("zhouzhouController/selectMarkiOrder", {
      orderId: this.props.location.state.orderId,
      orderStatus: "签收成功",
    })
      .then((data) => {
        let { data: res } = data;
        console.log(res);
        //解构后端返回的数据
        // res = res.data;
        console.log(res);
        console.log(res.data.consignee[0]);
        console.log(res.data.temperature);
        console.log(res.data.temperature.Temperature);
        console.log(res.data.fresh);
        console.log(res.data.fresh.fresh);

        if (res.code === "0001") {
          console.log(res);
          message.erro("没有查询到数据");
        }
        if (res.code === "0000") {
          //修改State
          this.setState({
            orderBasic: res.data.consignee[0],
            freshBasic: res.data.fresh,
            freshList: res.data.fresh.fresh,
            normalList: res.data.temperature.Temperature,
            normalBasic: res.data.temperature,
          });
        }
      })
      .catch((erro) => {
        console.log(erro);
      });
  };
  goBackwards = () => {
    this.props.history.push({pathname:"/ToDel",state:{key:this.props.location.state.mykey}})
  };
  render() {
    const {
      orderBasic,
      freshColumns,
      freshList,
      freshBasic,
      normalColumns,
      normalBasic,
      normalList,
    } = this.state;
    let normalDom = null;
    let freshDom = null;
    if (normalBasic.supCount !== 0) {
      normalDom = (
        <Card>
          常温订单
          <Table columns={normalColumns} dataSource={normalList} size="small" />
          <div>总箱数：{normalBasic.supCount}</div>
          <div>总重量(KG)：{normalBasic.heavy}</div>
          <div>总金额(元)：{normalBasic.price}</div>
          {/* <div>消耗箱子(个)：</div> */}
        </Card>
      );
    }
    if (freshBasic.supCount !== 0) {
      freshDom = (
        <Card>
          生鲜订单
          <Table columns={freshColumns} dataSource={freshList} size="small" />
          <div>总箱数：{freshBasic.supCount}</div>
          <div>总重量(KG)：{freshBasic.heavy}</div>
          <div>总金额(元)：{freshBasic.price}</div>
          {/* <div>消耗箱子：2个</div> */}
        </Card>
      );
    }
    return (
      <div className="OrderSccess-body">
        <div className="OrderSccess-header">
          <LeftOutlined
            className="arrow"
            onClick={this.goBackwards}
          ></LeftOutlined>
          <div className="OrderSccess-title">订单详情</div>
        </div>
        <Card id="OrderSccess-basicInfo">
          <div>签收成功</div>
          <div>签收说明：{orderBasic.signIn}</div>
          <div>签收时间：{orderBasic.sendTime}</div>
        </Card>

        <Card>
          <div className="OrderSccess-order">
            <div className="OrderSccess-orderheader">
              <div>订单编号：{orderBasic.orderId}</div>
              <div>签收成功</div>
            </div>

            <div>收件人：{orderBasic.consigneeName}</div>
            <div>电话：{orderBasic.consigneePhoneNumber}</div>
            <div>备用电话：{orderBasic.standbyPhoneNumber}</div>
            <div>收货地址：{orderBasic.consigneeAddress}</div>
          </div>
        </Card>
        {freshDom}
        {normalDom}
      </div>
    );
  }
}

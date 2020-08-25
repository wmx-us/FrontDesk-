import React, { Component } from "react";
import { Card, Table, Button, message, Modal } from "antd";
import { LeftOutlined } from "@ant-design/icons";
import Axios from "../../util/Axios";
import "../../css/orderDetail/OrderWaitPick.css";
import { ExclamationCircleOutlined } from "@ant-design/icons";
// import { createHashHistory } from "history";
// const hashHistory = createHashHistory();

// import ReactDOM from "react-dom";
const { confirm } = Modal;
export default class OrderWaitDelivery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orderData: [],
      userId:'',
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
      // orderBasic: {},
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
    console.log(this.props.location.state);
    Axios.post("zhouzhouController/selectMarkiOrder", {
      orderId: this.props.location.state.orderId,
      orderStatus: "待取货",
      signStatus: "待取货",
    })
      .then((data) => {
        let { data: res } = data;
        // console.log(res);
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
            userId:res.data.consignee[0].userId
          });
        }
      })
      .catch((erro) => {
        console.log(erro);
      });
  };

  // Search = () => {
  //   hashHistory.push({
  //     pathname: "/borrow/searchPage",
  //     query: { category: this.state.orderData },
  //   });
  // };

  //点击按钮修改状态
  upDate = () => {
    //弹出框
    confirm({
      title: "你确定已经取货吗?",
      icon: <ExclamationCircleOutlined />,
      content: "请在实际收货后再点击确认",
      okText: "确定",
      cancelText: "取消",
      onOk: () => {
        console.log("确认取货");
        Axios.post("zhouzhouController/pickUpGoods", {
          orderId: this.props.location.state.orderId,
          staffId: String(sessionStorage.getItem('courierId')),
          userId: this.state.userId,
          orderStatus: "配送中",
          signStatus: "配送中",
        })
          .then((data) => {
            let { data: res } = data;
            // console.log(res);
            //解构后端返回的数据
            this.props.history.push({pathname:"/ToDel",state:{key:2}});
            if (res.code === "0000") {
              // console.log(res);
              message.success("操作成功");
              // this.goBackwards()
              window.history.back(-1)
            }
            //如果返回成功，重新渲染页面
            if (res.code === "0001") {
              console.log(res);
              message.success("操作失败,请重试");
              window.history.back(-1)
            }
          })
          .catch((erro) => {
            console.log(erro);
          });
      },
      onCancel: () => {
        console.log("取消操作");
      },
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
      <div className="OrderWaitPick-body">
        <div className="OrderWaitPick-header">
          <LeftOutlined
            className="arrow"
            onClick={this.goBackwards}
          ></LeftOutlined>
          <div className="OrderWaitPick-title">订单详情</div>
        </div>
        <Card id="OrderWaitPick-basicInfo">
          <div>取货门店：{orderBasic.siteName}</div>
          <div>派单时间：{orderBasic.sendTime}</div>
        </Card>
        <Card>
          <div className="OrderWaitPick-order">
            <div className="OrderWaitPick-orderheader">
              <div>订单编号：{orderBasic.orderId}</div>
              <div>{orderBasic.orderStatus}</div>
              {/* <div>订单状态</div> */}
            </div>

            <div>收件人：{orderBasic.consigneeName}</div>
            <div>电话：{orderBasic.consigneePhoneNumber}</div>
            <div>备用电话：{orderBasic.standbyPhoneNumber}</div>
            <div>收货地址：{orderBasic.consigneeAddress}</div>
          </div>
        </Card>
        {freshDom}
        {normalDom}

        <div className="OrderWaitPick-bottom">
          <Button className="OrderWaitPick-button" onClick={this.upDate}>
            确认取货
          </Button>
        </div>
      </div>
    );
  }
}

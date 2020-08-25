import React, { Component } from "react";
import { Card, Table, message, Modal } from "antd";
import { LeftOutlined } from "@ant-design/icons";
import Axios from "../../util/Axios";
import "../../css/orderDetail/OrderFail.css";
import { ExclamationCircleOutlined } from "@ant-design/icons";
// import ReactDOM from "react-dom";
const { confirm } = Modal;
export default class OrderFail extends Component {
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
      orderBasic: {
        consigneeAddress: "欢乐颂3栋二单元303",
        consigneeName: "陈大爷",
        finishTime: "2020-08-02 15:50:56",
        logisticsId: "20200802000002-2",
        orderId: "20200802000002",
        orderStatus: "待取货",
        sendTime: "2020-08-02 15:50:56",
        signIn: "未接电话",
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
    console.log(this.props.location.state.orderId);
    this.renderAll();
  }
  renderAll = () => {
    Axios.post("zhouzhouController/selectMarkiOrder", {
      orderId: this.props.location.state.orderId,
      orderStatus: "签收失败",
    })
      .then((data) => {
        console.log(data);
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
            userId:res.data.consignee[0].userId
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
  returnOrder = () => {
    //弹出框
    confirm({
      title: "你确定退回吗?",
      icon: <ExclamationCircleOutlined />,
      content: "退回后订单将在站点重新分配",
      okText: "确定",
      cancelText: "取消",
      onOk: () => {
        console.log("确认退回");
        Axios.post("zhouzhouController/pickUpGoods", {
          orderId: this.props.location.state.orderId,
          staffId: sessionStorage.getItem('courierId'),
          userId: this.state.userId,
          orderStatus: "待取货",
          signStatus: "待取货",
        })
          .then((data) => {
            let { data: res } = data;

            if (res.code === "0000") {
              console.log(res);
              message.success("操作成功，返回首页");
              //返回到首页
              this.props.history.push("/index")
            }
            //如果返回成功，重新渲染页面
            if (res.code === "0001") {
              console.log(res);
              message.success("操作失败,请重试");
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
      <div className="OrderFail-body">
        <div className="OrderFail-header">
          <LeftOutlined
            className="arrow"
            onClick={this.goBackwards}
          ></LeftOutlined>
          <div className="OrderFail-title">订单详情</div>
        </div>
        <Card id="OrderFail-basicInfo">
          <div className="OrderFail-basic">
            <div>
              <div>签收失败</div>
              <div>签收说明：{orderBasic.signIn}</div>
              <div>签收时间：{orderBasic.sendTime}</div>
            </div>
            <div id="OrderFail-return" onClick={this.returnOrder}>
              退回
            </div>
          </div>
        </Card>

        <Card>
          <div className="OrderFail-order">
            <div className="OrderFail-orderheader">
              <div>订单编号：{orderBasic.orderId}</div>
              <div>签收失败</div>
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

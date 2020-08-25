import React, { Component } from "react";
import { Card, Button, Modal, Form, Select, Input, message } from "antd";
import { LeftOutlined } from "@ant-design/icons";
import Axios from "../../util/Axios";
import "../../css/orderDetail/OrderWaitSend.css";
const { Option } = Select;
const { TextArea } = Input;
// import ReactDOM from "react-dom";
export default class OrderWaitDelivery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //模态框
      orderData: [], //模态框控制显示隐藏
      ModalText: "模态框内容",
      visible: false,
      confirmLoading: false,
      userId:'',
      orderId:'',
      //模态框下拉菜单
      orderStatusList: ["签收成功", "签收失败"],
      optionDom: "",
      successList: [
        "本人签收",
        "物业签收",
        "自提柜签收",
        "他人代签收",
        "其他备注",
      ],
      failList: [
        "客户拒收",
        "客户不在家",
        "客户要求改期配送",
        "其他配送失败情况备注",
      ],
      optionDefault: "请点击下拉选择",
      signedOrNot: "",
      signDetail: "",
      signNote: "",
      //订单基本信息
      orderBasic: {
        consigneeAddress: "欢乐颂3栋二单元303",
        consigneeName: "陈大爷",
        pickuPtime: "2020-08-02 15:50:56",
        logisticsId: "20200802000002-2",
        orderId: "20200802000002",
        orderStatus: null,
        sendTime: null,
        signIn: "本人签收",
        siteName: null,
        standbyPhoneNumber: "14744444444",
      },
      normalBasic: {
        Temperature: [],
        heavy: 3,
        price: 7,
        supCount: 3,
      },
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
      freshBasic: { fresh: [], heavy: 3, price: 88, supCount: 3 },
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
    Axios.post("zhouzhouController/selectMarkiOrder", {
      orderId:this.props.location.state.orderId ,
      orderStatus: "配送中",
      signStatus: "配送中",
    })
      .then((data) => {
        console.log(data);
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
            userId:res.data.consignee[0].userId,
            orderId:this.props.location.state.orderId
          });
        }
      })
      .catch((erro) => {
        console.log(erro);
      });

    //   .catch((erro) => {
    //     console.log(erro);
    //   });
  };

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  //联动
  handleStatusChange = (value) => {
    console.log(value);
    if (value === "签收成功") {
      this.setState({
        signedOrNot: "签收成功",
        optionDom: this.state.successList.map((item) => (
          <Option key={item}>{item}</Option>
        )),
      });
    }
    if (value === "签收失败") {
      this.setState({
        // optionDefault: "",
        signedOrNot: "签收失败",
        optionDom: this.state.failList.map((item) => (
          <Option key={item}>{item}</Option>
        )),
      });
    }
  };

  handleDetailChange = (value) => {
    console.log("====================================");
    console.log(value);
    console.log("====================================");
    this.setState({ signDetail: value });
  };

  handleNoteChange = (e) => {
    console.log("====================================");
    console.log(e.target.value);
    console.log("====================================");
    this.setState({ signNote: e.target.value });
  };

  //确认签收情况
  handleOk = () => {
    this.setState({
      confirmLoading: true,
    });
    // let item={ orderId: this.props.location.state.orderId,
    //   staffId: String(sessionStorage.getItem('courierId')),
    //   userId: this.state.userId,
    //   orderStatus: this.state.signedOrNot,
    //   signStatus: this.state.signedOrNot,
    //   signIn: this.state.signDetail,};
    // console.log(item);
    Axios.post("zhouzhouController/pickUpGoods", {
      orderId: this.props.location.state.orderId,
      staffId: String(sessionStorage.getItem('courierId')),
      userId: this.state.userId,
      orderStatus: this.state.signedOrNot,
      signStatus: this.state.signedOrNot,
      signIn: this.state.signDetail,
    })
      .then((data) => {
        let { data: res } = data;
        // console.log(res);
        //解构后端返回的数据

        if (res.code === "0000") {
          console.log(res);
          message.success("操作成功");
          if (this.state.signedOrNot === "签收成功") {
            //跳转到成功页面
            this.props.history.push({pathname:"/orderSuccess",state:{orderId:this.state.orderId}})
          }
          if (this.state.signedOrNot === "签收失败") {
            //跳转到失败页面
            this.props.history.push({pathname:"/orderFail",state:{orderId:this.state.orderId}})
          }
        }
        //如果返回成功，重新渲染页面
        if (res.code === "0001") {
          console.log(res);
          message.success("操作失败,请重试");
        }
      })
      .catch((err) => {
        console.log(err);
      });
    console.log("====================================");
    // console.log(data);
    console.log("====================================");
  };

  //取消签收情况
  handleCancel = () => {
    console.log("点击了关闭按钮");
    this.setState({
      visible: false,
    });
  };


  goBackwards = () => {
    this.props.history.push({pathname:"/ToDel",state:{key:this.props.location.state.mykey}})
  };
  render() {
    const { visible, confirmLoading, orderBasic } = this.state;
    return (
      <div className="OrderWaitSend-body">
        <div className="OrderWaitSend-header">
          <LeftOutlined className="arrow" onClick={this.goBackwards}></LeftOutlined>
          <div className="OrderWaitSend-title">订单详情</div>
        </div>
        <Card id="OrderWaitSend-basicInfo">
          <div>取货时间：{orderBasic.pickuPtime}</div>
          <div>配送时间：{orderBasic.sendTime}</div>
        </Card>
        <Card>
          <div className="OrderWaitSend-order">
            <div className="OrderWaitSend-orderheader">
              <div>订单编号：{orderBasic.orderId}</div>
              <div>待配送</div>
            </div>
            <div>收件人：{orderBasic.consigneeName}</div>
            <div>电话：{orderBasic.consigneePhoneNumber}</div>
            <div>备用电话：{orderBasic.standbyPhoneNumber}</div>
            <div>收货地址：{orderBasic.consigneeAddress}</div>
          </div>
        </Card>

        {/* <Card>位置信息</Card> */}
        <div className="OrderWaitSend-bottom">
          <Button className="OrderWaitSend-button" onClick={this.showModal}>
            确认送达
          </Button>
        </div>

        <Modal
          visible={visible}
          onOk={this.handleOk}
          confirmLoading={confirmLoading}
          onCancel={this.handleCancel}
        >
          <Form>
            <Form.Item label="选择签收情况">
              <Select
                onChange={this.handleStatusChange}
                defaultValue={this.state.optionDefault}
              >
                {this.state.orderStatusList.map((item) => (
                  <Option key={item}>{item}</Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item label="详情">
              <Select
                onChange={this.handleDetailChange}
                defaultValue={this.state.optionDefault}
              >
                {this.state.optionDom}
              </Select>
            </Form.Item>
            <Form.Item label="备注">
              　<TextArea rows={4} onBlur={this.handleNoteChange}></TextArea>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    );
  }
}

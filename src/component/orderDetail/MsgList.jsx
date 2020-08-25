import React, { Component } from "react";
import { Card } from "antd";
import Axios from "../../util/Axios";
import { LeftOutlined } from "@ant-design/icons";
import "../../css/orderDetail/MsgList.css";

// import ReactDOM from "react-dom";
export default class MsgList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messageData: [],
    };
  }

  componentDidMount() {
    this.renderAll();
  }

  renderAll = () => {
    Axios.post("courierInfo/courierMsg", {
      courierId:sessionStorage.getItem('courierId'),
    })
      .then((data) => {
        let { data: res } = data;
        console.log(res);
        console.log(res.data);
        this.setState({
          messageData: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  goBackwards = () => {
    window.history.back(-1);
  };

  render() {
    const { messageData } = this.state;
    let msgDom = null;
    if (messageData !== []) {
      msgDom = messageData.map((item, index) => {
        return (
          <div className="MsgList-info" key={index}>
            {item}
          </div>
        );
      });
    }
    return (
      <div>
        <div className="MsgList-header">
          <LeftOutlined
            className="arrow"
            onClick={this.goBackwards}
          ></LeftOutlined>
          <div className="MsgList-title">消息中心</div>
        </div>
        <Card id="MsgList-basicInfo">
          <div>订单消息</div>
          <div>{msgDom}</div>
        </Card>
      </div>
    );
  }
}

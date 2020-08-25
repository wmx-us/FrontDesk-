import React, { Component } from 'react';
//引入antd的icon图标
import { LeftOutlined } from '@ant-design/icons';
import { Tabs } from 'antd';


//引入的页面
import StayPickUp from './StayPickUp'
import SignSuccessFully from './SignSuccessfully'
import SignFailed from './SignFailed'
import StayDelivery from './StayDelivery'

//引入css样式
import '../../css/StaffOrderList/DistributionRecords.css'

const { TabPane } = Tabs;

class DistributionRecords extends Component {
  constructor(props){
    super(props)
    this.state = {
      defaultActiveKey:'1',
      staffId:''
    }
  }
  UNSAFE_componentWillMount() {
    let data=this.props.location.state;
    this.setState({
      defaultActiveKey:data.key,
    });
    console.log(data);
  }
  getBack=()=>{
    this.props.history.push("/myOwn")
  };
  render() {
    console.log(this.state.defaultActiveKey);
    return (
      <div id='distributionRecords'>
        <div id='title'>
          <LeftOutlined className='goBack' onClick={()=>{this.getBack()}}/>
        配送记录
        </div>
        <div className='chooseTab'>
          <Tabs defaultActiveKey={this.state.defaultActiveKey} className='changeTab' centered>
            <TabPane tab="待取货" key="1">
              <StayPickUp mykey={this.state.defaultActiveKey}/>
            </TabPane>
            <TabPane tab="待送货" key="2">
              <StayDelivery mykey={this.state.defaultActiveKey}/>
            </TabPane>
            <TabPane tab="签收成功" key="3">
              <SignSuccessFully mykey={this.state.defaultActiveKey}/>
            </TabPane>
            <TabPane tab="签收失败" key="4">
              <SignFailed mykey={this.state.defaultActiveKey}/>
            </TabPane>
          </Tabs>
        </div>
      </div>
    );
  }
}

export default DistributionRecords;
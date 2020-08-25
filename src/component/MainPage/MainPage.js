import React, {Component} from 'react'
import {
   UserOutlined,
    CommentOutlined,
    SearchOutlined
} from '@ant-design/icons';
import { Form, Button,} from 'antd';
import '../../css/MainPage/MainPage.css'
import { Select } from 'antd';
import Axios from '../../util/Axios'
import { Modal } from 'antd';
const { Option } = Select;
class MainPage extends Component {
constructor(){
    super();
    this.state={
        data:[],
        mydata:[],
        items:[],
        inputValue:'',
        mystatus:'',
    }
}
UNSAFE_componentWillMount() {
    this.getMsg()

}
//============================页面渲染=========================
    getMsg=()=>{
        let myData=[];
        let myitems=[];
        let mystatus='';
        Axios.post("/distributionPort",{courierId:3}).then(data=>{
            console.log(data);
            let items=data.data.data.Undelivered;
            myitems=data.data.data.siteName;
            if (data.data.data.courierStatus=='停止接单'){
              mystatus='开始接单'
            } else {
                mystatus='停止接单'
            }
            items.map((item,index)=>{
                myData.push({
                    key:index,
                    orderId:item.orderId,
                    heavy:item.heavy,
                    count:item.count,
                    arrivalTime:item.arrivalTime,
                    consigneeAddress:item.consigneeAddress,
                    dispatchStatus:item.dispatchStatus,
                    distance:item.distance,
                    siteName:item.siteName,
                    sitePhoneNumber:item.sitePhoneNumber
                })
            });
            this.setState({
                data:myData,
                mydata:myData,
                items:myitems,
                mystatus:mystatus
            })
        });
    };


    handleChange=(value)=> {
        // console.log(`selected ${value}`);
        this.setState({
            inputValue:value
        })
        // console.log(this.state.inputValue)
    };


chooseOrder=(data,index)=>{
    console.log(data);
    console.log(index);
    if (this.state.mystatus=='开始接单'){
        this.countDown()
    } else {
        Axios.post("/distributionPort/setReceivingOrders",{courierId:3,orderId:data}).then(data=>{
            this.getMsg();
        })
    }

};

    changeStatus=()=>{
        if (this.state.mystatus=='停止接单'){
            this.setState({
                mystatus:'开始接单',
            },()=>{
                Axios.post("/distributionPort/receivingOrders",{courierId:3,courierState:'停止接单'})
            })
        } else {
            this.setState({
                mystatus:'停止接单'
            },()=>{
                Axios.post("/distributionPort/receivingOrders",{courierId:3,courierState:'开始接单'})
            })
        }
    };
mySearch=()=>{
    let myitem=[];
    if (this.state.inputValue=="全部"){
        let myitem=this.state.data;
        this.setState({
            mydata:myitem
        })
    } else {
        let myitem=this.state.data.filter((value)=>{
            return  value.siteName==this.state.inputValue
        });
        this.setState({
            mydata:myitem
        })
    }
    console.log(myitem)

};
myOwn=()=>{
    this.props.history.push("/myOwn")
};
    getMyMsg=()=>{
        this.props.history.push("MsgList")
    };

//========================弹框===========================
    countDown=()=> {
        let secondsToGo = 5;
        const modal = Modal.success({
            title: '请开启手机定位，开始接单',
            content: `${secondsToGo} 秒钟后自动关闭.`,
        });
        const timer = setInterval(() => {
            secondsToGo -= 1;
            modal.update({
                content: `${secondsToGo} 秒钟后自动关闭.`,
            });
        }, 1000);
        setTimeout(() => {
            clearInterval(timer);
            modal.destroy();
        }, secondsToGo * 1000);
    }
    render() {
        console.log(this.state.mydata);
        let arr=this.state.mydata.map((item,index)=>{
            if (item.dispatchStatus!=null){
                return(<div className="m_c_content" key={index}>
                    <p className="m_c_p_content"><span>订单编号：{item.orderId}</span> <span className="m_c_p_s_content">{item.siteName}</span></p>
                    <p>距离：{item.distance}KM</p>
                    <p>重量：{item.heavy}KG</p>
                    <p>箱数：{item.count}</p>
                    <p className="my_p">收货地址：{item.consigneeAddress}</p>
                    <p >到货时间：{item.arrivalTime}</p>
                    <div className="m_p_content"><p>平台派单</p></div>
                </div>)
            }

        });
        let myarr=this.state.mydata.map((item,index)=>{
            if (item.dispatchStatus===null){
                return (<div className="m_c_content" key={index+index}>
                    <p className="m_c_p_content"><span>订单编号：{item.orderId}</span> <span className="m_c_p_s_content">{item.siteName}</span></p>
                    <p>距离：{item.distance}KM</p>
                    <p>重量：{item.heavy}KG</p>
                    <p>箱数：{item.count}</p>
                    <p className="my_p">收货地址：{item.consigneeAddress}</p>
                    <p >到货时间：{item.arrivalTime}</p>
                    <div className="m_q_content"><button onClick={()=>{this.chooseOrder(item.orderId,index)}}>抢单</button></div>
                </div>)
            }
        });
        let arrs=this.state.items.map((item,index)=>{
            return(<Option value={item} key={index}>{item}</Option>)
        });

        return (
            <div>
                <div className="m_fixed">
                    <div className="m_title">
                        <UserOutlined style={{fontSize:30,marginTop:10,marginLeft:5,color:'white'}} onClick={()=>{this.myOwn()}}/>
                        <h3>小U到家</h3>
                        <CommentOutlined style={{fontSize:30,marginTop:10,marginRight:5,color:'white'}} onClick={()=>{this.getMyMsg()}}/>
                    </div>
                </div>

                <div className="m_search">
                    <Select defaultValue="全部" style={{ width: 250 ,marginLeft:10}} onChange={this.handleChange} size={'small'}>
                        <Option value="全部">全部</Option>
                        {arrs}
                    </Select>
                    <Button icon={<SearchOutlined />} style={{marginRight:10}} size={"small"} onClick={()=>{this.mySearch()}}>Search</Button>
                </div>


                <div className="m_content" >
                    {arr}
                    {myarr}
                </div>
                <div className="m_bottom">
                    <button onClick={()=>{this.changeStatus()}}>{this.state.mystatus}</button>
                </div>

            </div>
        )
    }
}

export default MainPage

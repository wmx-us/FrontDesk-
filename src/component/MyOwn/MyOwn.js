import React, {Component} from 'react'
import {
    LeftOutlined,
    RightOutlined,
    PhoneOutlined,
    ShopTwoTone,
    CarTwoTone,
    CloseSquareTwoTone,
    CheckSquareTwoTone
} from '@ant-design/icons';
import '../../css/MyOwn/MyOwn.css'
import Axios from '../../util/Axios'
class MyOwn extends Component {
    constructor(){
        super()
        this.state={
            deliveredCountNumber:'',
            failNumber:'',
            inProgressNumber:'',
            name:'',
            sitePhoneNumber:'',
            successNumber:'',
            toBeDeliveredNumber:'',
        }
    }
    getBackPage=()=>{
        // console.log(1234);
        // window.history.back(-1)
        this.props.history.push("/index");
};
getOut=()=>{
    sessionStorage.clear();
        this.props.history.push("/login")
};
changePwd=()=> {
    this.props.history.push({pathname: "/ChangePassword", query: {courierId: sessionStorage.getItem('courierId')}})
};
    toDeltial=(data)=>{
        // sessionStorage.setItem('mykey',data);
        this.props.history.push({pathname:"/ToDel",state:{key:data}})
    };

componentDidMount() {
Axios.post("/courierInfo",{courierId:sessionStorage.getItem('courierId')}).then(data=>{
    console.log(data.data.data);
    let item=data.data.data;
    this.setState({
        deliveredCountNumber:item.deliveredCountNumber,
        failNumber:item.failNumber,
        inProgressNumber:item.inProgressNumber,
        name:item.name,
        sitePhoneNumber:item.sitePhoneNumber,
        successNumber:item.successNumber,
        toBeDeliveredNumber:item.toBeDeliveredNumber,//dqh
    })
})
}

    render() {
        return (
            <div className="main_div">
                <div className="own_title">
                    <LeftOutlined style={{fontSize:20,marginTop:15,marginLeft:10,float:'left',color:'white'}} onClick={()=>{this.getBackPage()}}/>
                    <h3>个人中心</h3>
                    <div></div>
                </div>
                <div className="own_self">
                    <div><img src={require(`../../static/images/login.jpg`)} alt=""/></div>
                    <div className="own_content">
                        <h3>配送员-{this.state.name}</h3>
                        <p>已配送订单数：{this.state.deliveredCountNumber}</p>
                    </div>
                </div>
                <div className="own_order">
                    <h3>配送记录</h3>
                    <div>
                        <div onClick={()=>{this.toDeltial('1')}}>
                            <p><ShopTwoTone style={{fontSize:30}} twoToneColor="#52c41a"/></p>
                            <p>待取货({this.state.toBeDeliveredNumber})</p>
                        </div>
                        <div onClick={()=>{this.toDeltial('2')}}>
                            <p><CarTwoTone style={{fontSize:30}} twoToneColor="#FFA500"/></p>
                            <p>待送货({this.state.inProgressNumber})</p>
                        </div>
                        <div onClick={()=>{this.toDeltial('3')}}>
                            <p><CloseSquareTwoTone style={{fontSize:30}} twoToneColor="#52c41a"/></p>
                            <p>签收成功({this.state.successNumber})</p>
                        </div>
                        <div onClick={()=>{this.toDeltial('4')}}>
                            <p><CheckSquareTwoTone style={{fontSize:30}} twoToneColor="#F80012"/></p>
                            <p>签收失败({this.state.failNumber})</p>
                        </div>
                    </div>
                </div>
                <div className="own_other">
                    <h3>其他</h3>
                    <div onClick={()=>{this.changePwd()}}>
                        <h4>修改密码</h4>
                        <RightOutlined style={{fontSize:20,marginRight:10,marginTop:15}}/>
                    </div>
                    <div>
                        <h4>联系客服</h4>
                        <PhoneOutlined style={{fontSize:20,marginRight:10,marginTop:15}}/>
                    </div>


                </div>
                <div className="own_out" onClick={()=>{this.getOut()}}>
                    <h3>退出登录</h3>
                </div>
            </div>
        )
    }
}

export default MyOwn

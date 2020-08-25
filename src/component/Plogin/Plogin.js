import React, {Component} from 'react'
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import '../../css/Plogin/Plogin.css'
import Axios from '../../util/Axios'

class Plogin extends Component {
    constructor(){
        super();
        this.state={
            display:'none'
        }
    }

        onFinish = values => {
            console.log(values);
            Axios.post("/sysUser/login",{staffNumber:values.username,staffPassword:values.password}).then(data=>{
                console.log(data);
                if (data.data.code=='0000'){
                    const token=data.data.data.Authorization;
                    console.log(token)
                    sessionStorage.setItem('token',token);
                    sessionStorage.setItem('courierId',data.data.data.userId);
                    this.setState({
                        display:'none'
                    });
                    this.props.history.push("/index");
                } else {
                    this.setState({
                        display:'block'
                    })
                }
            })
        };
        render() {
            return (
                <div className="Plogin">
                    <div className="p_title">
                        <h3>小U到家</h3>
                    </div>
                    <div className="p_content">
                        <img src={require(`../../static/images/login.jpg`)}alt=""/>
                        <p>欢迎回来-老王</p>
                    </div>
                    <div className="p_form">
                        <Form
                            name="normal_login"
                            className="login-form"
                            initialValues={{remember: true}}
                            onFinish={this.onFinish}
                        >
                            <Form.Item
                                name="username"
                                rules={[{required: true, message: 'Please input your Username!'}]}
                            >
                                <Input prefix={<UserOutlined className="site-form-item-icon"/>} placeholder="Username"/>
                            </Form.Item>
                            <Form.Item
                                name="password"
                                rules={[{required: true, message: 'Please input your Password!'}]}
                            >
                                <Input
                                    prefix={<LockOutlined className="site-form-item-icon"/>}
                                    type="password"
                                    placeholder="Password"
                                />
                            </Form.Item>
                            <Form.Item>
                                {/*<Form.Item name="remember" valuePropName="checked" noStyle>*/}
                                {/*    <Checkbox>Remember me</Checkbox>*/}
                                {/*</Form.Item>*/}

                                {/*<a className="login-form-forgot" href="">*/}
                                {/*    Forgot password*/}
                                {/*</a>*/}
                                <p style={{display:this.state.display,color:'red'}}>密码错误请重新输入</p>
                            </Form.Item>

                            <Form.Item>
                                <Button type="primary" htmlType="submit" className="login-form-button" style={{backgroundColor:'#34A5AB'}} block>
                                    登录
                                </Button>
                                {/*Or <a href="">register now!</a>*/}
                            </Form.Item>
                        </Form>
                    </div>
                </div>
            )
        }
    }

export default Plogin

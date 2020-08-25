import React, { Component } from 'react'
import { LeftOutlined } from '@ant-design/icons';

import { Form, Input, Button,message } from 'antd';
import Axios from '../../util/Axios';

// import { thisExpression } from '@babel/types';


export default class ChangePassword extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }
getBack=()=>{
    window.history.back(-1);
}
  render() {
    const onFinish = values => {
      console.log('Success:', values);
      values.staffId = '3';
      console.log('Success:', values);

      Axios.post('/sysUser/updatePassword',values)
      .then(res => {
        console.log(res);
        if(res.status === 200){
          if(res.data.msg === '修改成功'){
            message.success('密码修改成功')
          }else{
            message.error(res.data.msg)
          }
        }
      })
    };

    return (
      <div id='changePsw' style={{
        width: '100vw',
        position: 'relative',
        padding: '5vh 1vh'
      }}>
        <div id='title' style={{
          backgroundColor: '#00a9af',
          width: '100vw',
          height: '4vh',
          lineHeight: '4vh',
          textAlign: 'center',
          color: 'white',
          position: 'fixed',
          top: '0',
          left: '0',
          zIndex: '99',
        }}>
          <LeftOutlined className='goBack' style={{
            position: 'absolute',
            top: '50%',
            left: '1%',
            transform: 'translate(0, -50%)',
            fontSize: '20px',
          }} onClick={()=>{this.getBack()}}/>
        配送记录
        </div>

        <Form
          name="basic"

          onFinish={onFinish}
        >
          <Form.Item
            label="原密码"
            name="staffPassword"
            rules={[
              {
                required: true,
                message: '请输入原密码',
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            label="新密码"
            name="newStaffPassword"
            validateTrigger='onBlur'
            rules={[
              {
                required: true,
                message: '请输入新密码',
              },
              ({ getFieldValue }) => ({
                validator(rule, value) {
                  if (!value || getFieldValue('surepsw') === value ) {
                    return Promise.resolve();
                  }
                  return Promise.reject('两次密码输入不一致！！');
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            label="确认密码"
            name="surepsw"
            validateTrigger='onBlur'
            rules={[
              {
                required: true,
                message: '请输入确认密码',
              },
              ({ getFieldValue }) => ({
                validator(rule, value) {
                  if (!value || getFieldValue('newStaffPassword') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject('两次密码输入不一致！！');
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>


          <Form.Item style={{ textAlign: 'center' }}>
            <Button type="primary" htmlType="submit">
              确认修改
        </Button>
          </Form.Item>
        </Form>



      </div >
    )
  }
}



import React, { useState } from 'react';
import type { FormProps } from 'antd';
import { Button, Form, Input} from 'antd';
import { useLogin } from '../../hooks/auth/useLogin';
import NotificationMessage from '../Notification/NotificationMessage';
import {CheckCircleOutlined, ExclamationCircleOutlined} from '@ant-design/icons'
import { useNavigate } from 'react-router';

type FieldType = {
    username: string;
    password: string;
};


const Login: React.FC = () => {
    const { login, loading, error } = useLogin();
    const navigate = useNavigate();
    const [notification, setNotification] = useState<{
        message: string;
        icon: React.ReactNode;
        description?: string;
      } | null>(null);
    
      const onFinish = async (values: FieldType) => {
        const result = await login(values);
        if (result && result.status === 200) {
          setNotification({
            message: result.message || 'Login Successful',
            icon: <CheckCircleOutlined style={{ color: 'green' }} />,
            description: 'Redirecting to home...',
          });
          setTimeout(() => navigate('/'), 1000); // Delay for notification visibility
        } else {
          setNotification({
            message: error || 'Login Failed',
            icon: <ExclamationCircleOutlined style={{ color: 'red' }} />,
            description: 'Please check your credentials and try again.',
          });
        }
      };
    
    const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
        console.log("failed : ", errorInfo)
        setNotification({
            message: 'Form Validation Failed',
            icon: <ExclamationCircleOutlined style={{ color: 'red' }} />,
            description: 'Please fill in all required fields.',
        });
    };
    
    return (
        <div>
            {notification && (
                <NotificationMessage
                    message={notification.message}
                    icon={notification.icon}
                    description={notification.description}
                    placement="topLeft"
                    duration={5}
                />
            )}
            <Form
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="on"
            >
                <Form.Item<FieldType>
                    label="User ID"
                    name="username"
                    rules={[{ required: true, message: 'Please input your user id!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item<FieldType>
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item label={null}>
                    <Button type="primary" htmlType="submit" loading={loading}>
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
};

export default Login;
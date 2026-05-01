import React from 'react';
import { ConfigProvider, Tabs } from 'antd';
import './userPage.css';
import UserList from '../../components/user/UserList';
import ApprovalUser from '../../components/user/ApprovalUser';

const onChange = (key: string) => {
  console.log(key);
};

const UserPage: React.FC = () => {

    const labels = [
        {
            title : "User",
            children : <UserList />
        },
        {
            title : "Approval Status",
            children : <ApprovalUser />
        }
    ]

    return (
        <ConfigProvider
            theme={{
                components: {
                    Tabs : {
                        itemColor : "white",
                        itemHoverColor: "white",
                        itemSelectedColor: "#191361",
                        itemActiveColor: "white"
                    }
                }
            }}
        >
            <Tabs
                onChange={onChange}
                type="card"
                className='ant-tabs-tab'
                tabBarGutter={10}
                tabBarStyle={{
                    background: "#191361",
                }}
                items={labels.map((item, i) => {
                    return {
                        label: item.title,
                        key: (i).toString(),
                        children: item.children,
                    };
                })}
            />
        </ConfigProvider>
    );
}

export default UserPage;
import React from 'react';
import type { MenuProps } from 'antd';
import { Button, ConfigProvider, Dropdown } from 'antd';
import { DownOutlined } from '@ant-design/icons';


interface DropDownType {
    items : MenuProps['items'];
    currentItem : string;
}

const DropDown: React.FC <DropDownType> = ({items, currentItem}) => {

    return (
        <ConfigProvider
            theme={{
                components : {
                    Button: {
                        defaultActiveBorderColor: "#191361",
                        defaultHoverBorderColor: "#191361"
                    }
                }
            }}
        >
            <Dropdown menu={{ items }} placement="bottomLeft" arrow>
                <Button
                    icon={<DownOutlined />}
                    iconPosition='end'
                    style={{
                        color: "#191361"
                    }}
                >{currentItem}</Button>
            </Dropdown>
        </ConfigProvider>
    );
};

export default DropDown;
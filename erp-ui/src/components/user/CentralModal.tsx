import React, { useRef, useState } from 'react';
import { Flex, FormInstance, Modal } from 'antd';
import CreateUserForm from './CreateUserForm';
import { useUser } from '../../hooks/user/useUser';
import { CheckCircleOutlined, ExclamationCircleOutlined } from '@ant-design/icons'
import NotificationMessage from '../Notification/NotificationMessage';

interface CentralModalType {
    triggerButton : React.JSX.Element;
}

const CentralModal: React.FC<CentralModalType> = ({triggerButton}) => {
  const [openResponsive, setOpenResponsive] = useState(false);
  const [notification, setNotification] = useState<{
    message: string;
    icon: React.ReactNode;
    description?: string;
  } | null>(null);
  const formRef = useRef<FormInstance>(null);

  const {createUser, loading, error} = useUser();

  const handleFormSubmit = async (values: any) => {
    // console.log('Submitted values:', values);
    const result = await createUser(values);
    if (result?.status === 200) {
      setNotification({
        message: result?.message,
        icon: <CheckCircleOutlined style={{ color: "green" }} />,
        description: "",
      });
      // ✅ Reset the form fields
      formRef.current?.resetFields();

      // Reload Page
      window.location.reload();
    } else {
      setNotification({
        message: error?.message || "Request Failed",
        icon: <ExclamationCircleOutlined style={{ color: "red" }} />,
        description: "Please review the form again.",
      });
    }
    setOpenResponsive(false);
  };

  return (
    <Flex vertical gap="middle" align="flex-start">
      {/* Notification */}
      {notification && (
            <NotificationMessage
              message={notification.message}
              icon={notification.icon}
              description={notification.description}
              placement="topLeft"
              duration={5}
            />
          )}
      {/* Responsive */}
      <div style={{display: "flex"}} onClick={() => setOpenResponsive(true)}>
        {triggerButton}
      </div>
      <Modal
        maskClosable={false}
        title=""
        centered
        open={openResponsive}
        onCancel={() => setOpenResponsive(false)}
        okText={"Submit"}
        width={{
          xs: '90%',
          sm: '80%',
          md: '70%',
          lg: '60%',
          xl: '50%',
          xxl: '40%',
        }}
        footer={null}
      >
        <CreateUserForm ref={formRef} onFinish={handleFormSubmit} />
      </Modal>
    </Flex>
  );
};

export default CentralModal;
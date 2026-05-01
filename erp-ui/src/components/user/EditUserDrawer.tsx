import React, { useRef, useState } from 'react';
import { Button, Checkbox, Col, DatePicker, Drawer, Form, FormInstance, Input, Radio, Row, Select, Space } from 'antd';
import { Role } from '../../Constants/Role';
import dayjs from 'dayjs';
import { ArrowLeftOutlined, CheckCircleOutlined, ExclamationCircleOutlined } from '@ant-design/icons'
import { useUser } from '../../hooks/user/useUser';
import NotificationMessage from '../Notification/NotificationMessage';
import Password from 'antd/es/input/Password';

interface userList {
    iu_ID: number;
    iu_UserID: string;
    iu_Username: string;
    PasswordHash: string;
    FirstName: string;
    LastName: string;
    Email: string;
    PhoneNumber: string;
    Gender: String;
    iu_RoleID: number;
    RoleName: String;
    IsActive: boolean;
    IsApproved: number;
    ApprovedDate: Date;
    ApprovedBy: number;
    Remark: String;
    CreatedDate: Date;
    DOB: Date;
}

type EditUserType = {
    triggerButton: React.JSX.Element;
    record: userList;
}

interface SubmitButtonProps {
    form: FormInstance;
}

const SubmitButton: React.FC<React.PropsWithChildren<SubmitButtonProps>> = ({ form, children }) => {
    const [submittable, setSubmittable] = React.useState<boolean>(false);

    // Watch all values
    const values = Form.useWatch([], form);

    React.useEffect(() => {
        form
            .validateFields({ validateOnly: true })
            .then(() => setSubmittable(true))
            .catch(() => setSubmittable(false));
    }, [form, values]);

    return (
        <Button type="primary" htmlType="submit" onClick={() => form.submit()} disabled={!submittable}>
            {children}
        </Button>
    );
};

const EditUserDrawer: React.FC<EditUserType> = ({ triggerButton, record }) => {
    const [open, setOpen] = useState(false);
    const [notification, setNotification] = useState<{
        message: string;
        icon: React.ReactNode;
        description?: string;
    } | null>(null);
    const [form] = Form.useForm();

    const { createUser, loading, error } = useUser();


    const handleFormSubmit = async (values: any) => {
        console.log('Submitted values:', values);
        const result = await createUser(values);
        if (result?.status === 200) {
            setNotification({
                message: result?.message,
                icon: <CheckCircleOutlined style={{ color: "green" }} />,
                description: "",
            });
            // ✅ Reset the form fields
            // formRef.current?.resetFields();

            // Reload Page
            setTimeout(() => window.location.reload(), 1000);
        } else {
            setNotification({
                message: error?.message || "Request Failed",
                icon: <ExclamationCircleOutlined style={{ color: "red" }} />,
                description: "Please review the form again.",
            });
        }
        setOpen(false);
    };

    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };

    return (
        <>
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
            <span onClick={showDrawer}>
                {triggerButton}
            </span>
            <Drawer
                title={record.iu_UserID}
                width={560}
                onClose={onClose}
                closeIcon={<ArrowLeftOutlined />}
                open={open}
                styles={{
                    body: {
                        paddingBottom: 80,
                    },
                }}
                extra={
                    <Space>
                        <Button onClick={onClose}>Cancel</Button>
                        <SubmitButton form={form}>
                            Submit
                        </SubmitButton>
                    </Space>
                }
            >
                <Form
                    layout="vertical"
                    form={form}
                    onFinish={handleFormSubmit}
                    initialValues={
                        {
                            iu_Username: record.iu_Username,
                            FirstName: record.FirstName,
                            LastName: record.LastName,
                            Gender: record.Gender,
                            DOB: record.DOB ? dayjs(record.DOB) : undefined, // Convert to dayjs object
                            iu_RoleID: record.iu_RoleID,
                            Email: record.Email,
                            PhoneNumber: record.PhoneNumber,
                            IsActive: record.IsActive === true ? 1 : 0,
                            iu_UserID : record.iu_UserID,
                            PasswordHash : record.PasswordHash
                        }
                    }
                    hideRequiredMark
                >
                    <Form.Item name="iu_UserID" hidden>
                        <Input />
                    </Form.Item>

                    <Form.Item name="PasswordHash" hidden>
                        <Input />
                    </Form.Item>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item name="iu_Username" label={<span style={{ fontSize: "12px" }}>Username</span>} rules={[{ required: true }]}>
                                <Input style={{ color: '#191361', fontWeight: 600, fontSize: '14px' }} defaultValue={record.iu_Username} autoComplete='off' />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item name="FirstName" label={<span style={{ fontSize: "12px" }}>First Name</span>} style={{ color: "#191361" }} rules={[{ required: true }]}>
                                <Input style={{ color: '#191361', fontWeight: 600, fontSize: '14px' }} defaultValue={record.FirstName} />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item name="LastName" label={<span style={{ fontSize: "12px" }}>Last Name</span>} rules={[{ required: true }]}>
                                <Input style={{ color: '#191361', fontWeight: 600, fontSize: '14px' }} defaultValue={record.LastName} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item name="Gender" label={<span style={{ fontSize: "12px" }}>Gender</span>} style={{ color: "#191361" }} rules={[{ required: true }]}>
                                <Radio.Group
                                    value={'m'}
                                    buttonStyle='solid'
                                    defaultValue={record.Gender}
                                    optionType='button'
                                    options={[
                                        { value: "M", label: "Male" },
                                        { value: 'F', label: "Female" },
                                        { value: 'O', label: "Other" },
                                    ]}
                                    style={{ color: '#191361', fontWeight: 600, fontSize: '14px' }}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="DOB"
                                label={<span style={{ fontSize: "12px" }}>Date of Birth</span>}
                                rules={[{ required: true, message: "Please select date of birth" }]}
                            >
                                <DatePicker
                                    style={{ color: '#191361', fontWeight: 600, fontSize: '14px', width: '100%' }}
                                    format="YYYY-MM-DD"
                                    defaultValue={record.DOB ? dayjs(record.DOB) : undefined}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item name="iu_RoleID" label={<span style={{ fontSize: "12px" }}>User Role</span>} style={{ color: "#191361" }} rules={[{ required: true }]}>
                                <Select
                                    showSearch
                                    style={{ color: '#191361', fontWeight: 600, fontSize: '14px', width: 200 }}
                                    placeholder="Select Role"
                                    defaultValue={record.RoleName}
                                    optionFilterProp="label"
                                    filterSort={(optionA, optionB) =>
                                        (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                                    }
                                    options={Object.values(Role).map((id, i) => (
                                        {
                                            value: i + 1,
                                            label: id
                                        }
                                    ))}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="Email"
                                label={<span style={{ fontSize: "12px" }}>Email</span>}
                                hasFeedback
                                rules={[
                                    { required: true, message: 'Email is required' },
                                    { type: 'email', message: 'Please enter a valid email address' }
                                ]}
                            >
                                <Input style={{ color: '#191361', fontWeight: 600, fontSize: '14px' }} defaultValue={record.Email} />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="PhoneNumber"
                                label={<span style={{ fontSize: "12px" }}>Phone Number</span>}
                                hasFeedback
                                rules={[
                                    { required: true, message: 'Phone number is required' },
                                    {
                                        pattern: /^[0-9]{10}$/,
                                        message: 'Phone number must be 10 digits'
                                    }
                                ]}
                            >
                                <Input addonBefore="+91" maxLength={10} style={{ color: '#191361', fontWeight: 600, fontSize: '14px' }} defaultValue={record.PhoneNumber} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Item
                                name="IsActive"
                                valuePropName="checked"
                                getValueFromEvent={(e) => (e.target.checked ? 1 : 0)}
                                initialValue={record.IsActive}
                            >
                                <Checkbox>
                                    Is Active
                                </Checkbox>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Drawer>
        </>
    );
};

export default EditUserDrawer;
import React from 'react';
import type { FormInstance } from 'antd';
import { Button, Checkbox, DatePicker, Flex, Form, Input, Radio, Select, Space, Typography } from 'antd';
import { Role } from '../../Constants/Role';

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
        <Button type="primary" htmlType="submit" disabled={!submittable}>
            {children}
        </Button>
    );
};

interface CreateUserFormProps {
    onFinish: (values: any) => void;
}

const CreateUserForm = React.forwardRef<FormInstance, CreateUserFormProps>(({ onFinish }, ref) => {
    const [form] = Form.useForm();

    React.useImperativeHandle(ref, () => form);

    return (
        <Flex style={{ width: "100%", margin: "auto", flexDirection: "column" }}>
            <Flex style={{ marginBottom: "10px" }}>
                <span style={{ height: "10px", width: "10px", borderRadius: "50%", background: "#f44", margin: "0 5px" }}></span>
                <span style={{ height: "10px", width: "10px", borderRadius: "50%", background: "#9b3", margin: "0 5px" }}></span>
                <span style={{ height: "10px", width: "10px", borderRadius: "50%", background: "#fb5", margin: "0 5px" }}></span>
            </Flex>
            <Typography.Text style={{ textAlign: "center", fontWeight: "700", fontSize: "26px", color: "#191361", textTransform: "capitalize", marginBottom: "10px" }}>
                create new user
            </Typography.Text>
            <Form
                form={form}
                name="validateOnly"
                layout="vertical"
                autoComplete="off"
                style={{
                    display: "flex",
                    justifyContent: "flex-start",
                    width: "60%",
                    margin: "auto",
                    flexWrap: "wrap",
                    marginTop: "10px"
                }}
                onFinish={onFinish}
            >
                <Space style={{ width: "100%", display: "flex", justifyContent: "space-between", margin: "auto" }}>
                    <Form.Item name="iu_Username" label={<span style={{ fontSize: "12px" }}>Username</span>} rules={[{ required: true }]}>
                        <Input style={{ color: '#191361', fontWeight: 600, fontSize: '14px' }} autoComplete='off' />
                    </Form.Item>
                </Space>
                <Space style={{ width: "100%", display: "flex", justifyContent: "space-between" }}>
                    <Form.Item name="FirstName" label={<span style={{ fontSize: "12px" }}>First Name</span>} style={{ color: "#191361" }} rules={[{ required: true }]}>
                        <Input style={{ color: '#191361', fontWeight: 600, fontSize: '14px' }} />
                    </Form.Item>
                    <Form.Item name="LastName" label={<span style={{ fontSize: "12px" }}>Last Name</span>} rules={[{ required: true }]}>
                        <Input style={{ color: '#191361', fontWeight: 600, fontSize: '14px' }} />
                    </Form.Item>
                </Space>
                <Space style={{ width: "100%", display: "flex", justifyContent: "space-between" }}>
                    <Form.Item name="Gender" label={<span style={{ fontSize: "12px" }}>Gender</span>} style={{ color: "#191361" }} rules={[{ required: true }]}>
                        <Radio.Group
                            value={'m'}
                            buttonStyle='solid'
                            optionType='button'
                            options={[
                                { value: "M", label: "Male" },
                                { value: 'F', label: "Female" },
                                { value: 'O', label: "Other" },
                            ]}
                            style={{ color: '#191361', fontWeight: 600, fontSize: '14px' }}
                        />
                    </Form.Item>
                    <Form.Item
                        name="DOB"
                        label={<span style={{ fontSize: "12px" }}>Date of Birth</span>}
                        rules={[{ required: true, message: "Please select date of birth" }]}
                    >
                        <DatePicker
                            style={{ color: '#191361', fontWeight: 600, fontSize: '14px', width: '100%' }}
                            format="YYYY-MM-DD"
                        />
                    </Form.Item>
                </Space>
                <Space style={{ width: "100%", display: "flex", justifyContent: "space-between" }}>
                    <Form.Item
                        name="iu_UserID"
                        label={<span style={{ fontSize: "12px" }}>User Id</span>}
                        style={{ color: "#191361" }}
                        hasFeedback
                        rules={[
                            { required: true, message: 'User ID is required' },
                            {
                                validator: (_, value) => {
                                    const pattern = /^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{6,}$/;
                                    if (!value || pattern.test(value)) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(
                                        new Error('Must include uppercase, special char, digit, and be at least 6 characters')
                                    );
                                },
                            },
                        ]}
                    >
                        <Input style={{ color: '#191361', fontWeight: 600, fontSize: '14px' }} />
                    </Form.Item>
                    <Form.Item name="iu_RoleID" label={<span style={{ fontSize: "12px" }}>User Role</span>} style={{ color: "#191361" }} rules={[{ required: true }]}>
                        <Select
                            showSearch
                            style={{ color: '#191361', fontWeight: 600, fontSize: '14px', width: 200 }}
                            placeholder="Select Role"
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
                </Space>
                <Space style={{ width: "100%", display: "flex", justifyContent: "space-between" }}>
                    <Form.Item name="PasswordHash" label={<span style={{ fontSize: "12px" }}>Password</span>} style={{ color: "#191361" }} rules={[{ required: true }]}>
                        <Input type='password' style={{ color: '#191361', fontWeight: 600, fontSize: '14px' }} autoComplete={'new-password'} />
                    </Form.Item>
                </Space>
                <Space style={{ width: "100%", display: "flex", justifyContent: "space-between" }}>
                    <Form.Item
                        name="Email"
                        label={<span style={{ fontSize: "12px" }}>Email</span>}
                        hasFeedback
                        rules={[
                            { required: true, message: 'Email is required' },
                            { type: 'email', message: 'Please enter a valid email address' }
                        ]}
                    >
                        <Input style={{ color: '#191361', fontWeight: 600, fontSize: '14px' }} />
                    </Form.Item>

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
                        <Input addonBefore="+91" maxLength={10} style={{ color: '#191361', fontWeight: 600, fontSize: '14px' }} />
                    </Form.Item>

                </Space>
                <Space style={{ width: "100%", display: "flex", justifyContent: "space-between" }}>
                    <Form.Item
                        name="isActive"
                        valuePropName="checked"
                        getValueFromEvent={(e) => (e.target.checked ? 1 : 0)}
                        initialValue={1}
                    >
                        <Checkbox disabled defaultChecked>
                            Is Active
                        </Checkbox>
                    </Form.Item>
                </Space>
                <Space
                    style={{
                        marginTop: "10px",
                        justifyContent: "center",
                        width: "100%"
                    }}
                >
                    <Button htmlType="reset">Reset</Button>
                    <SubmitButton form={form}>Submit</SubmitButton>
                </Space>
            </Form>
        </Flex>
    );
});

export default CreateUserForm;
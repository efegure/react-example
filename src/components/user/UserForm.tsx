import React from 'react'
import { Button, Form, Input, Select, Space } from 'antd'
import { User } from '~/types/domain'

const layout = { labelCol: { span: 8 }, wrapperCol: { span: 16 } }

const tailLayout = { wrapperCol: { offset: 8, span: 16 } }
interface UserFormValues {
    firstName: string
    lastName: string
    email: string
}
interface UserProps {
    user?: User
    onSubmit: (values: UserFormValues) => void
    loading: boolean
}

const UserForm: React.FC<UserProps> = ({ user, loading, onSubmit }) => {
    const [form] = Form.useForm()
    if (user && user.id) {
        form.setFieldsValue(user)
    }

    const onFinish = ({ firstName, lastName, email }: { firstName: string; lastName: string; email: string }) => {
        onSubmit({ firstName, lastName, email })
    }

    return (
        <Form {...layout} form={form} name="control-hooks" onFinish={onFinish} style={{ maxWidth: 600 }}>
            <Form.Item name="firstName" label="First Name" rules={[{ required: true }]}>
                <Input />
            </Form.Item>
            <Form.Item name="lastName" label="Last Name" rules={[{ required: true }]}>
                <Input />
            </Form.Item>
            <Form.Item name="email" label="Email" rules={[{ required: true }]}>
                <Input />
            </Form.Item>
            <Form.Item {...tailLayout}>
                <Space>
                    <Button loading={loading} type="primary" htmlType="submit">
                        Submit
                    </Button>
                    {/* <Button htmlType="button" onClick={onReset}>
                        Reset
                    </Button>
                    <Button type="link" htmlType="button" onClick={onFill}>
                        Fill form
                    </Button> */}
                </Space>
            </Form.Item>
        </Form>
    )
}

export default UserForm

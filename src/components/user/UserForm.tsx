import React from 'react'
import { Button, Form, Input, Select, Space } from 'antd'
import { User } from '~/types/domain'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { AppDispatch, RootState } from '~/store/store'
import { addUser, editUser } from '~/features/userSlice'

const { Option } = Select

const layout = { labelCol: { span: 8 }, wrapperCol: { span: 16 } }

const tailLayout = { wrapperCol: { offset: 8, span: 16 } }
interface UserProps {
    user?: User
}
const UserForm: React.FC<UserProps> = ({ user }) => {
    const dispatch = useDispatch<AppDispatch>()
    const loadingAdd = useSelector((state: RootState) => state.user.loadingAdd)
    const navigate = useNavigate()

    const [form] = Form.useForm()
    if (user && user.id) {
        form.setFieldsValue(user)
    }

    const onFinish = ({ firstName, lastName, email }: { firstName: string; lastName: string; email: string }) => {
        if (user && user.id) {
            dispatch(editUser({ id: user.id, firstName, lastName, email, avatar: user.avatar })).then(() => {
                navigate('/users')
            })
        } else {
            dispatch(addUser({ firstName, lastName, email })).then(() => {
                navigate('/users')
            })
        }
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
                    <Button loading={loadingAdd} type="primary" htmlType="submit">
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

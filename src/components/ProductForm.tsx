import React from 'react'
import { Button, Form, Input, Select, Space } from 'antd'
import { Product, User } from '~/types/domain'

const { Option } = Select

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 }
}

const tailLayout = {
    wrapperCol: { offset: 8, span: 16 }
}
interface ProductProps {
    product?: Product
}
const ProductForm: React.FC<ProductProps> = ({ product }) => {
    const [form] = Form.useForm()
    if (product && product.id) {
        form.setFieldsValue(product)
    }

    const onFinish = (values: Product) => {
        console.log(values)
    }

    const onReset = () => {
        form.resetFields()
    }

    return (
        <Form {...layout} form={form} name="control-hooks" onFinish={onFinish} style={{ maxWidth: 600 }}>
            <Form.Item name="name" label="Name" rules={[{ required: true }]}>
                <Input />
            </Form.Item>
            <Form.Item name="description" label="Description" rules={[{ required: true }]}>
                <Input />
            </Form.Item>
            <Form.Item name="category" label="Category" rules={[{ required: true }]}>
                <Select placeholder="Select a option and change input text above" allowClear>
                    <Option value="male">Electronics</Option>
                    <Option value="female">Furniture</Option>
                    <Option value="other">Other</Option>
                </Select>
            </Form.Item>
            <Form.Item noStyle shouldUpdate={(prevValues, currentValues) => prevValues.gender !== currentValues.gender}>
                {({ getFieldValue }) =>
                    getFieldValue('category') === 'other' ? (
                        <Form.Item name="customizeGender" label="Customize Gender" rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                    ) : null
                }
            </Form.Item>
            <Form.Item {...tailLayout}>
                <Space>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                    <Button htmlType="button" onClick={onReset}>
                        Reset
                    </Button>
                </Space>
            </Form.Item>
        </Form>
    )
}

export default ProductForm

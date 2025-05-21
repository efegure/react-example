import React from 'react'
import { Button, Form, Input, Select, Space } from 'antd'
import { Product } from '~/types/domain'

const layout = { labelCol: { span: 8 }, wrapperCol: { span: 16 } }

const tailLayout = { wrapperCol: { offset: 8, span: 16 } }
interface ProductFormValues {
    name: string
    description: string
    category: string
    price: number
}
interface ProductProps {
    product?: Product
    onSubmit: (values: ProductFormValues) => void
    loading: boolean
}
const ProductForm: React.FC<ProductProps> = ({ product, onSubmit, loading }) => {
    const [form] = Form.useForm()

    if (product && product.id) {
        form.setFieldsValue(product)
    }

    const onFinish = ({ category, description, name, price }: { category: string; description: string; name: string; price: number }) => {
        onSubmit({ category, description, name, price })
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
                <Input />
            </Form.Item>
            <Form.Item name="price" label="Price" rules={[{ required: true }]}>
                <Input type="number" />
            </Form.Item>
            <Form.Item {...tailLayout}>
                <Space>
                    <Button loading={loading} type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Space>
            </Form.Item>
        </Form>
    )
}

export default ProductForm

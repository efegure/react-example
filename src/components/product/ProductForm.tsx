import React from 'react'
import { Button, Form, Input, Select, Space } from 'antd'
import { Product } from '~/types/domain'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '~/store/store'
import { addProduct, editProduct } from '~/features/productSlice'
import { useNavigate } from 'react-router'

const layout = { labelCol: { span: 8 }, wrapperCol: { span: 16 } }

const tailLayout = { wrapperCol: { offset: 8, span: 16 } }
interface ProductProps {
    product?: Product
}
const ProductForm: React.FC<ProductProps> = ({ product }) => {
    const dispatch = useDispatch<AppDispatch>()
    const loadingAdd = useSelector((state: RootState) => state.product.loadingAdd)
    const navigate = useNavigate()

    const [form] = Form.useForm()
    if (product && product.id) {
        form.setFieldsValue(product)
    }

    const onFinish = ({ category, description, name }: { category: string; description: string; name: string }) => {
        if (product && product.id) {
            dispatch(editProduct({ id: product.id, category, description, name })).then(() => {
                navigate('/products')
            })
        } else {
            dispatch(addProduct({ category, description, name })).then(() => {
                navigate('/products')
            })
        }
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
            <Form.Item {...tailLayout}>
                <Space>
                    <Button loading={loadingAdd} type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Space>
            </Form.Item>
        </Form>
    )
}

export default ProductForm

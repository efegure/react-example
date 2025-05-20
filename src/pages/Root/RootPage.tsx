import React, { useState } from 'react'
import { Breadcrumb, Layout, Menu, theme } from 'antd'
import { HomeOutlined, ProductOutlined, TeamOutlined } from '@ant-design/icons'
import Outlet from './Outlet'
import { MenuItem } from '../../types/common'
import { useNavigate } from 'react-router'
import '../../styles/main.sass'

const { Header, Content, Footer, Sider } = Layout

function getItem(label: React.ReactNode, key: React.Key, icon?: React.ReactNode, children?: MenuItem[]): MenuItem {
    return {
        key,
        icon,
        children,
        label
    } as MenuItem
}

const items: MenuItem[] = [
    getItem('Home', '/', <HomeOutlined />),
    getItem('Product', 'products', <ProductOutlined />, [getItem('All Products', '/products'), getItem('Add New Product', '/products/add')]),
    getItem('User', 'users', <TeamOutlined />, [getItem('All Users', '/users'), getItem('Add New User', '/users/add')])
    // getItem('User', 'sub1', <UserOutlined />, [getItem('Tom', '3'), getItem('Bill', '4'), getItem('Alex', '5')]),
    // getItem('Team', 'sub2', <TeamOutlined />, [getItem('Team 1', '6'), getItem('Team 2', '8')]),
]

const RootPage: React.FC = () => {
    const [collapsed, setCollapsed] = useState(false)
    const {
        token: { colorBgContainer, borderRadiusLG }
    } = theme.useToken()
    const navigate = useNavigate()
    const handleMenuItemClick = (menuItem: MenuItem) => {
        navigate(menuItem?.key)
        console.log(menuItem)
    }

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                <div className="demo-logo-vertical" />
                <Menu theme="dark" defaultSelectedKeys={['/']} mode="inline" items={items} onClick={handleMenuItemClick} />
            </Sider>
            <Layout>
                <Header style={{ padding: 0, background: colorBgContainer }} />
                <Content style={{ margin: '0 16px' }}>
                    {/* <Breadcrumb style={{ margin: '16px 0' }} items={[{ title: 'User' }, { title: 'Bill' }]} /> */}
                    <Outlet />
                </Content>
                <Footer style={{ textAlign: 'center' }}>Ant Design ©{new Date().getFullYear()} Created by Ant UED</Footer>
            </Layout>
        </Layout>
    )
}

export default RootPage

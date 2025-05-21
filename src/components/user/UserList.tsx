import React from 'react'
import { Avatar, Button, List, Skeleton } from 'antd'

import { Link } from 'react-router'
import { User } from '~/types/domain'

interface IUserListProps {
    users: User[]
    loading: boolean
    onGoToDetail: (id: string) => void
    onDelete: (product: User) => void
}

const UserList: React.FC<IUserListProps> = ({ users, loading, onGoToDetail, onDelete }) => {
    return (
        <>
            <List
                style={{ width: '100%' }}
                className="demo-loadmore-list"
                loading={loading}
                itemLayout="horizontal"
                dataSource={users}
                renderItem={(item) => (
                    <List.Item
                        actions={[
                            <Link to={'/users/edit/' + item.id} key="list-loadmore-edit">
                                edit
                            </Link>,
                            <Button onClick={() => onDelete(item)} key="list-loadmore-more">
                                delete
                            </Button>
                        ]}
                    >
                        <Skeleton avatar title={false} loading={loading} active>
                            <List.Item.Meta
                                avatar={<Avatar style={{ cursor: 'pointer' }} onClick={() => onGoToDetail(item.id)} src={item.avatar} />}
                                title={
                                    <span style={{ cursor: 'pointer' }} onClick={() => onGoToDetail(item.id)}>
                                        {item.firstName} {item.lastName}
                                    </span>
                                }
                                description={
                                    <span style={{ cursor: 'pointer' }} onClick={() => onGoToDetail(item.id)}>
                                        {item.email}
                                    </span>
                                }
                            />
                        </Skeleton>
                    </List.Item>
                )}
            />
        </>
    )
}

export default UserList

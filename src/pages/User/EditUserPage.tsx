import React from 'react'
import { useParams } from 'react-router'
import UserForm from '~/components/user/UserForm'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { AppDispatch, RootState } from '~/store/store'
import { addUser, editUser } from '~/features/userSlice'

const EditUserPage: React.FC = () => {
  const { id } = useParams()
  const selectedUser = useSelector((state: RootState) =>
    state.user.data.find((user) => user.id === id)
  )
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()
  const loading = useSelector((state: RootState) => state.user.loadingAdd)

  const handleEdit = ({
    firstName,
    lastName,
    email
  }: {
    firstName: string
    lastName: string
    email: string
  }) => {
    if (id) {
      dispatch(editUser({ id, firstName, lastName, email })).then(() => {
        navigate('/users')
      })
    }
  }

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column'
      }}
    >
      <h1 style={{ fontSize: '3em' }}>Edit User Page</h1>
      <UserForm
        loading={loading}
        onSubmit={handleEdit}
        user={selectedUser}
      ></UserForm>
    </div>
  )
}

export default EditUserPage

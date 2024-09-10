import {LinkContainer} from 'react-router-bootstrap'
import {Table, Button, Row, Col} from 'react-bootstrap'
import { FaEdit, FaTrash, FaCheck} from 'react-icons/fa'
import Message from '../components/message'
import Loader from '../components/loader'
import {toast} from 'react-toastify'
import { useGetUsersQuery ,useDeleteUserMutation} from '../slices/usersApiSlice'

const UserListScreen = () => {

    const {data:users, isLoading, error, refetch}=useGetUsersQuery()
    // console.log(users)

    const [deleteUser, {isLoading:LoadingDelete}]=useDeleteUserMutation()

    const deleteHandler=async(id)=>{
        // console.log("deleted", id)
        if(window.confirm('Are You Sure?')){
            try {
                await deleteUser(id)
                toast.success("User Deleted")
                refetch()
            } catch (error) {
                toast.error(error?.data?.message || error.error)
            }
        }
    }

  return <>
  <h2>Users</h2>
  {LoadingDelete && <Loader />}
    {isLoading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> :(
        <>
            <Table striped hover responsive className='table-sm'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>NAME</th>
                        <th>EMAIL</th>
                        <th>ADMIN</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user)=>(
                        <tr key={user._id}>
                            <td>{user._id}</td>
                            <td>{user.name}</td>
                            <td><a href={`mail to:${user.email}`}>{user.email}</a></td>
                            <td>
                                {user.isAdmin ? (
                                    <FaCheck style={{color:'green'}} />
                                ):(
                                    <FaCheck style={{color:'red'}} />
                                )}
                            </td>
                            <td>
                                <LinkContainer to={`/admin/user/${user._id}/edit`}>
                                    <Button  variant='dark' className='btn-sm mx-2'>
                                        <FaEdit />
                                    </Button>
                                </LinkContainer>
                                <Button variant='danger' className='btn-sm' onClick={()=> deleteHandler(user._id)}>
                                    <FaTrash style={{color:'white'}}/>
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>
    )}
  </>
}

export default UserListScreen

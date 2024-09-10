import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Form, Button, Col } from 'react-bootstrap';
import Message from '../components/message';
import Loader from '../components/loader';
import FormContainer from '../components/formContainer';
import { toast } from 'react-toastify';
import { useGetUserDetailsQuery, useUpdateUserMutation } from '../slices/usersApiSlice';


const UserEditScreen = () => {
    const {id:userId}=useParams()

    const [name, setName]=useState('')
    const [email, setEmail]=useState('')
    const [isAdmin, setIsAdmin]=useState(false)

    const {data:user, isLoading, error, refetch}=useGetUserDetailsQuery(userId)
    const [updateUser, {isLoading:LoadingUpdate}]=useUpdateUserMutation()

    const navigate=useNavigate()

    useEffect(()=>{
        if(user){
            setName(user.name)
            setEmail(user.email)
            setIsAdmin(user.isAdmin)
        }
    },[user])

    const submitHandler=async (e)=>{
        e.preventDefault()
        try {
            await updateUser({userId, name, email, isAdmin})
            toast.success('User updated successfully')
            refetch()
            navigate('/admin/userlist')
        } catch (error) {
            toast.error(error?.data?.message || error.error)
        }
    };

  return <>
      <Link to='/admin/userlist' className='btn btn-light my-3'>
        Go Back
      </Link>
      <FormContainer>
        <h2>Edit User</h2>
        {LoadingUpdate && <Loader />}
        {isLoading ? <Loader /> : error ? <Message variant='danger'>{error}</Message>:(
            <Form onSubmit={submitHandler}>
                    <Form.Group controlId="name">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                        type='name'
                        placeholder="Name"
                        value={name}
                        onChange={(e)=>setName(e.target.value)}></Form.Control>
                    </Form.Group>
                
                    <Form.Group controlId="email" className="my-2">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type='text'
                            placeholder="Email"
                            value={email}
                            onChange={(e)=>setEmail(e.target.value)}></Form.Control>
                    </Form.Group>
                
                
                    <Form.Group controlId="isAdmin" className="my-2">
                        <Form.Check
                            type='checkbox'
                            label="Admin"
                            checked={isAdmin}
                            onChange={(e)=>setIsAdmin(e.target.checked)}></Form.Check>
                    </Form.Group>
                
                <Button type="submit" variant="primary" className="my-2" >
                        Update
                </Button>
                
            </Form>
        )} 
      </FormContainer>
      
  </>
}

export default UserEditScreen

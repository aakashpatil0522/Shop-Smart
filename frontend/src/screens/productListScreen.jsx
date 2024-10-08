import {LinkContainer} from 'react-router-bootstrap'
import {Table, Button, Row, Col} from 'react-bootstrap'
import { FaEdit, FaTrash} from 'react-icons/fa'
import { useParams } from 'react-router-dom'
import Paginate from '../components/paginate'
import Message from '../components/message'
import Loader from '../components/loader'
import {toast} from 'react-toastify'
import { useGetProductsQuery, useCreateProductMutation, useDeleteProductMutation } from '../slices/productApiSlice'

const ProductListScreen = () => {
    const {pageNumber}=useParams()

    const {data, isLoading, error, refetch}=useGetProductsQuery({pageNumber})

    const [createProduct, {isLoading:loadingCreate}]=useCreateProductMutation()

    const[deleteProduct, {isLoading: loadingDelete}]=useDeleteProductMutation()

    // console.log(products)
    const deleteHandler=async (id)=>{
        if(window.confirm('Are You Sure?')){
            try {
                await deleteProduct(id)
                toast.success("Product Deleted")
                refetch()
            } catch (error) {
                toast.error(error?.data?.message || error.error)
            }
        }
    }

    const createProductHandler=async ()=>{
        try {
            await createProduct()
            refetch()
        } catch (error) {
            toast.error(error?.data?.message || error.error)
        }
    }

  return <>
    <Row className='align-items-center'>
        <Col><h1>Products</h1></Col>
        <Col className='text-end'>
            <Button className='btn-sm m-3' onClick={createProductHandler}>
                <FaEdit /> Create Product
            </Button>
        </Col>
    </Row>

    {loadingCreate && <Loader />}
    {loadingDelete && <Loader />}

    {isLoading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
        <>
            <Table striped hover responsive className='table-sm'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>NAME</th>
                        <th>PRICE</th>
                        <th>CATEGORY</th>
                        <th>BRAND</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {data.products.map((product)=>(
                        <tr key={product._id}>
                            <td>{product._id}</td>
                            <td>{product.name}</td>
                            <td>${product.price}</td>
                            <td>{product.category}</td>
                            <td>{product.brand}</td>
                            <td>
                                <LinkContainer to={`/admin/product/${product._id}/edit`}>
                                    <Button  variant='dark' className='btn-sm mx-2'>
                                        <FaEdit />
                                    </Button>
                                </LinkContainer>
                                <Button variant='danger' className='btn-sm' onClick={()=> deleteHandler(product._id)}>
                                    <FaTrash style={{color:'white'}}/>
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <Paginate pages={data.pages} page={data.page} isAdmin={true} />
        </>
    )}
  </>
}

export default ProductListScreen

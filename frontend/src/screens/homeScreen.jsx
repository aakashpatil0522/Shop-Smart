// import { useEffect, useState } from 'react'
import {Row , Col} from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import Product from '../components/product'
import Loader from '../components/loader'
import Message from '../components/message'
import Meta from '../components/meta'
import Paginate from '../components/paginate'
import TopProduct from '../components/topProduct'
// import axios from 'axios';
import { useGetProductsQuery } from '../slices/productApiSlice'

const HomeScreen = () => {
    const {pageNumber, keyword}=useParams()
    
    const {data, isLoading, error}=useGetProductsQuery({pageNumber, keyword})

    // const [products, setProducts]=useState([])

    // useEffect(()=>{
    //     const fetchProducts= async ()=>{
    //         const {data}=await axios.get('/api/products')
    //         setProducts(data)
    //     };

    //     fetchProducts()
    // },[])

  return (
   <>
    { !keyword ? (<TopProduct />) :(<Link to='/' className='btn btn-light'>Go Back</Link> )}
    {isLoading ? (
    <Loader />
    ) : error ? (
    <Message variant='danger'>{error?.data?.message || error.error}</Message>) : (
        <>
        <Meta />
        <h1>Latest Products</h1>
        <Row>
            {data.products.map((product)=>(
                <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                    <Product product={product} />
                </Col>
            ))}
        </Row>
        <Paginate 
            pages={data.pages}
            page={data.page}
            keyword={keyword ? keyword : ''}
        />
        </>
    )}
   </>
  )
}

export default HomeScreen;

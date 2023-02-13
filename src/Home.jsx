import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { } from 'react-router-dom';
import "./Home.css"
import { incrementCart } from './CartReducer';
import { decrementCart } from './CartReducer';
import { useDispatch,useSelector } from 'react-redux';


export default function Home() {

  const [items,setItems]=useState([]);
  // const [totalPrice,setTotalPrice]=useState(0)
  // const [totalItems,setTotalItems]=useState(0)
  
  // const cartHandler=(product)=>{
  //   console.log("cart handler called", product)
  //   setTotalPrice(totalPrice+product.price)
  //   setTotalItems(totalItems+1)
  // }

  const dispatch=useDispatch();
  const totalItems=useSelector((state)=>{
    return state.CartReducer.cartValues.length;
  })

  const totalPrice=useSelector((state)=>{
    return state.CartReducer.totalPrice;
  })

  useEffect(()=>{
    const token=localStorage.getItem("SHOPPING_TOKEN")
    console.log(token)
    axios({
      method:"GET",
      url:"https://webla-api.uc.r.appspot.com/api/v1/products",
      headers:{
        "X-Authorization":`Bearer ${token}`,
      },
      params:{
        per_page:25,
        page:1
      }
    }).then((response)=>{
      console.log(response.data)
      setItems(response.data)
      console.log(items)
    }).catch((error)=>{
      console.log(error)
    })
  },[items])
  return (
    <>
    <header>
      <button className='btn btn-primary'>cart items: {totalItems}</button>
      <button className='btn btn-primary'>cart price: {totalPrice}</button>
      <button className='btn btn-danger'onClick={()=>{
        localStorage.removeItem('SHOPPING_TOKEN')
        localStorage.removeItem('SHOPPING_CART_ID')
        window.location.href="/login"
        
      }}>Logout</button>
    </header>
    <div className="contain">
    {
      items.map((product)=>{
        return(
          <div className="images">
            <div className="card" >
              <img className="card-img-top" src={product.images[0]} alt='images' style={{height:'200px'}}/>
              <div className="card-body" style={{height:'300px'}}>
                <h5 className="card-title">{product.title}</h5>
                <p className="card-text">{product.description}</p>
                <p className="card-text">{product.price}</p>
                <div className='buttons'>
                    <button className="btn btn-primary" onClick={()=>{
                        dispatch(incrementCart({
                          productName:product.title,
                          productPrice:product.price
                        }))
                    }} >Add to Cart</button>
                    <button className="btn btn-primary" onClick={()=>{
                        dispatch(decrementCart({
                          productName:product.title,
                          productPrice:product.price
                        }))
                    }} >Remove Cart</button>
                </div>
                
              </div>
            </div>
        </div>
        )
      })
    }
    </div>
    
    
       
    </>
  )
}

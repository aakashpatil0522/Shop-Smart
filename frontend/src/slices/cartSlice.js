import {createSlice} from "@reduxjs/toolkit";
import { updateCart } from "../utils/cartUtils";

// our item are going to store in localStorage, so localStorage are in string so we have to parse the localstorage if there, if not then in initialstate(cartItem array)
const initialState=localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")): {cartItems:[], shippingAddress:{}, paymentMethod:'PayPal'}


const cartSlice=createSlice({
    name:"cart",
    initialState,
    // This reducer object will have any function that have to do with the cart such as remove,add,etc.
    reducers:{
        // In below Function State is the current State of the cartItem  and Action is a object that contains the new item to be added to the cart, which is accessed through action.payload.
        addToCart:(state, action)=>{
            // suppose if we are going to be sending an item to addToCart which we can access through action.payload
            const item=action.payload
            
            const existItem=state.cartItems.find((x)=>x._id===item._id);
            if(existItem){
                state.cartItems=state.cartItems.map((x)=>x._id===existItem._id ? item : x);
            }else{
                state.cartItems=[...state.cartItems, item]
            }

            return updateCart(state);
        },
        removeFromCart:(state,action)=>{
            state.cartItems=state.cartItems.filter((x)=>x._id!==action.payload)

            return updateCart(state);
        },

        saveShippingAddress:(state, action)=>{
            state.shippingAddress=action.payload
            return updateCart(state);
        },

        savePaymentMethod:(state, action)=>{
            state.paymentMethod=action.payload
            return updateCart(state)
        },

        clearCartItems:(state, action)=>{
            state.cartItems=[]
            return updateCart(state);
        }
    }
});

export const {addToCart, removeFromCart, saveShippingAddress, savePaymentMethod, clearCartItems}=cartSlice.actions;

export default cartSlice.reducer;
import {createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import {BASE_URL} from '../constant';
const baseQuery=fetchBaseQuery({baseUrl:BASE_URL});

export const apiSlice=createApi({
    baseQuery,
    //tagType desc-> use to define which type of data we have to fetch
    tagTypes:['product','order','user'],
    endpoints: (builder)=>({})
})




// The code starts by importing two modules from @reduxjs/toolkit/query/react:

// createApi: a function that helps create an API slice
// fetchBaseQuery: a function that creates a base query function for making HTTP requests

// Defining the base query
// The next line creates a baseQuery function using fetchBaseQuery. This function will be used to make HTTP requests to the API. The baseUrl option is set to BASE_URL, which is likely a constant defined elsewhere in the codebase.

// Creating the API slice

// Now, we create an API slice using the createApi function. An API slice is a way to manage data fetching and caching in a Redux application.

// The createApi function takes an object with several options:

// baseQuery: the base query function we created earlier
// tagTypes: an array of strings that define the types of data we'll be fetching (in this case, product, order, and user).
// endpoints: a function that returns an object with endpoint definitions.
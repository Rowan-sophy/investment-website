import {createApi ,fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import querystring from "query-string"


const baseUrl ='https://g-finance.p.rapidapi.com' 
{/*const createRequest= (url)=>({url,header:cryptoApiHeader})*/}
export const FinanceAPI =createApi({
   reducerPath:'FinanceAPI',
   baseQuery : fetchBaseQuery({
    baseUrl,
    prepareHeaders(headers) {
        
        headers.set("X-RapidAPI-Key","18b01bfb43msheba396053a2cb4cp19542bjsn45050efb239f")
        headers.set("X-RapidAPI-Host","g-finance.p.rapidapi.com")
        return headers;
        
    }
}),
   endpoints:(builder)=>({
    getFinances:builder.query({
        query: (country) =>({
         url:`/market-trends/?t=losers&s=en&gl=${country}`,
         method:'GET'
        }),
       
    }),
   
   
   })
   

}) 
export const {
 useGetFinancesQuery
}= FinanceAPI

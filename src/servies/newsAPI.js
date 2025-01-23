import {createApi ,fetchBaseQuery} from '@reduxjs/toolkit/query/react'
const baseUrl ='https://real-time-finance-data.p.rapidapi.com'
{/*
 '18b01bfb43msheba396053a2cb4cp19542bjsn45050efb239f',
    'X-RapidAPI-Host': 'crypto-news16.p.rapidapi.com'
    'https://real-time-finance-data.p.rapidapi.com/search'
 {
    'X-RapidAPI-Key': '18b01bfb43msheba396053a2cb4cp19542bjsn45050efb239f',
    'X-RapidAPI-Host': 'real-time-finance-data.p.rapidapi.com'
  }
};
 baseUrl ='https://crypto-news16.p.rapidapi.com/news/top/5'
  headers.set("X-RapidAPI-Key",'18b01bfb43msheba396053a2cb4cp19542bjsn45050efb239f')
        headers.set("X-RapidAPI-Host",'crypto-news16.p.rapidapi.com')


*/}
export const newsAPI =createApi({
   reducerPath:'newsAPI',
   baseQuery : fetchBaseQuery({
    baseUrl,
    prepareHeaders(headers) {
        headers.set("X-RapidAPI-Key",'18b01bfb43msheba396053a2cb4cp19542bjsn45050efb239f')
        headers.set("X-RapidAPI-Host", 'real-time-finance-data.p.rapidapi.com')
        return headers;
        
    }
}),
   endpoints:(builder)=>({
    getNews:builder.query({
        query: (ticker) =>({
         url:'/stock-news',
         method:'GET',
         params: {
            symbol:`${ticker}` ,
            language: 'en'
          }
        
        })
    })
   })

}) 
export const {
 useGetNewsQuery,
}= newsAPI

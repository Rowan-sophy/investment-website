import {createApi ,fetchBaseQuery} from '@reduxjs/toolkit/query/react'
const baseUrl ='https://yahoo-finance15.p.rapidapi.com'


export const StocksAPI =createApi({
   reducerPath:'StocksAPI',
   baseQuery : fetchBaseQuery({
    baseUrl,
    prepareHeaders(headers) {
      headers.set("X-RapidAPI-Key", '18b01bfb43msheba396053a2cb4cp19542bjsn45050efb239f')
      headers.set("X-RapidAPI-Host", 'yahoo-finance15.p.rapidapi.com')
      
        return headers;
        
    }
}),
   endpoints:(builder)=>({
    getStockes:builder.query({
      query: (name) =>({
        url:`/api/v1/markets/search?search=${name}`,
        method:'GET'
       })
      
        
    }),
     getProfiles:builder.query({
      query: (ticker) =>({
        url:`/api/v1/markets/stock/modules?ticker=${ticker}&module=asset-profile`,
        method:'GET'
       })
      
        
    })
    ,
    getHistories:builder.query({
      query: ({ticker,time}) =>({
        url:`/api/v1/markets/stock/history?symbol=${ticker}&interval=${time}&diffandsplits=false`,
        method:'GET'
       })
      
        
    })
    ,
    getFinancails:builder.query({
      query: (ticker) =>({
        url:`/api/v1/markets/stock/modules?ticker=${ticker}&module=financial-data`,
        method:'GET'
       })
      
        
    }),
    getRecommendations:builder.query({
      query: (ticker) =>({
        url:`/api/v1/markets/stock/modules?ticker=${ticker}&module=recommendation-trend`,
        method:'GET'
       })
      
        
    }),
    getSharePurchases:builder.query({
      query: (ticker) =>({
        url:`/api/v1/markets/stock/modules?ticker=${ticker}&module=net-share-purchase-activity`,
        method:'GET'
       })
      
        
    }),
    getIncomeStatements:builder.query({
      query: () =>({
        url:`/api/v1/markets/stock/modules?ticker=GOOG&module=cashflow-statement`,
        method:'GET'
       })
      
        
    })


   
   })
   

}) 
export const {
  useGetStockesQuery,useGetProfilesQuery,
   useGetHistoriesQuery 
  ,useGetFinancailsQuery, 
  useGetRecommendationsQuery,
  useGetSharePurchasesQuery,
  useGetIncomeStatementsQuery
}= StocksAPI

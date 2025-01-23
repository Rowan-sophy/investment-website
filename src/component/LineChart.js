import React from "react";
import { Chart, plugins } from "chart.js/auto";
import { useState } from "react";
import {useGetHistoriesQuery} from '../servies/StockAPI'
import {Line} from 'react-chartjs-2'
import { Col, Grid, Row, Typography } from 'antd';

const { Title } = Typography;
const LineChart=({ ticker,time,simplified})=>{
   const date = [];
   const closePrice = [];
 
   const {data: stockHistory}= useGetHistoriesQuery({ticker,time});
   const stockHistoryData= stockHistory?.body;
  

   for (const key in stockHistoryData){
    
    closePrice.push(stockHistoryData[key].close)
   }
   for (const key in stockHistoryData){
    date.push((stockHistoryData[key].date).split(0,3))
   }
 
  //console.log(closePrice);
  //console.log(date);
   const limitclosePrice=closePrice.splice([closePrice.length-50],[closePrice.length-1])
   //console.log(limitclosePrice);
   const limitdate=date.splice([date.length-50],[date.length-1])
   //console.log(limitdate);
   const data = {
      labels: date,
      datasets: [
        {
          label: 'Price In USD',
          data: closePrice,
          fill: false,
          backgroundColor: 'rgba(200, 178, 222)',
          borderColor: 'rgba(200, 178, 222)',
        },
      ],
    };
  /**
   * V3 OF CHART.JS syntax has been changing so instead of  yAxes just use y and we remove the brackets []
   */
    const options = {
     // maintainAspecRatio:false,
      scales: {
        y: 
          {
            ticks: {
              beginAtZero: true,
            },
          
          },
         
        
      },
      
    };
  
 return(
    <>
   
    {!simplified? 
    <>
    <Line data={data} options={options} className="chart" /> 
    </>:
     <Line data={{labels:limitdate,
      datasets: [
        {
          data: limitclosePrice,
          fill: false,
          radius:0,
          backgroundColor: 'black',
          borderColor: 'rgba(200, 178, 222)',
          lineTension: .4,
        }
      ],
   
    }} 
      options={
        
        {//maintainAspectRatio:false,
          plugins:{
          legend:{
            display:false
          }
        },
        scales: {
          // to remove the labels
          x: {
            ticks: {
              display: false,
            },
      
            // to remove the x-axis grid
            grid: {
              drawBorder: false,
              display: false,
            },
          },
          // to remove the y-axis labels
        
        },
       }} 
        className="chart-simplified" /> }
     
    </>
 )
}
export default LineChart;
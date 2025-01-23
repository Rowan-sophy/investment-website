import React from "react";
import  {useState ,useEffect} from "react";
import {DebounceInput} from 'react-debounce-input'
import { HomeOutlined, FallOutlined,RiseOutlined,ControlOutlined } from '@ant-design/icons';
import { Breadcrumb } from 'antd';
import phone from '../images/iPhoneMockup.png';
import millify from "millify";
import {AppstoreOutlined,TableOutlined } from "@ant-design/icons";
import { Typography,Card, Row, Col,Input,Button,Table,Select} from "antd";
import { useGetFinancesQuery } from "../servies/FinanceAPI";
import QuestionAnswer from "./QuestionAnswer";
import TextAnimation from "./TextAnimation";
import Loader from "./Loader";

const {Title} =Typography;
const {Option} =Select;
const CurrenciesCart=({simplified})=>{
   const [country,setCountry] =useState('us')
  const {data:marketTrend ,isFetching} =useGetFinancesQuery(country);
  console.log(marketTrend);
  const [marketTrends,setMarketTrends] =useState()
  const[selected,setSelected]=useState('table')
  const[choosingStyle,setChoosingStyle]=useState(false)
  const[searchTerm,setSearchTerm]=useState('')
  const countries = ['US','EU','CN','CA','BR','TUR','IND','MX','KSA','EG'];
  const QuestionAns=[  {
   question: 'How does the investment trends page work on the website, and how can users utilize the filter option to view trends in any specific country?',
  answer: "The investment trends page allows users to filter and analyze stock market trends by selecting a country of interest. This feature enables users to track and compare the latest stock market trends across different regions, aiding in decision-making.",
  
 
 },
 {
   question:"How can users determine if a specific company is part of the investment trend table by entering its name in the search input?" ,
   answer: "By typing the name of a company in the search input on the investment trends page, users can quickly verify if the company is included in the trend table, providing them with insights into the stock performance of the selected company."
   
 },
 {
   question: "What is the functionality of the table and chart buttons on the investment trends page, and how can users leverage them to interpret data effectively",
   answer:"Users can click on the table or chart buttons to visualize the stock market trends in either table format or chart format. This allows users to analyze and interpret the data presented in a visually effective manner, aiding in understanding and decision-making.",
 }
 ,
 {
   question:"How to read stock market trends effectively for making informed investment decisions?" ,
   answer: ": Reading stock market trends involves analyzing historical and current data on stock prices and market performance to identify patterns and potential future movements. By understanding trends in stock prices, volume, and market sentiment, investors can make informed decisions on buying, selling, or holding investments based on market conditions and opportunities.",
   
 }]
 const paragragh=' Track global investment trends with real-time stock market data in over 20 countries.'
 const classStyle='page-sub-title';
 const LoaderStyle='loaderStyle';
 const paragrahpStyle='animation-completed';
  
  useEffect(()=>{
   setMarketTrends(marketTrend?.items)
   const filteredData = marketTrend?.items?.filter((item) => {
      //console.log(item.info.title.toLowerCase());
    return ( item?.info?.title.toLowerCase().includes(searchTerm.toLowerCase())
    
   )
   });
   setMarketTrends(filteredData)
},[marketTrend,searchTerm])

  

  const modifyData= marketTrends?.map(({...Trends})=>({
    ...Trends,
    key:Trends.info.title,
    name:Trends.info.title,
   type:Trends.info.type,
   ticker:Trends.info.ticker,
   change:Trends.price?.after_hours?.change,
   change_precentage:millify(Trends.price?.after_hours?.change_percent),
   
  
  
   }))
   const columns=[{
           title: "Name",
           key: "name",
           dataIndex:"name",
           fixed: 'left',
           render: (text, value) => (
             value.info.title
           )

   },
   {
    title: "Type",
    key: "type",
    dataIndex:"type",
    render: (img, value) => (
       value.info.type
    )

 },

 {
    title: "Ticker",
    key: "ticker",
    dataIndex:"ticker",
    render: (text, value) => (
       value.info.ticker
    )

 },
 

 {
  title: "Change",
  key: "change",
  dataIndex:"change",
  ellipsis:true,
  render: (text, value) => (
    <span style={{color:value.price?.after_hours?.change>=0?'green':'rgb(119, 1, 1)' }}>{value.price?.after_hours?.change>=0? <RiseOutlined className="table-icon1" />:<FallOutlined className="table-icon2"/>} {value.price?.after_hours?.change} </span> 
    
  
  )

},
{
  title: "Change Percentage",
  key: "change percentage",
  dataIndex:"change percentage",
  render: (text, value) => (
     
     <span style={{color:value.price?.after_hours?.change_percent>=0?'green':'rgb(119, 1, 1)' }}>{value.price?.after_hours?.change_percent>=0? <RiseOutlined className="table-icon1" />:<FallOutlined className="table-icon2"/>} {value.price?.after_hours?.change_percent} </span> 
  
  )

}


   ]
   const selectionOption=(select)=>{
    switch (select) {
       case "table":
          
          return (<div  className="cartContainer" > <Table className='exchanges-table'   columns={columns} dataSource={modifyData} pagination={false} scroll={{x:800,y:500}} /> </div> )
          break;
          case "cart":
            
             return ( <Row gutter={[32,32]}  className="cartContainer">
             {marketTrends ?.map((Trends)=>(
                   <Col  xs={24} sm={12} lg={6}  key={Trends.info.title}>
               
                     <Card  title= {<span className="trendCartTitle">{Trends.info.title}</span>} className="normal-card1" hoverable>
                        <p className="trendCartPara"> Type: { Trends.info.type}</p>
                        <p className="trendCartPara" > Ticker: {Trends.info.ticker}</p>
                        <p className="trendCartPara" > Price: {Trends.price?.previous_close}</p>
                        <p className="trendCartPara" > Change:<span style={{color:Trends.price?.after_hours?.change>=0?'green':' rgb(119, 1, 1)'}}> {Trends.price?.after_hours?.change}</span> {Trends.price?.after_hours?.change>=0? <RiseOutlined className="table-icon1" />:<FallOutlined className="table-icon2"/>}</p>
                        <p className="trendCartPara" > Change Percentage: <span style={{color:Trends.price?.after_hours?.change>=0?'green':' rgb(119, 1, 1)'}}>{Trends.price?.after_hours?.change_percent}</span> {Trends.price?.after_hours?.change>=0? <RiseOutlined className="table-icon1" />:<FallOutlined className="table-icon2"/>}</p>
                     </Card>
   
                   </Col>
                ))}
              </Row>)
             break;
    
       default:
          break;
    }
 }

  return(
   
   
      <>
      {!simplified && (
   <div>
   <Row>
        <Row className="row-title-container-page" >
          <Col className="home-heading-container-page"   xs={24} >
              <Row className="ROW-title">
                  < Col  className="title-container" >
                   <h1 className="home-title-page"  > INVESTMENT TRENDS </h1>
                 </Col> 
             </Row>
            <Row className="textAnimation" >
                <TextAnimation text={paragragh} classStyle={classStyle} paraStyle={paragrahpStyle}/> <br/> 
            </Row> 
           </Col>     
        </Row>
     
       <Row className="show-type">
         <Col lg={17} xs={24}>
         <div >
           <DebounceInput
              placeholder= 'search company' 
              className="searchInput"
             value={searchTerm}
              debounceTimeout={3000}
             onChange={(e) => setSearchTerm(e.target.value)}
         />
         </div>
         </Col>
         <Col lg={7} xs={24} className="subshow-type">
            <Row className="filter-container">
              <Col  xs={14} className="select-timeperiod-container" >
                   <Select defaultValue="" className="select-timeperiod" suffixIcon={<ControlOutlined/>} placeholder="Filter" value={'FILTER BY COUNTRY'} borderless onChange={(value) => setCountry(value)} > 
                        {countries.map((country) => <Option key={country}>{country}</Option>)}
                  </Select>
             </Col>
             <Col   xs={5}  className="cart-show-type">
                    <button  className='BtnCart' onClick={()=>{
                         setChoosingStyle(true)
                         setSelected('cart')
                     }}>Cart <AppstoreOutlined className="filericon" /></button>
               </Col>
               <Col  xs={5} className="cart-show-type">
                   <button  className='BtnCart' onClick={()=>{
                           setChoosingStyle(true)
                          setSelected('table')
                    }}>Table<TableOutlined className="filericon" /></button>
               </Col>
             </Row>
         </Col>
       </Row>
     </Row>
      <div style={{marginTop:'24px'}}>
      
      <Breadcrumb
                  items={[
                              {
                                 href: '',
                                 title: (
                                              <>
                                                  <HomeOutlined />
                                                 <span>Home</span>
                                                </>
                                          ),
                             },
                            {
                                   title:  (
                                    <>
                                      <RiseOutlined/>
                                       <span>Market Trends</span>
                                      </>
                                ),
                             },
                           ]}
            className="Breadcrumb-style"    />
      <h2 className="second-title"> Stock Market Investment Trends In {country} </h2>
      <span className="second-sub-title">Track investment trends, including company name,ticker symbol,type of investment,and price changes. Stay informed and make strategic decisions.</span>
      </div>
      </div>
     )}
      {isFetching?  <Loader classname={LoaderStyle}/>:<>
     { choosingStyle==true?selectionOption(selected): 
     <>
     
         <div className="table-container"  >
           
                 <Table  columns={columns} dataSource={modifyData} pagination={false} scroll={{x:800,y:700}}  />
         </div>
        
        </>
     
   
}
{!simplified && (
    <Row style={{background:'none'}} >
        
        <Col lg={16} xs={24} style={{background:'none'}}>
           <QuestionAnswer questions={ QuestionAns}/>
        </Col>
        <Col lg={8} xs={24} style={{background:'none'}}>
          <div  className=" standPhotoContainer" >
             <img src={phone} className='standPhonePhoto'/>
          </div>
        </Col>
     </Row>)
   }
    </>}   
   </>

   
 
  )
}
export default CurrenciesCart
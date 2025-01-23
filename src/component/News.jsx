import React from "react";
import  {useState ,useEffect} from "react";
import { useGetNewsQuery } from "../servies/newsAPI";
import NewsCart from "./NewsCart";
import TextAnimation from "./TextAnimation";
import { HomeOutlined,ControlOutlined ,GlobalOutlined } from '@ant-design/icons';
import { Breadcrumb } from 'antd';
import {Typography,Row ,Select ,Col} from 'antd';
import moment from 'moment';
import Loader from "./Loader";


const {Text,Title} = Typography;
const {Option} =Select;

const News =({simplified}) =>{
    const count= simplified ? 6:20;
    const[company,setCompany]=useState('MSFT:NASDAQ')
    const {data ,isFetching } =useGetNewsQuery(company);
    const[searchTerm,setSearchTerm]=useState('')
    const time = ['GOOG','MSFT','NVDA','TSLA','AMZN','PYPL'];
    const paragragh=' follow the top invesment trend all over the world,all details  between your hand'
    const classStyle='page-sub-title';
    const LoaderStyle='LoaderStyle';
    const paragrahpStyle='animation-completed2';
    const companyName=company.slice(0,company.indexOf(":"));
    console.log(companyName);
  
    
    return(
      <>
    {!simplified?(
           
    <Row>
        <Row style={{marginBottom:'24px'}} >
          <Row className="row-title-container-page">
              <Col className="home-heading-container-page"   xs={24}>
                   <Row className="ROW-title">
                       < Col span={22} className="title-container" >
                          <h1 className="home-title-page2" > MARKET NEWS </h1>
                       </Col> 
                   </Row>
                   <Row  className="textAnimation">
                        <TextAnimation text={paragragh} classStyle={classStyle} paraStyle={paragrahpStyle}/> <br/> 
                   </Row> 
               </Col>     
          </Row>
          <Row className="show-type2">
                 <Col  className="select-timeperiod-container" >
                     <Select defaultValue=""  className="select-timeperiod2" suffixIcon={<ControlOutlined/>} placeholder="Select Timeperiod" value={'Choose The Company'}  onChange={(value) => setCompany(value+':NASDAQ')} > 
                        {time.map((date) => <Option key={date}>{date}</Option>)}
                     </Select>
         
                  </Col>
          </Row>
      </Row >
      { isFetching?
       <Row>
         <Loader classStyle={LoaderStyle}/> 
        </Row>:<>
        <div style={{marginTop:'24px',marginBottom:'24px'}}>
      
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
                                      <GlobalOutlined />
                                       <span>Financial News</span>
                                      </>
                                ),
                             },
                           ]}
            className="Breadcrumb-style"    />
            <h2 className="second-title">Latest Financial Articles about {companyName}  </h2>
              <span className="second-sub-title" >Track investment trends, including company name,ticker symbol,type of investment,and price changes. Stay informed and make strategic decisions.</span>
         </div>
   
                <Col xs={24} sm={12} lg={12}  >
                     <NewsCart data={data} startingPoint={0} endingPoint={count*0.33}/>
                </Col>
                 <Col xs={24} sm={12} lg={6} >
                     <NewsCart data={data} startingPoint={(count*0.33)+1} endingPoint={count*0.66}/>
                 </Col>
                 <Col xs={24} sm={12} lg={6} >
                      <NewsCart data={data} startingPoint={(count*0.66)+1} endingPoint={count}/>
                  </Col>
                  </>}
        </Row>
          ):
          <Row>
     
             <Row>
           
              <Col xs={24} sm={12} lg={12}  >
                  <NewsCart data={data} startingPoint={0} endingPoint={1}/>
              </Col>
              <Col xs={24} sm={12} lg={6}  >
                  <NewsCart data={data} startingPoint={2} endingPoint={4}/>
               </Col>
               <Col xs={24} sm={12} lg={6} >
                     <NewsCart  data={data} startingPoint={4} endingPoint={6}/>
              </Col>
           </Row>
       </Row>
          }
      
      </>
       
  
    )

}
export default News;

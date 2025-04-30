import React from "react";
import images from '../images/images';
import icon from '../images/laptop.png';
import phone from '../images/iPhone X Flying Mockup.png';
import QuestionAnswer from "./QuestionAnswer";
import UseScreenSize from "./useScreenSize";
import useShapeMotion from "./useShapeMotion";
import { FallOutlined,RiseOutlined} from '@ant-design/icons';
import {  Row, Col} from "antd";
import { useEffect, useState ,useRef } from "react";
import { motion, useMotionValue, useTransform, animate ,useScroll,useTime} from "framer-motion";
import TextAnimation from "./TextAnimation";

const PhotoSection=()=>{
   const screenSize=UseScreenSize();
  const shapeMotion=useShapeMotion();
  const tex1='Unlock personalized suggestions on the optimal quantity of stocks to buy and sell for any company, empowering you to make informed investment choices.';
  const photoSectionText='photoSection_text1';
  const QuestionAns=[  {
    question: 'How does the stock trends page on the website provide insight into global investment trends?',
   answer: 'The stock trends page allows users to filter and view investment trends in different countries, enabling them to analyze global market performance and make informed investment decisions based on the data presented',
   
  
  },
  {
    question: 'How can users utilize the specific company page to track stock performance and access key financial metrics',
    answer: 'By entering the name of any company, users can view the stock price changes over the past 30 days, along with a detailed company profile snapshot, financial performance overview highlighting key metrics like revenue growth, and recommendations on buying, selling, or holding stocks.',
    
  },
  {
    question: 'How does the news page benefit users in staying informed about financial developments related to various companies?',
    answer: 'The news page provides users with access to over 20 financial news articles about any chosen company, helping them stay updated on relevant industry news and events that could impact investment decisions',
  }
  ,
  {
    question: 'How does leveraging the website"s tools and resources enhance a user"s ability to make well-informed investment decisions?',
    answer: 'By utilizing the features such as stock trends analysis, specific company performance tracking, financial metric evaluations, stock recommendations, and comprehensive news coverage, users can gain valuable insights and information crucial for making sound investment decisions, ultimately helping them optimize and strategize their investment portfolios effectively.',
    
  }]

 return(
  <div>
    <Row style={{marginTop:'120px'}}>
    <div className='HeaderSection'   >
      <motion.div className="LAPphoto-container" style={{y: shapeMotion.translateY}}>
         <img src={ screenSize.width>1200?icon:phone} className="LAPphoto"/>
      </motion.div>
      
      <div className='mainHeader' style={{padding:'32px'}} >
       <Row style={{background:'none'}} >
       
         <Col xl={12} lg={24} xs={24}  md={24} sm={24} className="photoSection_photo1">
         <Row style={{background:'none'}}>
          <p  className="photoSectiontitle"> Smart Stock Recommendations for Every Investment Decision</p>
           <TextAnimation text={tex1} classStyle={photoSectionText}/>
            {/* <p className="photoSection_text1">Find Trend Recomendation<br/>for Any Company In STOCK MARKET</p> */}
            </Row>
            <Row style={{background:'none'}}>
            <p ><span className="photoSectionSubtext1">buy <RiseOutlined className="table-icon1" /></span> <span className="photoSection_span2">or </span><span className="photoSectionSubtext2"> sell <FallOutlined className="table-icon2"/></span> </p>
            </Row>
         </Col>
         <Col  xl={12} lg={24} xs={24} md={24} sm={24} className="photoSection_photo2">
         </Col>
        
       </Row>
      </div>

    </div>
    </Row>
    { screenSize.width>1200?<>
      <Row style={{background:'none'}} ref={shapeMotion.container}>
       <Col lg={12} xs={24} md={24} sm={24} style={{background:'none'}}>
          <QuestionAnswer questions={QuestionAns} />
       </Col>
       <Col lg={12} xs={24} md={24} sm={24} style={{background:'none'}}></Col>
     </Row>
    </>:<>
    <Row style={{background:'none'}} ref={shapeMotion.container}>
     <Col lg={24} xs={24} style={{background:'none'}} className="colQuestionSection"></Col>
       <Col lg={24} xs={24}  style={{background:'none'}}  >
          <QuestionAnswer questions={QuestionAns} />
       </Col>
      
     </Row>
    </>}
    
     </div>
 )
}
export default PhotoSection;
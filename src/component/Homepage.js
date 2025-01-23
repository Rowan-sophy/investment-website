
import React from "react";
import millify from 'millify';
import { Typography,Row,Col,Statistic,Pagination } from "antd";
import "../HomeStyle.css"
import { Link } from "react-router-dom";
import HeaderSection from "./HeaderSection";
import PhotoSection from "./PhotoSection";
import MarketTrends from "./MarketTrends";
import QuestionAnswer from "./QuestionAnswer";
import {News,CompanyDetails} from "../component";
import { useScroll, useTransform, motion } from "framer-motion";
import { useEffect, useRef } from "react";
import Lenis from 'lenis';




const {Title} =Typography;

const Homepage = () =>{
   
   const container = useRef();
   const { scrollYProgress } = useScroll({
     target: container,
     offset: ["start start", "end end"]
   }) 
 
   useEffect( () => {
     const lenis = new Lenis()
 
     function raf(time) {
       lenis.raf(time)
       requestAnimationFrame(raf)
     }
 
     requestAnimationFrame(raf)
   }, [])
   
   // console.log(data);
   const SectionTitle=({Title,subDescribtion,Link})=>{
   
      return(
     
      <div className="home-heading-container"  style={{paddingTop:'80px'}} >
      <Row>
        < Col span={22} className="title-container">
    
             <h2 className="home-title" > {Title} </h2>
        </Col>
        < Col span={2} className="showMore-container">
           <a href={`/${Link}`} className="show-more">Show More</a>
        </Col>
        
      </Row>
       <Row>
         <p className="sub-title">
         {subDescribtion} <br/>
         
         </p>
      </Row>
    </div>
      )
   }
   
   
    return(
       <div ref={container} style={{position:'relative'}}>
       <HeaderSection  scrollYProgress={scrollYProgress}/>
       <SectionTitle Title={"Financial News"} subDescribtion={"Read financial articals about gaint company around the world"} Link={"news"}/>
       <News simplified/> 
       <SectionTitle Title={"Market Trends"} subDescribtion={"Track global investment trends with real-time stock market data"} Link={"MarketTrends"}/>
       < MarketTrends simplified/>
       <PhotoSection/>
       <SectionTitle Title={" Companies Analaysis "} subDescribtion={"Explore real-time stock price charts,company financial data and more"} Link={"CompanyDetails"}/>
      <CompanyDetails simplified />  
       </div>
    )

}
export default Homepage;
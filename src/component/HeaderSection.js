import React from 'react';
import { useEffect, useState ,useRef,lazy,Suspense } from "react";
import images from '../images/images';
import { Col, Row,Divider} from 'antd';
import Loader from './Loader';
import TextAnimation from './TextAnimation';
import UseScreenSize from "./useScreenSize";
import {DollarOutlined ,RiseOutlined  } from '@ant-design/icons';
import { motion, useMotionValue, useTransform, animate ,useScroll,useTime,useInView} from "framer-motion";
import Lenis from 'lenis';
import ShapeMotion from './useShapeMotion';


 


const HeaderSection = ({scrollYProgress}) => {
  const Spline=lazy(()=> import('@splinetool/react-spline'));
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.2]);
  const rotate = useTransform(scrollYProgress, [0, -20], [0, 50])
  const container = useRef(null);
  const x = useMotionValue(0)
  const time = useTime()
  const screenSize=UseScreenSize();
  
  

  //  const { scrollYProgress } = useScroll({

  //    target: container,
  //    duration: 20,
  //    offset: ['start end', 'end start']

  // })

  
  useEffect( () => {
    const lenis = new Lenis()

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)
  }, [])
  
  const Phrase = ({text,className}) => {

    return (
      <div  style={{background:'none'}} className={className}>
        <p className='headerTitle' >{text}</p>
       
      </div>
    )
  }
  const Slide = (props) => {
   
    const direction = props.direction == 'left' ? -1 : 1;
    const translateX = useTransform(time,[0,8000],  [600 * direction, -600 * direction])
    
   return(
    <>
         <motion.div style={{x: translateX, left: props.left ,background:'none' ,display:'flex', whiteSpace:'nowrap', position:'relative',transition:{repeat:"infinite"},zIndex:'100',width:"inherit"}}  >
            <Phrase text={props.text}  className={props.className}/>
          
         </motion.div>
  
    </>
   )
 
    
  }
 const LoaderStyle='HeaderSectionLoading'
  
  return (
    /**https://draft.spline.design/8bGN4b-UL5ADoLcN/scene.splinecode */
    <motion.div style={{scale, rotate,position:'sticky',width:'inherit'}}  >
    <div className='HeaderSection'>
      <div className='mainHeader' >
         <Row  className='mainHeaderContainer' >
           <Col xl={7} lg={24} sm={24} xs={24} style={{background:'none'}}  ref={container} className='HeaderSectioncol1'>
           <div className='HeaderSectionNote1'>
                <p className='note1'>Company history Profile</p>
                <p className='note1'> Company Financial Info</p>
                <p className='note1'>Financial Key Metrics</p>

              </div>
              <Slide direction={'left'} left={"10%"} text={'INVESTMENT'} className={'slide1'}/>
              <div className='HeaderSectionNote2'>
                <p className='note4'><span className='HeaderSectionSpan'>investment world</span> between your hand ,Track all financail informtion about any company in the world and tens of financail articals about big companies also market trends for any counteies around the world </p>
               

              </div>
           </Col>
           <Col xl={10} lg={24} sm={24} xs={24} className='dShapeContainer'   >
            { screenSize.width>1200?<Suspense fallback={<Loader classname={LoaderStyle}/>}> <Spline scene= 'https://draft.spline.design/FrJeTDw7f3K5QoaB/scene.splinecode' className='MothionShape' style={{background:'black'}} /></Suspense> : <Suspense fallback={<Loader classname={LoaderStyle}/>}> <Spline scene= 'https://draft.spline.design/8NwRFDS2PDU5JynQ/scene.splinecode' className='MothionShape' style={{background:'black',backgroundColor:'black'}} /> </Suspense> }
             
           </Col>
           <Col xl={7} lg={24} sm={24} xs={24} style={{background:'none',position:'relative'}} ref={container} className='HeaderSectioncol2'>
               <Slide direction={'right'} left={"30%%"} text={'GATEWAY'} className={'slide2'} /> 
              <div className='HeaderSectionNote'>
                <p className='note2'>Track Stock Prices<br/> Follow Financial News <br/>Discover Maeket Trends <br/>Get Recommendation
                <br/>Track Stock Prices<br/> Follow Financial News $ <br/> $ Discover Maeket Trends <br/>Get $ Recommendation <br/> $ Track Stock Prices<br/> Follow Financial News <br/>Discover Maeket Trends <br/>Get Recommendation
               <br/> Track Stock Prices $ <br/> Follow Financial News <br/> $ Discover Maeket Trends <br/>Get RecommendationTrack<br/> Stock Prices<br/> Follow Financial News <br/>Discover Maeket Trends <br/>Get Recommendation
                </p>
                <p className='note3'> $ Track Stock Prices<br/> $ Follow Financial News <br/>Discover Maeket Trends <br/>Get Recommendation
                <br/>Track Stock Prices $<br/> Follow Financial $ News <br/>Discover Maeket Trends $ <br/>Get Recommendation $<br/>Track Stock Prices<br/> Follow Financial News <br/>Discover Maeket Trends <br/>Get Recommendation
               <br/> $ Track Stock Prices<br/>$ Follow Financial News <br/> $ Discover Maeket Trends <br/> $Get RecommendationTrack<br/> Stock Prices<br/> Follow Financial News <br/>Discover Maeket Trends <br/>Get Recommendation
                </p>
                <p className='note'>Track Stock Prices<br/> $ Follow Financial News <br/> $ Discover Maeket Trends $ <br/>Get Recommendation
                <br/>Track Stock Prices<br/> Follow $ Financial News <br/>Discover Maeket Trends $ <br/> $Get Recommendation<br/> Track Stock Prices<br/> Follow Financial News <br/>Discover Maeket Trends <br/>Get Recommendation
                <br/> Track Stock Prices<br/> Follow Financial News <br/>Discover Maeket Trends $ <br/>Get Recommendation $ <br/>Track Stock Prices<br/> Follow Financial News <br/>Discover Maeket Trends <br/>Get Recommendation
                </p>
              </div>
           </Col>
         </Row>
      </div>
      
   



    </div>
    </motion.div>


   
   
  
    
   
    );
};
export default HeaderSection;
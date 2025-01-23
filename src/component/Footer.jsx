import React from "react";
import {Routes,Route,Link} from 'react-router-dom';
import '../newsStyle.css'
import Spline from '@splinetool/react-spline'
import {FacebookOutlined,InstagramOutlined,TwitterOutlined,RedditOutlined } from "@ant-design/icons"
import { Col, Row, Typography, Select } from 'antd';




const { Title, Text } = Typography;
const { Option } = Select;

const Footer =() =>{
   
    
    return(
        <>
        
         <Row className='footer'>
           <Col lg={8}  className='footer-col1'>
           <h3 className="footer-typography" >
            SUPPORT
           </h3>
           <div className="footer-col-links-container">
              <Link className="link-style">ABOUT</Link>
              <Link className="link-style">HELP CENTER</Link>
              <Link className="link-style">SITE MAP</Link>
              <Link className="link-style">ABOUT</Link>
              <Link className="link-style">HELP CENTER</Link>
              <Link className="link-style">SITE MAP</Link>
           </div>
           
           </Col>
           <Col lg={8} className='footer-col1'>
              <h3 className="footer-typography">CONTACT US</h3>
            <Row style={{background:'none'}}>
               <p className="newsletter-title" style={{paddingBottom:'8px',paddingTop:'8px'}}>SUBSCRIBE TO OUR NEWSLETTER
               </p>
            </Row>
           
            <Row style={{background:'none' ,display:"table-cell",verticalAlign:'middle'}}>
                 <div className="input-style-contanier" style={{height:'64px'}}>
                     <input className="input-style" placeholder=" enter your email" />
                    
                </div>
                <span  className="newletter-span">
                    *sign your email to receive exclucive news about stock market<br/> and stock share prices
                    sign your email to receive exclucive news<br/>about stock market and stock share prices 
                    exclucive news about<br/>  stock market and stock share prices market and stock share prices
                    </span>
           
            </Row>
            
            <Row className="footer-icon">
                <Row style={{background:'none'}}>
                    <p className="newsletter-title"> FOLLOW US ON SOCAIL MEDIA </p>
                </Row>
                <Row style={{background:'none'}}>
                <FacebookOutlined className="icon-style"/>
               <InstagramOutlined className="icon-style"/>
               <TwitterOutlined className="icon-style"/>
               <RedditOutlined  className="icon-style"/>

             </Row>

            </Row>
           </Col>
           <Col lg={8} className='footer-col2'>
           <h3 className="footer-typography" style={{paddingBottom:'4px'}}> STOCK UNIVERES </h3>
            <Row className="img-logo-container">
                 <Spline scene= 'https://draft.spline.design/8NwRFDS2PDU5JynQ/scene.splinecode' /> 
            </Row>
            <span style={{background:'none',color:'white', opacity:'40%',fontSize:'10px'}}> @All copyright reserved for this company at 2024 year</span> 
               
           </Col>
         </Row>
         
          

       
        </>
    )

}
export default Footer;
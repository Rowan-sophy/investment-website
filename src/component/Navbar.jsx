import React from "react";
import { Button,Menu, Row} from "antd";
import { useState ,useEffect} from "react";
import {  motion ,AnimatePresence} from "framer-motion";
import UseScreenSize from "./useScreenSize";
import useStickyNavbar from './useStickyNavbar';
import { Link } from "react-router-dom";
import images from '../images/images';
import {MenuOutlined,CloseOutlined} from "@ant-design/icons"



const Navbar = () =>{
    const [activeMenu, setActiveMenu] = useState(true);
    const [menuClicked, setMenuClicked] = useState(false);
    
   const screenSize=UseScreenSize();
   const sticky=useStickyNavbar()
   const classes=`nav-container ${sticky}`
   const variants={
    visible:{
      opacity:1,
      x:100,
      transition:{
       type:'spring',
       stiffness:100,
       damping:100
      }
    },
    hidden:{
      opacity:0
    }
   }
  
    useEffect(() => {
      if (screenSize.width <= 800) {
        setActiveMenu(false);
      } else {
        setActiveMenu(true);
      }
    }, [screenSize]);
    
    return(
     <div className={classes}>
        <div className="logo-container">
            <img src={images.LOGO7}    className="logo-style"/>
            {/* <Typography.Title level={3} >
                <Link to="/" className="logo">cryptoverse</Link>
            </Typography.Title> */}
           
        </div>
         <Button className="menu-control-container" onClick={() => {
            setActiveMenu(!activeMenu)
            setMenuClicked(true)
            }}>
            <MenuOutlined  className="iconcolor"/>
            </Button>
        {activeMenu && screenSize.width>800?
            <>
         <div className="sub-navbar">
            <Menu theme="dark" mode="horizontal" className="menu">
            
                 <Menu.Item>
                    <Link to="/">HOME</Link>  
                </Menu.Item>
                <Menu.Item >
                    <Link to="/CompanyDetails" className="menu-item">Companies Analysis</Link>  
                </Menu.Item>
                <Menu.Item>
                    <Link to="/MarketTrends">Market Trends</Link>  
                </Menu.Item> 
                <Menu.Item >
                    <Link to="/news"> Financail News</Link>  
                </Menu.Item> 
                
            </Menu>
       
            <button className="logButton">
                <Link to='/LogIn' className="textLog"><img src={images.UserLogo}/></Link>
            </button>
            
        </div>
     
        </>
         :<AnimatePresence>
         <div className={` ${menuClicked!=true ?"menu-fade": "menu-show" }`} >

           <button onClick={()=>{setMenuClicked(false)}} className="close-button"><CloseOutlined  className="iconcolor"/></button>
           <Menu theme="dark" mode="vertical"  >
             <Menu.Item className="menuItem">
                         <Link to="/" onClick={()=>{setMenuClicked(false)}}>HOME</Link>  
                  </Menu.Item>
                  
           <Menu.Item className="menuItem">
               <Link to="/CompanyDetails" onClick={()=>{setMenuClicked(false)}}>Companies Analysis</Link>  
           </Menu.Item>
           <Menu.Item className="menuItem">
               <Link to="/news" onClick={()=>{setMenuClicked(false)}}>New</Link>  
           </Menu.Item> 
           <Menu.Item className="menuItem">
               <Link to="/MarketTrends" onClick={()=>{setMenuClicked(false)}}>Market Trends</Link>  
           </Menu.Item> 
           <Menu.Item className="menuItem">
               <Link to='/LogIn'  onClick={()=>{setMenuClicked(false)}}>log In</Link> 
           </Menu.Item> 
       </Menu>
         </div>
         </AnimatePresence>
         }
    </div>
       
    )

}
export default Navbar;
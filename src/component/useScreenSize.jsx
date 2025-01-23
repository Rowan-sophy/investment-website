import React from "react";
import {useEffect,useState} from "react";


const UseScreenSize=()=>{
    const [screenSize, setScreenSize] = useState({
      width:window.innerWidth,
});
  
    useEffect(() => {
      const handleResize = () => setScreenSize({width:window.innerWidth});
  
      window.addEventListener('resize', handleResize);
  
      handleResize();
  
      return () => window.removeEventListener('resize', handleResize);
    }, []);
  
 return screenSize;
}
export default UseScreenSize;
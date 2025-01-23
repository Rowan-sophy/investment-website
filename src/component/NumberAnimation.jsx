import React from "react";
import { useEffect,useState } from "react";
import {motion, useMotionValue, useTransform, animate,useInView}  from 'framer-motion'; 

import { useRef } from "react";

const NumberAnimation=({ from, to})=>{
    const nodeRef = useRef();
    const isInView = useInView(nodeRef)
    const newTO=parseInt(to)

    useEffect(() => {
      const node = nodeRef.current;
  
      const controls = animate(from, newTO, {
        duration: 2,
        onUpdate(value) {
          node.textContent =value;
        },
      });
  
      return () => controls.stop();
    }, [from, to,isInView]);
    

    return(
        <motion.div style={{background:'none'}} >
       <p ref={nodeRef} className="numberStyle" />
        </motion.div>
    )

}
export default NumberAnimation;
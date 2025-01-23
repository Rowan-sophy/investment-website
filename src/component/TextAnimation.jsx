import React from "react";
import {useRef , useEffect,useState} from "react";
import { motion, useMotionValue, useTransform, animate,useInView} from "framer-motion";

const TextAnimation=({text,classStyle,paraStyle})=>{
    
     const nodeRef = useRef();
     const isInView = useInView(nodeRef)
        const count = useMotionValue(0);
        const rounded = useTransform(count, (latest) => Math.round(latest));
        const displayText = useTransform(rounded, (latest) => text.slice(0, latest));
       
        const [animationCompleted, setAnimationCompleted] = useState(false);
        useEffect(() => {
          
     if(isInView)   {  animate(count, text.length, {
           type: "tween",
           duration: 10,
           ease: "linear",
            onUpdate: (latest) => {
            if (latest === text.length) {
               setAnimationCompleted(true);
              }
            },
            
          });
        }
          
         // Returning a cleanup function to stop the animation when the component is unmounted.
        
       }, [isInView]);
   
    return(
        <>
         <p className={animationCompleted ? paraStyle : ""} >
                 <motion.span className={classStyle}  ref={nodeRef} >{displayText}</motion.span>
              </p>
        </>
    )
   
     
}
export default TextAnimation;
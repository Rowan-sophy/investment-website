import React from "react";
import { useEffect,useState ,useRef } from "react";
import { motion, useMotionValue, useTransform,useScroll} from "framer-motion";
import UseScreenSize from "./useScreenSize";

const useShapeMotion=()=>{
    const container = useRef(null);
    const screenSize=UseScreenSize();
    const { scrollYProgress } = useScroll({

        target: container,
        duration: 50,
       offset: ['start end', 'end start']
  
     })
const endpiont= screenSize.width>1200? 548:160
const startpiont= screenSize.width>1200? -20:0
const translateY = useTransform(scrollYProgress, [.5, 0], [endpiont, startpiont]);
 return({ translateY,container})
}
export default useShapeMotion;

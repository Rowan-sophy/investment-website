import React from "react";
import { useEffect,useState ,useRef } from "react";


const useStickyNavbar=()=>{
    const [Sticky, setSticky] = useState('');

    useEffect(() => {
      window.addEventListener('scroll',isSticky );
      return () => {
        window.removeEventListener('scroll', isSticky );
      };
    }, []);
  
    const isSticky  = () => {
      const scrollTop= window.scrollY;
      const stickyClass=scrollTop>=250?"sticky":'';
      setSticky(stickyClass);
      console.log(stickyClass);

    }

      return Sticky ;

}
export default useStickyNavbar;
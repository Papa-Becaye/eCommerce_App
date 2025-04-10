import {useState, useEffect} from "react";

const useMobile = (breakpoint = 768) => {
  const [isMobile, setIsMobile] = useState(false);

  const handleResize = () => {
    const checkpoint = window.innerWidth <= breakpoint;
    setIsMobile(checkpoint);
  };

  useEffect(() => {
    handleResize();
    
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return [isMobile];
}

export default useMobile;
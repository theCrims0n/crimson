import { useEffect, useState } from "react";

export const Windows_Dimensions = () => {

    function getWindowDimensions() {
            if (typeof window !== "undefined") {
                const { innerWidth: width, innerHeight: height } = window;
                return {
                    width,
                    height
                };
            }
            return { width: 0, height: 0 }
    
        }
        const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());
    
        useEffect(() => {
            function handleResize() {
                setWindowDimensions(getWindowDimensions());
            }
    
            window.addEventListener('resize', handleResize);
            return () => window.removeEventListener('resize', handleResize);
        });

        return windowDimensions
    
} 
import { useContext, useEffect, useState } from "react"
import { WINDOW_TYPE } from "./constants";

/**
 * Get metadata about window
 * @returns {Object} window metadata
 */
 export const useWindowSize = () => {
    const [windowSize, setWindowSize] = useState({
        width: Math.min(window?.innerWidth || 0, window?.screen?.width || 0),
        height: Math.min(window?.innerHeight || 0, window?.screen?.height || 0)
    });

    const onWindowResize = () => {
        setWindowSize({
            width:Math.min(window?.innerWidth || 0, window?.screen?.width || 0),
            height: Math.min(window?.innerHeight || 0, window?.screen?.height || 0)
        });
    }

    useEffect(() => {
        window.addEventListener('resize', onWindowResize);
        onWindowResize();
        return () => {
            window.removeEventListener('resize', onWindowResize);
        }
    }, []);
    
    return { 
        ...windowSize,
        type: windowSize.width < 450 ? WINDOW_TYPE.MOBILE : WINDOW_TYPE.WEB
    };
}
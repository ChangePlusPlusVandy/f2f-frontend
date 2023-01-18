import { useContext, useEffect, useState } from "react"
import { useLocation } from "react-router-dom";
import { WINDOW_TYPE, CAPTIONS, ROUTES } from "./constants";

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

/**
 * Get caption for each home page
 * @returns {String} caption text
 */
 export const useCaption = () => {
    const { pathname } = useLocation();
    switch(pathname) {
        case(ROUTES.SIGN_UP): return CAPTIONS.SIGN_UP;
        default: return CAPTIONS.HOME;
    }
}
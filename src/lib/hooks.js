import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { WINDOW_TYPE, CAPTIONS, ROUTES } from "./constants";

/**
 * Get metadata about window
 * @returns {Object} window metadata
 */
export const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: Math.min(window?.innerWidth || 0, window?.screen?.width || 0),
    height: Math.min(window?.innerHeight || 0, window?.screen?.height || 0),
  });

  const onWindowResize = () => {
    setWindowSize({
      width: Math.min(window?.innerWidth || 0, window?.screen?.width || 0),
      height: Math.min(window?.innerHeight || 0, window?.screen?.height || 0),
    });
  };

  useEffect(() => {
    window.addEventListener("resize", onWindowResize);
    onWindowResize();
    return () => {
      window.removeEventListener("resize", onWindowResize);
    };
  }, []);

  return {
    ...windowSize,
    type: windowSize.width < 450 ? WINDOW_TYPE.MOBILE : WINDOW_TYPE.WEB,
  };
};

/**
 * Get caption for each home page
 * @returns {String} caption text
 */
export const useCaption = () => {
  const { pathname } = useLocation();
  switch (pathname) {
    case ROUTES.SIGN_UP:
      return {
        mainTitle: CAPTIONS.SIGN_UP_MAIN,
        subTitle: CAPTIONS.SIGN_UP_SUB,
      };
    case ROUTES.UPCOMING_TASKS:
      return {
        mainTitle: CAPTIONS.UPCOMING_MAIN,
        subTitle: CAPTIONS.UPCOMING_SUB,
      };
    case ROUTES.ROADMAP:
      return {
        mainTitle: CAPTIONS.ROADMAP_MAIN,
        subTitle: CAPTIONS.ROADMAP_SUB,
      };
      case ROUTES.ALL_TASKS:
      return {
        mainTitle: CAPTIONS.ALL_TASKS_MAIN,
        subTitle: CAPTIONS.ALL_TASKS_SUB,
      };
    default:
      return CAPTIONS.ERROR;
  }
};

/**
 * Determine whether to use back arrow for each page
 * @returns {Boolean} whether to use back arrow or not
 */
export const useBackArrow = () => {
  const { pathname } = useLocation();
  if (
    pathname == ROUTES.LOGIN ||
    pathname == ROUTES.ROADMAP ||
    pathname == ROUTES.COMMUNITY
  ) {
    return { showBackArrow: false };
  }
  return { showBackArrow: true };
};

/**
 * Determine whether to nav bar for each page
 * @returns {Boolean} caption text
 */
export const useNavBar = () => {
  const { pathname } = useLocation();
  switch (pathname) {
    case ROUTES.LOGIN:
      return { showNavBar: false };
    case ROUTES.SIGN_UP:
      return { showNavBar: false };
    default:
      return { showNavBar: true };
  }
};

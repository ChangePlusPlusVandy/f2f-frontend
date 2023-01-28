import styles from "./index.module.css";
import classNames from "classnames/bind";
import {
  useWindowSize,
  useCaption,
  useBackArrow,
  useNavBar,
} from "../../lib/hooks";
import { WINDOW_TYPE } from "../../lib/constants";
import { Outlet } from "react-router-dom";
import { Caption } from "../../components/Caption";
import { BackArrow } from "../../components/BackArrow";
import { NavBar } from "../NavBar";
const cx = classNames.bind(styles);

// Layout of authentication page
export const HomeLayout = () => {
  const { width, type } = useWindowSize();
  const { mainTitle, subTitle } = useCaption();
  const { showBackArrow } = useBackArrow();
  const { showNavBar } = useNavBar();

  const isMobile = type === WINDOW_TYPE.MOBILE;

  return (
    <div
      className={cx(styles.container, {
        [styles.mobile]: isMobile,
      })}
    >
      <BackArrow showBackArrow={showBackArrow} />
      <Caption
        mainTitle={mainTitle}
        subTitle={subTitle}
        className={cx(styles.caption)}
      />
      <div
        className={cx(styles.block, {
          [styles.mobile]: isMobile,
        })}
      >
        {<Outlet />}
      </div>
      <NavBar showNavBar={showNavBar} />
    </div>
  );
};

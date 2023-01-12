
import styles from './index.module.css';
import classNames from 'classnames/bind';
import { useLocation, useNavigate } from 'react-router-dom';
import { useWindowSize } from '../../lib/hooks';
import { HOME_NAV_LABELS, ROUTES, WINDOW_TYPE } from '../../lib/constants';
const cx = classNames.bind(styles);

export const NavBar = () => {
    const { width, type } = useWindowSize();
    const isMobile = type === WINDOW_TYPE.MOBILE;
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const isSmall = width < 600 || isMobile;

    const goTo = (route) => {
        navigate(route);
    }

    console.log(isSmall)
    return <div
        className={cx(styles.page, {
            [styles.mobile]: isMobile
        })}
    >
        <div
        className={cx(styles.navBar, {
            [styles.small]: isSmall
        })}
        >
            <div onClick={() => goTo(ROUTES.HOME)} className={cx(styles.navItem, {
                [styles.selected]: pathname === ROUTES.HOME
            })}>
                <span className={cx(styles.navItemLabel)}>{HOME_NAV_LABELS.HOME}</span>
            </div>  
            <div onClick={() => goTo(ROUTES.ROADMAP)} className={cx(styles.navItem, {
                [styles.selected]: pathname === ROUTES.ROADMAP
            })}>
                <span className={cx(styles.navItemLabel)}>{HOME_NAV_LABELS.ROADMAP}</span>
            </div>  
            <div onClick={() => goTo(ROUTES.COMMUNITY)} className={cx(styles.navItem, {
                [styles.selected]: pathname === ROUTES.COMMUNITY
            })}>
                <span className={cx(styles.navItemLabel)}>{HOME_NAV_LABELS.COMMUNITY}</span>
            </div> 
        </div>
    </div>
}
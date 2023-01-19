
import styles from './index.module.css';
import classNames from 'classnames/bind';
import { useLocation, useNavigate } from 'react-router-dom';
import { useWindowSize } from '../../lib/hooks';
import { HOME_NAV_LABELS, ROUTES, WINDOW_TYPE } from '../../lib/constants';
import { HomeIcon, RoadmapIcon, CommunityIcon } from '../../lib/icons';

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

    return <div
        className={cx(styles.page, {
            [styles.mobile]: isMobile
        })}
    >
        <div className={cx(styles.navBar)}>
            <div onClick={() => goTo(ROUTES.HOME)} className={cx(styles.navItem)}>
                <div className={cx(styles.icon_div)}>
                    <HomeIcon filled={pathname === ROUTES.HOME}/>
                </div>
            </div>  
            <div onClick={() => goTo(ROUTES.ROADMAP)} className={cx(styles.navItem)}>
                <div className={cx(styles.icon_div)}>
                    <RoadmapIcon filled={pathname === ROUTES.ROADMAP || pathname === ROUTES.ALL_TASKS || pathname === ROUTES.UPCOMING_TASKS}/>
                </div>
            </div>  
            <div onClick={() => goTo(ROUTES.COMMUNITY)} className={cx(styles.navItem)}>
                <div className={cx(styles.icon_div)}>
                    <CommunityIcon filled={pathname === ROUTES.COMMUNITY}/>
                </div>
            </div> 
        </div>
    </div>
}
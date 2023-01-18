import styles from './index.module.css';
import classNames from 'classnames/bind';
import { useWindowSize,useCaption } from '../../lib/hooks';
import { WINDOW_TYPE } from '../../lib/constants';
import { Outlet } from 'react-router-dom';
import { Caption } from '../../components/Caption';
const cx = classNames.bind(styles);

// Layout of authentication page
export const AuthLayout = () => {
    const { width, type } = useWindowSize();
    const caption = useCaption();

    const isMobile = type === WINDOW_TYPE.MOBILE;
    const isSmall = isMobile || width < 600;
    return <div
        className={cx(styles.main, {
            [styles.mobile]: isMobile
        })}
        style={isMobile ? { width: `${width - 68 - 17}px` } : {}}
    >
        <div className={cx(styles.container, {
            [styles.mobile]: isMobile
        })}>
            <Caption
                text={caption}
                className={cx(styles.caption)}
            />
            <div className={cx(styles.block)} id='mainBlock'>
                {<Outlet/>}
            </div>
        </div>
    </div>
}
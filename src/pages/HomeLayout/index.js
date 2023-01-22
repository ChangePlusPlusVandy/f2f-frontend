import styles from './index.module.css';
import classNames from 'classnames/bind';
import { useWindowSize,useCaption } from '../../lib/hooks';
import { WINDOW_TYPE } from '../../lib/constants';
import { Outlet } from 'react-router-dom';
import { Caption } from '../../components/Caption';
const cx = classNames.bind(styles);

// Layout of authentication page
export const HomeLayout = () => {
    const { width, type } = useWindowSize();
    const {mainTitle, subTitle }= useCaption();

    const isMobile = type === WINDOW_TYPE.MOBILE;

    return   <div className={cx(styles.container, {
            [styles.mobile]: isMobile
        })}>
            <Caption
                mainTitle={mainTitle}
                subTitle={subTitle}
                className={cx(styles.caption)}
            />
            <div className={cx(styles.block)} id='mainBlock'>
                {<Outlet/>}
            </div>
        </div>
}
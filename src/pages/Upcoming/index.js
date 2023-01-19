import styles from './index.module.css';
import classNames from 'classnames/bind';
import { UpcomingComponent } from '../../components/UpcomingComponent';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const cx = classNames.bind(styles);

//{email, password, firstname, lastname, schooldistrict, zipcode, phonenumber}
// Register page for authentication
export const Upcoming = ({ toast }) => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");

    return <>
        <UpcomingComponent
        />
    </>
}
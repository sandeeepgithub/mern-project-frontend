import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import Cookies from 'universal-cookie';

import './Main.css';
import Routes from '../routes/Routes';

function Main() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    const location = useLocation();

    const history = useHistory();
    const cookies = new Cookies();
    const token = cookies.get('token');



    const checkIfUserIsLoggedIn = async () => {
        if (token) {
            const expiresIn = cookies.get('expiresIn');
            if (new Date().toISOString() > expiresIn.toString()) {
                cookies.remove('token');
                cookies.remove('expiresIn');
                setIsLoggedIn(false);
            } else {
                setIsLoggedIn(true);
                if (location.pathname === '/login' || location.pathname === '/signup') {
                    history.push('/');
                }
            }
        }
    };

    const logoutHandler = () => {
        history.replace('/login');
        cookies.remove('token');
        cookies.remove('expiresIn');
        setIsLoggedIn(false);
    };

    useEffect(() => {
        checkIfUserIsLoggedIn();
        setIsLoaded(true);
    });


    return (
        <div className="Main">
            {isLoaded && <Routes isLoggedIn={isLoggedIn} logoutHandler={logoutHandler} />}
        </div>
    );
}

export default Main;

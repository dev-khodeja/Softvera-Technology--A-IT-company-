import React, { useEffect, useLayoutEffect } from 'react';
import Header from '../Header';
import { Outlet, useLocation } from 'react-router';
import Footer from '../Footer';

const MainLayout = () => {
    const { pathname, search, hash } = useLocation();

    useEffect(() => {
        if ('scrollRestoration' in window.history) {
            window.history.scrollRestoration = 'manual';
        }
    }, []);

    useLayoutEffect(() => {
        window.scrollTo(0, 0);
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
    }, [pathname, search, hash]);

    return (
        <div className="site-shell">
            <Header/>
            <Outlet/>
            <Footer/>
        </div>
    );
};

export default MainLayout;
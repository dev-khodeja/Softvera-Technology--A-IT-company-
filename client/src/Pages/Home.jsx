import React from 'react';
import HeroSection from '../Components/Home/HeroSection';
import Service from '../Components/Home/Service';
import FAQSection from '../Components/Home/FAQSection';
import ReviewSection from '../Components/Home/ReviewSection';


const Home = () => {
    return (
        <div>
            <HeroSection/>
            <Service/>
            <FAQSection/>
            <ReviewSection/>
        </div>
    );
};

export default Home;
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './FreelanceProMarket.scss';
import { useHistory } from "react-router-dom";
import { FaRocket, FaChartLine, FaBriefcase, FaCode, FaServer, FaDatabase } from 'react-icons/fa';
import { SiAmazonapigateway } from "react-icons/si";
import { SiAuthelia } from "react-icons/si";
import { FaBuildingColumns } from "react-icons/fa6";

gsap.registerPlugin(ScrollTrigger);

const FreelanceProMarket = () => {
    const wrapperRef = useRef(null);
    const cardsRef = useRef([]);
    const leftContentRef = useRef(null);
    const sectionRef = useRef(null);
    const architectureSectionRef = useRef(null);
    const navigate = useHistory();
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 1024);

    const handleGetStarted = () => {
        gsap.killTweensOf(cardsRef.current);
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        navigate.push('/services');
    }


    const handleScrollToArchitecture = () => {
        if (architectureSectionRef.current) {
            architectureSectionRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const handleResize = useCallback(() => {
        setIsMobile(window.innerWidth <= 1024);
    }, []);

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [handleResize]);

    useEffect(() => {
        if (wrapperRef.current && cardsRef.current.length > 0 && leftContentRef.current && !isMobile) {
            const cards = cardsRef.current;
            const numCards = cards.length;
            const cardHeight = 200;
            const cardGap = 30;
            const visibleHeight = 70;
            const totalHeight = (cardHeight + cardGap) * numCards;

            gsap.set(cards, {
                y: (i) => i * (cardHeight + cardGap),
                zIndex: (i) => i + 1,
            });

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top top",
                    end: `+=${totalHeight}`,
                    pin: true,
                    anticipatePin: 1,
                    scrub: 0.5,
                }
            });

            cards.forEach((card, index) => {
                if (index > 0) {
                    tl.to(card, {
                        y: index * visibleHeight,
                        duration: 1,
                        ease: "power1.inOut",
                    }, (index - 1) / (numCards - 1));
                }
            });

            ScrollTrigger.create({
                trigger: sectionRef.current,
                start: "top top",
                end: `bottom bottom+=${totalHeight}`,
                pin: leftContentRef.current,
                pinSpacing: false
            });

            ScrollTrigger.create({
                trigger: sectionRef.current,
                start: `bottom bottom-=${window.innerHeight / 2}`,
                onEnter: handleScrollToArchitecture,
                once: true
            });
        } else if (isMobile) {
            gsap.set(cardsRef.current, { clearProps: "all" });
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        }
    }, [isMobile]);

    return (
        <>
            <section className="intro-section">
                <h1>Discover and Hire Top Professionals</h1>
                <p>Quickly connect with the best experts for your needs. Our platform makes it simple. Give it a try today.</p>
                <div className="buttons">
                    <button className="start-now-btn" onClick={handleGetStarted}>Start Now</button>
                    <button className="architecture-btn" onClick={handleScrollToArchitecture}>Architecture</button>
                </div>
            </section>

            <section className={`stackable-cards-section ${isMobile ? 'mobile' : ''}`} ref={sectionRef}>
                <div className="left-content" ref={leftContentRef}>
                    <h1><FaRocket/> FreelanceProMarket</h1>
                    <p>FreelanceProMarket is a web-based application where you can easily book professionals from a
                        variety of services.
                        Our platform empowers users to quickly find and hire the right experts through a user-friendly
                        interface,
                        making it simple to manage and order services.</p>
                    <div className="feature">
                        <div>
                            <h2><FaChartLine/> <span>Why chose us?</span></h2>
                            <p>In today's fast-paced world, finding the right service providers can be challenging.
                                FreelanceProMarket simplifies this process by offering a seamless platform to connect
                                with top professionals.</p>
                        </div>
                    </div>
                    <div className="feature">
                        <div>
                            <h2><FaCode/> <span>Get Started Today!</span></h2>
                            <p>Join FreelanceProMarket and find the perfect professional for your needs. Start your
                                journey
                                now!</p>
                        </div>
                    </div>
                </div>
                <div className="right-content" ref={wrapperRef}>
                    <div className="custom-cards">
                        {[
                            {
                                title: 'Services',
                                description: 'Explore the variety of services we offer, including Video Editing, Photography, and Content Editing.'
                            },
                            {
                                title: 'Orders',
                                description: 'View your past orders in a detailed table, keeping track of all your bookings.'
                            },
                            {
                                title: 'Chatbot',
                                description: 'Interact with our chatbot, powered by AWS LexBot, to get assistance and answers to your questions.'
                            },
                            {
                                title: 'Cart',
                                description: 'Manage your selections in the cart, ready for checkout when you’re set to hire professionals.'
                            }
                        ].map((card, index) => (
                            <div key={index} className="custom-card" ref={el => cardsRef.current[index] = el}>
                                <button className="card-heading">{card.title}:</button>
                                <ul>
                                    <li>{card.description}</li>
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            <section className="architecture-section" ref={architectureSectionRef}>
                <div className="architecture-header">
                    <h2><FaBuildingColumns className="section-icon"/> Architecture</h2>
                    <p>Our application architecture ensures high scalability, reliability, and maintainability.</p>
                </div>
                <div className="architecture-content">
                    <div className="architecture-image-container">
                        <div class="architecture-image-wrapper">
                            <img src="FreelanceProMarket.png" alt="Architecture Diagram"
                                 className="architecture-image"/>
                        </div>
                    </div>
                    <div className="architecture-details">
                        {[
                            {
                                icon: FaBriefcase,
                                title: "Client-Side",
                                description: "Our platform features a dynamic and responsive user interface built with React.js, ensuring a seamless and interactive user experience."
                            },
                            {
                                icon: FaServer,
                                title: "Server-Side",
                                description: "The backend is implemented with AWS Lambda, leveraging a serverless architecture to provide scalable and efficient business logic processing."
                            },
                            {
                                icon: FaDatabase,
                                title: "Database",
                                description: "We use Amazon DynamoDB for data storage, ensuring high availability, scalability, and fast performance for all database operations."
                            },
                            {
                                icon: SiAmazonapigateway,
                                title: "APIs",
                                description: "Our RESTful APIs are managed by Amazon API Gateway, enabling secure and reliable communication between the frontend and backend services."
                            },
                            {
                                icon: SiAuthelia,
                                title: "Authentication",
                                description: "User authentication is handled by Amazon Cognito, providing secure access control and identity management to protect user data."
                            },
                            {
                                icon: FaRocket,
                                title: "AWS Amplify",
                                description: "AWS Amplify simplifies interaction with AWS services, handles user authentication, and easing our development workflow."
                            }
                        ].map((item, index) => (
                            <div key={index} className="architecture-card">
                                <item.icon className="arch-icon"/>
                                <h3>{item.title}</h3>
                                <p>{item.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
};

export default FreelanceProMarket;
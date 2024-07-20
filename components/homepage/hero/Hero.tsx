'use client'
import { useState, useEffect } from 'react';
import Container from './Container';
import Link from 'next/link';


function Hero() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    return (
        <div className="relative min-h-screen flex items-center" id="home">
            <div aria-hidden="true" className="absolute inset-0 grid grid-cols-2 -space-x-52 opacity-40 transition-opacity duration-1000">
                <div className="blur-[106px] h-56 bg-gradient-to-br from-primary to-purple-200 transition-all duration-1000 ease-in-out"></div>
                <div className="blur-[106px] h-32 bg-gradient-to-r from-blue-400 to-blue-800 transition-all duration-1000 ease-in-out"></div>
            </div>
            <Container>
                <div className={`relative pt-20 pb-20 px-4 sm:px-6 lg:px-8 transition-all duration-1000 ease-in-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    <div className="lg:w-2/3 text-center mx-auto">
                        <div className="bg-indigo-800 rounded-2xl p-4 inline-block mx-auto mb-8 transform transition-transform duration-500 hover:scale-110">
                            <svg className="w-12 h-12 mx-auto" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect width="24" height="24" rx="6" fill="#4F46E5"/>
                                <path d="M7 7h10v2H7V7zM7 11h10v2H7v-2zM7 15h10v2H7v-2z" fill="white"/>
                            </svg>
                        </div>
                        <h1 className="text-white font-bold text-4xl sm:text-5xl md:text-6xl xl:text-7xl mb-8 transition-all duration-500">
                        Your AI Companion for Seamless  <span className="text-indigo-600">Browser Automation</span>
                        </h1>
                        <p className="text-gray-300 text-lg sm:text-xl mb-12 transition-all duration-500">
                        Train once, automate forever. Your digital tasks, executed flawlessly.
                        </p>
                        <div className="flex flex-wrap justify-center gap-y-4 gap-x-6">
                            <Link href="/tasks" className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 transition-colors duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                Get Started
                            </Link>
                            <Link href="#features" className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-gray-50 transition-colors duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                Learn More
                            </Link>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    );
}

export default Hero;
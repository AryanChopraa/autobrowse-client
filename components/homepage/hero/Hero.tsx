import Container from './Container';

function Hero() {
    return (
        <div className="relative" id="home">
        <div aria-hidden="true" className="absolute inset-0 grid grid-cols-2 -space-x-52 opacity-40">
            <div className="blur-[106px] h-56 bg-gradient-to-br from-primary to-purple-200"></div>
            <div className="blur-[106px] h-32 bg-gradient-to-r from-blue-400 to-blue-800"></div>
        </div>
        <Container>
        <div className="relative pt-36 ml-auto">
            <div className="lg:w-2/3 text-center mx-auto">
                <h1 className="text-white font-bold text-5xl md:text-6xl xl:text-7xl">Transform Your Customer Support with <span className="text-primary ">AI-Driven Chat </span></h1>
                <p className="mt-8 text-gray-300 text-xl">Revolutionize Interactions, Boost Efficiency, Delight Customers .Train Your Own AI Chatbot using ChatGPT for Smarter, Personalized Customer Support </p>
                <div className="mt-16 flex flex-wrap justify-center gap-y-4 gap-x-6">
                    {/* <a
                        href="#"
                        className="relative flex h-11 w-full items-center justify-center px-6 before:absolute before:inset-0 before:rounded-full before:bg-primary before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95 sm:w-max"
                    >
                        <span className="relative text-base font-semibold text-white">Get Started</span>
                    </a> */}
                    {/* <a
                        href="#"
                        className="relative flex h-11 w-full items-center justify-center px-6 before:absolute before:inset-0 before:rounded-full before:border before:border-transparent before:bg-primary/10 before:bg-gradient-to-b before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95 sm:w-max"
                    >
                        <span className="relative text-base font-semibold text-primary">Sign Up</span>
                    </a> */}
                </div>
            </div>
        </div>
        </Container>

    </div>
    );
}

export default Hero;

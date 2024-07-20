import React from 'react';
import { FaRobot, FaLightbulb, FaShieldAlt } from 'react-icons/fa';

const Features = () => {
  return (
    <>
      <div className="overflow-hidden backdrop-blur-md md:-mt-32 sm:py-32 lg:-mb-10 text-white transition-all duration-300 ease-in-out mb-16 sm:mb-16">
        <div className='flex items-center justify-center px-4 sm:px-6 lg:px-8'>
          <p className='text-3xl md:text-5xl lg:text-7xl font-bold mb-10 text-center transition-all duration-300 ease-in-out'>
            Increase your productivity 
          </p>
        </div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
            <div className="lg:pr-8 lg:pt-4 text-center lg:text-left">
              <div className="lg:max-w-lg">
                <h2 className="text-base font-semibold leading-7 text-blue-500 transition-colors duration-300 ease-in-out">
                  Intelligent Task Automation
                </h2>
                <p className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl transition-all duration-300 ease-in-out">
                  Your AI Assistant for Seamless Web Interaction
                </p>
                <p className="mt-6 text-lg leading-8">
                  Revolutionize your web experience with our AI-powered browser automation agent. Create, execute, and manage complex workflows with ease, freeing you to focus on strategic tasks.
                </p>
                <dl className="mt-10 max-w-xl space-y-8 text-base leading-7 lg:max-w-none">
                  <div className="relative pl-9 transition-all duration-300 ease-in-out">
                    <dt className="inline font-semibold">
                      <FaRobot className="absolute left-1 top-1 h-5 w-5 text-blue-400" />
                      Intelligent Automation
                    </dt>
                    <dd className="text-gray-400">
                      Leverage AI to automate complex web tasks, enhancing productivity across all your digital interactions.
                    </dd>
                  </div>
                  <div className="relative pl-9 transition-all duration-300 ease-in-out">
                    <dt className="inline font-semibold">
                      <FaLightbulb className="absolute left-1 top-1 h-5 w-5 text-blue-300" />
                      Adaptive Learning
                    </dt>
                    <dd className="text-gray-400">
                      Our AI agent learns and adapts to your specific needs, continuously improving its automation capabilities.
                    </dd>
                  </div>
                  <div className="relative pl-9 transition-all duration-300 ease-in-out">
                    <dt className="inline font-semibold">
                      <FaShieldAlt className="absolute left-1 top-1 h-5 w-5 text-blue-200" />
                      Secure and Reliable
                    </dt>
                    <dd className="text-gray-400">
                      Enjoy peace of mind with our robust security measures, ensuring safe and dependable automated processes.
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
            <div className='flex flex-col gap-5 items-center lg:items-start'>
              <img
                src="https://spaces.autosurf.tech/static/homepage-staticfiles/taskspage.png"
                alt="AI Automation Interface"
                className="w-full max-w-md lg:max-w-full rounded-xl shadow-xl ring-1 ring-gray-700 object-cover transition-all duration-300 ease-in-out"
                width={2432}
                height={1442}
              />
              <img
                src="https://spaces.autosurf.tech/static/homepage-staticfiles/task.png"
                alt="AI Task Execution"
                className="w-full max-w-md lg:max-w-full rounded-xl shadow-xl ring-1 ring-gray-700 object-cover transition-all duration-300 ease-in-out hidden lg:block"
                width={2432}
                height={1442}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Features;
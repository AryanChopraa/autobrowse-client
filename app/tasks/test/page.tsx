'use client'

import React, { useState } from 'react'
import Image from 'next/image'

const Page = () => {
  const [prompt, setPrompt] = useState('')
  const [isPublic, setIsPublic] = useState(true)

  const samplePrompts = [
    "Navigate to the Google Finance (finance.google.com) website and search for NVIDIA there.",
    "Tell me what the AQI would be like for Manchester tomorrow?",
    "I can't remember the song by Coldplay where the whole stadium shimmers with light. Could you help me find that song?",
    "Can you tell me the latest news today from Yahoo News and who authored it?",
    "Go to Microsoft stock on Google Finance (finance.google.com), then compare it to NVIDIA stock using the Compare feature.",
    "Who is the current race leader at F1? Once you have a name, go to Google and search for him, tell me what his age is.",
    "Head over to the comments section on Mr. Beast's latest YouTube video and understand the top 5 comments and evaluate the overall audience sentiment. Be careful, don't go astray. Be slow"
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 to-black text-white p-8">
      <header className="flex justify-between items-center mb-16">
        <div className="flex items-center space-x-2">
          <Image src="/induced-logo.png" alt="Induced Logo" width={24} height={24} />
          <span className="text-2xl font-bold">induced</span>
          <span className="text-gray-400">//browse</span>
        </div>
        <button className="bg-blue-700 px-4 py-2 rounded-full text-sm">Use via API</button>
      </header>

      <main className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-4 text-center">Enter a goal for the browser agent.</h1>
        <p className="text-center text-gray-400 mb-8">
          Avoid running flows that require login. Give explicit and clear instructions for best performance. This is only a playground.
        </p>

        <div className="bg-gray-800 rounded-lg p-2 mb-4">
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Write prompt here"
            className="w-full bg-transparent outline-none"
          />
        </div>

        <div className="flex items-center justify-between bg-gray-800 rounded-lg p-2 mb-8">
          <div className="flex items-center space-x-2">
            <div className={`w-10 h-6 rounded-full p-1 ${isPublic ? 'bg-blue-500' : 'bg-gray-600'}`}>
              <div 
                className={`w-4 h-4 rounded-full bg-white transform duration-300 ease-in-out ${isPublic ? 'translate-x-4' : ''}`}
                onClick={() => setIsPublic(!isPublic)}
              ></div>
            </div>
            <span>Public</span>
          </div>
          <button className="text-blue-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </div>

        <div className="flex space-x-4 mb-8">
          <button className="text-blue-400 border-b-2 border-blue-400 pb-1">TRY THIS</button>
          <button className="text-gray-400">RECENT RUNS</button>
        </div>

        <div className="space-y-2">
          {samplePrompts.map((prompt, index) => (
            <div key={index} className="bg-gray-800 rounded-lg p-3 text-sm">
              {prompt}
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}

export default Page
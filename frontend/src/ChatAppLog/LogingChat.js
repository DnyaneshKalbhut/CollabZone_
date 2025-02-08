import React from 'react'

const LogingChat = () => {
  return (
    <div className="relative min-h-screen overflow-hidden text-white bg-gray-900">
      {/* Background decorations */}
      <div className="absolute w-64 h-64 bg-purple-500 rounded-full top-20 left-20 mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
      <div className="absolute w-64 h-64 bg-blue-500 rounded-full top-40 right-20 mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>

      {/* Header */}
      <header className="flex items-center justify-between p-4">
        <div className="text-2xl font-bold">ChatChat.gg</div>
             </header>

      {/* Main Content */}
      <main className="container px-4 mx-auto mt-16">
        <div className="flex flex-col items-center md:flex-row">
          {/* Left Column */}
          <div className="mb-8 md:mb-0">
            <h1 className="mb-4 text-4xl font-bold md:text-5xl">Talk to strangers, Make friends!</h1>
            <p className="mb-8 text-xl">

              Welcome to the ultimate social chat experience! Our app revolutionizes the way you connect online.
              With users from every time zone, there is always someone online ready to chat. Say goodbye to lonely nights and hello to round-the-clock companionship.
            </p>
            <button className="px-6 py-3 text-lg font-semibold transition bg-blue-600 rounded-full hover:bg-blue-700">
              <a href="/chathome">Start Chatting</a>
            </button>
          </div>

        </div>
      </main>
    </div>
  );

}

export default LogingChat
import { useState } from 'react'
import Btn from './components/Btn'
import SearchBar from './components/SearchBar'

function App() {

  return (
    <>
    <header className="flex items-center justify-between mb-6">
      <h1 className="text-2xl">Playlist App</h1>
      <img src="/src/assets/spotify-logo.svg" alt="Spotify Logo" className="w-6 h-6 mr-2" />
    </header>
    <div className="flex flex-col items-center justify-center">
      <div className="flex items-center justify-between mb-6">
        <SearchBar />
      </div>
      <div>
        <Btn text="Play" />
      </div>
    </div>
      <p className="flex bottom-0 items-center justify-center color-gray-800 mt-11 ">
        Made by <a className="text-blue-500 ml-1" href="https://github.com/bfaraway" target="_blank">Magnus Bjelland</a>
      </p>
    </>
  )
}

export default App

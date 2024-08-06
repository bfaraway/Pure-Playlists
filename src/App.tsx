import { useState } from 'react'
import Btn from './components/Btn'
import SearchBar from './components/SearchBar'
import Song from './components/Song'
import Spotify from './services/spotify'

type Song = {
  name: string;
  artist: string;
};

function App() {
  const [searchResults, setSearchResults] = useState<Song[]>([]);
  const [playlist, setPlaylist] = useState<Song[]>([]);

  const handleSearch = async (query: string) => {
    const results = await Spotify.SearchSong(query);
    console.log("Res:", results);
    setSearchResults(results);
  };

  const addToPlaylist = (song: Song) => {
    setPlaylist([...playlist, song]);
  };

  const removeFromPlaylist = (index: number) => {
    setPlaylist(playlist.filter((_,i) => i !== index));
  };

  return (
    <>
      <header className="flex items-center justify-between mb-6">
        <h1 className="text-2xl">Playlist App</h1>
        <img src="/src/assets/spotify-logo.svg" alt="Spotify Logo" className="w-6 h-6 mr-2" />
      </header>
      <div className="flex flex-col items-center justify-center rounded-lg p-4">
        <div className="flex items-center justify-center mb-6 w-full">
          <SearchBar onSearch={handleSearch} />
        </div>
        <div className="flex flex-row justify-between w-full rounded-lg p-4 bg-white">
          
            <div className="flex flex-col justify-left mb-6 bg-white rounded-lg p-4 m-4 w-full">
              <p className="text-xl mb-4">Songs</p>
              {searchResults.map((song, index) => (
                <Song
                  key={index}
                  title={song.name}
                  artist={song.artist}
                  onClick={() => addToPlaylist(song)}
                />
              ))}
            </div>

            <div className="flex flex-col justify-right mb-6 bg-white rounded-lg p-4 m-4 w-full">
              <p className="text-xl mb-4">Playlist</p>
              {playlist.map((song, index) => (
                <Song
                  key={index}
                  title={song.name}
                  artist={song.artist}
                  onClick={() => removeFromPlaylist(index)}
                />
              ))}
            </div>
          
        </div>
        <div className="flex items-right justify-right mt-4">
          <Btn text={`Save ${playlist.length} songs on Spotify`} />
        </div>
      </div>

      <p className="flex bottom-0 items-center justify-center color-gray-800 mt-11 ">
        Made by <a className="text-blue-500 ml-1" href="https://github.com/bfaraway" target="_blank">Magnus Bjelland</a>
      </p>
    </>
  )
}

export default App

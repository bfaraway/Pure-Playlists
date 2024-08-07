import { useState } from "react";
import Btn from "./components/Btn";
import SearchBar from "./components/SearchBar";
import Song from "./components/Song";
import Spotify from "./services/spotify";

type Song = {
  name: string;
  artist: string;
  album: string;
  uri: string;
  id: string;
  previewUrl: string;
};

function App() {
  const [searchResults, setSearchResults] = useState<Song[]>([]);
  const [playlist, setPlaylist] = useState<Song[]>([]);
  const [playlistName, setPlaylistName] = useState<string>(
    "Rename your playlist"
  );

  const handleSearch = async (query: string) => {
    const results = await Spotify.SearchSong(query);
    console.log("Res:", results);
    setSearchResults(results);
  };

  const handleSavePlaylist = async () => {
    await Spotify.savePlaylist(playlistName, playlist.map((song) => song.uri));
    setPlaylistName("Rename your playlist");
    setPlaylist([]);
  };

  const addToPlaylist = (song: Song) => {
    setPlaylist([...playlist, song]);
  };

  const removeFromPlaylist = (index: number) => {
    setPlaylist(playlist.filter((_, i) => i !== index));
  };

  const renamePlaylist = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPlaylistName(event.target.value);
  };

  return (
    <>
      <header className="flex items-center justify-between mb-6">
        <h1 className="text-2xl">Pure Playlists</h1>
        <img
          src="/src/assets/spotify-logo.svg"
          alt="Spotify Logo"
          className="w-6 h-6 mr-2"
        />
      </header>
      <div className="flex flex-col items-center justify-center rounded-md p-4">
        <div className="flex items-center justify-center mb-6 w-full">
          <SearchBar onSearch={handleSearch} />
        </div>

        {/* Search results and playlist */}
        {searchResults.length > 0 ? (
          <div
            id="search-results"
            className="flex flex-row justify-between w-full rounded-lg p-4 bg-white"
          >
            <div className="flex flex-col justify-left mb-6 bg-white rounded-lg p-2 m-2 w-full">
              <p className="text-xl mb-4">Tracks</p>
              {searchResults.map((song, index) => (
                <Song
                  key={index}
                  title={song.name}
                  artist={song.artist}
                  album={song.album}
                  uri={song.uri}
                  id={song.id}
                  onClick={() => addToPlaylist(song)}
                  previewUrl={song.previewUrl}
                />
              ))}
            </div>

            <div className="flex flex-col mb-6 bg-white rounded-lg p-2 m-2 w-full">
              <input
                id="playlist-name"
                className=" text-center rounded-md focus:outline-none focus:ring-1 focus:ring-black text-xl mb-4"
                type="text"
                onChange={renamePlaylist}
                value={playlistName}
              />
              {playlist.map((song, index) => (
                <Song
                  key={index}
                  title={song.name}
                  artist={song.artist}
                  album={song.album}
                  uri={song.uri}
                  id={song.id}
                  onClick={() => removeFromPlaylist(index)}
                  previewUrl={song.previewUrl}
                />
              ))}
              <div className="flex items-center justify-center mt-4">
                {/* Save playlist */}
                {playlist.length > 0 && (
                  <div
                    id="save-playlist"
                    className="flex items-right justify-right mt-4"
                  >
                    <Btn text={`Save playlist on Spotify`} onClick={handleSavePlaylist} />
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          // Empty state
          <div
            id="empty-state"
            className=" h-96 flex flex-col items-center justify-center w-full rounded-lg p-4 bg-white"
          >
            <p>No tracks found, start with searching for a track</p>
            <img
              id="empty-state-image"
              src="/src/assets/vinyl-record.svg"
              alt="Empty state"
              className="w-8 h-8 mr-2 animate-spin mt-4"
            />
          </div>
        )}
      </div>

      <p className="flex bottom-0 items-center justify-center color-gray-800 mt-11 ">
        Made by{" "}
        <a
          className="text-blue-500 ml-1"
          href="https://github.com/bfaraway"
          target="_blank"
        >
          Magnus Bjelland
        </a>
      </p>
    </>
  );
}

export default App;

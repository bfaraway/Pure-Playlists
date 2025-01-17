//File for Spotify API calls
const spotifyClientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
const redirectUri = import.meta.env.VITE_SPOTIFY_REDIRECT_URI;

const authUrl = "https://accounts.spotify.com/authorize";
const baseUrl = "https://api.spotify.com/v1";

const Spotify = {
  getAccessToken: () => {
    const accessToken = localStorage.getItem("spotifyAccessToken");
    const expiryTime = localStorage.getItem("spotifyTokenExpiry");
    console.log(redirectUri);
    if (accessToken && expiryTime && Number(expiryTime) > Date.now()) {
      return accessToken;
    }

    const accessTokenMatch = window.location.hash.match(/access_token=([^&]*)/);
    const expiresInMatch = window.location.hash.match(/expires_in=([^&]*)/);

    if (accessTokenMatch && expiresInMatch) {
      const newAccessToken = accessTokenMatch[1];
      const expiresIn = Number(expiresInMatch[1]);
      const newExpiryTime = Date.now() + expiresIn * 1000;

      localStorage.setItem("spotifyAccessToken", newAccessToken);
      localStorage.setItem("spotifyTokenExpiry", newExpiryTime.toString());

      window.location.hash = "";
      return newAccessToken;
    } else {
      const scope = "user-read-private user-read-email playlist-modify-public";
      window.location.href = `${authUrl}?client_id=${spotifyClientId}&response_type=token&redirect_uri=${redirectUri}&scope=${encodeURIComponent(
        scope
      )}`;
    }
  },

  SearchSong: async (songName: string) => {
    const accessToken = await Spotify.getAccessToken();
    try {
      const response = await fetch(
        `${baseUrl}/search?q=${songName}&type=track&limit=10`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const Songs = await response.json();
      console.log(Songs);
      return Songs.tracks.items.map((song: any) => ({
        id: song.id,
        name: song.name,
        artist: song.artists[0].name,
        album: song.album.name,
        uri: song.uri,
        previewUrl: song.preview_url,
      }));
    } catch (error) {
      console.error("Failed to search for song:", error);
      throw error; // Re-throw the error so it can be handled by the caller
    }
  },

  savePlaylist: async (playlistName: string, songUris: string[]) => {
    if (!playlistName || songUris.length === 0) {
      return;
    }

    const accessToken = Spotify.getAccessToken();
    const headers = { Authorization: `Bearer ${accessToken}` };

    try {
      // Get the user's Spotify ID
      const userResponse = await fetch(`${baseUrl}/me`, { headers });
      const userData = await userResponse.json();
      const userId = userData.id;

      // Create a new playlist
      const createPlaylistResponse = await fetch(
        `${baseUrl}/users/${userId}/playlists`,
        {
          method: "POST",
          headers: {
            ...headers,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name: playlistName }),
        }
      );
      const playlistData = await createPlaylistResponse.json();
      const playlistId = playlistData.id;

      // Add tracks to the playlist
      await fetch(`${baseUrl}/playlists/${playlistId}/tracks`, {
        method: "POST",
        headers: {
          ...headers,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ uris: songUris }),
      });

      return playlistId;
    } catch (error) {
      console.error("Error saving playlist:", error);
      throw error;
    }
  },
};

export default Spotify;



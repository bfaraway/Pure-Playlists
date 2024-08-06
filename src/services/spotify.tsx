//File for Spotify API calls
const spotifyClientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
const spotifySecret = import.meta.env.VITE_SPOTIFY_SECRET;
let accessToken = {};

const accessUrl = "https://accounts.spotify.com/api";
const baseUrl = "https://api.spotify.com/v1";

const Spotify = {
    getAccessToken: async () => {
        console.log(spotifyClientId, spotifySecret)
        try {
            const response = await fetch(`${accessUrl}/token?grant_type=client_credentials&client_id=${spotifyClientId}&client_secret=${spotifySecret}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            if (!data.access_token) {
                throw new Error("No access token received from Spotify");
            }

            return accessToken = data.access_token;
        } catch (error) {
            console.error("Failed to get Spotify access token:", error);
            throw error; // Re-throw the error so it can be handled by the caller
        }
    },

    SearchSong: async (songName: string) => {
        const accessToken = await Spotify.getAccessToken();
        try {
            const response = await fetch(`${baseUrl}/search?q=${songName}&type=track&limit=10`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${accessToken}`
                }
            });

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
                previewUrl: song.preview_url
            })); 
            
        } catch (error) {
            console.error("Failed to search for song:", error);
            throw error; // Re-throw the error so it can be handled by the caller
        }   
    }

};

export default Spotify;
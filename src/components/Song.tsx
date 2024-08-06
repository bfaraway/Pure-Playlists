import { useState, useRef } from 'react';

type SongProps = {
    title: string;
    artist: string;
    album: string;
    uri: string;
    id: string;
    onClick: () => void;
    previewUrl: string;
};

const Song: React.FC<SongProps> = (props) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef<HTMLAudioElement>(null);
  
    const handleMouseEnter = () => {
      if (audioRef.current) {
        audioRef.current.play();
        setIsPlaying(true);
      }
    };
  
    const handleMouseLeave = () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        setIsPlaying(false);
      }
    };

    return (
        <div className="flex items-start flex-col p-2 border-b-1 border-gray-100 hover:bg-gray-100" 
        onClick={props.onClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}>
            <p>{props.title}</p>
            <p className="text-sm text-gray-800">{props.artist}</p> 
            {isPlaying && <p className="text-xs text-gray-500">Playing preview...</p>}
            <audio ref={audioRef} src={props.previewUrl} />
        </div>
    );
}

export default Song;



type SongProps = {
    title: string;
    artist: string;
    onClick: () => void;
}

const Song: React.FC<SongProps> = (props) => {

    return (
        <div className="flex items-start flex-col p-2 border-b-2 border-gray-800 hover:bg-gray-100" onClick={props.onClick}>
            <p>{props.title}</p>
            <p className="text-sm text-gray-800">{props.artist}</p> 
        </div>
    );
}

export default Song;

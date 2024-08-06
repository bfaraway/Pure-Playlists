

const Btn = (props: any) => {   

    return (
            <button className=" min-w-24 bg-black hover:bg-gray-700 text-white px-4 py-2 rounded flex items-center justify-center flex-row" 
            onClick={props.onClick}>{props.text} {props.icon}</button>
    );
};

export default Btn; 
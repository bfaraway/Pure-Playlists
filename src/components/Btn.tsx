import React from "react";

const Btn = (props: any) => {   

    return (
            <button className="bg-black hover:bg-gray-700 text-white px-4 py-2 rounded" onClick={props.onClick}>{props.text} {props.icon}</button>
    );
};

export default Btn; 
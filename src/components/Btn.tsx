import React from "react";

const Btn = (props: any) => {
    return (
        <div className="flex items-center justify-center">
            <button className="bg-black text-white px-4 py-2 rounded-md">{props.text}</button>
        </div>
    );
};

export default Btn; 
import React from "react";

const SmallButton = (props: { name: string; onClick?: void }) => {
  const { name, onClick } = props;
  return (
    <div>
      <button
        onClick={() => onClick}
        className="m-1 rounded-full bg-violet-400 py-2 px-5 text-white first-letter:capitalize hover:bg-violet-700"
      >
        {name}
      </button>
    </div>
  );
};

export default SmallButton;

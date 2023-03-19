import React from "react";

const SmallButton = (props: { name: string; onClick?: void }) => {
  const { name, onClick } = props;
  return (
    <div>
      <button
        onClick={() => onClick}
        className="m-1 rounded-full bg-slate-700 py-2 px-5 text-[11px] text-white first-letter:capitalize hover:bg-black sm:text-sm "
      >
        {name}
      </button>
    </div>
  );
};

export default SmallButton;

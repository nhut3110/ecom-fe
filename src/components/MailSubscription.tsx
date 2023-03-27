import React from "react";
import InputForm from "./InputForm";

const MailSubscription = (): React.ReactElement => {
  return (
    <div className="my-4  flex h-auto w-full flex-col items-center justify-around bg-gray-200 py-3 md:h-60 md:flex-row">
      <div className="flex w-2/3 items-center gap-3 md:w-1/4 md:flex-col md:items-start">
        <p className="text-xl font-semibold first-letter:text-2xl md:text-4xl md:first-letter:text-5xl">
          Subscribe Mail List
        </p>
        <p className="text-[9px] font-normal text-gray-500 md:text-sm">
          Sign up to be the first to hear about special deals, wonderful offers
          and upcoming products.
        </p>
      </div>

      <div className="relative mt-4 flex w-3/4 items-center md:mt-0 md:w-2/5">
        <InputForm
          title="Enter your email address"
          type="email"
          id="email-subscription-input"
        />
        <button
          className="md:text-md mx-2 w-auto rounded bg-transparent py-2 px-4 text-xs font-bold text-black hover:rounded-lg hover:border-[1px] hover:border-solid hover:border-black"
          type="submit"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default MailSubscription;

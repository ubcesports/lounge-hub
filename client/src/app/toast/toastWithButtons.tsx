import React from "react";

interface ToastWithButtonsProps {
  message: string;
  buttonColorClassName: string;
  buttonOneText: string;
  buttonTwoText: string;
  buttonOneClick: () => void;
  buttonTwoClick: () => void;
  closeToast: () => void;
}

const ToastWithButtons = ({
  message,
  buttonColorClassName, // ex border-yellow-400  hover:bg-yellow-400
  buttonOneText,
  buttonTwoText,
  buttonOneClick,
  buttonTwoClick,
  closeToast,
}: Partial<ToastWithButtonsProps>) => (
  <div>
    <div className="flex items-center gap-3">
      <svg
        height="26%"
        width="26%"
        viewBox="0 0 24 24"
        fill="#f1c40f"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M23.32 17.191L15.438 2.184C14.728.833 13.416 0 11.996 0c-1.42 0-2.733.833-3.443 2.184L.533 17.448a4.744 4.744 0 000 4.368C1.243 23.167 2.555 24 3.975 24h16.05C22.22 24 24 22.044 24 19.632c0-.904-.251-1.746-.68-2.44zm-9.622 1.46c0 1.033-.724 1.823-1.698 1.823s-1.698-.79-1.698-1.822v-.043c0-1.028.724-1.822 1.698-1.822s1.698.79 1.698 1.822v.043zm.039-12.285l-.84 8.06c-.057.581-.408.943-.897.943-.49 0-.84-.367-.896-.942l-.84-8.065c-.057-.624.25-1.095.779-1.095h1.91c.528.005.84.476.784 1.1z" />
      </svg>
      <p>{message}</p>
    </div>
    <div className="mt-2 flex justify-between text-base">
      <button
        className={`w-auto rounded-md border-[3px] p-[6px] ${buttonColorClassName}`}
        onClick={() => {
          buttonOneClick();
          closeToast();
        }}
      >
        {buttonOneText}
      </button>
      <button
        className={`w-auto rounded-md border-[3px] p-[6px] ${buttonColorClassName}`}
        onClick={() => {
          buttonTwoClick();
          closeToast();
        }}
      >
        {buttonTwoText}
      </button>
    </div>
  </div>
);

export default ToastWithButtons;

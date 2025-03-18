import React from "react";

const Spinner: React.FC = () => {
  return (
    <div className="flex h-full items-center justify-center">
        {/* <div className="h-32 w-32 animate-spin rounded-full border-b-2 border-t-2 border-gray-900"></div> */}
        <img src="images/loadingGif.gif" alt="Loading" className="h-full w-full object-cover" />
    </div>
  );
};

export default Spinner;
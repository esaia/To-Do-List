import React, { useEffect } from "react";

const Alert = ({ alert, removeAlert, list }) => {
  useEffect(() => {
    const time = setTimeout(() => {
      removeAlert();
    }, 3000);

    return () => clearTimeout(time);
  }, [list]);

  return (
    <div
      className={`${alert.status} text-center  mb-2 p-[5px] px-10  animate-bounce  `}
    >
      <p>{alert.msg}</p>
    </div>
  );
};

export default Alert;

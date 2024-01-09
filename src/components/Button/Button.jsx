import React from "react";

import s from "./Button.module.css";

const Button = ({ children, onClick }) => {
  return (
    <button onClick={onClick} className={s.button}>
      {children}
    </button>
  );
};

export default Button;

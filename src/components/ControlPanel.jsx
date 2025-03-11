import React from "react";
import "./../assets/scss/ControlPanel.scss";
import { KEYPAD_SCREEN } from "../constants/constants";

const ControlPanel = ({ show, onOpenScreen }) => {
  return (
    <div id="ControlPanel" className={"screen_wrapper" + (show ? "" : " screen_hidden")}>
      <div className="panel" onClick={() => onOpenScreen(KEYPAD_SCREEN)}>
        <div className="top-box">
          <div className="inner-box"></div>
        </div>
        <div className="middle-bar"></div>
        <div className="bottom-box"></div>
      </div>
    </div>
  );
};

export default ControlPanel;

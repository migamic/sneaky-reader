import React, { useState } from 'react';

import { VscFiles, VscSearch, VscSourceControl, VscDebugAlt, VscExtensions, VscAccount,VscSettingsGear } from "react-icons/vsc";

const Iconbar = () => {
  return (
    <div className="icon-bar">
      <div>
        <div className="icon"><VscFiles /></div>
        <div className="icon"><VscSearch /></div>
        <div className="icon"><VscSourceControl /></div>
        <div className="icon"><VscDebugAlt /></div>
        <div className="icon"><VscExtensions /></div>
      </div>
      <div>
        <div className="icon"><VscAccount /></div>
        <div className="icon"><VscSettingsGear /></div>
      </div>
    </div>
  );
};

export default Iconbar;
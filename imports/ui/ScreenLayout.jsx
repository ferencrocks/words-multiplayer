import React from 'react';

const ScreenLayout = ({ main, top, left }) => {
  return (
    <div className="screen-layout">
      <header className="nav-top">{top}</header>
      <section className="content-main">{main}</section>
      <section className="content-left">{left}</section>
    </div>
  );
};

export default ScreenLayout;
import React from "react";
import NavBar from "./navbar";
export interface HeaderProps {}

export function Header(props: HeaderProps) {
  return (
    <header>
      <NavBar />
    </header>
  );
}

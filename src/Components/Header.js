import React from "react";
import styles from "./Header.module.css";
import { ReactComponent as Logo } from "../Assets/logo.svg";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className={styles.header}>
      <nav className={`${styles.nav} container`}>
        <Link to="/" arial-label="home ifmg">
          <Logo />
        </Link>
      </nav>
    </header>
  );
};

export default Header;

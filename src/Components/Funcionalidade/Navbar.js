import React from "react";
import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { SidebarData } from "./SidebarData";
import { IconContext } from "react-icons";

const Navbar = () => {
  const [sidebar, setSidebar] = React.useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  return (
    <>
      <IconContext.Provider value={{ color: "#fff" }}>
        <div className={styles.navbar}>
          <Link to="#" className={styles.menuBars}>
            <FaIcons.FaBars onClick={showSidebar} />
            MENU
          </Link>
        </div>
        <nav
          className={
            !sidebar
              ? `${styles.navMenu} ${styles.active}`
              : `${styles.navMenu}`
          }
          onClick={showSidebar}
        >
          <ul className={`${styles.navMenuItems}`}>
            {SidebarData.map((item, index) => {
              return (
                <li key={index} className={styles.navText}>
                  <Link to={item.path}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
};

export default Navbar;

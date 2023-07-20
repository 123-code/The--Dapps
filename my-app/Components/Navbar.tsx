import React, { useState } from "react";
import styles from "./navbar.module.css";
import { Button } from 'antd';
import { BsSun, BsFillMoonFill } from 'react-icons/bs';
import { GiHamburgerMenu } from 'react-icons/gi';
import Typography from '@material-ui/core/Typography';
import { useRouter } from 'next/router'; // Import the useRouter hook from next/router

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [colorMode, setColorMode] = useState("light");
  const router = useRouter(); // Use the useRouter hook instead of useNavigate

  return (
    <div id="navFix">
      <div
        className="navContainer"
        style={{ backgroundColor: colorMode === "light" ? "white" : "#1a202c" }}
      >
        <div className="navWrapper">
          <div className="navItem">
            <a href="#Home" className="navLink">
              <Typography variant="h3" gutterBottom>
                HolaTL
              </Typography>
            </a>
          </div>
          <div className="navItem">
            <div className="navIcon" onClick={() => setIsOpen(!isOpen)}>
              <i
                className={isOpen ? "fas fa-times" : "fas fa-bars"}
                style={{
                  color: colorMode === "light" ? "black" : "white",
                }}
              >
                <GiHamburgerMenu />
              </i>
            </div>
            <ul className={isOpen ? "navMenu active" : "navMenu"}>
              <li className="navItem">
                <Button onClick={() => router.push("/")} type="text">Inicio</Button>
              </li>
              <li className="navItem">
                <Button type="text" onClick={() => router.push("/nosotros")}>Nosotros</Button>
              </li>
              <li className="navItem">
                <Button onClick={() => router.push("/contactform")} type="text">Contactanos</Button>
              </li>
              <li className="navItem">
                <Button onClick={() => router.push("/material")} type="text">Material</Button>
              </li>
              <li className="navItem">
                <Button onClick={() => router.push("/consultas")} type="text">Consultas</Button>
              </li>
              <li className="navItem">
                <button
                  className="navLink"
                  onClick={() =>
                    setColorMode(colorMode === "light" ? "dark" : "light")
                  }
                  style={{
                    backgroundColor:
                      colorMode === "light" ? "#a891b7" : "#f56565",
                    color: colorMode === "light" ? "white" : "black",
                  }}
                >
                  {colorMode === "light" ? <BsFillMoonFill /> : <BsSun />}
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <style jsx>{`
        @media (min-width: 768px) {
          .navMenu {
            display: flex !important;
          }
          .navIcon {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
}

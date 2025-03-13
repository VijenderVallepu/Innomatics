import React from "react";
import { getImageUrl } from "../../utils";
import styles from "./About.module.css";

export const About = () => {
  return(
    <section className={styles.container} id="about">
        <h2 className={styles.title}>
            About
        </h2>
        <div className={styles.content}>
            <img src={getImageUrl("about/aboutImage.png")}
             alt="me sitting with a laptop"
             className={styles.AboutImage}
              />
              <ul className={styles.AboutItems}>
                <li className={styles.AboutItem}>
                    <img src={getImageUrl("about/cursorIcon.png")} alt="cursor Icon" />
                    <div className={styles.AboutItemText}>
                        <h3>frontend developer</h3>
                        <p>I'm a frontend developer with experience building optimized sites </p>
                    </div>
                </li>
                <li className={styles.AboutItem}>
                    <img src={getImageUrl("about/serverIcon.png")} alt="server Icon" />
                    <div className={styles.AboutItemText}>
                        <h3>backend developer (Ongoing)</h3>
                        <p></p>
                    </div>
                </li>
              
              </ul>
        </div>
    </section>
  );
};

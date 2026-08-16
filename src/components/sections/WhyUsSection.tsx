"use client";

import React from "react";
import styles from "@/styles/whyus.module.css";
import { WHY_US_PILLARS } from "@/lib/constants";

export const WhyUsSection = () => {
  return (
    <section id="why-us" className={styles.whyUsSection} aria-label="Why Choose Our Aerial Services">
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.sectionTag}>THE AMARE DIFFERENCE</span>
          <h2 className={styles.title}>PRECISION MEETS PASSION</h2>
          <p className={styles.subtitle}>
            Every flight we take is a promise to make your moment unforgettable — backed by certified pilots, state-of-the-art technology, and absolute devotion.
          </p>
        </div>

        <div className={styles.grid}>
          {WHY_US_PILLARS.map((pillar) => (
            <div key={pillar.number} className={styles.pillarCard}>
              <span className={styles.pillarNumber}>//{pillar.number}</span>
              <div>
                <h3 className={styles.pillarTitle}>{pillar.title}</h3>
                <p className={styles.pillarDescription}>{pillar.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

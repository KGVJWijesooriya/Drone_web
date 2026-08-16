"use client";

import React from "react";
import styles from "@/styles/showreel.module.css";
import { PORTFOLIO_SHOWCASE } from "@/lib/constants";

export const ShowreelSection = () => {
  return (
    <section id="portfolio" className={styles.showreelSection} aria-label="Selected Production Showcase">
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <span className={styles.sectionTag}>SELECTED PRODUCTIONS</span>
            <h2 className={styles.title}>FLIGHT ARCHIVES & CASE STUDIES</h2>
            <p className={styles.subtitle}>
              Explore our recent aerial operations spanning luxury weddings, high-speed commercial car commercials, and headline festival LED shows.
            </p>
          </div>
        </div>

        <div className={styles.grid}>
          {PORTFOLIO_SHOWCASE.map((project, index) => (
            <article key={index} className={styles.showcaseCard}>
              <div>
                <div className={styles.metaRow}>
                  <span className={styles.categoryTag}>//{project.category}</span>
                  <span className={styles.yearTag}>{project.year}</span>
                </div>

                <h3 className={styles.projectTitle}>{project.title}</h3>
                <div className={styles.location}>{project.location}</div>

                <div className={styles.highlightBox}>
                  <strong>Mission Key:</strong> {project.highlight}
                </div>
              </div>

              <div className={styles.serviceTags}>
                {project.services.map((svc, sIdx) => (
                  <span key={sIdx} className={styles.pill}>
                    {svc}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

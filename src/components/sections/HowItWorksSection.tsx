"use client";

import React from "react";
import styles from "@/styles/howitworks.module.css";
import { HOW_IT_WORKS_STEPS } from "@/lib/constants";

export const HowItWorksSection = () => {
  return (
    <section id="process" className={styles.howItWorksSection} aria-label="How Booking & Flight Operations Work">
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.sectionTag}>YOUR JOURNEY WITH US</span>
          <h2 className={styles.title}>FROM VISION TO FLIGHT</h2>
          <p className={styles.subtitle}>
            From your initial idea to high-precision flight execution, experience a seamless process designed with care.
          </p>
        </div>

        <div className={styles.stepsGrid}>
          {HOW_IT_WORKS_STEPS.map((stepItem) => (
            <div key={stepItem.step} className={styles.stepCard}>
              <div className={styles.stepHeader}>
                <span className={styles.stepBadge}>PHASE {stepItem.step}</span>
                <span className={styles.stepArrow}>→</span>
              </div>
              <h3 className={styles.stepTitle}>{stepItem.title}</h3>
              <p className={styles.stepDescription}>{stepItem.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

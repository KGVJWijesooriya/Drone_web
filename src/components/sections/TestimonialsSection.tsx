"use client";

import React from "react";
import styles from "@/styles/testimonials.module.css";
import { TESTIMONIALS } from "@/lib/constants";

export const TestimonialsSection = () => {
  return (
    <section id="testimonials" className={styles.testimonialsSection} aria-label="Client Testimonials">
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.sectionTag}>SHARED MOMENTS</span>
          <h2 className={styles.title}>STORIES OF LOVE & SPECTACLE</h2>
          <p className={styles.subtitle}>
            Discover how Drone Amare has created unforgettable aerial experiences for weddings, festivals, and cinematic productions.
          </p>
        </div>

        <div className={styles.grid}>
          {TESTIMONIALS.map((item, index) => (
            <div key={index} className={styles.testimonialCard}>
              <div>
                <div className={styles.quoteIcon}>“</div>
                <blockquote className={styles.quoteText}>{item.quote}</blockquote>
              </div>

              <div className={styles.cardFooter}>
                <span className={styles.author}>{item.author}</span>
                <span className={styles.role}>{item.role}</span>
                <span className={styles.eventTag}>EVENT: {item.event}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

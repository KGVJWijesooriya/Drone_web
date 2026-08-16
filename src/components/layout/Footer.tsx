"use client";

import React from "react";
import Image from "next/image";
import styles from "@/styles/footer.module.css";
import { SITE_CONFIG, SERVICES, NAV_LINKS } from "@/lib/constants";

export const Footer = () => {
  return (
    <footer className={styles.footer} aria-label="Site Footer">
      <div className={styles.container}>
        <div className={styles.topGrid}>
          {/* Brand Col */}
          <div className={styles.brandCol}>
            <Image
              src="/mainlogo.png"
              alt="DRONE AMARE Logo"
              width={160}
              height={50}
              className={styles.footerLogoImage}
            />
            <div className={styles.tagline}>{SITE_CONFIG.tagline}</div>
            <p className={styles.brandDesc}>
              Bespoke aerial visual experiences for weddings, festivals, cinema productions, and high-concept events.
            </p>
          </div>

          {/* Services Col */}
          <div>
            <div className={styles.colTitle}>SERVICES</div>
            <ul className={styles.linkList}>
              {SERVICES.map((s) => (
                <li key={s.id}>
                  <a href="#services" className={styles.footerLink}>
                    {s.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Navigation Col */}
          <div>
            <div className={styles.colTitle}>NAVIGATION</div>
            <ul className={styles.linkList}>
              {NAV_LINKS.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className={styles.footerLink}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Dispatch & Operations Col */}
          <div>
            <div className={styles.colTitle}>DISPATCH & HQ</div>
            <ul className={styles.linkList}>
              <li className={styles.footerLink}>{SITE_CONFIG.contact.location}</li>
              <li className={styles.footerLink}>{SITE_CONFIG.contact.phone}</li>
              <li className={styles.footerLink}>{SITE_CONFIG.contact.email}</li>
              <li className={styles.footerLink}>{SITE_CONFIG.contact.hours}</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className={styles.bottomBar}>
          <div className={styles.copyright}>
            © {new Date().getFullYear()} {SITE_CONFIG.name}. ALL RIGHTS RESERVED.
          </div>
          <div className={styles.safetyNotice}>
            CERTIFIED PROFESSIONALS // FULLY INSURED OPERATIONS
          </div>
        </div>
      </div>
    </footer>
  );
};

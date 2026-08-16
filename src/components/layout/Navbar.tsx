"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "@/styles/navbar.module.css";
import { SITE_CONFIG, NAV_LINKS } from "@/lib/constants";

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ""}`}>
      <div className={styles.navContainer}>
        <div className={styles.brand}>
          <Link href="/" className={styles.logoLink}>
            <Image
              src="/mainlogo.png"
              alt="DRONE AMARE Emblem"
              width={48}
              height={42}
              priority
              className={styles.logoImage}
            />
            <Image
              src="/name.png"
              alt="DRONE AMARE"
              width={150}
              height={32}
              priority
              className={styles.nameImage}
            />
          </Link>
        </div>

        <nav aria-label="Main Navigation">
          <ul className={styles.navLinks}>
            {NAV_LINKS.map((link) => (
              <li key={link.label} className={styles.navItem}>
                <a href={link.href} className={styles.navLink}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.navActions}>
          <a href="#contact" className={styles.bookButton}>
            <span>Book Your Moment</span>
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="square"
              strokeLinejoin="miter"
            >
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </a>

          <button
            className={styles.mobileMenuToggle}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? "CLOSE" : "MENU"}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className={styles.mobileDrawer}>
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className={styles.mobileLink}
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
};

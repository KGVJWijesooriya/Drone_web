"use client";

import React, { useRef, useEffect } from "react";
import styles from "@/styles/hero.module.css";
import { HERO_DATA } from "@/lib/constants";

export const HeroSection = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.9;
      videoRef.current.play().catch(() => {
        // Autoplay fallback
      });
    }
  }, []);

  return (
    <section className={styles.hero} aria-label="Hero Section">
      {/* Background Subtle Grid Pattern */}
      <div className={styles.gridPattern} />

      {/* Full Right-Side Video Background */}
      <div className={styles.rightVideoBackground}>
        <video
          ref={videoRef}
          className={styles.videoElement}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        >
          <source
            src="/rotate_camera_around_the_drone_202608160041.mp4"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
        <div className={styles.videoGradientBlend} />
      </div>

      {/* Floating HUD Reticles on Right Video */}
      <div className={styles.floatingReticleTop}>
        <span className={styles.liveDot} />
        <span>AERIAL FEED // 360° LIVE ORBIT</span>
      </div>

      <div className={styles.floatingReticleBottom}>
        <span>TELEMETRY: PITCH +0.4° // ALT 120M</span>
      </div>

      {/* Left Column Text & Content */}
      <div className={styles.mainContainer}>
        <div className={styles.leftCol}>
          <div className={styles.badgeWrapper}>
            <span className={styles.badgePulse} />
            <span className={styles.badgeText}>{HERO_DATA.badge}</span>
          </div>

          <h1 className={styles.heading}>
            <span className={styles.titleLine}>{HERO_DATA.titleLine1}</span>
            <span className={styles.titleOutline}>{HERO_DATA.titleLine2}</span>
          </h1>

          <p className={styles.description}>{HERO_DATA.description}</p>

          <div className={styles.ctaGroup}>
            <a href={HERO_DATA.primaryCta.href} className={styles.primaryCta}>
              <span>{HERO_DATA.primaryCta.label}</span>
              <svg
                width="14"
                height="14"
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

            <a
              href={HERO_DATA.secondaryCta.href}
              className={styles.secondaryCta}
            >
              <span>{HERO_DATA.secondaryCta.label}</span>
            </a>
          </div>

          <div className={styles.specRow}>
            <div className={styles.specItem}>
              <span className={styles.specDot} />
              <span>CERTIFIED MASTER PILOTS</span>
            </div>
            <div className={styles.specItem}>
              <span className={styles.specDot} />
              <span>8K CINEMA RAW RIGS</span>
            </div>
            <div className={styles.specItem}>
              <span className={styles.specDot} />
              <span>FULLY INSURED OPERATIONS</span>
            </div>
          </div>
        </div>
      </div>

      {/* Full-Width Telemetry Metrics Bar at Bottom */}
      <div className={styles.metricsBar}>
        {HERO_DATA.metrics.map((metric, index) => (
          <div key={index} className={styles.metricItem}>
            <span className={styles.metricValue}>{metric.value}</span>
            <span className={styles.metricLabel}>{metric.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

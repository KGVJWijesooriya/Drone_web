"use client";

import React, { useRef, useEffect } from "react";
import styles from "@/styles/hero.module.css";
import { HERO_DATA } from "@/lib/constants";
import { useGsapHero } from "@/lib/useGsapHero";

export const HeroSection = () => {
  const heroRef = useRef<HTMLElement>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const titleBrandRef = useRef<HTMLSpanElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const ctaGroupRef = useRef<HTMLDivElement>(null);
  const specRowRef = useRef<HTMLDivElement>(null);
  const metricsBarRef = useRef<HTMLDivElement>(null);

  // Initialize GSAP Entrance Timeline & ScrollTrigger Parallax
  useGsapHero({
    heroRef,
    videoContainerRef,
    videoRef,
    leftColRef,
    badgeRef,
    headingRef,
    titleBrandRef,
    descRef,
    ctaGroupRef,
    specRowRef,
    metricsBarRef,
  });

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 1.0;
      videoRef.current.play().catch(() => {
        // Autoplay fallback
      });
    }
  }, []);

  const renderFlickerText = (
    text: string,
    lineType: "fill" | "outline" | "brand" = "fill",
    lineOffsetDelay = 0
  ) => {
    const chars = text.split("");
    const total = chars.length;

    const flickerClass =
      lineType === "outline"
        ? styles.flickerCharOutlineRate
        : lineType === "brand"
          ? styles.flickerCharBrandRate
          : styles.flickerCharFillRate;

    return chars.map((char, index) => {
      // Scramble index mapping using prime multiplier for deterministic pseudo-random letter selection
      const randomSlot = (index * 7 + 3) % total;
      // 2.0s step between slots = 1 character flickers every 2 seconds
      // plus lineOffsetDelay so each line flickers at a distinct phase offset!
      const delay = (randomSlot * 2.0 + lineOffsetDelay).toFixed(2);

      return (
        <span
          key={index}
          className={`${styles.char} ${flickerClass}`}
          style={{ animationDelay: `${delay}s` }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      );
    });
  };

  return (
    <section ref={heroRef} className={styles.hero} aria-label="Hero Section">
      {/* Background Subtle Grid Pattern */}
      <div className={styles.gridPattern} />

      {/* Full Right-Side Video Background */}
      <div ref={videoContainerRef} className={styles.rightVideoBackground}>
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

      {/* Left Column Text & Content */}
      <div className={styles.mainContainer}>
        <div ref={leftColRef} className={styles.leftCol}>
          <div ref={badgeRef} className={styles.badgeWrapper}>
            <span className={styles.badgePulse} />
            <span className={styles.badgeText}>{HERO_DATA.badge}</span>
          </div>

          <h1 ref={headingRef} className={styles.heading}>
            <span className={styles.titleLine}>
              {renderFlickerText(HERO_DATA.titleLine1, "fill", 0.0)}
            </span>
            {/* <span className={styles.titleOutline}>
              {renderFlickerText(HERO_DATA.titleLine2, "outline", 0.65)}
            </span> */}
            <span ref={titleBrandRef} className={styles.titleBrand}>
              {renderFlickerText(HERO_DATA.titleLine3, "brand", 1.35)}
            </span>
          </h1>

          <p ref={descRef} className={styles.description}>
            {HERO_DATA.description}
          </p>

          <div ref={ctaGroupRef} className={styles.ctaGroup}>
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

          <div ref={specRowRef} className={styles.specRow}>
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

      {/* Full-Width Telemetry Metrics Bar at Bottom with GSAP Count-Up */}
      <div ref={metricsBarRef} className={styles.metricsBar}>
        {HERO_DATA.metrics.map((metric, index) => (
          <div key={index} className={styles.metricItem}>
            <span
              className={styles.metricValue}
              data-metric-val={metric.value}
            >
              {metric.value}
            </span>
            <span className={styles.metricLabel}>{metric.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

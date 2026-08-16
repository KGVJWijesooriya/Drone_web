"use client";

import React, { useRef } from "react";
import styles from "@/styles/services.module.css";
import { SERVICES, ServiceItem } from "@/lib/constants";
import { useGsapHorizontalServices } from "@/lib/useGsapHorizontalServices";

const ServiceIcon = ({ type }: { type: string }) => {
  switch (type) {
    case "drone":
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="square">
          <circle cx="12" cy="12" r="3" />
          <path d="M4.93 4.93L7.76 7.76M19.07 4.93L16.24 7.76M4.93 19.07L7.76 16.24M19.07 19.07L16.24 16.24" />
          <circle cx="4" cy="4" r="2" />
          <circle cx="20" cy="4" r="2" />
          <circle cx="4" cy="20" r="2" />
          <circle cx="20" cy="20" r="2" />
        </svg>
      );
    case "screen":
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="square">
          <rect x="2" y="3" width="20" height="14" rx="0" />
          <line x1="8" y1="21" x2="16" y2="21" />
          <line x1="12" y1="17" x2="12" y2="21" />
          <line x1="6" y1="7" x2="18" y2="7" strokeDasharray="2 2" />
          <line x1="6" y1="11" x2="18" y2="11" strokeDasharray="2 2" />
        </svg>
      );
    case "rings":
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="square">
          <circle cx="9" cy="14" r="5" />
          <circle cx="15" cy="14" r="5" />
          <path d="M9 9L12 4L15 9" />
        </svg>
      );
    case "stage":
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="square">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      );
    case "film":
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="square">
          <rect x="2" y="2" width="20" height="20" />
          <line x1="7" y1="2" x2="7" y2="22" />
          <line x1="17" y1="2" x2="17" y2="22" />
          <line x1="2" y1="12" x2="22" y2="12" />
          <line x1="2" y1="7" x2="7" y2="7" />
          <line x1="2" y1="17" x2="7" y2="17" />
          <line x1="17" y1="7" x2="22" y2="7" />
          <line x1="17" y1="17" x2="22" y2="17" />
        </svg>
      );
    case "flower":
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="square">
          <circle cx="12" cy="12" r="3" />
          <path d="M12 2C13.5 5 16 6 19 6C19 9 18 11.5 15 12C18 13.5 19 16 19 19C16 19 13.5 18 12 15C10.5 18 8 19 5 19C5 16 6 13.5 9 12C6 10.5 5 8 5 5C8 5 10.5 6 12 9" />
        </svg>
      );
    case "butterfly":
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="square">
          <line x1="12" y1="3" x2="12" y2="21" />
          <path d="M12 7C8 3 3 5 3 9C3 13 8 15 12 17" />
          <path d="M12 7C16 3 21 5 21 9C21 13 16 15 12 17" />
          <path d="M12 17C9 18 6 21 6 22" />
          <path d="M12 17C15 18 18 21 18 22" />
        </svg>
      );
    default:
      return null;
  }
};

interface ServiceCardProps {
  service: ServiceItem;
  isContinuation?: boolean;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service, isContinuation }) => {
  const hasMedia = Boolean(service.imageUrl || service.videoUrl);

  return (
    <article
      className={`${styles.card} ${hasMedia ? styles.cardWithMedia : ""} ${isContinuation ? styles.continuationCard : ""
        }`}
      data-service-card
    >
      {service.imageUrl && (
        <div className={styles.mediaBackground} aria-hidden="true">
          <img
            src={service.imageUrl}
            alt=""
            className={styles.cardMedia}
            loading="lazy"
            data-card-media
          />
          <div className={styles.mediaGradientOverlay} />
        </div>
      )}

      <div className={styles.cardContent}>
        <div className={styles.cardTop} data-anim-text>
          {/* <div className={styles.iconWrapper}>
            <ServiceIcon type={service.icon} />
          </div> */}
          <span className={styles.serviceNumber}>//{service.number}</span>
        </div>

        <div className={styles.cardBody}>
          <h3 className={styles.serviceTitle} data-anim-text>
            {service.title}
          </h3>
          <div className={styles.tagline} data-anim-text>
            {service.tagline}
          </div>
          <p className={styles.description} data-anim-text>
            {service.description}
          </p>

          <ul className={styles.highlightsList} data-anim-text>
            {service.highlights.map((highlight, idx) => (
              <li key={idx} className={styles.highlightItem}>
                {highlight}
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.cardAction} data-anim-text>
          <a href="#contact" className={styles.bookLink}>
            <span>Book This Service</span>
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="square"
            >
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </a>
        </div>
      </div>
    </article>
  );
};

export const ServicesSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);

  useGsapHorizontalServices({
    sectionRef,
    trackRef,
    progressBarRef,
    counterRef,
    totalCount: SERVICES.length,
  });

  return (
    <section
      id="services"
      ref={sectionRef}
      className={styles.servicesSection}
      aria-label="Our Services"
    >
      <div className={styles.pinnedContainer}>
        {/* Section Header with Telemetry Progress */}
        <div className={styles.headerWrapper}>
          <div className={styles.headerLeft}>
            <span className={styles.sectionTag} data-animate-header>
              OUR AERIAL EXPERIENCES
            </span>
            <h2 className={styles.title} data-animate-header>
              CRAFTED FROM THE SKY, FOR YOUR STORY
            </h2>
            <p className={styles.subtitle} data-animate-header>
              Bespoke aerial spectacles, cinema-grade productions, and magical memories.
            </p>
          </div>

          <div className={styles.headerRight} data-animate-header>
            <div className={styles.progressCounter}>
              <span ref={counterRef} className={styles.activeNumber}>
                01
              </span>
              <span className={styles.totalNumber}>
                / {String(SERVICES.length).padStart(2, "0")}
              </span>
            </div>

            <div className={styles.progressBarContainer}>
              <div ref={progressBarRef} className={styles.progressBarFill} />
            </div>

            <span className={styles.scrollHint}>
              <span>SCROLL TO EXPLORE</span>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </span>
          </div>
        </div>

        {/* Horizontal Track Reel */}
        <div className={styles.trackWrapper}>
          <div ref={trackRef} className={styles.track}>
            {SERVICES.map((service: ServiceItem) => (
              <ServiceCard key={service.id} service={service} />
            ))}
            {/* Seamless Continuation Cards: appear on the right on desktop when 7th item is centered */}
            {SERVICES.slice(0, 3).map((service: ServiceItem, index: number) => (
              <ServiceCard
                key={`${service.id}-continue-${index}`}
                service={service}
                isContinuation={true}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

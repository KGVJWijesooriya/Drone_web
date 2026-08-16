"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import styles from "@/styles/services.module.css";

export interface GsapHorizontalServicesRefs {
  sectionRef: React.RefObject<HTMLElement | null>;
  trackRef: React.RefObject<HTMLDivElement | null>;
  progressBarRef?: React.RefObject<HTMLDivElement | null>;
  counterRef?: React.RefObject<HTMLSpanElement | null>;
  totalCount: number;
}

export function useGsapHorizontalServices({
  sectionRef,
  trackRef,
  progressBarRef,
  counterRef,
  totalCount,
}: GsapHorizontalServicesRefs) {
  const isInitialized = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const mm = gsap.matchMedia();

    mm.add(
      {
        isDesktop: "(min-width: 769px)",
        isMobile: "(max-width: 768px)",
      },
      (context) => {
        const { isDesktop } = context.conditions as {
          isDesktop: boolean;
          isMobile: boolean;
        };

        const section = sectionRef.current;
        const track = trackRef.current;

        if (!section || !track) return;

        if (prefersReducedMotion) {
          const wrapper = track.parentElement;
          wrapper?.classList.add(styles.trackWrapperScrollable);
          return;
        }

        const cardEls = Array.from(
          track.querySelectorAll<HTMLElement>("[data-service-card]")
        );

        // ======================================================
        // 1. DESKTOP / TABLET (>768px): PINNED HORIZONTAL SCROLL
        // ======================================================
        if (isDesktop) {
          // Calculates the horizontal distance so the last main item (Card 07)
          // finishes exactly in the horizontal center of the viewport.
          const getScrollAmount = () => {
            const targetIndex = Math.min(totalCount - 1, cardEls.length - 1);
            const targetCard = cardEls[targetIndex];
            const viewportWidth = window.innerWidth;

            if (!targetCard) {
              return Math.max(0, track.scrollWidth - viewportWidth);
            }

            const centerOffset =
              targetCard.offsetLeft - (viewportWidth - targetCard.offsetWidth) / 2;
            return Math.max(0, centerOffset);
          };

          // Card offset checkpoints for snapping and progress calculation
          let cardOffsets: number[] = [0];
          const recalcCardOffsets = () => {
            const scrollAmount = getScrollAmount();
            if (scrollAmount <= 0 || cardEls.length === 0) {
              cardOffsets = [0];
              return;
            }

            cardOffsets = cardEls.slice(0, totalCount).map((card, idx) => {
              if (idx === 0) return 0;
              if (idx === totalCount - 1) return 1;
              const cardCenterOffset =
                card.offsetLeft - (window.innerWidth - card.offsetWidth) / 2;
              return gsap.utils.clamp(0, 1, cardCenterOffset / scrollAmount);
            });
          };
          recalcCardOffsets();

          const closestCardIndex = (progress: number) => {
            let activeIndex = 0;
            let smallestDiff = Infinity;
            cardOffsets.forEach((point, index) => {
              const diff = Math.abs(point - progress);
              if (diff < smallestDiff) {
                smallestDiff = diff;
                activeIndex = index;
              }
            });
            return activeIndex;
          };

          // Entrance timeline upon scrolling into the section
          const headerElements = section.querySelectorAll("[data-animate-header]");
          const initialCards = cardEls.slice(0, 2);
          const initialTextEls = initialCards
            .map((c) => Array.from(c.querySelectorAll<HTMLElement>("[data-anim-text]")))
            .flat();

          const entranceTl = gsap.timeline({
            scrollTrigger: {
              trigger: section,
              start: "top 78%",
              once: true,
            },
          });

          if (headerElements.length > 0) {
            entranceTl.fromTo(
              headerElements,
              { opacity: 0, y: 25 },
              { opacity: 1, y: 0, duration: 0.7, stagger: 0.1, ease: "power3.out" },
              0
            );
          }

          if (initialCards.length > 0) {
            entranceTl.fromTo(
              initialCards,
              { opacity: 0, y: 35 },
              { opacity: 1, y: 0, duration: 0.75, stagger: 0.12, ease: "power3.out" },
              0.15
            );
          }

          if (initialTextEls.length > 0) {
            entranceTl.fromTo(
              initialTextEls,
              { opacity: 0, x: 30 },
              { opacity: 1, x: 0, duration: 0.6, stagger: 0.04, ease: "power2.out" },
              0.3
            );
          }

          // Horizontal scroll tween
          const horizontalTween = gsap.to(track, {
            x: () => -getScrollAmount(),
            ease: "none",
            force3D: true,
            scrollTrigger: {
              trigger: section,
              pin: true,
              scrub: 1.1,
              start: "top top",
              end: () => `+=${Math.max(getScrollAmount(), 1)}`,
              invalidateOnRefresh: true,
              anticipatePin: 1,
              onRefresh: recalcCardOffsets,
              snap: {
                snapTo: (progress) => cardOffsets[closestCardIndex(progress)] ?? progress,
                duration: { min: 0.15, max: 0.5 },
                ease: "power2.inOut",
              },
              onUpdate: (self) => {
                if (progressBarRef?.current) {
                  progressBarRef.current.style.transform = `scaleX(${self.progress})`;
                }
                if (counterRef?.current) {
                  const activeIndex = closestCardIndex(self.progress);
                  counterRef.current.textContent = String(
                    Math.min(totalCount, activeIndex + 1)
                  ).padStart(2, "0");
                }
              },
            },
          });

          // Right-to-left cascading text reveal for subsequent cards
          cardEls.forEach((card, index) => {
            if (index >= 2) {
              gsap.fromTo(
                card,
                { opacity: 0, y: 20 },
                {
                  opacity: 1,
                  y: 0,
                  duration: 0.6,
                  ease: "power2.out",
                  scrollTrigger: {
                    trigger: card,
                    containerAnimation: horizontalTween,
                    start: "left 98%",
                    toggleActions: "play none none none",
                  },
                }
              );
            }

            if (index >= 1) {
              const textElements = Array.from(
                card.querySelectorAll<HTMLElement>("[data-anim-text]")
              );
              if (textElements.length > 0) {
                gsap.fromTo(
                  textElements,
                  { x: 35, opacity: 0 },
                  {
                    x: 0,
                    opacity: 1,
                    duration: 0.6,
                    stagger: 0.05,
                    ease: "power2.out",
                    scrollTrigger: {
                      trigger: card,
                      containerAnimation: horizontalTween,
                      start: "left 95%",
                      toggleActions: "play none none none",
                    },
                  }
                );
              }
            }
          });

          // Keyboard focus support
          const focusableLinks = () =>
            Array.from(track.querySelectorAll<HTMLAnchorElement>("a"));

          const handleFocusIn = (e: FocusEvent) => {
            const st = horizontalTween.scrollTrigger;
            if (!st) return;
            const target = e.target as HTMLElement;
            const card = target.closest<HTMLElement>("[data-service-card]");
            if (!card) return;

            const scrollAmount = getScrollAmount();
            if (scrollAmount <= 0) return;

            const cardProgress = gsap.utils.clamp(0, 1, card.offsetLeft / scrollAmount);
            const targetY = st.start + cardProgress * (st.end - st.start);

            gsap.to(window, {
              scrollTo: { y: targetY },
              duration: 0.6,
              ease: "power2.inOut",
              overwrite: "auto",
            });
          };

          const handleTrackKeydown = (e: KeyboardEvent) => {
            if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
            const links = focusableLinks();
            const activeIndex = links.indexOf(document.activeElement as HTMLAnchorElement);
            if (activeIndex === -1) return;

            e.preventDefault();
            const nextIndex =
              e.key === "ArrowRight"
                ? Math.min(links.length - 1, activeIndex + 1)
                : Math.max(0, activeIndex - 1);
            links[nextIndex]?.focus();
          };

          track.addEventListener("focusin", handleFocusIn);
          track.addEventListener("keydown", handleTrackKeydown);

          return () => {
            track.removeEventListener("focusin", handleFocusIn);
            track.removeEventListener("keydown", handleTrackKeydown);
          };
        }

        // ======================================================
        // 2. MOBILE (<=768px): NATURAL VERTICAL SCROLL REVEALS
        // ======================================================
        if (!isDesktop) {
          gsap.set(track, { clearProps: "transform,x" });

          const headerElements = section.querySelectorAll("[data-animate-header]");
          if (headerElements.length > 0) {
            gsap.fromTo(
              headerElements,
              { opacity: 0, y: 20 },
              {
                opacity: 1,
                y: 0,
                duration: 0.6,
                stagger: 0.08,
                ease: "power2.out",
                scrollTrigger: {
                  trigger: section,
                  start: "top 85%",
                  once: true,
                },
              }
            );
          }

          // Individual card vertical entrance
          cardEls.forEach((card) => {
            gsap.fromTo(
              card,
              { opacity: 0, y: 30 },
              {
                opacity: 1,
                y: 0,
                duration: 0.6,
                ease: "power2.out",
                scrollTrigger: {
                  trigger: card,
                  start: "top 88%",
                  once: true,
                },
              }
            );
          });
        }
      },
      sectionRef
    );

    isInitialized.current = true;

    return () => {
      mm.revert();
    };
  }, [sectionRef, trackRef, progressBarRef, counterRef, totalCount]);
}
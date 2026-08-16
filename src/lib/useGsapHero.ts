"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export interface GsapHeroRefs {
  heroRef: React.RefObject<HTMLElement | null>;
  videoContainerRef: React.RefObject<HTMLDivElement | null>;
  videoRef: React.RefObject<HTMLVideoElement | null>;
  leftColRef: React.RefObject<HTMLDivElement | null>;
  badgeRef: React.RefObject<HTMLDivElement | null>;
  headingRef: React.RefObject<HTMLHeadingElement | null>;
  titleBrandRef?: React.RefObject<HTMLSpanElement | null>;
  descRef: React.RefObject<HTMLParagraphElement | null>;
  ctaGroupRef: React.RefObject<HTMLDivElement | null>;
  specRowRef: React.RefObject<HTMLDivElement | null>;
  metricsBarRef: React.RefObject<HTMLDivElement | null>;
}

export function useGsapHero(refs: GsapHeroRefs) {
  const isInitialized = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    gsap.registerPlugin(ScrollTrigger);

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = gsap.context(() => {
      const {
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
      } = refs;

      if (!heroRef.current) return;

      if (prefersReducedMotion) {
        const elements = [
          badgeRef.current,
          headingRef.current,
          descRef.current,
          ctaGroupRef.current,
          specRowRef.current,
          metricsBarRef.current,
        ].filter(Boolean);
        gsap.set(elements, { opacity: 1, y: 0, x: 0 });
        return;
      }

      // ==========================================
      // 1. ENTRANCE TIMELINE (Page Load)
      // ==========================================
      const entranceTl = gsap.timeline({
        defaults: { ease: "power3.out" },
        delay: 0.1,
      });

      if (videoContainerRef.current) {
        entranceTl.fromTo(
          videoContainerRef.current,
          { opacity: 0, scale: 1.05 },
          { opacity: 1, scale: 1, duration: 1.4, ease: "power2.out" },
          0
        );
      }

      if (badgeRef.current) {
        entranceTl.fromTo(
          badgeRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.7 },
          0.2
        );
      }

      if (headingRef.current) {
        const lines = headingRef.current.children;
        if (lines.length > 0) {
          entranceTl.fromTo(
            lines,
            { opacity: 0, y: 35 },
            { opacity: 1, y: 0, duration: 0.85, stagger: 0.15 },
            0.35
          );
        } else {
          entranceTl.fromTo(
            headingRef.current,
            { opacity: 0, y: 35 },
            { opacity: 1, y: 0, duration: 0.85 },
            0.35
          );
        }
      }

      if (titleBrandRef && titleBrandRef.current) {
        const brandEl = titleBrandRef.current;
        // Initial resting rotation on web page load
        gsap.set(brandEl, { rotation: -4 });

        const onMouseEnter = () => {
          gsap.to(brandEl, {
            rotation: 0,
            y: -4,
            scale: 1.04,
            duration: 0.4,
            ease: "back.out(1.8)",
            overwrite: "auto",
          });
        };

        const onMouseLeave = () => {
          gsap.to(brandEl, {
            rotation: -4,
            y: 0,
            scale: 1,
            duration: 0.35,
            ease: "power2.out",
            overwrite: "auto",
          });
        };

        brandEl.addEventListener("mouseenter", onMouseEnter);
        brandEl.addEventListener("mouseleave", onMouseLeave);
      }

      if (descRef.current) {
        entranceTl.fromTo(
          descRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.75 },
          0.6
        );
      }

      if (ctaGroupRef.current) {
        const ctaChildren = ctaGroupRef.current.children;
        entranceTl.fromTo(
          ctaChildren,
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: 0.7, stagger: 0.1 },
          0.75
        );
      }

      if (specRowRef.current) {
        const specItems = specRowRef.current.children;
        entranceTl.fromTo(
          specItems,
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.65, stagger: 0.08 },
          0.9
        );
      }

      if (metricsBarRef.current) {
        entranceTl.fromTo(
          metricsBarRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8 },
          1.0
        );
      }

      // ==========================================
      // 2. SCROLL-DRIVEN PARALLAX & EXIT ANIMATIONS
      // ==========================================
      if (videoContainerRef.current) {
        gsap.to(videoContainerRef.current, {
          yPercent: 18,
          scale: 1.04,
          ease: "none",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1.2,
          },
        });
      }

      if (leftColRef.current) {
        gsap.to(leftColRef.current, {
          y: -60,
          opacity: 0,
          ease: "power1.in",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "15% top",
            end: "70% top",
            scrub: 1,
          },
        });
      }

      gsap.to(heroRef.current, {
        scale: 0.985,
        opacity: 0.85,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "40% top",
          end: "bottom top",
          scrub: 1,
        },
      });

      // ==========================================
      // 3. METRIC VALUES COUNT-UP ANIMATION
      // ==========================================
      if (metricsBarRef.current) {
        const metricValueElements =
          metricsBarRef.current.querySelectorAll("[data-metric-val]");

        metricValueElements.forEach((el) => {
          const rawTarget = el.getAttribute("data-metric-val") || "";
          const numericMatch = rawTarget.match(/(\d+)/);
          if (!numericMatch) return;

          const endNum = parseInt(numericMatch[1], 10);
          const suffix = rawTarget.replace(numericMatch[1], "");
          const counterObj = { val: 0 };

          ScrollTrigger.create({
            trigger: metricsBarRef.current,
            start: "top 95%",
            once: true,
            onEnter: () => {
              gsap.to(counterObj, {
                val: endNum,
                duration: 1.8,
                ease: "power2.out",
                onUpdate: () => {
                  el.textContent = `${Math.round(counterObj.val)}${suffix}`;
                },
              });
            },
          });
        });
      }

      // ==========================================
      // 4. MOUSE LEFT/RIGHT VIDEO PLAYBACK SCRUBBER
      // ==========================================
      // Rebuilt for a smooth, "premium product page" feel:
      //  - Scoped to the hero element (not the whole window), so scrubbing
      //    only engages while the visitor is actually over the hero.
      //  - Waits for the video to have enough buffered data before scrubbing,
      //    so we never seek into an unbuffered frame and stall the decoder.
      //  - Seeks are guarded by `video.seeking`, so we never queue a new seek
      //    on top of one that hasn't resolved yet (the #1 cause of choppy
      //    "mouse scrub" video effects).
      //  - The lerp runs on GSAP's own ticker (frame-rate independent via
      //    deltaRatio) instead of a second, unsynced requestAnimationFrame
      //    loop, so it stays smooth at 60Hz, 120Hz, or a throttled tab.
      //  - The first move seeds targetTime from the video's current time so
      //    there's no jump-cut on entry.
      const video = videoRef.current;
      const heroEl = heroRef.current;
      const videoContainer = videoContainerRef.current;

      if (video && heroEl) {
        let targetTime: number | null = null;
        let isUserControlling = false;
        let isReady = false;
        let idleTimer: ReturnType<typeof setTimeout> | null = null;

        const quickX = videoContainer
          ? gsap.quickTo(videoContainer, "x", {
              duration: 0.9,
              ease: "power3.out",
            })
          : null;
        const quickRotate = videoContainer
          ? gsap.quickTo(videoContainer, "rotationY", {
              duration: 0.9,
              ease: "power3.out",
            })
          : null;

        const markReady = () => {
          isReady = video.readyState >= 2; // HAVE_CURRENT_DATA or better
        };
        markReady();
        video.addEventListener("loadedmetadata", markReady);
        video.addEventListener("canplay", markReady);

        const isSeekable = () => {
          if (!isReady || !video.duration || isNaN(video.duration)) return false;
          const seekable = video.seekable;
          if (!seekable || seekable.length === 0) return true; // no info, assume ok
          return video.duration - seekable.end(seekable.length - 1) < 0.5;
        };

        const handlePointerMove = (clientX: number) => {
          if (!isSeekable()) return;

          const rect = heroEl.getBoundingClientRect();
          const normX = Math.max(
            0,
            Math.min(1, (clientX - rect.left) / rect.width)
          );

          // Moving finger/mouse to the RIGHT (normX -> 1) plays video in REVERSE (videoNormX -> 0)
          const videoNormX = 1 - normX;

          if (!isUserControlling) {
            // Seed from current playback position so scrubbing starts smoothly without jump
            targetTime = video.currentTime;
            isUserControlling = true;
            if (!video.paused) video.pause();
          }

          targetTime = videoNormX * video.duration;

          // Subtle 3D drift: horizontal shift + a whisper of Y-rotation for depth.
          quickX?.((normX - 0.5) * -24);
          quickRotate?.((normX - 0.5) * -4);

          if (idleTimer) clearTimeout(idleTimer);
          idleTimer = setTimeout(() => {
            isUserControlling = false;
            targetTime = null;
            quickX?.(0);
            quickRotate?.(0);
            video.play().catch(() => {});
          }, 2200);
        };

        const onMouseMove = (e: MouseEvent) => handlePointerMove(e.clientX);
        const onTouchStart = (e: TouchEvent) => {
          if (e.touches && e.touches[0]) {
            handlePointerMove(e.touches[0].clientX);
          }
        };
        const onTouchMove = (e: TouchEvent) => {
          if (e.touches && e.touches[0]) {
            handlePointerMove(e.touches[0].clientX);
          }
        };
        const onTouchEnd = () => {
          if (idleTimer) clearTimeout(idleTimer);
          idleTimer = setTimeout(() => {
            isUserControlling = false;
            targetTime = null;
            quickX?.(0);
            quickRotate?.(0);
            video.play().catch(() => {});
          }, 1500);
        };
        const onPointerLeave = () => {
          if (idleTimer) clearTimeout(idleTimer);
          isUserControlling = false;
          targetTime = null;
          quickX?.(0);
          quickRotate?.(0);
          video.play().catch(() => {});
        };

        // Frame-rate independent smoothing driven by GSAP's ticker so it
        // shares a single render pass with every other animation on the page.
        const tick = () => {
          if (
            isUserControlling &&
            targetTime !== null &&
            !video.seeking &&
            video.duration &&
            !isNaN(video.duration)
          ) {
            const diff = targetTime - video.currentTime;
            if (Math.abs(diff) > 0.015) {
              // deltaRatio(60) keeps the spring constant relative to 60fps
              // regardless of the display's actual refresh rate.
              const lerpFactor = 1 - Math.pow(1 - 0.16, gsap.ticker.deltaRatio(60));
              video.currentTime += diff * lerpFactor;
            }
          }
        };

        gsap.ticker.add(tick);
        heroEl.addEventListener("mousemove", onMouseMove, { passive: true });
        heroEl.addEventListener("touchstart", onTouchStart, { passive: true });
        heroEl.addEventListener("touchmove", onTouchMove, { passive: true });
        heroEl.addEventListener("touchend", onTouchEnd, { passive: true });
        heroEl.addEventListener("touchcancel", onTouchEnd, { passive: true });
        heroEl.addEventListener("mouseleave", onPointerLeave, { passive: true });

        return () => {
          gsap.ticker.remove(tick);
          if (idleTimer) clearTimeout(idleTimer);
          video.removeEventListener("loadedmetadata", markReady);
          video.removeEventListener("canplay", markReady);
          heroEl.removeEventListener("mousemove", onMouseMove);
          heroEl.removeEventListener("touchstart", onTouchStart);
          heroEl.removeEventListener("touchmove", onTouchMove);
          heroEl.removeEventListener("touchend", onTouchEnd);
          heroEl.removeEventListener("touchcancel", onTouchEnd);
          heroEl.removeEventListener("mouseleave", onPointerLeave);
        };
      }
    }, refs.heroRef);

    isInitialized.current = true;

    return () => {
      ctx.revert();
    };
  }, [refs]);
}
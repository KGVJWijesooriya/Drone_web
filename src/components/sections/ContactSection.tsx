"use client";

import React, { useState } from "react";
import styles from "@/styles/contact.module.css";
import { SITE_CONFIG, SERVICES } from "@/lib/constants";

export const ContactSection = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    service: SERVICES[0]?.title || "",
    eventDate: "",
    location: "",
    notes: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contact" className={styles.contactSection} aria-label="Book a Service or Inquire">
      <div className={styles.container}>
        <div className={styles.grid}>
          {/* Info Column */}
          <div className={styles.infoCol}>
            <div>
              <span className={styles.sectionTag}>BOOKINGS & INQUIRIES</span>
              <h2 className={styles.title}>RESERVE YOUR FLIGHT MISSION</h2>
              <p className={styles.subtitle}>
                We accept a limited number of weddings, commercial shoots, and aerial spectacles each season to ensure uncompromising quality and bespoke pilot attention.
              </p>
            </div>

            <div className={styles.contactDetails}>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Direct Flight Line</span>
                <span className={styles.detailValue}>{SITE_CONFIG.contact.phone}</span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Studio Dispatch Email</span>
                <span className={styles.detailValue}>{SITE_CONFIG.contact.email}</span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Headquarters</span>
                <span className={styles.detailValue}>{SITE_CONFIG.contact.location}</span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Operational Hours</span>
                <span className={styles.detailValue}>{SITE_CONFIG.contact.hours}</span>
              </div>
            </div>
          </div>

          {/* Form Card */}
          <div className={styles.formCard}>
            <div className={styles.formHeader}>
              <h3 className={styles.formTitle}>FLIGHT RESERVATION FORM</h3>
              <p className={styles.formDesc}>// RESPONSE DISPATCHED WITHIN 4 BUSINESS HOURS</p>
            </div>

            {submitted ? (
              <div className={styles.successMsg}>
                <div className={styles.successTitle}>MISSION INQUIRY RECEIVED</div>
                <p className={styles.successText}>
                  Our flight coordinator will review airspace suitability for your date and reach out via email shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.inputRow}>
                  <div className={styles.inputGroup}>
                    <label className={styles.label}>YOUR NAME *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Eleanor Vance"
                      className={styles.input}
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>

                  <div className={styles.inputGroup}>
                    <label className={styles.label}>EMAIL ADDRESS *</label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. eleanor@vance.studio"
                      className={styles.input}
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                </div>

                <div className={styles.inputRow}>
                  <div className={styles.inputGroup}>
                    <label className={styles.label}>DESIRED SERVICE *</label>
                    <select
                      className={styles.select}
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    >
                      {SERVICES.map((s) => (
                        <option key={s.id} value={s.title}>
                          {s.title}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className={styles.inputGroup}>
                    <label className={styles.label}>EVENT DATE *</label>
                    <input
                      type="date"
                      required
                      className={styles.input}
                      value={formData.eventDate}
                      onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
                    />
                  </div>
                </div>

                <div className={styles.inputGroup}>
                  <label className={styles.label}>EVENT LOCATION / VENUE</label>
                  <input
                    type="text"
                    placeholder="e.g. Napa Valley Estate or Beverly Hills Hotel"
                    className={styles.input}
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  />
                </div>

                <div className={styles.inputGroup}>
                  <label className={styles.label}>MISSION DETAILS & CREATIVE VISION</label>
                  <textarea
                    placeholder="Tell us about your event, petal drop preferences, LED screen messages, or specific aerial shots needed..."
                    className={styles.textarea}
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  />
                </div>

                <button type="submit" className={styles.submitBtn}>
                  <span>SUBMIT FLIGHT REQUEST</span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

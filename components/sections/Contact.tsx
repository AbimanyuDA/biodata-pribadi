"use client";
import React, { useState } from "react";
import { User, Mail, MessageSquare, Send, Sparkles } from "lucide-react";
import SocialLinks from "../SocialLinks";
import Commentar from "../Commentar";
import { useLanguage } from "../LanguageProvider";
import { useTheme } from "../ThemeProvider";
import { t, tx } from "../../utils/translations";

export function Contact() {
  const { lang } = useLanguage();
  const { theme } = useTheme();
  const isLight = theme === "light";
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setSubmitStatus({ type: null, message: "" });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus({
          type: "success",
          message: "Message sent! I will get back to you soon.",
        });
        setFormData({
          fullName: "",
          email: "",
          subject: "",
          message: "",
        });
        // Clear success status after 5s
        setTimeout(() => {
          setSubmitStatus({ type: null, message: "" });
        }, 5000);
      } else {
        setSubmitStatus({
          type: "error",
          message: data.error || "Failed to send message. Please try again.",
        });
      }
    } catch (error) {
      setSubmitStatus({
        type: "error",
        message: "An error occurred. Please check your connection and try again.",
      });
      console.error("Form submission error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="px-4 sm:px-6 lg:px-8 py-16 md:py-24"
      id="contact"
      style={{ backgroundColor: "var(--bg-primary)", color: "var(--text-primary)" }}
    >
      {/* Header section */}
      <div className="text-center mb-12">
        <h2
          data-aos="fade-down"
          data-aos-duration="1000"
          className="inline-block text-3xl md:text-5xl font-bold text-center mx-auto pb-2 text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] to-[#a855f7]"
        >
          {tx(t.contact.title, lang)}
        </h2>
        <p
          data-aos="fade-up"
          data-aos-duration="1100"
          className="max-w-2xl mx-auto text-sm md:text-base mt-2 flex items-center justify-center gap-2"
          style={{ color: "var(--text-secondary)" }}
        >
          <Sparkles className="w-4 h-4 text-purple-400" />
          {tx(t.contact.subtitle, lang)}
        </p>
      </div>

      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[55%_45%] gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Form & Social Links */}
          <div className="space-y-8">
            <div
              data-aos="fade-right"
              data-aos-duration="1000"
              className="backdrop-blur-xl rounded-3xl p-6 sm:p-8 shadow-2xl border"
              style={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border)" }}
            >
              <h3 className="text-2xl font-bold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] to-[#a855f7]">
                {tx(t.contact.formTitle, lang)}
              </h3>
              <p className="text-sm mb-6" style={{ color: "var(--text-secondary)" }}>
                {tx(t.contact.formSubtitle, lang)}
              </p>

              {submitStatus.type && (
                <div
                  className={`mb-6 p-4 rounded-xl border text-sm ${
                    submitStatus.type === "success"
                      ? "bg-green-500/10 border-green-500/30 text-green-400"
                      : "bg-red-500/10 border-red-500/30 text-red-400"
                  }`}
                >
                  {submitStatus.message}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="relative group" data-aos="fade-up" data-aos-delay="100">
                  <User className="absolute left-4 top-3.5 w-5 h-5 group-focus-within:text-[#6366f1] transition-colors" style={{ color: "var(--text-muted)" }} />
                  <input
                    type="text"
                    name="fullName"
                    placeholder={tx(t.contact.namePlaceholder, lang)}
                    value={formData.fullName}
                    onChange={handleInputChange}
                    disabled={isLoading}
                    className={`w-full p-3.5 pl-12 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#6366f1]/30 focus:border-[#6366f1]/50 transition-all duration-300 disabled:opacity-50 text-sm ${isLight ? "placeholder-gray-400" : "placeholder-gray-500"}`}
                    style={{ backgroundColor: isLight ? "rgba(255,255,255,0.8)" : "rgba(255,255,255,0.05)", borderWidth: 1, borderStyle: "solid", borderColor: "var(--border)", color: "var(--text-primary)" }}
                    required
                  />
                </div>

                <div className="relative group" data-aos="fade-up" data-aos-delay="200">
                  <Mail className="absolute left-4 top-3.5 w-5 h-5 group-focus-within:text-[#6366f1] transition-colors" style={{ color: "var(--text-muted)" }} />
                  <input
                    type="email"
                    name="email"
                    placeholder={tx(t.contact.emailPlaceholder, lang)}
                    value={formData.email}
                    onChange={handleInputChange}
                    disabled={isLoading}
                    className={`w-full p-3.5 pl-12 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#6366f1]/30 focus:border-[#6366f1]/50 transition-all duration-300 disabled:opacity-50 text-sm ${isLight ? "placeholder-gray-400" : "placeholder-gray-500"}`}
                    style={{ backgroundColor: isLight ? "rgba(255,255,255,0.8)" : "rgba(255,255,255,0.05)", borderWidth: 1, borderStyle: "solid", borderColor: "var(--border)", color: "var(--text-primary)" }}
                    required
                  />
                </div>

                <div className="relative group" data-aos="fade-up" data-aos-delay="300">
                  <MessageSquare className="absolute left-4 top-3.5 w-5 h-5 group-focus-within:text-[#6366f1] transition-colors" style={{ color: "var(--text-muted)" }} />
                  <input
                    type="text"
                    name="subject"
                    placeholder={tx(t.contact.subjectPlaceholder, lang)}
                    value={formData.subject}
                    onChange={handleInputChange}
                    disabled={isLoading}
                    className={`w-full p-3.5 pl-12 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#6366f1]/30 focus:border-[#6366f1]/50 transition-all duration-300 disabled:opacity-50 text-sm ${isLight ? "placeholder-gray-400" : "placeholder-gray-500"}`}
                    style={{ backgroundColor: isLight ? "rgba(255,255,255,0.8)" : "rgba(255,255,255,0.05)", borderWidth: 1, borderStyle: "solid", borderColor: "var(--border)", color: "var(--text-primary)" }}
                    required
                  />
                </div>

                <div className="relative group" data-aos="fade-up" data-aos-delay="400">
                  <textarea
                    name="message"
                    placeholder={tx(t.contact.messagePlaceholder, lang)}
                    value={formData.message}
                    onChange={handleInputChange}
                    disabled={isLoading}
                    className={`w-full resize-none p-3.5 pl-4 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#6366f1]/30 focus:border-[#6366f1]/50 transition-all duration-300 h-32 disabled:opacity-50 text-sm ${isLight ? "placeholder-gray-400" : "placeholder-gray-500"}`}
                    style={{ backgroundColor: isLight ? "rgba(255,255,255,0.8)" : "rgba(255,255,255,0.05)", borderWidth: 1, borderStyle: "solid", borderColor: "var(--border)", color: "var(--text-primary)" }}
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  data-aos="fade-up"
                  data-aos-delay="500"
                  className="w-full bg-gradient-to-r from-[#6366f1] to-[#a855f7] text-white py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-[1.01] hover:shadow-lg hover:shadow-[#6366f1]/20 active:scale-[0.99] flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                >
                  <Send className="w-4 h-4" />
                  {isLoading ? tx(t.contact.sending, lang) : tx(t.contact.sendBtn, lang)}
                </button>
              </form>
            </div>

            <div data-aos="fade-up" data-aos-duration="1000">
              <SocialLinks />
            </div>
          </div>

          {/* Right Column: Comments Stream Widget */}
          <div className="lg:sticky lg:top-24" data-aos="fade-left" data-aos-duration="1000">
            <Commentar />
          </div>

        </div>
      </div>
    </div>
  );
}

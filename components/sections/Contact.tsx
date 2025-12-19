"use client";
import { motion } from "framer-motion";
import { fadeUp, staggerChildren } from "../../utils/animations";
import { Github, Linkedin, Mail, ArrowRight, Send } from "lucide-react";
import { useState } from "react";

export function Contact() {
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
          message: "Message sent successfully! I'll get back to you soon.",
        });
        setFormData({
          fullName: "",
          email: "",
          subject: "",
          message: "",
        });
        // Clear success message after 5 seconds
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
  }
  return (
    <section id="contact" className="section">
      <div className="w-full">
        <motion.div
          variants={staggerChildren(0.06)}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="glass-panel p-8 md:p-12"
        >
          <motion.h2 variants={fadeUp} className="section-title mb-4">
            Get In Touch
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="text-lg text-black/60 dark:text-white/60 mb-12 max-w-2xl"
          >
            Have a project in mind? Let's collaborate and create something
            amazing together. I'm always open to new opportunities and
            interesting challenges.
          </motion.p>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {/* Email Card */}
            <motion.a
              variants={fadeUp}
              href="mailto:abimanyudans@gmail.com"
              className="group relative p-6 rounded-2xl bg-gradient-to-br from-cyan-500/10 to-blue-500/10 dark:from-cyan-500/5 dark:to-blue-500/5 border border-cyan-200/30 dark:border-cyan-500/20 hover:border-cyan-400/50 dark:hover:border-cyan-500/50 transition-all duration-300 overflow-hidden"
              whileHover={{
                y: -4,
                boxShadow: "0 0 30px rgba(34, 211, 238, 0.3)",
              }}
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl opacity-0 group-hover:opacity-30 blur transition-opacity duration-300 -z-10" />
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-lg bg-cyan-500/20 group-hover:bg-cyan-500/30 transition-colors">
                  <Mail className="h-5 w-5 text-cyan-600 dark:text-cyan-400" />
                </div>
                <h3 className="font-poppins font-semibold text-lg">Email</h3>
              </div>
              <p className="text-black/70 dark:text-white/70 text-sm mb-3">
                abimanyudans@gmail.com
              </p>
              <div className="flex items-center gap-2 text-cyan-600 dark:text-cyan-400 text-sm font-medium group-hover:gap-3 transition-all">
                Send Email <ArrowRight className="h-4 w-4" />
              </div>
            </motion.a>

            {/* LinkedIn Card */}
            <motion.a
              variants={fadeUp}
              href="https://www.linkedin.com/in/abimanyudans/"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative p-6 rounded-2xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 dark:from-blue-500/5 dark:to-purple-500/5 border border-blue-200/30 dark:border-blue-500/20 hover:border-blue-400/50 dark:hover:border-blue-500/50 transition-all duration-300 overflow-hidden"
              whileHover={{
                y: -4,
                boxShadow: "0 0 30px rgba(59, 130, 246, 0.3)",
              }}
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl opacity-0 group-hover:opacity-30 blur transition-opacity duration-300 -z-10" />
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-lg bg-blue-500/20 group-hover:bg-blue-500/30 transition-colors">
                  <Linkedin className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="font-poppins font-semibold text-lg">LinkedIn</h3>
              </div>
              <p className="text-black/70 dark:text-white/70 text-sm mb-3">
                Connect with me
              </p>
              <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 text-sm font-medium group-hover:gap-3 transition-all">
                View Profile <ArrowRight className="h-4 w-4" />
              </div>
            </motion.a>

            {/* GitHub Card */}
            <motion.a
              variants={fadeUp}
              href="https://github.com/abimanyuda"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative p-6 rounded-2xl bg-gradient-to-br from-slate-500/10 to-slate-600/10 dark:from-slate-500/5 dark:to-slate-600/5 border border-slate-200/30 dark:border-slate-500/20 hover:border-slate-400/50 dark:hover:border-slate-500/50 transition-all duration-300 overflow-hidden"
              whileHover={{
                y: -4,
                boxShadow: "0 0 30px rgba(100, 116, 139, 0.3)",
              }}
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-slate-500 to-slate-600 rounded-2xl opacity-0 group-hover:opacity-30 blur transition-opacity duration-300 -z-10" />
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-lg bg-slate-500/20 group-hover:bg-slate-500/30 transition-colors">
                  <Github className="h-5 w-5 text-slate-600 dark:text-slate-400" />
                </div>
                <h3 className="font-poppins font-semibold text-lg">GitHub</h3>
              </div>
              <p className="text-black/70 dark:text-white/70 text-sm mb-3">
                Check my projects
              </p>
              <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400 text-sm font-medium group-hover:gap-3 transition-all">
                View Repository <ArrowRight className="h-4 w-4" />
              </div>
            </motion.a>
          </div>

          {/* Contact Form */}
          <motion.form
            onSubmit={handleSubmit}
            variants={fadeUp}
            className="max-w-2xl p-8 rounded-2xl bg-gradient-to-br from-white/50 to-white/30 dark:from-slate-900/50 dark:to-slate-900/30 backdrop-blur border border-white/20 dark:border-white/10"
          >
            <h3 className="font-poppins text-xl font-semibold mb-6">
              Send Me a Message
            </h3>

            {submitStatus.type && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`mb-6 p-4 rounded-lg ${
                  submitStatus.type === "success"
                    ? "bg-green-500/20 border border-green-500/50 text-green-700 dark:text-green-400"
                    : "bg-red-500/20 border border-red-500/50 text-red-700 dark:text-red-400"
                }`}
              >
                {submitStatus.message}
              </motion.div>
            )}

            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <label className="block">
                <span className="text-sm font-medium text-black/70 dark:text-white/70 mb-2 block">
                  Full Name
                </span>
                <input
                  suppressHydrationWarning
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2.5 rounded-xl border border-black/10 dark:border-white/10 bg-white/50 dark:bg-white/5 focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:focus:ring-cyan-400 transition-all"
                  placeholder="Your name"
                />
              </label>
              <label className="block">
                <span className="text-sm font-medium text-black/70 dark:text-white/70 mb-2 block">
                  Email Address
                </span>
                <input
                  suppressHydrationWarning
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2.5 rounded-xl border border-black/10 dark:border-white/10 bg-white/50 dark:bg-white/5 focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:focus:ring-cyan-400 transition-all"
                  placeholder="you@example.com"
                />
              </label>
            </div>

            <label className="block mb-4">
              <span className="text-sm font-medium text-black/70 dark:text-white/70 mb-2 block">
                Subject
              </span>
              <input
                suppressHydrationWarning
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2.5 rounded-xl border border-black/10 dark:border-white/10 bg-white/50 dark:bg-white/5 focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:focus:ring-cyan-400 transition-all"
                placeholder="What's this about?"
              />
            </label>

            <label className="block mb-6">
              <span className="text-sm font-medium text-black/70 dark:text-white/70 mb-2 block">
                Message
              </span>
              <textarea
                suppressHydrationWarning
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 rounded-xl border border-black/10 dark:border-white/10 bg-white/50 dark:bg-white/5 focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:focus:ring-cyan-400 transition-all resize-none"
                rows={5}
                placeholder="Your message here..."
              />
            </label>

            <motion.button
              suppressHydrationWarning
              whileHover={!isLoading ? {
                scale: 1.05,
                boxShadow: "0 0 30px rgba(34, 211, 238, 0.5)",
              } : {}}
              whileTap={!isLoading ? { scale: 0.98 } : {}}
              type="submit"
              disabled={isLoading}
              className="relative w-full md:w-auto px-8 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold shadow-lg hover:shadow-cyan-500/50 transition-all flex items-center justify-center gap-2 group overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-xl opacity-0 group-hover:opacity-75 blur transition-opacity duration-300 -z-10 animate-pulse" />
              {isLoading ? "Sending..." : "Send Message"}{" "}
              <Send className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </motion.form>
        </motion.div>
      </div>
    </section>
  );
}

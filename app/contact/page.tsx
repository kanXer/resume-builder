"use client";

import { useState } from "react";
import { FaFacebook, FaInstagram, FaWhatsapp, FaGithub } from "react-icons/fa";
import { Mail, Phone, MapPin, Send, ArrowLeft, FileText, CheckCircle2, AlertCircle } from "lucide-react";
import Link from "next/link";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<string[]>([]);
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const e: string[] = [];
    if (!form.name.trim()) e.push("Name is required");
    if (!form.email.trim() || !/^\S+@\S+\.\S+$/.test(form.email)) e.push("Valid email required");
    if (!form.message.trim()) e.push("Message cannot be empty");
    return e;
  };

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    const v = validate();
    if (v.length) {
      setErrors(v);
      setSuccess("");
      return;
    }

    setLoading(true);
    setErrors([]);

    const text = `📩 New Contact Message\nName: ${form.name}\nEmail: ${form.email}\nMessage: ${form.message}`;

    try {
      const res = await fetch("/api/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ msg: text }),
      });
      const json = await res.json();
      if (json?.success) {
        setSuccess("Message sent successfully! We'll get back to you soon.");
        setForm({ name: "", email: "", message: "" });
      } else {
        setErrors(["ERROR: Something went wrong on the server."]);
      }
    } catch {
      setErrors(["ERROR: Could not reach the server."]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-white text-gray-900">

      {/* Hero Section */}
      <header className="py-16 px-6 bg-slate-50 border-b border-gray-100">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">Let's <span className="text-blue-600">Connect.</span></h1>
          <p className="text-lg text-gray-600 leading-relaxed">
            Koi sawaal hai ya collaboration ka plan? Hum hamesha help ke liye ready hain.
          </p>
        </div>
      </header>

      {/* Content Section */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-5 gap-16">
          
          {/* Contact Info (2 columns) */}
          <div className="md:col-span-2 space-y-8">
            <div>
              <h2 className="text-2xl font-bold mb-6">Contact Details</h2>
              <div className="space-y-6">
                <div className="flex items-center gap-4 text-gray-600 hover:text-blue-600 transition">
                  <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center">
                    <Mail size={20} />
                  </div>
                  <span>user.kanxer@gmail.com</span>
                </div>
                <div className="flex items-center gap-4 text-gray-600 hover:text-blue-600 transition">
                  <div className="w-10 h-10 bg-green-50 text-green-600 rounded-lg flex items-center justify-center">
                    <Phone size={20} />
                  </div>
                  <span>+91 9696262007</span>
                </div>
                <div className="flex items-center gap-4 text-gray-600">
                  <div className="w-10 h-10 bg-purple-50 text-purple-600 rounded-lg flex items-center justify-center">
                    <MapPin size={20} />
                  </div>
                  <span>Uttar Pradesh, India</span>
                </div>
              </div>
            </div>

            <div className="pt-8 border-t border-gray-100">
              <h3 className="font-bold text-lg mb-4">Follow My Journey</h3>
              <div className="flex gap-4">
                {[
                  { icon: <FaFacebook />, link: "https://facebook.com/sahil.srivastava.1004", color: "hover:bg-blue-600 hover:text-white" },
                  { icon: <FaInstagram />, link: "https://instagram.com/p.c.kill3r", color: "hover:bg-pink-600 hover:text-white" },
                  { icon: <FaWhatsapp />, link: "https://wa.me/919696262007", color: "hover:bg-green-600 hover:text-white" },
                  { icon: <FaGithub />, link: "https://github.com/kanXer", color: "hover:bg-gray-800 hover:text-white" }
                ].map((social, i) => (
                  <a key={i} href={social.link} target="_blank" className={`w-12 h-12 flex items-center justify-center rounded-xl bg-gray-50 text-gray-600 transition-all duration-300 ${social.color} shadow-sm`}>
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form (3 columns) */}
          <div className="md:col-span-3">
            <div className="bg-white rounded-3xl p-8 md:p-10 border border-gray-100 shadow-xl shadow-slate-200/50">
              
              {errors.length > 0 && (
                <div className="flex items-start gap-3 bg-red-50 border border-red-100 text-red-600 p-4 rounded-xl mb-6">
                  <AlertCircle size={20} className="shrink-0 mt-0.5" />
                  <ul className="text-sm font-medium">
                    {errors.map((e, i) => <li key={i}>{e}</li>)}
                  </ul>
                </div>
              )}

              {success && (
                <div className="flex items-center gap-3 bg-green-50 border border-green-100 text-green-600 p-4 rounded-xl mb-6 font-medium">
                  <CheckCircle2 size={20} /> {success}
                </div>
              )}

              <form onSubmit={sendMessage} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700 ml-1">Your Name</label>
                    <input
                      name="name"
                      placeholder="Sahil Srivastav"
                      value={form.name}
                      onChange={handleChange}
                      className="w-full bg-slate-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700 ml-1">Email Address</label>
                    <input
                      name="email"
                      type="email"
                      placeholder="hello@example.com"
                      value={form.email}
                      onChange={handleChange}
                      className="w-full bg-slate-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 ml-1">How can we help?</label>
                  <textarea
                    name="message"
                    rows={5}
                    placeholder="Write your message here..."
                    value={form.message}
                    onChange={handleChange}
                    className="w-full bg-slate-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-200 transition-all flex items-center justify-center gap-2 group disabled:opacity-70"
                >
                  {loading ? "Sending..." : "Send Message"}
                  {!loading && <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />}
                </button>
              </form>
            </div>
          </div>

        </div>
      </section>

      {/* Simple Footer */}
      <footer className="py-12 border-t border-gray-100 text-center text-gray-500 text-sm">
        <p>© 2026 Make Your Resume • Crafted with passion by Sahil Srivastava.</p>
      </footer>
    </main>
  );
}
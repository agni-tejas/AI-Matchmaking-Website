"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "../ui/homepage/button";
import { Input } from "../ui/homepage/input";
import {
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Twitter,
  Instagram,
  Facebook,
  ArrowRight,
  Users,
  Handshake,
} from "lucide-react";

export function Footer() {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    // Handle newsletter subscription
    setEmail("");
  };

  return (
    <footer className="bg-slate-950 text-slate-200">
      {/* Main Footer Content */}
      <div className="container px-4 py-16 mx-auto">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold">Quick Links</h3>
            <ul className="space-y-2">
              {[
                "Home",
                "Leaderboard",
                "How It Works",
                "Success Stories",
                "FAQ",
                "Terms & Privacy",
              ].map((link) => (
                <li key={link}>
                  <Link
                    href="#"
                    className="text-slate-400 hover:text-white transition-colors duration-200 hover:underline decoration-purple-500 decoration-2 underline-offset-4"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* About & Contact */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold">About Us</h3>
            <p className="text-slate-400">
              The Alliance is your go-to platform for meaningful connections
              that inspire action and collaboration. Start building today!
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-slate-400">
                <Mail className="w-4 h-4" />
                <span>support@thealliance.com</span>
              </div>
              <div className="flex items-center gap-2 text-slate-400">
                <Phone className="w-4 h-4" />
                <span>(123) 456-7890</span>
              </div>
              <div className="flex items-center gap-2 text-slate-400">
                <MapPin className="w-4 h-4" />
                <span>123 Innovation Lane, City, Country</span>
              </div>
            </div>
          </div>

          {/* Community */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold">Community</h3>
            <p className="text-slate-400">
              Join our network of 10,000+ changemakers!
            </p>

            {/* Social Links */}
            <div className="flex gap-4">
              {[
                { icon: Linkedin, label: "LinkedIn" },
                { icon: Twitter, label: "Twitter" },
                { icon: Instagram, label: "Instagram" },
                { icon: Facebook, label: "Facebook" },
              ].map(({ icon: Icon, label }) => (
                <Link
                  key={label}
                  href="#"
                  className="p-2 rounded-full bg-slate-900 hover:bg-purple-600 transition-colors duration-200"
                  aria-label={label}
                >
                  <Icon className="w-5 h-5" />
                </Link>
              ))}
            </div>

            {/* Live Stats */}
            <div className="space-y-2 pt-4">
              <div className="flex items-center gap-2 text-slate-400">
                <Users className="w-4 h-4 text-purple-500" />
                <span>200 Connections Made Today</span>
              </div>
              <div className="flex items-center gap-2 text-slate-400">
                <Handshake className="w-4 h-4 text-blue-500" />
                <span>1000+ Total Matches</span>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold">Stay Connected</h3>
            <p className="text-slate-400">
              Stay inspired. Get the latest connection tips and success stories.
            </p>

            {/* Newsletter Form */}
            <form onSubmit={handleSubscribe} className="space-y-2">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-slate-900 border-slate-800 text-white placeholder:text-slate-500"
                required
              />
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
              >
                Subscribe
              </Button>
            </form>

            {/* CTA Button */}
            <Button
              className="w-full bg-slate-900 hover:bg-slate-800 mt-4 group"
              variant="outline"
            >
              Start Your Journey
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-900">
        <div className="container px-4 py-6 mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-400 text-sm">
            © {new Date().getFullYear()} The Alliance. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="#" className="text-sm text-slate-400 hover:text-white">
              Privacy Policy
            </Link>
            <Link href="#" className="text-sm text-slate-400 hover:text-white">
              Terms of Service
            </Link>
            <Link href="#" className="text-sm text-slate-400 hover:text-white">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

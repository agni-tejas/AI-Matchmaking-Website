"use client";

import { motion } from "framer-motion";
import { useRotatingText } from "../../hooks/use-rotating-text";
import { NetworkAnimation } from "./network-animation";
import Link from "next/link";

export function HeroSection() {
  const rotatingText = useRotatingText([
    "Connect.",
    "Build Your Network.",
    "Achieve More Together.",
  ]);

  return (
    <section className="relative min-h-[100vh] flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <NetworkAnimation />
      </div>

      <div className="relative z-10 container px-4 ml-auto text-center">
        <motion.h1
          className="text-5xl md:text-7xl font-bold mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Alliance
        </motion.h1>

        <motion.div
          className="text-3xl md:text-4xl font-bold mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600">
            {rotatingText}
          </span>
        </motion.div>

        <motion.p
          className="text-xl mb-8 text-muted-foreground max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Join a community of people with shared ideas.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <Link
            href="/intakeform"
            size="lg"
            className="rounded-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-6 text-lg"
          >
            Start Connecting Now
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

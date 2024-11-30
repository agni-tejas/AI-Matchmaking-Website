"use client";

import { motion } from "framer-motion";
import { MessageSquare, Users, Sparkles } from "lucide-react";

export function QuickStart() {
  const steps = [
    {
      icon: Users,
      title: "Enter Your Interests",
      description: "Tell us about your self and what are your interests",
    },
    {
      icon: Sparkles,
      title: "Get AI Matchmaking to Top Connections",
      description: "Our AI finds the perfect matches for you",
    },
    {
      icon: MessageSquare,
      title: "Start Conversations",
      description: "Begin meaningful discussions with suggested topics",
    },
  ];

  return (
    <section className="py-20 bg-muted/50">
      <div className="container px-4 mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className="relative"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <div className="bg-background rounded-lg p-6 h-full shadow-lg">
                <div className="mb-4">
                  <step.icon className="w-10 h-10 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

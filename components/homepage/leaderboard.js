"use client";

import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/homepage/avatar";
import { Card, CardContent } from "../ui/homepage/card";

export function Leaderboard() {
  const topConnections = [
    {
      name: "Sarah Chen",
      avatar: "/placeholder.svg",
      offering: "UI/UX Design",
      needs:
        "I’m Sarah Chen, a passionate creator and problem solver, always striving to make meaningful connections and bring innovative ideas to life",
    },
    {
      name: "James Wilson",
      avatar: "/placeholder.svg",
      offering: "Marketing Strategy",
      needs:
        "I'm James Wilson, a passionate individual always striving to learn, grow, and make meaningful connections in both personal and professional spheres.",
    },
    {
      name: "Elena Rodriguez",
      avatar: "/placeholder.svg",
      offering: "Mobile Development",
      needs:
        "I am a passionate person for community-driven change, combining creativity and determination to inspire others.",
    },
  ];

  return (
    <section className="py-20">
      <div className="container px-4 mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">
          Top Connections
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {topConnections.map((profile, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={profile.avatar} />
                      <AvatarFallback>
                        {profile.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold">{profile.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        Work: {profile.offering}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Bio: {profile.needs}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

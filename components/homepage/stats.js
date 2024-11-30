'use client'

import { motion } from 'framer-motion'
import { Users, Heart, MessageSquare } from 'lucide-react'

export function Stats() {
  const stats = [
    {
      icon: Users,
      value: '1,245',
      label: 'Connections Made',
      color: 'text-purple-600'
    },
    {
      icon: Heart,
      value: '87%',
      label: 'Match Success Rate',
      color: 'text-pink-600'
    },
    {
      icon: MessageSquare,
      value: '345',
      label: 'Active Conversations',
      color: 'text-blue-600'
    }
  ]

  return (
    <section className="py-20 bg-muted">
      <div className="container px-4 mx-auto">
        <div className="grid md:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <div className="inline-block p-4 rounded-full bg-background mb-4">
                <stat.icon className={`w-8 h-8 ${stat.color}`} />
              </div>
              <h3 className="text-3xl font-bold mb-2">{stat.value}</h3>
              <p className="text-muted-foreground">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}


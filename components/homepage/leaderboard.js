"use client";

import { useUsers } from "../intakeform/useUsers";

import { AnimatedCard } from "./animated-card";

export function Leaderboard() {
  const { users } = useUsers();

  console.log(users);

  return (
    <section className="py-20">
      <div className="container px-4 mx-auto">
        <h2 className="text-5xl font-medium text-center mb-12">
          Alliance Community
        </h2>

        <div className=" grid md:grid-cols-6 gap-8">
          {users?.map((user) => (
            <AnimatedCard user={user} key={user.id} />
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PersonalInfo from "./personal-info";
import Preferences from "./preferences";
import Confirmation from "./confirmation";
import { Progress } from "../ui/intakeform/progress";
import { ThemeToggle } from "../chats/theme-toggle";

export default function IntakeForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    whatsapp: "",
    gender: "",
    nationality: "",
    designation: "",
    professionalBio: "",
    website: "",
    instagram: "",
    linkedin: "",
    profilePicture: null,
    canOffer: [], // Initialize as empty array
    needs: [], // Initialize as empty array
  });

  const updateFormData = (data) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const progress = (step / 3) * 100;

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex justify-end">
        <ThemeToggle />
      </div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Alliance Intake Form</h2>
        <Progress value={progress} className="h-2" />
      </div>

      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div
            key="personal"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <PersonalInfo
              formData={formData}
              updateFormData={updateFormData}
              onNext={nextStep}
            />
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="preferences"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <Preferences
              formData={formData}
              updateFormData={updateFormData}
              onNext={nextStep}
              onBack={prevStep}
            />
          </motion.div>
        )}

        {step === 3 && (
          <motion.div
            key="confirmation"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <Confirmation formData={formData} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

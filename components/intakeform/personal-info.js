"use client";

import { useState } from "react";
import Image from "next/image";
import { Upload } from "lucide-react";
import { Button } from "../ui/intakeform/button";
import { Input } from "../ui/intakeform/input";
import { Label } from "../ui/intakeform/label";
import { Textarea } from "../ui/intakeform/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/intakeform/select";

const nationalities = [
  "United States",
  "United Kingdom",
  "Canada",
  "Australia",
  "Germany",
  "France",
  "Spain",
  "Italy",
  "Japan",
  "China",
  "India",
  "Brazil",
  // Add more nationalities as needed
];

export default function PersonalInfo({ formData, updateFormData, onNext }) {
  const [errors, setErrors] = useState({});
  const [profilePicture, setProfilePicture] = useState(null);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type.substr(0, 5) === "image") {
      setProfilePicture(URL.createObjectURL(file));
      updateFormData({ profilePicture: file });
    } else {
      setErrors((prev) => ({
        ...prev,
        profilePicture: "Please select a valid image file.",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName) newErrors.fullName = "Full name is required";
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!formData.whatsapp) newErrors.whatsapp = "WhatsApp number is required";
    if (!formData.gender) newErrors.gender = "Gender is required";
    if (!formData.nationality)
      newErrors.nationality = "Nationality is required";
    if (!formData.designation)
      newErrors.designation = "Designation is required";
    if (!formData.professionalBio)
      newErrors.professionalBio = "Professional bio is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onNext();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="mb-6">
        <Label htmlFor="profilePicture">Profile Picture</Label>
        <div className="mt-2 flex items-center gap-4">
          <div className="relative h-24 w-24 overflow-hidden rounded-full">
            {profilePicture ? (
              <Image
                src={profilePicture}
                alt="Profile picture preview"
                layout="fill"
                objectFit="cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-muted">
                <Upload className="h-8 w-8 text-muted-foreground" />
              </div>
            )}
          </div>
          <div>
            <Input
              id="profilePicture"
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="hidden"
            />
            <Button
              type="button"
              variant="outline"
              onClick={() => document.getElementById("profilePicture").click()}
            >
              Upload Picture
            </Button>
            {errors.profilePicture && (
              <p className="text-sm text-red-500 mt-1">
                {errors.profilePicture}
              </p>
            )}
          </div>
        </div>
      </div>
      <div className="space-y-4">
        <div>
          <Label htmlFor="fullName">Full Name</Label>
          <Input
            id="fullName"
            placeholder="Enter your full name"
            value={formData.fullName}
            onChange={(e) => updateFormData({ fullName: e.target.value })}
            className={errors.fullName ? "border-red-500" : ""}
          />
          {errors.fullName && (
            <p className="text-sm text-red-500 mt-1">{errors.fullName}</p>
          )}
        </div>

        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={(e) => updateFormData({ email: e.target.value })}
            className={errors.email ? "border-red-500" : ""}
          />
          {errors.email && (
            <p className="text-sm text-red-500 mt-1">{errors.email}</p>
          )}
        </div>

        <div>
          <Label htmlFor="whatsapp">WhatsApp Number</Label>
          <Input
            id="whatsapp"
            placeholder="Enter your WhatsApp number"
            value={formData.whatsapp}
            onChange={(e) => updateFormData({ whatsapp: e.target.value })}
            className={errors.whatsapp ? "border-red-500" : ""}
          />
          {errors.whatsapp && (
            <p className="text-sm text-red-500 mt-1">{errors.whatsapp}</p>
          )}
        </div>

        <div>
          <Label htmlFor="gender">Gender</Label>
          <Select
            value={formData.gender}
            onValueChange={(value) => updateFormData({ gender: value })}
          >
            <SelectTrigger className={errors.gender ? "border-red-500" : ""}>
              <SelectValue placeholder="Select your gender" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="male">Male</SelectItem>
              <SelectItem value="female">Female</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
          {errors.gender && (
            <p className="text-sm text-red-500 mt-1">{errors.gender}</p>
          )}
        </div>

        <div>
          <Label htmlFor="nationality">Nationality</Label>
          <Select
            value={formData.nationality}
            onValueChange={(value) => updateFormData({ nationality: value })}
          >
            <SelectTrigger
              className={errors.nationality ? "border-red-500" : ""}
            >
              <SelectValue placeholder="Select your nationality" />
            </SelectTrigger>
            <SelectContent>
              {nationalities.map((nationality) => (
                <SelectItem key={nationality} value={nationality.toUpperCase()}>
                  {nationality}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.nationality && (
            <p className="text-sm text-red-500 mt-1">{errors.nationality}</p>
          )}
        </div>

        <div>
          <Label htmlFor="designation">Designation</Label>
          <Input
            id="designation"
            placeholder="Enter your designation"
            value={formData.designation}
            onChange={(e) => updateFormData({ designation: e.target.value })}
            className={errors.designation ? "border-red-500" : ""}
          />
          {errors.designation && (
            <p className="text-sm text-red-500 mt-1">{errors.designation}</p>
          )}
        </div>

        <div>
          <Label htmlFor="professionalBio">Professional Bio</Label>
          <Textarea
            id="professionalBio"
            placeholder="Tell us about yourself"
            value={formData.professionalBio}
            onChange={(e) =>
              updateFormData({ professionalBio: e.target.value })
            }
            className={errors.professionalBio ? "border-red-500" : ""}
          />
          {errors.professionalBio && (
            <p className="text-sm text-red-500 mt-1">
              {errors.professionalBio}
            </p>
          )}
        </div>

        <div>
          <Label htmlFor="website">Website (Optional)</Label>
          <Input
            id="website"
            placeholder="Enter your website URL"
            value={formData.website}
            onChange={(e) => updateFormData({ website: e.target.value })}
          />
        </div>

        <div>
          <Label htmlFor="instagram">Instagram Profile URL (Optional)</Label>
          <Input
            id="instagram"
            placeholder="Enter your Instagram profile URL"
            value={formData.instagram}
            onChange={(e) => updateFormData({ instagram: e.target.value })}
          />
        </div>

        <div>
          <Label htmlFor="linkedin">LinkedIn Profile URL (Optional)</Label>
          <Input
            id="linkedin"
            placeholder="Enter your LinkedIn profile URL"
            value={formData.linkedin}
            onChange={(e) => updateFormData({ linkedin: e.target.value })}
          />
        </div>
      </div>

      <Button type="submit" className="w-full">
        Next Step
      </Button>
    </form>
  );
}

"use client";

import { useState } from "react";
import { Button } from "../ui/intakeform/button";
import { Label } from "../ui/intakeform/label";
import { Input } from "../ui/intakeform/input";
import { Badge } from "../ui/intakeform/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/intakeform/tooltip";
import { Info, X } from "lucide-react";
import { useCreateUser } from "./useCreateUser";
import { useUsers } from "./useUsers";

export default function Preferences({
  formData,
  updateFormData,
  onNext,
  onBack,
}) {
  const [errors, setErrors] = useState({});
  const [offerInput, setOfferInput] = useState("");
  const [needInput, setNeedInput] = useState("");
  const { createUserMutation, isCreating } = useCreateUser();

  const validateForm = () => {
    const newErrors = {};
    if (!formData.canOffer || formData.canOffer.length === 0) {
      newErrors.canOffer = "Please add at least one offering";
    }
    if (!formData.needs || formData.needs.length === 0) {
      newErrors.needs = "Please add at least one need";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  function generateRandomNumber() {
    return Math.floor(Math.random() * 59) + 1;
  }
  const randomNumber = generateRandomNumber();
  function generateRandomNumber2() {
    return Math.floor(Math.random() * 99) + 1;
  }
  const randomNumber2 = generateRandomNumber2();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const newUser = {
          name: formData.fullName,
          email: formData.email,
          phone_number: formData.whatsapp,
          gender: formData.gender,
          nationality: formData.nationality,
          designation: formData.designation,
          bio: formData.professionalBio,
          website: formData.website,
          instagram: formData.instagram,
          linkedin: formData.linkedin,
          offer_keywords: formData.canOffer.join(", "), // Convert array to comma-separated string
          commonTags: formData.needs.join(", "), // Convert array to comma-separated string
          avatar: formData.profilePicture, // Convert array to comma-separated string
          lastActive: `${randomNumber} min`,
          isTopRanked: false,
          matchPercentage: randomNumber2,
        };
        createUserMutation(newUser, {
          onSuccess: () => {
            alert("User successfully created!");
          },
          onError: (error) => {
            console.error(error);
            alert("There was an error creating the user.");
          },
        });
        console.log(newUser);
        onNext();
      } catch (error) {
        console.error("Error submitting form:", error);
      }
    }
  };

  const addItem = (list, value) => {
    if (!value.trim()) return;
    const currentList = formData[list] || [];
    if (!currentList.includes(value.trim())) {
      updateFormData({ [list]: [...currentList, value.trim()] });
    }
  };

  const removeItem = (list, value) => {
    const currentList = formData[list] || [];
    updateFormData({
      [list]: currentList.filter((item) => item !== value),
    });
  };

  const handleKeyPress = (e, list, value, setValue) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addItem(list, value);
      setValue("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="space-y-6">
        {/* What You Can Offer Section */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Label>Places you like to visit</Label>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Info className="h-4 w-4 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Add Places</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <div className="space-y-2">
            <div className="flex gap-2">
              <Input
                value={offerInput}
                onChange={(e) => setOfferInput(e.target.value)}
                onKeyPress={(e) =>
                  handleKeyPress(e, "canOffer", offerInput, setOfferInput)
                }
                placeholder="Type and press Enter to add what you can offer"
                className={errors.canOffer ? "border-red-500" : ""}
              />
              <Button
                type="button"
                onClick={() => {
                  addItem("canOffer", offerInput);
                  setOfferInput("");
                }}
              >
                Add
              </Button>
            </div>
            {errors.canOffer && (
              <p className="text-sm text-red-500">{errors.canOffer}</p>
            )}
            <div className="flex flex-wrap gap-2">
              {formData.canOffer?.map((item) => (
                <Badge
                  key={item}
                  variant="secondary"
                  className="px-3 py-1 text-sm flex items-center gap-1"
                >
                  {item}
                  <X
                    className="h-3 w-3 cursor-pointer"
                    onClick={() => removeItem("canOffer", item)}
                  />
                </Badge>
              ))}
            </div>
          </div>
        </div>

        {/* What You Need Section */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Label>
              Describe yourself and things you&apos;re interested in single
              words
            </Label>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Info className="h-4 w-4 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Press add whenever one word is finished.</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <div className="space-y-2">
            <div className="flex gap-2">
              <Input
                value={needInput}
                onChange={(e) => setNeedInput(e.target.value)}
                onKeyPress={(e) =>
                  handleKeyPress(e, "needs", needInput, setNeedInput)
                }
                placeholder="Type and press Enter to add"
                className={errors.needs ? "border-red-500" : ""}
              />
              <Button
                type="button"
                onClick={() => {
                  addItem("needs", needInput);
                  setNeedInput("");
                }}
              >
                Add
              </Button>
            </div>
            {errors.needs && (
              <p className="text-sm text-red-500">{errors.needs}</p>
            )}
            <div className="flex flex-wrap gap-2">
              {formData.needs?.map((item) => (
                <Badge
                  key={item}
                  variant="secondary"
                  className="px-3 py-1 text-sm flex items-center gap-1"
                >
                  {item}
                  <X
                    className="h-3 w-3 cursor-pointer"
                    onClick={() => removeItem("needs", item)}
                  />
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-4 pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={onBack}
          className="flex-1"
        >
          Back
        </Button>
        <Button
          type="submit"
          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3"
        >
          Submit
        </Button>
      </div>
    </form>
  );
}

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PhoneInput } from "./PhoneInput";
import { Card } from "@/components/ui/card";
import { CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronRight } from "lucide-react";

interface ContactDetails {
  firstName: string;
  email: string;
  phone: string;
  countryCode: string;
}

interface ContactSectionProps {
  onContactDetailsChange: (details: ContactDetails) => void;
}

export const ContactSection = ({ onContactDetailsChange }: ContactSectionProps) => {
  const { register, watch, setValue, formState: { errors } } = useForm<ContactDetails>();

  // Watch all fields
  const watchedFields = watch();

  // Update parent component whenever fields change
  useEffect(() => {
    if (watchedFields.firstName && watchedFields.email && watchedFields.phone) {
      onContactDetailsChange(watchedFields);
    }
  }, [watchedFields, onContactDetailsChange]);

  const handlePhoneChange = (phone: string, countryCode: string) => {
    setValue('phone', phone);
    setValue('countryCode', countryCode);
  };

  return (
    <>
      <CollapsibleTrigger 
        className="flex w-full items-center justify-between rounded-lg border bg-card p-4 text-card-foreground"
      >
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-muted" />
          <span className="font-medium">Contact Details</span>
        </div>
        <ChevronRight className="h-4 w-4 transition-transform" />
      </CollapsibleTrigger>
      <CollapsibleContent className="space-y-4 p-4">
        <div>
          <Label htmlFor="firstName">First Name</Label>
          <Input
            id="firstName"
            {...register("firstName", { required: true })}
            placeholder="John"
          />
          {errors.firstName && (
            <p className="text-sm text-red-500 mt-1">First name is required</p>
          )}
        </div>

        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            {...register("email", { 
              required: true,
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Please enter a valid email address"
              }
            })}
            placeholder="john@example.com"
          />
          {errors.email && (
            <p className="text-sm text-red-500 mt-1">
              {errors.email.message || "Email is required"}
            </p>
          )}
        </div>

        <div>
          <Label>Phone Number</Label>
          <PhoneInput onChange={handlePhoneChange} />
        </div>
      </CollapsibleContent>
    </>
  );
};
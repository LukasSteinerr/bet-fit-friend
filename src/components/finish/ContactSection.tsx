import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { PhoneInput } from "./PhoneInput";
import { CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronRight, Check } from "lucide-react";

interface ContactDetails {
  firstName: string;
  email: string;
  phone: string;
  countryCode: string;
}

interface ContactSectionProps {
  onSubmit: (details: ContactDetails) => void;
  initialValues: ContactDetails;
}

export const ContactSection = ({ onSubmit, initialValues }: ContactSectionProps) => {
  const { register, handleSubmit, setValue, watch, formState: { errors, isValid } } = useForm<ContactDetails>({
    defaultValues: initialValues,
    mode: "onChange"
  });

  const handlePhoneChange = (phone: string, countryCode: string) => {
    setValue('phone', phone, { shouldValidate: true });
    setValue('countryCode', countryCode, { shouldValidate: true });
  };

  const onFormSubmit = (data: ContactDetails) => {
    if (isValid) {
      onSubmit(data);
    }
  };

  const watchedValues = watch();
  const isComplete = Boolean(
    watchedValues.firstName && 
    watchedValues.email && 
    watchedValues.phone && 
    watchedValues.countryCode
  );

  return (
    <>
      <CollapsibleTrigger 
        className="flex w-full items-center justify-between rounded-lg border bg-card p-4 text-card-foreground"
      >
        <div className="flex items-center gap-2">
          <div className={`h-2 w-2 rounded-full ${isComplete ? 'bg-primary' : 'bg-muted'}`} />
          <span className="font-medium">Contact Details</span>
          {isComplete && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>{watchedValues.firstName}</span>
              <Check className="h-4 w-4 text-primary" />
            </div>
          )}
        </div>
        <ChevronRight className="h-4 w-4 transition-transform" />
      </CollapsibleTrigger>

      <CollapsibleContent className="space-y-4 p-4">
        <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
          <div>
            <Label htmlFor="firstName">First Name</Label>
            <Input
              id="firstName"
              {...register("firstName", { required: true })}
              placeholder="John"
              className="mt-1"
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
              className="mt-1"
            />
            {errors.email && (
              <p className="text-sm text-red-500 mt-1">
                {errors.email.message || "Email is required"}
              </p>
            )}
          </div>

          <div>
            <Label>Phone Number</Label>
            <PhoneInput 
              onChange={handlePhoneChange}
              initialValue={{
                phone: watchedValues.phone,
                countryCode: watchedValues.countryCode
              }}
            />
          </div>

          <Button 
            type="submit" 
            className="w-full"
            disabled={!isValid}
          >
            Continue
          </Button>
        </form>
      </CollapsibleContent>
    </>
  );
};
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronRight, PawPrint, Users, HeartPulse, Info, Check } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { Input } from "@/components/ui/input";

export const StakeSetup = () => {
  const [selectedAmount, setSelectedAmount] = useState<string>("");
  const [customAmount, setCustomAmount] = useState<string>("");

  const handleAmountSelect = (amount: string) => {
    setSelectedAmount(amount);
    if (amount !== "custom") {
      setCustomAmount("");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-secondary/20 py-12">
      <div className="container max-w-3xl">
        {/* Progress Steps */}
        <div className="mb-12 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/20">
              <Check className="h-4 w-4 text-primary" />
            </div>
            <span className="text-sm text-muted-foreground">Create commitment</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <span className="text-sm">2</span>
            </div>
            <span className="text-sm font-medium text-primary">Add stake</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full border border-muted bg-background">
              <span className="text-sm text-muted-foreground">3</span>
            </div>
            <span className="text-sm text-muted-foreground">Finish</span>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">Add stake</h2>
            <p className="text-muted-foreground">
              Choose your charity and the amount you want to stake.
            </p>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium leading-none">
                Charity
              </label>
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Choose your charity" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="animal-shelter">
                    <div className="flex items-center gap-2">
                      <PawPrint className="h-4 w-4" />
                      <div>
                        <div>Animal Shelter</div>
                        <div className="text-xs text-muted-foreground">
                          Support animals that don't have an owner or food.
                        </div>
                      </div>
                    </div>
                  </SelectItem>
                  <SelectItem value="children-africa">
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      <div>
                        <div>Children in Africa</div>
                        <div className="text-xs text-muted-foreground">
                          Support health, education and nutrition programs for children in Africa.
                        </div>
                      </div>
                    </div>
                  </SelectItem>
                  <SelectItem value="cancer-research">
                    <div className="flex items-center gap-2">
                      <HeartPulse className="h-4 w-4" />
                      <div>
                        <div>Cancer Research</div>
                        <div className="text-xs text-muted-foreground">
                          Support & help to create a world immune to cancer.
                        </div>
                      </div>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
              <p className="text-sm text-muted-foreground">
                In case you fail to meet your commitment, your money will go to this charity.
              </p>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium leading-none">
                Amount
              </label>
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Hint: Try to find the Sweet Spot between what you can afford to lose but still hurts a little.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  {["25", "50", "100", "custom"].map((amount) => (
                    <Button
                      key={amount}
                      variant={selectedAmount === amount ? "default" : "outline"}
                      className="h-16"
                      onClick={() => handleAmountSelect(amount)}
                    >
                      {amount === "custom" ? (
                        "Custom"
                      ) : (
                        <span className="text-lg">${amount}</span>
                      )}
                    </Button>
                  ))}
                </div>
                {selectedAmount === "custom" && (
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                      $
                    </span>
                    <Input
                      type="number"
                      className="pl-8"
                      placeholder="0.00"
                      value={customAmount}
                      onChange={(e) => setCustomAmount(e.target.value)}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-end">
          <Button size="lg" className="px-8">
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};
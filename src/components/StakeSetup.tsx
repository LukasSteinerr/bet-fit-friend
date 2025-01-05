import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const StakeSetup = () => {
  const navigate = useNavigate();
  const [selectedAmount, setSelectedAmount] = useState<string>("");
  const [customAmount, setCustomAmount] = useState<string>("");

  const handleAmountSelect = (amount: string) => {
    setSelectedAmount(amount);
    if (amount !== "custom") {
      setCustomAmount("");
    }
  };

  const handleNext = () => {
    navigate("/finish");
  };

  const isFormValid = () => {
    if (!selectedAmount) return false;
    if (selectedAmount === "custom" && !customAmount) return false;
    return true;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-secondary/20 py-12">
      <div className="container max-w-3xl">
        {/* Progress Steps */}
        <div className="mb-12 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full border border-muted bg-background">
              <span className="text-sm text-muted-foreground">1</span>
            </div>
            <span className="text-sm text-muted-foreground">Create commitment</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <span className="text-sm">✓</span>
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

        <div className="grid gap-8">
          {/* Amount Selection */}
          <Card className="p-6">
            <h2 className="text-2xl font-semibold tracking-tight text-gray-900">Select Amount</h2>
            <div className="space-y-4">
              <Button variant="outline" onClick={() => handleAmountSelect("small")}>
                Small Amount
              </Button>
              <Button variant="outline" onClick={() => handleAmountSelect("medium")}>
                Medium Amount
              </Button>
              <Button variant="outline" onClick={() => handleAmountSelect("large")}>
                Large Amount
              </Button>
              <Button variant="outline" onClick={() => handleAmountSelect("custom")}>
                Custom Amount
              </Button>
              {selectedAmount === "custom" && (
                <input
                  type="text"
                  placeholder="Enter custom amount"
                  value={customAmount}
                  onChange={(e) => setCustomAmount(e.target.value)}
                  className="mt-2 w-full rounded-md border border-input bg-background px-3 py-2"
                />
              )}
            </div>
          </Card>
        </div>

        <div className="mt-8 flex justify-end">
          <Button 
            size="lg" 
            className="px-8" 
            onClick={handleNext}
            disabled={!isFormValid()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

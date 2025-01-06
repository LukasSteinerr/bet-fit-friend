import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ProgressSteps } from "./ProgressSteps";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

interface Charity {
  id: string;
  name: string;
  description: string;
  icon: string;
}

export const StakeSetup = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [selectedAmount, setSelectedAmount] = useState<string>("");
  const [customAmount, setCustomAmount] = useState<string>("");
  const [selectedCharity, setSelectedCharity] = useState<string>("");
  const [charities, setCharities] = useState<Charity[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCharities = async () => {
      try {
        const { data, error } = await supabase
          .from('charities')
          .select('*')
          .eq('active', true);
        
        if (error) throw error;
        setCharities(data || []);
      } catch (error: any) {
        console.error('Error fetching charities:', error);
        toast({
          title: "Error",
          description: "Failed to load charities. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchCharities();
  }, [toast]);

  const handleAmountSelect = (amount: string) => {
    setSelectedAmount(amount);
    if (amount !== "custom") {
      setCustomAmount("");
    }
  };

  const handleNext = () => {
    const amount = selectedAmount === "custom" ? customAmount : selectedAmount;
    navigate("/finish", {
      state: {
        commitmentData: location.state?.commitmentData,
        stakeData: {
          amount: Number(amount),
          charity: selectedCharity
        }
      }
    });
  };

  const isFormValid = () => {
    if (!selectedAmount || !selectedCharity) return false;
    if (selectedAmount === "custom" && !customAmount) return false;
    return true;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-secondary/20 py-12">
      <div className="container max-w-3xl">
        <ProgressSteps currentStep={2} />
        
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">Add stake</h1>
            <p className="text-lg text-muted-foreground mt-2">
              Choose your charity and the amount you want to stake.
            </p>
          </div>

          {/* Charity Selection */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Choose your charity</h2>
            <p className="text-muted-foreground mb-4">
              In case you fail to meet your commitment, your money will go to this charity.
            </p>
            <Select value={selectedCharity} onValueChange={setSelectedCharity}>
              <SelectTrigger>
                <SelectValue placeholder="Select a charity" />
              </SelectTrigger>
              <SelectContent>
                {charities.map((charity) => (
                  <SelectItem key={charity.id} value={charity.id}>
                    <div className="flex items-center justify-between w-full">
                      <div className="flex items-center gap-3">
                        <span className="text-xl">{charity.icon}</span>
                        <div>
                          <p className="font-medium">{charity.name}</p>
                          <p className="text-sm text-muted-foreground">{charity.description}</p>
                        </div>
                      </div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Card>

          {/* Amount Selection */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Select Amount</h2>
            <div className="grid grid-cols-2 gap-4">
              <Button 
                variant={selectedAmount === "25" ? "default" : "outline"}
                className="h-24 text-lg font-semibold"
                onClick={() => handleAmountSelect("25")}
              >
                $25
              </Button>
              <Button 
                variant={selectedAmount === "50" ? "default" : "outline"}
                className="h-24 text-lg font-semibold"
                onClick={() => handleAmountSelect("50")}
              >
                $50
              </Button>
              <Button 
                variant={selectedAmount === "100" ? "default" : "outline"}
                className="h-24 text-lg font-semibold"
                onClick={() => handleAmountSelect("100")}
              >
                $100
              </Button>
              <Button 
                variant={selectedAmount === "custom" ? "default" : "outline"}
                className="h-24 text-lg font-semibold"
                onClick={() => handleAmountSelect("custom")}
              >
                Custom Amount
              </Button>
              {selectedAmount === "custom" && (
                <div className="col-span-2">
                  <input
                    type="text"
                    placeholder="Enter custom amount"
                    value={customAmount}
                    onChange={(e) => setCustomAmount(e.target.value)}
                    className="mt-2 w-full rounded-md border border-input bg-background px-3 py-2"
                  />
                </div>
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
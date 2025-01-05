import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { CheckCircle } from "lucide-react";

export const SuccessPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-secondary/20 py-12">
      <div className="container max-w-md mx-auto text-center space-y-6">
        <div className="rounded-full bg-green-100 p-3 w-fit mx-auto">
          <CheckCircle className="w-12 h-12 text-green-600" />
        </div>
        
        <h1 className="text-2xl font-semibold tracking-tight">
          Commitment Created Successfully!
        </h1>
        
        <p className="text-muted-foreground">
          Your commitment has been created and verification details have been sent. You can now start tracking your progress.
        </p>

        <div className="pt-6">
          <Button 
            onClick={() => navigate('/')} 
            size="lg"
            className="w-full"
          >
            Go to Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
};
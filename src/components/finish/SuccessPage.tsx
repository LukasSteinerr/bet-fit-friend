import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { CheckCircle, Star } from "lucide-react";

export const SuccessPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-secondary/20 py-12 relative overflow-hidden">
      <div className="container max-w-md mx-auto text-center space-y-6">
        {/* Firework particles */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <Star className="w-6 h-6 text-primary animate-firework-1" />
            <Star className="w-6 h-6 text-primary animate-firework-2" />
            <Star className="w-6 h-6 text-primary animate-firework-3" />
            <Star className="w-6 h-6 text-primary animate-firework-4" />
          </div>
        </div>

        <div className="rounded-full bg-green-100 p-3 w-fit mx-auto animate-scale-up">
          <CheckCircle className="w-12 h-12 text-green-600" />
        </div>
        
        <h1 className="text-2xl font-semibold tracking-tight animate-scale-up [animation-delay:200ms]">
          Commitment Created Successfully!
        </h1>
        
        <p className="text-muted-foreground animate-scale-up [animation-delay:400ms]">
          Your commitment has been created and verification details have been sent. You can now start tracking your progress.
        </p>

        <div className="pt-6 animate-scale-up [animation-delay:600ms]">
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
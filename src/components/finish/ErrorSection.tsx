import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export const ErrorSection = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-secondary/20 py-12">
      <div className="container max-w-md text-center space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-destructive">
          Missing required information
        </h2>
        <p className="text-muted-foreground">
          Please start from the beginning to create your commitment.
        </p>
        <Button 
          size="lg"
          onClick={() => navigate('/')}
          className="mt-4"
        >
          Start Over
        </Button>
      </div>
    </div>
  );
};
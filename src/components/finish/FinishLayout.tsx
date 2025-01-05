import { Button } from "@/components/ui/button";
import { ProgressSteps } from "../ProgressSteps";

interface FinishLayoutProps {
  children: React.ReactNode;
  isComplete: boolean;
  onSubmit: () => void;
}

export const FinishLayout = ({ children, isComplete, onSubmit }: FinishLayoutProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-secondary/20 py-12">
      <div className="container max-w-3xl">
        <ProgressSteps currentStep={3} />
        
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-gray-900">Add details</h2>
            <p className="text-sm text-muted-foreground">
              Choose how you want to verify your actions and add your contact info.
            </p>
          </div>

          <div className="space-y-4">
            {children}
          </div>
        </div>

        <div className="mt-8 flex justify-end">
          <Button 
            size="lg" 
            className="px-8"
            onClick={onSubmit}
            disabled={!isComplete}
          >
            Review & confirm
          </Button>
        </div>
      </div>
    </div>
  );
};
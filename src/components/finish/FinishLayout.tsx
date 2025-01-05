import { Button } from "@/components/ui/button";
import { ProgressSteps } from "../ProgressSteps";
import { CommitmentPreview } from "../commitment/CommitmentPreview";
import { useLocation } from "react-router-dom";

interface FinishLayoutProps {
  children: React.ReactNode;
  isComplete: boolean;
  onSubmit: () => void;
}

export const FinishLayout = ({ children, isComplete, onSubmit }: FinishLayoutProps) => {
  const location = useLocation();
  const commitmentData = location.state?.commitmentData;

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-secondary/20 py-12">
      <div className="container max-w-6xl">
        <ProgressSteps currentStep={3} />
        
        <div className="mt-8 grid gap-8 lg:grid-cols-2">
          <div className="hidden lg:block">
            <CommitmentPreview 
              commitmentText={commitmentData?.name || ""}
              frequency={commitmentData?.frequency || ""}
              date={commitmentData?.end_date ? new Date(commitmentData.end_date) : undefined}
              difficulty={commitmentData?.difficulty}
              showDifficulty={true}
            />
          </div>

          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight">Add details</h2>
              <p className="text-sm text-muted-foreground">
                Choose how you want to verify your actions and add your contact info.
              </p>
            </div>

            <div className="space-y-4">
              {children}
            </div>

            <div className="mt-8">
              <Button 
                size="lg" 
                className="w-full"
                onClick={onSubmit}
                disabled={!isComplete}
              >
                Review & confirm
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
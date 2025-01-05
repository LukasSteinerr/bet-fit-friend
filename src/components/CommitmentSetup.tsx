import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { differenceInDays, differenceInWeeks } from "date-fns";
import { ProgressSteps } from "./ProgressSteps";
import { CommitmentPreview } from "./commitment/CommitmentPreview";
import { CommitmentForm } from "./commitment/CommitmentForm";

export const CommitmentSetup = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [commitmentText, setCommitmentText] = useState("");
  const [frequency, setFrequency] = useState("");
  const [date, setDate] = useState<Date>();
  const [difficulty, setDifficulty] = useState("");

  const showDifficulty = frequency === "Daily" || frequency === "Weekly";

  const calculateRequiredVerifications = () => {
    if (!date || !frequency) return 0;
    
    const today = new Date();
    switch (frequency) {
      case "Daily":
        return differenceInDays(date, today);
      case "Weekly":
        return differenceInWeeks(date, today);
      case "One Time":
        return 1;
      default:
        return 0;
    }
  };

  const isFormValid = () => {
    if (!commitmentText || !frequency || !date) return false;
    if (showDifficulty && !difficulty) return false;
    return true;
  };

  const handleNext = () => {
    if (!isFormValid()) return;
    
    const commitmentData = {
      name: commitmentText,
      frequency,
      end_date: date?.toISOString(),
      difficulty: showDifficulty ? difficulty : null,
      required_verifications: calculateRequiredVerifications(),
    };

    navigate("/stake", { 
      state: { commitmentData }
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-secondary/20 py-12">
      <div className="container max-w-3xl">
        <ProgressSteps currentStep={1} />

        <div className="grid gap-8 md:grid-cols-2">
          <CommitmentPreview
            commitmentText={commitmentText}
            frequency={frequency}
            date={date}
            difficulty={difficulty}
            showDifficulty={showDifficulty}
          />

          <CommitmentForm
            commitmentText={commitmentText}
            setCommitmentText={setCommitmentText}
            frequency={frequency}
            setFrequency={setFrequency}
            date={date}
            setDate={setDate}
            difficulty={difficulty}
            setDifficulty={setDifficulty}
            showDifficulty={showDifficulty}
            isSubmitting={false}
            onSubmit={handleNext}
            isFormValid={isFormValid()}
          />
        </div>
      </div>
    </div>
  );
};

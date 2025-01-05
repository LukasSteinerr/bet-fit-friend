import { Card } from "@/components/ui/card";
import { format } from "date-fns";

interface CommitmentPreviewProps {
  commitmentText: string;
  frequency: string;
  date?: Date;
  difficulty?: string;
  showDifficulty: boolean;
}

export const CommitmentPreview = ({
  commitmentText,
  frequency,
  date,
  difficulty,
  showDifficulty,
}: CommitmentPreviewProps) => {
  return (
    <Card className="relative overflow-hidden border-none bg-gradient-to-br from-secondary/50 to-warning/30 p-8">
      <div className="relative z-10">
        <h2 className="text-4xl font-semibold tracking-tight text-gray-900">
          {commitmentText ? (
            <>
              I commit to {commitmentText}.
              {frequency && (
                <div className="mt-2 text-xl text-muted-foreground">
                  {frequency}
                </div>
              )}
              {date && (
                <div className="mt-2 text-xl text-muted-foreground">
                  Until {format(date, "PPP")}
                </div>
              )}
              {difficulty && showDifficulty && (
                <div className="mt-2 text-xl text-muted-foreground">
                  Difficulty: {difficulty}
                </div>
              )}
            </>
          ) : (
            "Create your commitment"
          )}
        </h2>
      </div>
    </Card>
  );
};
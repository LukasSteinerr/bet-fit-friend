import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ChevronRight, Check, Clock } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { format } from "date-fns";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface CommitmentFormProps {
  commitmentText: string;
  setCommitmentText: (text: string) => void;
  frequency: string;
  setFrequency: (frequency: string) => void;
  date?: Date;
  setDate: (date?: Date) => void;
  difficulty: string;
  setDifficulty: (difficulty: string) => void;
  showDifficulty: boolean;
  isSubmitting: boolean;
  onSubmit: () => void;
  isFormValid: boolean;
}

export const CommitmentForm = ({
  commitmentText,
  setCommitmentText,
  frequency,
  setFrequency,
  date,
  setDate,
  difficulty,
  setDifficulty,
  showDifficulty,
  isSubmitting,
  onSubmit,
  isFormValid,
}: CommitmentFormProps) => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight text-gray-900">Create commitment</h2>
        <p className="text-sm text-muted-foreground">
          Let us know what you want to commit to.
        </p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium leading-none">
            Name
          </label>
          <div className="relative">
            <Input
              placeholder="E.g. 'Get a job'"
              value={commitmentText}
              onChange={(e) => setCommitmentText(e.target.value)}
              className="pr-10"
            />
            {commitmentText && (
              <Check className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-primary" />
            )}
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium leading-none">
            Frequency
          </label>
          <Select value={frequency} onValueChange={setFrequency}>
            <SelectTrigger>
              <SelectValue placeholder="Choose your frequency" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="One Time">One Time</SelectItem>
              <SelectItem value="Daily">Daily</SelectItem>
              <SelectItem value="Weekly">Weekly</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium leading-none">
            Duration
          </label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-between"
                size="lg"
              >
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-primary" />
                  <span>
                    {date ? format(date, "PPP") : "Choose end date"}
                  </span>
                </div>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <CalendarComponent
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
                disabled={(date) => date < new Date()}
              />
            </PopoverContent>
          </Popover>
        </div>

        {showDifficulty && (
          <div className="space-y-2">
            <label className="text-sm font-medium leading-none">
              Difficulty
            </label>
            <Select value={difficulty} onValueChange={setDifficulty}>
              <SelectTrigger>
                <SelectValue placeholder="Choose difficulty level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Easy">Easy (60%)</SelectItem>
                <SelectItem value="Medium">Medium (80%)</SelectItem>
                <SelectItem value="Hard">Hard (100%)</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-sm text-muted-foreground">
              Determines what percentage of your commitment needs to be reached.
            </p>
          </div>
        )}
      </div>

      <div className="mt-8 flex justify-end">
        <Button 
          size="lg" 
          className="px-8" 
          onClick={onSubmit}
          disabled={!isFormValid || isSubmitting}
        >
          {isSubmitting ? "Creating..." : "Next"}
        </Button>
      </div>
    </div>
  );
};
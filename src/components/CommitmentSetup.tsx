import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ChevronRight, Target, Calendar, Clock, Check } from "lucide-react";
import { useState } from "react";
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

export const CommitmentSetup = () => {
  const [commitmentText, setCommitmentText] = useState("");
  const [frequency, setFrequency] = useState("");
  const [date, setDate] = useState<Date>();
  const [difficulty, setDifficulty] = useState("");

  const showDifficulty = frequency === "Daily" || frequency === "Weekly";

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-secondary/20 py-12">
      <div className="container max-w-3xl">
        {/* Progress Steps */}
        <div className="mb-12 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <span className="text-sm">1</span>
            </div>
            <span className="text-sm font-medium text-primary">Create commitment</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full border border-muted bg-background">
              <span className="text-sm text-muted-foreground">2</span>
            </div>
            <span className="text-sm text-muted-foreground">Add stake</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full border border-muted bg-background">
              <span className="text-sm text-muted-foreground">3</span>
            </div>
            <span className="text-sm text-muted-foreground">Finish</span>
          </div>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {/* Preview Card */}
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

          {/* Form Card */}
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
          </div>
        </div>

        <div className="mt-8 flex justify-end">
          <Button size="lg" className="px-8">
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};
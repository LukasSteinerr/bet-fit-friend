import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ChevronRight, Target, Calendar, Clock } from "lucide-react";

export const CommitmentSetup = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-secondary/20 py-12">
      <div className="container max-w-3xl animate-fade-in">
        <div className="mb-8 space-y-2">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground">
              1
            </div>
            <span className="font-medium text-primary">Create commitment</span>
            <ChevronRight className="h-4 w-4" />
            <div className="flex h-6 w-6 items-center justify-center rounded-full border border-muted bg-background">
              2
            </div>
            <span className="text-muted-foreground">Add stake</span>
            <ChevronRight className="h-4 w-4" />
            <div className="flex h-6 w-6 items-center justify-center rounded-full border border-muted bg-background">
              3
            </div>
            <span className="text-muted-foreground">Finish</span>
          </div>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <Card className="relative overflow-hidden border-none bg-gradient-to-br from-secondary/50 to-warning/30 p-8 transition-transform hover:scale-[1.02] animate-float">
            <div className="relative z-10 flex h-full flex-col justify-center">
              <h2 className="text-3xl font-semibold tracking-tight">
                You are one
                <br />
                commitment away
              </h2>
            </div>
          </Card>

          <Card className="border-none p-6 shadow-lg transition-transform hover:scale-[1.01]">
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-semibold tracking-tight">
                  Create commitment
                </h2>
                <p className="text-sm text-muted-foreground">
                  Let us know what you want to commit to.
                </p>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <label
                    htmlFor="commitment-name"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Name your commitment
                  </label>
                  <Input
                    id="commitment-name"
                    placeholder="E.g. 'Going to the Gym'"
                    className="text-base md:text-sm"
                  />
                </div>

                <Button
                  variant="outline"
                  className="w-full justify-between group hover:bg-secondary/50"
                  size="lg"
                >
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-primary" />
                    <span>Frequency</span>
                  </div>
                  <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>

                <Button
                  variant="outline"
                  className="w-full justify-between group hover:bg-secondary/50"
                  size="lg"
                >
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-primary" />
                    <span>Duration</span>
                  </div>
                  <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </div>
            </div>
          </Card>
        </div>

        <div className="mt-8 flex justify-end">
          <Button size="lg" className="group">
            Next
            <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
      </div>
    </div>
  );
};
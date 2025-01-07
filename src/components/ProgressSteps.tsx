import { useNavigate, useLocation } from "react-router-dom";

interface ProgressStep {
  number: string | "✓";
  label: string;
  route: string;
  active: boolean;
  completed: boolean;
}

interface ProgressStepsProps {
  currentStep: 1 | 2 | 3;
}

export const ProgressSteps = ({ currentStep }: ProgressStepsProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const steps: ProgressStep[] = [
    {
      number: currentStep > 1 ? "✓" : "1",
      label: "Create commitment",
      route: "/commitment",
      active: currentStep === 1,
      completed: currentStep > 1,
    },
    {
      number: currentStep > 2 ? "✓" : "2",
      label: "Add stake",
      route: "/stake",
      active: currentStep === 2,
      completed: currentStep > 2,
    },
    {
      number: "3",
      label: "Finish",
      route: "/finish",
      active: currentStep === 3,
      completed: false,
    },
  ];

  const handleStepClick = (step: ProgressStep) => {
    // Allow navigation to previous steps or current step
    if (step.completed || step.active || steps.indexOf(step) < currentStep - 1) {
      navigate(step.route, { 
        state: location.state // Preserve the existing state when navigating
      });
    }
  };

  // Calculate progress percentage based on current step
  const progressPercentage = ((currentStep - 1) / (steps.length - 1)) * 100;

  return (
    <div className="mb-12">
      {/* Progress line container */}
      <div className="relative flex items-center justify-between">
        {/* Background line */}
        <div className="absolute left-1/2 top-4 h-0.5 w-[calc(100%-4rem)] -translate-x-1/2 -translate-y-1/2 bg-muted" />
        
        {/* Active progress line */}
        <div 
          className="absolute left-1/2 top-4 h-0.5 -translate-x-1/2 -translate-y-1/2 bg-primary transition-all duration-300 ease-in-out" 
          style={{ width: `calc(${progressPercentage}% * (100% - 4rem) / 100)` }}
        />

        {/* Steps */}
        <div className="relative z-10 flex w-full items-center justify-between">
          {steps.map((step, index) => (
            <div
              key={index}
              onClick={() => handleStepClick(step)}
              className={`flex flex-col items-center gap-2 ${
                step.completed || step.active || index < currentStep - 1
                  ? "cursor-pointer hover:opacity-80"
                  : "cursor-not-allowed opacity-50"
              }`}
            >
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full transition-colors ${
                  step.active || step.completed
                    ? "bg-primary text-primary-foreground"
                    : "border border-muted bg-background text-muted-foreground"
                }`}
              >
                <span className="text-sm">{step.number}</span>
              </div>
              <span
                className={`text-sm ${
                  step.active || step.completed ? "text-primary font-medium" : "text-muted-foreground"
                }`}
              >
                {step.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
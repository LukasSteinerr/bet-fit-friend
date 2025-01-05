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
      route: "/create-commitment",
      active: currentStep === 1,
      completed: currentStep > 1,
    },
    {
      number: currentStep > 2 ? "✓" : "2",
      label: "Add stake",
      route: "/add-stake",
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
    // Only allow navigation to completed steps or the current step
    if (step.completed || step.active) {
      navigate(step.route);
    }
  };

  return (
    <div className="mb-12 flex items-center justify-between">
      {steps.map((step, index) => (
        <div
          key={index}
          onClick={() => handleStepClick(step)}
          className={`flex items-center gap-2 ${
            step.completed || step.active ? "cursor-pointer" : "cursor-not-allowed opacity-50"
          }`}
        >
          <div
            className={`flex h-8 w-8 items-center justify-center rounded-full ${
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
  );
};
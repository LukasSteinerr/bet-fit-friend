import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export const Hero = () => {
  const navigate = useNavigate();

  return (
    <div className="relative overflow-hidden bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Bet on Your
            <span className="text-primary"> Better Self</span>
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Make a commitment to your health. Set a fitness goal, stake some money,
            and if you succeed, you keep it. If not, it goes to charity.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Button
              className="group"
              onClick={() => navigate("/commitment")}
            >
              Start Your Challenge
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
        </div>
      </div>
      <div className="animate-float absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
        <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-primary to-warning opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" />
      </div>
    </div>
  );
};
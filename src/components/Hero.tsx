import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export const Hero = () => {
  const navigate = useNavigate();

  return (
    <div className="relative overflow-hidden bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-base font-semibold leading-7 text-primary">
              Join 12,000+ fitness enthusiasts
            </p>
            <h1 className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Bet on Your
              <span className="text-primary"> Better Self</span>
            </h1>
            <h2 className="mt-4 text-xl font-semibold text-gray-900">
              Turn your fitness goals into reality with accountability
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Make a commitment to your health. Set a fitness goal, stake some money,
              and if you succeed, you keep it. If not, it goes to charity. Our users report
              89% success rate in achieving their fitness goals.
            </p>
            <div className="mt-10 flex items-center gap-x-6">
              <Button
                className="group"
                onClick={() => navigate("/commitment")}
              >
                Start Your Challenge
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button
                variant="outline"
                onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
              >
                See How It Works
              </Button>
            </div>
          </div>
          <div className="relative">
            <div className="relative rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:rounded-2xl">
              <img
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158"
                alt="Woman looking towards the call to action"
                className="aspect-[3/2] w-full rounded-xl object-cover lg:rounded-2xl"
                width={2432}
                height={1442}
              />
            </div>
            <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
              <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-primary to-warning opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
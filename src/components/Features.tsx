import { CheckCircle, Timer, Heart, Coins } from "lucide-react";

export const Features = () => {
  const features = [
    {
      name: "Set Your Goals",
      description:
        "Choose your workout frequency and duration. We recommend 3 times a week for optimal results.",
      icon: CheckCircle,
    },
    {
      name: "Track Progress",
      description:
        "Log your workouts and watch your progress. We'll keep you accountable every step of the way.",
      icon: Timer,
    },
    {
      name: "Stay Motivated",
      description:
        "Your stake keeps you committed. Succeed and keep your money, or let it go to a good cause.",
      icon: Heart,
    },
    {
      name: "Earn Rewards",
      description:
        "Complete your goals and not only keep your stake but earn additional rewards and badges.",
      icon: Coins,
    },
  ];

  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-primary">
            How It Works
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Everything you need to stay committed
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Our platform makes it easy to set, track, and achieve your fitness
            goals with a proven commitment mechanism.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-4">
            {features.map((feature) => (
              <div key={feature.name} className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                  <feature.icon
                    className="h-5 w-5 flex-none text-primary"
                    aria-hidden="true"
                  />
                  {feature.name}
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p className="flex-auto">{feature.description}</p>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
};
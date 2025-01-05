import { Trophy, Users, DollarSign } from "lucide-react";

export const Stats = () => {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:max-w-none">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Trusted by fitness enthusiasts worldwide
            </h2>
            <p className="mt-4 text-lg leading-8 text-gray-600">
              Join thousands who have successfully transformed their lives
            </p>
          </div>
          <dl className="mt-16 grid grid-cols-1 gap-0.5 overflow-hidden rounded-2xl text-center sm:grid-cols-3">
            {[
              { id: 1, name: "Success Rate", value: "89%", icon: Trophy },
              { id: 2, name: "Active Users", value: "12k+", icon: Users },
              {
                id: 3,
                name: "Money Pledged",
                value: "$2.1M",
                icon: DollarSign,
              },
            ].map((stat) => (
              <div key={stat.id} className="flex flex-col bg-gray-400/5 p-8">
                <dt className="text-sm font-semibold leading-6 text-gray-600">
                  <stat.icon className="mx-auto h-6 w-6 text-primary" />
                  {stat.name}
                </dt>
                <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
};
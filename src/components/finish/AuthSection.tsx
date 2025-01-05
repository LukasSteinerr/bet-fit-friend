import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";

export const AuthSection = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-secondary/20 py-12">
      <div className="container max-w-md">
        <h2 className="mb-8 text-center text-2xl font-semibold tracking-tight">
          Create an account to complete your commitment
        </h2>
        <Auth
          supabaseClient={supabase}
          appearance={{ theme: ThemeSupa }}
          providers={["google"]}
          redirectTo={`${window.location.origin}/finish`}
          onlyThirdPartyProviders
        />
      </div>
    </div>
  );
};
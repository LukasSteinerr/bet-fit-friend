import {
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { ChevronDown, Info, CreditCard } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { loadStripe } from "@stripe/stripe-js";
import { 
  Elements, 
  CardElement,
  useStripe, 
  useElements 
} from "@stripe/react-stripe-js";
import { supabase } from "@/integrations/supabase/client";
import { useState, useEffect } from "react";

// Initialize Stripe with null, we'll set it later
let stripePromise: Promise<any> | null = null;

// Function to get Stripe instance
const getStripe = async () => {
  if (!stripePromise) {
    // Get the public key from our Edge Function
    const { data, error } = await supabase.functions.invoke('get-stripe-key');
    if (error) throw error;
    stripePromise = loadStripe(data.publicKey);
  }
  return stripePromise;
};

interface PaymentSectionProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  paymentVerified: boolean;
  onPaymentVerification: (methodId: string) => void;
}

const PaymentForm = ({ onSuccess }: { onSuccess: (methodId: string) => void }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setProcessing(true);
    setError(null);

    try {
      const { error: stripeError, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: elements.getElement(CardElement)!,
      });

      if (stripeError) {
        throw new Error(stripeError.message);
      }

      if (!paymentMethod) {
        throw new Error('Failed to create payment method');
      }

      // Call our Edge Function to set up the payment method for future use
      const { data, error } = await supabase.functions.invoke('setup-payment', {
        body: { paymentMethodId: paymentMethod.id }
      });

      if (error) throw error;

      onSuccess(paymentMethod.id);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="p-3 border rounded-md">
        <CardElement 
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#424770',
                '::placeholder': {
                  color: '#aab7c4',
                },
              },
              invalid: {
                color: '#9e2146',
              },
            },
          }}
        />
      </div>
      {error && (
        <div className="text-sm text-red-500">{error}</div>
      )}
      <Button 
        type="submit" 
        className="w-full" 
        disabled={!stripe || processing}
      >
        {processing ? 'Processing...' : 'Save Payment Method'}
      </Button>
    </form>
  );
};

export const PaymentSection = ({ 
  open, 
  onOpenChange,
  paymentVerified,
  onPaymentVerification,
}: PaymentSectionProps) => {
  const [paymentDialogOpen, setPaymentDialogOpen] = useState(false);
  const [stripeLoaded, setStripeLoaded] = useState(false);
  const isComplete = paymentVerified;

  useEffect(() => {
    getStripe().then(() => setStripeLoaded(true));
  }, []);

  const handlePaymentSuccess = (methodId: string) => {
    onPaymentVerification(methodId);
    setPaymentDialogOpen(false);
  };

  return (
    <>
      <CollapsibleTrigger className="flex w-full items-center justify-between rounded-lg border bg-card p-4 text-card-foreground">
        <div className="flex items-center gap-2">
          <div className={`h-2 w-2 rounded-full ${isComplete ? 'bg-primary' : 'bg-muted'}`} />
          <span className="font-medium">Payment Method</span>
          {isComplete && (
            <span className="text-sm text-muted-foreground">Card saved</span>
          )}
        </div>
        <ChevronDown className={`h-4 w-4 transition-transform ${open ? 'rotate-180' : ''}`} />
      </CollapsibleTrigger>
      <CollapsibleContent className="space-y-4 p-4">
        <div className="space-y-2">
          <h3 className="font-medium">Add payment details</h3>
          <p className="text-sm text-muted-foreground">
            Your card will only be charged if you fail your commitment.
          </p>
        </div>

        <Dialog open={paymentDialogOpen} onOpenChange={setPaymentDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" className="w-full" size="lg">
              {paymentVerified ? 'Update payment method' : 'Add payment method'}
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Add Payment Method
              </DialogTitle>
            </DialogHeader>
            {stripeLoaded && (
              <Elements stripe={stripePromise}>
                <PaymentForm onSuccess={handlePaymentSuccess} />
              </Elements>
            )}
          </DialogContent>
        </Dialog>

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Info className="h-4 w-4" />
          <p>
            Your card details are securely stored by Stripe and will only be charged 
            if you fail to meet your commitment.
          </p>
        </div>
      </CollapsibleContent>
    </>
  );
};

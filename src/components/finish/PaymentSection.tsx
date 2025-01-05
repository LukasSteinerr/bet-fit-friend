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
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";

interface PaymentSectionProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const PaymentSection = ({ open, onOpenChange }: PaymentSectionProps) => {
  const [paymentDialogOpen, setPaymentDialogOpen] = useState(false);
  const [paymentVerified, setPaymentVerified] = useState(false);

  // Section is complete if payment has been verified
  const isComplete = paymentVerified;

  return (
    <>
      <CollapsibleTrigger className="flex w-full items-center justify-between p-4">
        <div className="flex items-center gap-2">
          <div className={`h-2 w-2 rounded-full ${isComplete || open ? 'bg-primary' : 'bg-muted'}`} />
          <span className="font-medium">Payment Method</span>
        </div>
        <ChevronDown className={`h-4 w-4 transition-transform ${open ? 'rotate-180' : ''}`} />
      </CollapsibleTrigger>
      <CollapsibleContent className="p-4 pt-0">
        <div className="space-y-6">
          <div className="space-y-2">
            <h3 className="font-medium">Verify payment details</h3>
            <p className="text-sm text-muted-foreground">
              This won't charge your card.
            </p>
          </div>
          
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Your card will only get charged, if you fail your commitment.
            </p>
            <p className="text-sm text-muted-foreground">
              After that, your payment details will be permanently deleted.
            </p>
          </div>

          <Dialog open={paymentDialogOpen} onOpenChange={(open) => {
            setPaymentDialogOpen(open);
            if (!open && !paymentVerified) {
              // This would be where you'd verify the payment details were saved
              setPaymentVerified(true);
            }
          }}>
            <DialogTrigger asChild>
              <Button variant="outline" className="w-full" size="lg">
                Verify payment method
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2 text-xl font-semibold">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                    <CreditCard className="h-4 w-4 text-primary" />
                  </div>
                  Card
                </DialogTitle>
              </DialogHeader>
              <div className="mt-4 space-y-6">
                <div>
                  <div className="flex items-center gap-2">
                    <div className="h-5 w-5 rounded-full bg-green-500" />
                    <span className="font-medium">Secure, 1-click checkout with Link</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label htmlFor="cardNumber" className="text-sm text-muted-foreground">
                      Card number
                    </label>
                    <Input 
                      id="cardNumber"
                      placeholder="1234 1234 1234 1234"
                      className="mt-1.5"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="expiry" className="text-sm text-muted-foreground">
                        Expiration date
                      </label>
                      <Input 
                        id="expiry"
                        placeholder="MM / YY"
                        className="mt-1.5"
                      />
                    </div>
                    <div>
                      <label htmlFor="cvc" className="text-sm text-muted-foreground">
                        Security code
                      </label>
                      <Input 
                        id="cvc"
                        placeholder="CVC"
                        className="mt-1.5"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="country" className="text-sm text-muted-foreground">
                      Country
                    </label>
                    <Select>
                      <SelectTrigger className="mt-1.5 w-full">
                        <SelectValue placeholder="Select country" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sweden">Sweden</SelectItem>
                        <SelectItem value="norway">Norway</SelectItem>
                        <SelectItem value="denmark">Denmark</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <p className="text-sm text-muted-foreground">
                    By providing your card information, you allow Commitly to charge your card for future payments in accordance with their terms.
                  </p>

                  <Button className="w-full bg-primary" size="lg">
                    Save
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          <div className="flex items-center gap-2 text-sm text-primary">
            <Info className="h-4 w-4" />
            <button className="hover:underline">
              More details how payment works
            </button>
          </div>
        </div>
      </CollapsibleContent>
    </>
  );
};

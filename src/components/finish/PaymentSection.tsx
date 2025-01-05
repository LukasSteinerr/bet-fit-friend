import {
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { ChevronDown, Info } from "lucide-react";

interface PaymentSectionProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const PaymentSection = ({ open, onOpenChange }: PaymentSectionProps) => {
  return (
    <>
      <CollapsibleTrigger className="flex w-full items-center justify-between p-4">
        <div className="flex items-center gap-2">
          <div className={`h-2 w-2 rounded-full ${open ? 'bg-primary' : 'bg-muted'}`} />
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

          <Button variant="outline" className="w-full" size="lg">
            Verify payment method
          </Button>

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
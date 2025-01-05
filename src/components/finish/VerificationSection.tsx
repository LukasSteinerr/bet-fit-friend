import {
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

interface VerificationSectionProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  verificationMethod: 'sms' | 'whatsapp' | null;
  onVerificationMethodChange: (method: 'sms' | 'whatsapp') => void;
}

export const VerificationSection = ({ 
  open, 
  onOpenChange,
  verificationMethod,
  onVerificationMethodChange,
}: VerificationSectionProps) => {
  // Section is complete if a verification method is selected
  const isComplete = verificationMethod !== null;

  return (
    <>
      <CollapsibleTrigger className="flex w-full items-center justify-between p-4">
        <div className="flex items-center gap-2">
          <div className={`h-2 w-2 rounded-full ${isComplete ? 'bg-primary' : 'bg-muted'}`} />
          <span className="font-medium">Verification</span>
        </div>
        <ChevronDown className={`h-4 w-4 transition-transform ${open ? 'rotate-180' : ''}`} />
      </CollapsibleTrigger>
      <CollapsibleContent className="space-y-4 p-4 pt-0">
        <div className="space-y-2">
          <h3 className="font-medium">Choose your verification</h3>
          <p className="text-sm text-muted-foreground">
            Through this channel you will receive weekly reminders where you'll be asked to verify that you took action.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <Button 
            variant="outline" 
            className={`h-auto justify-start p-4 ${verificationMethod === 'sms' ? 'border-primary' : ''}`}
            onClick={() => onVerificationMethodChange('sms')}
          >
            <div className="text-left">
              <div className="font-medium">Text Message (SMS)</div>
            </div>
          </Button>
          <Button 
            variant="outline" 
            className={`h-auto justify-start p-4 ${verificationMethod === 'whatsapp' ? 'border-primary' : ''}`}
            onClick={() => onVerificationMethodChange('whatsapp')}
          >
            <div className="text-left">
              <div className="font-medium">WhatsApp</div>
            </div>
          </Button>
        </div>
      </CollapsibleContent>
    </>
  );
};
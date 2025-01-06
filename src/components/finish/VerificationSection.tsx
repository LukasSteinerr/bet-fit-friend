import {
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

interface VerificationSectionProps {
  verificationMethod: 'sms' | 'whatsapp' | null;
  onVerificationMethodChange: (method: 'sms' | 'whatsapp') => void;
}

export const VerificationSection = ({
  verificationMethod,
  onVerificationMethodChange,
}: VerificationSectionProps) => {
  const isComplete = verificationMethod !== null;

  return (
    <>
      <CollapsibleTrigger 
        asChild
      >
        <button 
          className="flex w-full items-center justify-between rounded-lg border bg-card p-4 text-card-foreground hover:bg-accent transition-colors"
        >
          <div className="flex items-center gap-2">
            <div className={`h-2 w-2 rounded-full ${isComplete ? 'bg-primary' : 'bg-muted'}`} />
            <span className="font-medium">Verification</span>
            {isComplete && (
              <span className="text-sm text-muted-foreground">
                {verificationMethod === 'whatsapp' ? 'WhatsApp' : 'SMS'}
              </span>
            )}
          </div>
          <ChevronRight className="h-4 w-4 transition-transform duration-200 data-[state=open]:rotate-90" />
        </button>
      </CollapsibleTrigger>
      <CollapsibleContent className="space-y-4 p-4">
        <div className="space-y-2">
          <h3 className="font-medium">Choose verification method</h3>
          <p className="text-sm text-muted-foreground">
            Select how you want to receive verification requests.
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
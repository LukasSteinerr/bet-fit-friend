import { format } from "date-fns";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface ConfirmDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  commitmentData: any;
  stakeData: any;
  contactDetails: {
    firstName: string;
    email: string;
    phone: string;
    countryCode: string;
  };
  verificationMethod: 'sms' | 'whatsapp' | null;
  onConfirm: () => void;
}

export const ConfirmDialog = ({
  open,
  onOpenChange,
  commitmentData,
  stakeData,
  contactDetails,
  verificationMethod,
  onConfirm,
}: ConfirmDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Confirm your commitment</DialogTitle>
          <DialogDescription>
            Please review your commitment details before finalizing.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <h4 className="font-medium">Commitment</h4>
            <p className="text-sm text-muted-foreground">
              {commitmentData.name}
            </p>
            <p className="text-sm text-muted-foreground">
              {commitmentData.frequency} until {format(new Date(commitmentData.end_date), 'PPP')}
            </p>
          </div>
          <div className="space-y-2">
            <h4 className="font-medium">Stake</h4>
            <p className="text-sm text-muted-foreground">
              ${stakeData.amount} to {stakeData.charity}
            </p>
          </div>
          <div className="space-y-2">
            <h4 className="font-medium">Contact</h4>
            <p className="text-sm text-muted-foreground">
              {contactDetails.firstName} • {contactDetails.email}
            </p>
            <p className="text-sm text-muted-foreground">
              {contactDetails.countryCode} {contactDetails.phone}
            </p>
          </div>
          <div className="space-y-2">
            <h4 className="font-medium">Verification</h4>
            <p className="text-sm text-muted-foreground">
              Via {verificationMethod === 'whatsapp' ? 'WhatsApp' : 'SMS'}
            </p>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={onConfirm}>
            Confirm & Create
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";

interface EntityFormModalProps {
  title: string;
  description: string;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (event: React.FormEvent) => void;
  children: React.ReactNode;
  isLoading: boolean;
}

export function EntityFormModal({
  title,
  description,
  isOpen,
  onOpenChange,
  onSubmit,
  children,
  isLoading
}: EntityFormModalProps) {
  const handleClose = () => {
    if (!isLoading) {
      onOpenChange(false);
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit(event);
  };

  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      slotProps={{
        paper: {
          component: 'form',
          onSubmit: handleSubmit,
        }
      }}
      sx={{
      }}
    >
      <DialogTitle sx={{ mb: -2 }} >{title}</DialogTitle>
      <DialogContent>
        <DialogContentText sx={{ mb: 2 }}>
          {description}
        </DialogContentText>
        <Stack spacing={2} sx={{ py: 2 }}>
          {children}
        </Stack>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button
          onClick={handleClose}
          disabled={isLoading}
          variant="outlined"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={isLoading}
          variant="contained"
        >
          {isLoading ? "Saving..." : "Save Changes"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
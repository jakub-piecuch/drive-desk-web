"use client";

import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Stack from "@mui/material/Stack";
import { useIsMobile } from "@/hooks/useBreakpoints";

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
  const isMobile = useIsMobile();

  const handleClose = () => {
    if (!isLoading) {
      onOpenChange(false);
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit(event);
  };

  const formContent = (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}
    >
      {isMobile && (
        <Box sx={{ display: 'flex', justifyContent: 'center', pt: 1.5, pb: 0.5, flexShrink: 0 }}>
          <Box sx={{ width: 40, height: 4, borderRadius: 2, bgcolor: 'divider' }} />
        </Box>
      )}

      <DialogTitle sx={{ mb: -2, flexShrink: 0 }}>{title}</DialogTitle>

      <DialogContent dividers sx={{ flex: 1, overflowY: 'auto' }}>
        <DialogContentText sx={{ mb: 2 }}>
          {description}
        </DialogContentText>
        <Stack spacing={2} sx={{ py: 2 }}>
          {children}
        </Stack>
      </DialogContent>

      {isMobile ? (
        <Stack
          spacing={1}
          sx={{ px: 3, pb: 3, pt: 2, flexShrink: 0 }}
        >
          <Button type="submit" disabled={isLoading} variant="contained" fullWidth>
            {isLoading ? "Saving..." : "Save Changes"}
          </Button>
          <Button onClick={handleClose} disabled={isLoading} variant="outlined" fullWidth>
            Cancel
          </Button>
        </Stack>
      ) : (
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={handleClose} disabled={isLoading} variant="outlined">
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading} variant="contained">
            {isLoading ? "Saving..." : "Save Changes"}
          </Button>
        </DialogActions>
      )}
    </Box>
  );

  if (isMobile) {
    return (
      <SwipeableDrawer
        anchor="bottom"
        open={isOpen}
        onClose={handleClose}
        onOpen={() => {}}
        disableSwipeToOpen
        sx={{
          '& .MuiDrawer-paper': {
            height: '90vh',
            borderTopLeftRadius: 16,
            borderTopRightRadius: 16,
            overflow: 'hidden',
          },
        }}
      >
        {formContent}
      </SwipeableDrawer>
    );
  }

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
    >
      <DialogTitle sx={{ mb: -2 }}>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText sx={{ mb: 2 }}>
          {description}
        </DialogContentText>
        <Stack spacing={2} sx={{ py: 2 }}>
          {children}
        </Stack>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={handleClose} disabled={isLoading} variant="outlined">
          Cancel
        </Button>
        <Button type="submit" disabled={isLoading} variant="contained">
          {isLoading ? "Saving..." : "Save Changes"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { CircularProgress } from "@mui/material";

interface IAlertProps {
  titleAlert: string;
  contentAlert: string;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isActiveBtn1?: boolean;
  fcActionBtn1?: () => void;
  fcActionBtn2?: () => void;
}
export default function IAlert({
  titleAlert,
  contentAlert,
  open,
  isActiveBtn1 = false,
  fcActionBtn1,
  fcActionBtn2,
  setOpen,
}: IAlertProps) {
  const handleBtn1 = () => {
    fcActionBtn1 && fcActionBtn1();
  };

  const handleBtn2 = () => {
    if (isActiveBtn1) return;
    setOpen(false);
    fcActionBtn2 && fcActionBtn2();
  };

  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleBtn2}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{titleAlert}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {contentAlert}
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button
            disabled={isActiveBtn1}
            onClick={handleBtn1}
            sx={{
              background: "red",
              color: "#fff",
              ":hover": { background: "#fff", color: "red" },
              "&:hover > .MuiCircularProgress-root": { color: "red" },
              ":focus-within": { background: "#fff", color: "red" },
            }}
          >
            {isActiveBtn1 && (
              <CircularProgress
                size={"1.25rem"}
                sx={{
                  color: "#fff",
                  marginRight: "0.5rem",
                }}
              ></CircularProgress>
            )}
            Delete
          </Button>
          <Button
            disabled={isActiveBtn1}
            onClick={handleBtn2}
            sx={{
              background: "#1976D2",
              color: "#fff",
              ":hover": { background: "#fff", color: "#1976D2" },
            }}
            autoFocus
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

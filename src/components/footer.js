import React, { useState } from "react";
import Button from "@mui/material/Button";
import { FaCog } from "react-icons/fa";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

function Footer() {
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };
  return (
    <footer className="footer">
      {/* <div>
        <Button
          variant="text"
          onClick={handleClickOpen}
          startIcon={<FaCog className="settings-icon" />}
        >
          <span className="text-bold">USTAWIENIA</span>
        </Button>
      </div> */}
      <div className="text-center">
        © 2024 Gajda, Gardian i Spychalski
      </div>
      {/* <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{"Ustawienia"}</DialogTitle>
        <DialogContent>
          <div>Tutaj znajdą się ustawienia...</div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Anuluj</Button>
          <Button onClick={handleClose}>Zapisz</Button>
        </DialogActions>
      </Dialog> */}
    </footer>
  );
}

export default Footer;

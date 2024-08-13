import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "30%",
  bgcolor: "#fffbeb",
  boxShadow: 24,
  p: 4,
};

export default function PopUpModal(props: {
  buttonText: string;
  discardChanges?: any;
  addImages?: any;
  style: object;
}) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const checkIfItsAddOrDiscard: Boolean = props.buttonText === "Add Images";

  const checkIfItsAddOrDiscardAction = () => {
    if (props.buttonText === "Add Images") {
      return props.addImages();
    } else {
      return props.discardChanges();
    }
  };

  return (
    <div>
      <Button
        onClick={() => {
          handleOpen();
        }}
        style={{
          ...props.style,
        }}
        variant="contained"
      >
        {props.buttonText}
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <p>
            Are you Sure you want to{" "}
            {checkIfItsAddOrDiscard ? "save" : "discard"} changes?
          </p>
          <div className="flex justify-end gap-4 mt-5">
            <button
              className="font-bold text-black text-sm"
              onClick={handleClose}
            >
              No
            </button>
            <button
              className="font-bold text-red-600 text-sm"
              onClick={() => {
                checkIfItsAddOrDiscardAction();
                handleClose();
              }}
            >
              Yes
            </button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}

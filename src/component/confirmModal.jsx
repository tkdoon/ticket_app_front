import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { server_url } from "../config";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function BasicModal(props) {
  const usingTicket = async () => {
    await fetch(server_url + "/ticket/use", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ticketId: props.ticketId }),
    })
      .then((data) => {
        console.log(data.result);
      })
      .catch((error) => {
        // setError(error.message);
        // setIsLoading(false);
        console.log("error: ", error);
      });
    console.log("useTicket");
    props.handleTicketList();
    return;
  };
  return (
    <div>
      <Modal
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            本当に使いますか？
          </Typography>
          <Button
            onClick={() => {
              usingTicket();
              props.handleClose();
            }}
          >
            使う
          </Button>
          <Button onClick={props.handleClose}>キャンセル</Button>
        </Box>
      </Modal>
    </div>
  );
}

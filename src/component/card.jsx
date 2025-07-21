import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import bgImage from "../assets/panda.png";
import { useState } from "react";
import BasicModal from "./confirmModal";
import Box from "@mui/material/Box";

const backgroundStyle = {
  backgroundImage: `url(${bgImage})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  opacity: 0.1,
  zIndex: 0,
  borderRadius: 1,
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
};

export default function BasicCard(props) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  console.log(props);
  return (
    <div>
      <Box sx={{ position: "relative", minWidth: 275, maxWidth: 300 }}>
        <Card
          sx={{
            minWidth: 275,
            maxWidth: 300,
          }}
        >
          <Box style={backgroundStyle} />
          <CardContent sx={{ zIndex: 1, position: "relative" }}>
            <Typography
              gutterBottom
              sx={{ color: "text.secondary", fontSize: 14 }}
            >
              {props.expiringDate}
            </Typography>
            <Typography variant="h5" component="div">
              {props.title}
            </Typography>
            <Typography sx={{ color: "text.secondary", mb: 1.5 }}>
              {props.description}
            </Typography>
            <Typography variant="body2">{props.expiringDate}</Typography>
          </CardContent>
          <CardActions sx={{ zIndex: 1, position: "relative" }}>
            <Button
              size="small"
              onClick={() => {
                handleOpen();
              }}
            >
              使う
            </Button>
          </CardActions>
        </Card>

        <BasicModal
          handleOpen={handleOpen}
          handleClose={handleClose}
          open={open}
          handleTicketList={props.handleTicketList}
          ticketId={props.ticketId}
        />
      </Box>
    </div>
  );
}

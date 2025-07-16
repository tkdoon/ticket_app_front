import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import fetchTicketList from "../App";

const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);

export default function BasicCard(props) {
  const usingTicket = async () => {
    await fetch("http://localhost:8080/ticket/use", {
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

  console.log(props);
  return (
    <Card sx={{ minWidth: 275, maxWidth: 300 }}>
      <CardContent>
        <Typography gutterBottom sx={{ color: "text.secondary", fontSize: 14 }}>
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
      <CardActions>
        <Button size="small" onClick={() => usingTicket()}>
          使う
        </Button>
      </CardActions>
    </Card>
  );
}

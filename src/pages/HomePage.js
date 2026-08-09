import { useEffect } from "react";
import BasicCard from "../component/card";
import { server_url } from "../config";
import Button from "@mui/material/Button";

export default function HomePage({ ticketList, isLoggedIn, handleTicketList }) {
  useEffect(() => {
    handleTicketList();
  }, [handleTicketList]);

  return (
    <div className="App">
      {ticketList.map((ticket, i) => (
        <BasicCard
          key={i}
          title={ticket.title}
          expiringDate={ticket.expiringDate}
          description={ticket.description}
          ticketId={ticket.ticketId}
          handleTicketList={handleTicketList}
        />
      ))}
      {!isLoggedIn && (
        <Button
          variant="contained"
          href={`${server_url}/auth/login/google`}
          sx={{ mt: 2, textTransform: "none" }}
        >
          Google でログイン
        </Button>
      )}
    </div>
  );
}

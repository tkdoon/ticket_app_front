import { useEffect, useState } from "react";
import "./App.css";
import BasicCard from "./component/card";
import fetchTicketList from "./module/fetchTicketList";

function App() {
  const [ticketList, setTicketList] = useState([]);
  useEffect(() => {
    fetchTicketList(setTicketList);
  }, []);

  const handleTicketList = () => {
    fetchTicketList(setTicketList);
  };
  // const ticketList = [
  //   { title: "xxxxxxxxxx", header: "yyyyyyyyyyy", description: "zzzzzzzzzzz" },
  //   { title: "xxxxxxxxxx", header: "yyyyyyyyyyy", description: "zzzzzzzzzzz" },
  // ]; //temp

  return (
    <div className="App">
      {ticketList.map((ticket, i) => {
        {
          console.log(ticket.ticketId);
        }
        return (
          <BasicCard
            key={i}
            title={ticket.title}
            expiringDate={ticket.expiringDate}
            description={ticket.description}
            ticketId={ticket.ticketId}
            handleTicketList={handleTicketList}
          />
        );
      })}
    </div>
  );
}

export default App;

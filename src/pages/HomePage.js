import { useEffect, useState } from "react";
import BasicCard from "../component/card";
import { server_url } from "../config";
import Button from "@mui/material/Button";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

export default function HomePage({ ticketList, sentTicketList, isLoggedIn, handleTicketList }) {
  const [tabValue, setTabValue] = useState(0);
  const [receivedFilter, setReceivedFilter] = useState("all");
  const [sentFilter, setSentFilter] = useState("all");

  useEffect(() => {
    handleTicketList();
  }, [handleTicketList]);

  const filteredReceivedList = ticketList.filter((ticket) => {
    if (receivedFilter === "unused") return !ticket.isUsed;
    if (receivedFilter === "used") return ticket.isUsed;
    return true;
  });

  const filteredSentList = sentTicketList.filter((ticket) => {
    if (sentFilter === "unused") return !ticket.isUsed;
    if (sentFilter === "used") return ticket.isUsed;
    return true;
  });

  return (
    <div className="App">
      {!isLoggedIn && (
        <Button
          variant="contained"
          href={`${server_url}/auth/login/google`}
          sx={{ mt: 2, textTransform: "none" }}
        >
          Google でログイン
        </Button>
      )}
      {isLoggedIn && (
        <Box>
          <Tabs value={tabValue} onChange={(_, v) => setTabValue(v)}>
            <Tab label="もらったチケット" />
            <Tab label="贈ったチケット" />
          </Tabs>
          {tabValue === 0 && (
            <Box>
              <ToggleButtonGroup
                value={receivedFilter}
                exclusive
                onChange={(_, v) => { if (v !== null) setReceivedFilter(v); }}
                size="small"
                sx={{ my: 1 }}
              >
                <ToggleButton value="all">すべて</ToggleButton>
                <ToggleButton value="unused">未使用</ToggleButton>
                <ToggleButton value="used">使用済み</ToggleButton>
              </ToggleButtonGroup>
              {filteredReceivedList.map((ticket) => (
                <BasicCard
                  key={ticket.ticketId}
                  title={ticket.title}
                  expiringDate={ticket.expiringDate}
                  description={ticket.description}
                  ticketId={ticket.ticketId}
                  fromUser={ticket.creatorName}
                  isUsed={ticket.isUsed}
                  readOnly={ticket.isUsed}
                  handleTicketList={handleTicketList}
                />
              ))}
            </Box>
          )}
          {tabValue === 1 && (
            <Box>
              <ToggleButtonGroup
                value={sentFilter}
                exclusive
                onChange={(_, v) => { if (v !== null) setSentFilter(v); }}
                size="small"
                sx={{ my: 1 }}
              >
                <ToggleButton value="all">すべて</ToggleButton>
                <ToggleButton value="unused">未使用</ToggleButton>
                <ToggleButton value="used">使用済み</ToggleButton>
              </ToggleButtonGroup>
              {filteredSentList.map((ticket) => (
                <BasicCard
                  key={ticket.ticketId}
                  title={ticket.title}
                  expiringDate={ticket.expiringDate}
                  description={ticket.description}
                  ticketId={ticket.ticketId}
                  toUser={ticket.ownerName}
                  isUsed={ticket.isUsed}
                  readOnly
                  handleTicketList={handleTicketList}
                />
              ))}
            </Box>
          )}
        </Box>
      )}
    </div>
  );
}

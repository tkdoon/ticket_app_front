import apiFetch from "./apiFetch";

const fetchTicketList = async (setReceivedTicketList, setSentTicketList) => {
  try {
    const response = await apiFetch("/ticket/check");
    const data = await response.json();
    setReceivedTicketList(data.receivedTicketList);
    setSentTicketList(data.sentTicketList);
    return true;
  } catch (error) {
    console.log("error", error);
    setReceivedTicketList([]);
    setSentTicketList([]);
    return false;
  }
};

export default fetchTicketList;

import apiFetch from "./apiFetch";

const fetchTicketList = async (setTicketList) => {
  try {
    const response = await apiFetch("/ticket/check");
    const data = await response.json();
    setTicketList(data.ticketList);
    return true;
  } catch (error) {
    console.log("error", error);
    setTicketList([]);
    return false;
  }
};

export default fetchTicketList;

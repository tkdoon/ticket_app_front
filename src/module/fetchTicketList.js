const fetchTicketList = async (setTicketList) => {
  await fetch("http://localhost:8080/ticket/check")
    .then((response) => {
      if (!response.ok) {
        throw new Error("ネットワークエラーが発生しました");
      }
      return response.json();
    })
    .then((data) => {
      setTicketList(data.ticketList);
    })
    .catch((error) => {
      console.log("error", error);
    });
};

export default fetchTicketList;

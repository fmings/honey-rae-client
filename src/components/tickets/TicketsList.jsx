import { useEffect, useState } from "react";
import { Button, Table } from "reactstrap";
import { completeServiceTicket, deleteServiceTicket, getServiceTickets } from "../../data/serviceTicketsData";
import { Link } from "react-router-dom";

export default function TicketsList() {
  const [tickets, setTickets] = useState([]);

  const deleteThisServiceTicket = (id) => {
    if(window.confirm('Are you sure you want to delete this ticket?')) {
      deleteServiceTicket(id).then(() => { 
        setTickets(prevTickets => {
          return prevTickets.filter(ticket => ticket.id !==id);
    });
    })
  }
};

const completeThisServiceTicket = (id) => {
  completeServiceTicket(id)
  .then(() => getServiceTickets())
  .then(data => setTickets(data))
}

  const getAllServiceTickets = () => {
    getServiceTickets().then(setTickets)
  };

  useEffect(() => {
    getAllServiceTickets();
  }, []);

  return (
    <Table>
      <thead>
        <tr>
          <th>Id</th>
          <th>Description</th>
          <th>Emergency?</th>
          <th>Date Completed</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {tickets.map((t) => (
          <tr key={`ticket-${t.id}`}>
            <th scope="row">{t.id}</th>
            <td>{t.description}</td>
            <td>{t.emergency ? "yes" : "no"}</td>
            <td>{t.dateCompleted?.split("T")[0] || "Incomplete"}</td>
            <td>
              <Link to={`${t.id}`}>Details</Link>
            </td>
            <td>
            <Button className="button" variant="danger" onClick={() => deleteThisServiceTicket(t.id)}>Delete</Button>
            </td>
            <td>
              {t.dateCompleted !== null && t.employeeId ? '' : <Button className="button" variant="danger" onClick={() => completeThisServiceTicket(t.id)}>Complete</Button> }
            </td>
          </tr>
        ))}
        
      </tbody>
    </Table>
  );
}

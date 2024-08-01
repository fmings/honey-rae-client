import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { getEmployees } from "../../data/employeeInformationData";
import { assignServiceTicket, getServiceTicket } from "../../data/serviceTicketsData";

const initialState = {
  // customerId: '',
  employeeId: '',
  // description: '',
  // emergency: false,
  // dateCompleted: null
  };
  
  export default function AssignEmployee() {
    const [formInput, setFormInput] = useState(initialState);
    const [employees, setEmployees] = useState([]);
    const navigate = useNavigate();
    const { id: serviceTicketId } = useParams();

    const [ticket, setTicket] = useState(null);

  //add useEffect here to get the ticket details from the API
    useEffect(() => {
      getServiceTicket(serviceTicketId).then(setTicket);
    }, [serviceTicketId])
  
    useEffect(() => {
      getEmployees().then(setEmployees);
    }, [])
  
    const handleChange = (e) => {
      setFormInput({ ...formInput, employeeId: e.target.value });
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      const payload = {
        id: parseInt(serviceTicketId),
        employeeId: formInput.employeeId,
        customerId: ticket.customerId,
        description: ticket.description,
        emergency: ticket.emergency,
        dateComplete: ticket.dateCompleted
      }
      console.warn(serviceTicketId, payload);
      assignServiceTicket(serviceTicketId, payload).then(() => {
        navigate(`/tickets/${serviceTicketId}`);
      })
    }
    return (
    <><h3>Assign an Employee</h3>
    <Form onSubmit={handleSubmit}>
      {employees.map((employee) => (
          <div key={`employee-id-${employee.id}`} className="mb-3">
            <Form.Check // prettier-ignore
              type="radio"
              id={employee.id}
              label={employee.name}
              value={employee.id}
              onChange={handleChange}
              checked={formInput.employeeId === employee.id.toString()}
            />
          </div>
        ))}
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form></>
    );
  }

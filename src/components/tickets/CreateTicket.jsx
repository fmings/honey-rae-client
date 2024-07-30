import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { getEmployees } from '../../data/employeeInformationData';
import { getCustomers } from '../../data/customerInformationData';
import { createServiceTicket } from '../../data/serviceTicketsData';
import { useNavigate } from 'react-router-dom';

const initialState = {
customerId: '',
employeeId: '',
description: '',
emergency: false,
dateCompleted: null
};

export default function CreateTicket() {
  const [formInput, setFormInput] = useState(initialState);
  const [customers, setCustomers] = useState([]);
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getCustomers().then(setCustomers);
    getEmployees().then(setEmployees);
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = { ...formInput };
    console.warn(payload);
    createServiceTicket(payload).then(() => {
      navigate('/tickets');
    })
  }
  return (
  <><h3>Submit a Ticket</h3>
  <Form onSubmit={handleSubmit}>
  <Form.Select 
    aria-label="Customer Selector"
    name="customerId"
    onChange={handleChange}
    value={formInput.customerId}
    required
    >
      <option value="">Select Customer Name</option>
      {
        customers.map((customer) => (
          <option key={customer.id} value={customer.id}>{customer.name}</option>
        ))
      }
    </Form.Select>
    <Form.Group className="mb-3" controlId="issueDescription">
        <Form.Label>Issue Description</Form.Label>
        <Form.Control 
          as="textarea" 
          rows={3}
          placeholder="Write the issue description here"
          name="description"
          value={formInput.description}
          onChange={handleChange}
          required />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check 
        type="checkbox"
        id="emergency"
        name="emergency" 
        label="Is this an emergency?" 
        checked={formInput.emergency}
        onChange={(e) => {
          setFormInput((prevState) => ({
            ...prevState,
            emergency: e.target.checked,
          }));
        }}
        />
        <Form.Select 
          aria-label="Employee Selector"
          name="employeeId"
          onChange={handleChange}
          value={formInput.employeeId}
          >
      <option value="">Select Employee</option>
      {
        employees.map((employee) => (
          <option key={employee.id} value={employee.id}>
            {employee.name}
          </option>
        ))
      }
    </Form.Select>
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form></>
  );
}

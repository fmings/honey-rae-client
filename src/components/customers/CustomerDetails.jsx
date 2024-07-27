import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Table } from "reactstrap";
import { getCustomer } from "../../data/customerInformationData";

export default function CustomerDetails() {
  const { id } = useParams();

  const [customer, setCustomer] = useState(null);

  //add useEffect here to get the ticket details from the API
  useEffect(() => {
    console.warn(id);
    getCustomer(id).then(setCustomer);
  }, [id])

  if (!customer) {
    return null;
  }

  return (
    <Table>
      <tbody>
        <tr>
          <th scope="row">Customer</th>
          <td>{customer.name}</td>
        </tr>
        <tr>
          <th scope="row">Description</th>
          <td>{customer.address}</td>
        </tr>
      </tbody>
    </Table>
  );
}

import React, { useState } from "react";

const CustomerTable = ({ customers, transactions, onCustomerSelect }) => {
  const [filter, setFilter] = useState({ name: "", amount: "" });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter({ ...filter, [name]: value });
  };

  const filteredCustomers = customers.filter((customer) =>
    customer.name.toLowerCase().includes(filter.name.toLowerCase())
  );

  const filteredTransactions = transactions.filter((transaction) =>
    transaction.amount.toString().includes(filter.amount)
  );

  return (
    <>
      <div className="row mb-3">
        <div className="col">
          <input
            className="form-control"
            placeholder="Filter by name"
            name="name"
            value={filter.name}
            onChange={handleFilterChange}
          />
        </div>
        <div className="col">
          <input
            className="form-control"
            placeholder="Filter by amount"
            name="amount"
            value={filter.amount}
            onChange={handleFilterChange}
          />
        </div>
      </div>
      <table className="table table-striped table-bordered table-hover">
        <thead>
          <tr>
            <th>Customer Name</th>
            <th>Transaction Date</th>
            <th>Transaction Amount</th>
          </tr>
        </thead>
        <tbody>
          {filteredCustomers.map((customer) => (
            <React.Fragment key={customer.id}>
              <tr
                onClick={() => onCustomerSelect(customer)}
                style={{ cursor: "pointer" }}
              >
                <td>{customer.name}</td>
                <td colSpan="2"></td>
              </tr>
              {filteredTransactions
                .filter((t) => t.customer_id === customer.id)
                .map((transaction) => (
                  <tr key={transaction.id}>
                    <td></td>
                    <td>{transaction.date}</td>
                    <td>{transaction.amount}</td>
                  </tr>
                ))}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default CustomerTable;

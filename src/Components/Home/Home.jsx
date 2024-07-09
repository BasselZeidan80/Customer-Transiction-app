import React, { useEffect, useState } from "react";
import axios from "axios";
import CustomerTable from "../CustomerTable/CustomerTable";
import TransactionGraph from "../TransactionGraph/TransactionGraph";

export default function Home() {
  const [customers, setCustomers] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  useEffect(() => {
    const getDataFromJson = async () => {
      const customersRes = await axios.get("http://localhost:3001/customers");
      const transactionsRes = await axios.get(
        "http://localhost:3001/transactions"
      );
      setCustomers(customersRes.data);
      setTransactions(transactionsRes.data);
    };
    getDataFromJson();
  }, []);

  return (
    <div className="container">
      <h1 className="text-center my-4">Customer Transactions</h1>
      <div className="row">
        <div className="col-md-8">
          <CustomerTable
            customers={customers}
            transactions={transactions}
            onCustomerSelect={setSelectedCustomer}
          />
        </div>
        <div className="col-md-4">
          {selectedCustomer && (
            <TransactionGraph
              customer={selectedCustomer}
              transactions={transactions.filter(
                (t) => t.customer_id === selectedCustomer.id
              )}
            />
          )}
        </div>
      </div>
    </div>
  );
}

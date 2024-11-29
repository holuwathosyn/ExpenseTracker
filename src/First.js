import React, { useEffect, useState } from "react";


 function FinanceTracker() {
  const [items, setItems] = useState(()=>{
    const savedItems=localStorage.getItem("Itemslist");
    return  savedItems ? JSON.parse(savedItems):[]
  }
  )
  useEffect(()=>{
    localStorage.setItem("Itemslist",JSON.stringify(items))
  },[items])

  function onAddItems(item) {
    setItems([...items, item]);
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <Balance items={items} />
      <FieldsInput onAddItems={onAddItems} />
      <Transactions items={items} />
      <FirstList items={items} />
    </div>
  );
}

function Balance({ items }) {
  const deposit = items
    .filter((t) => t.select === "deposit")
    .reduce((sum, t) => sum + parseFloat(t.Amount || 0), 0);
  const withdrawal = items
    .filter((t) => t.select === "withdrawal")
    .reduce((sum, t) => sum + parseFloat(t.Amount || 0), 0);

  const netBalance = deposit - withdrawal;

  return (
    <div className="flex flex-col items-center justify-center m-8 space-y-8">
      <div className="bg-gradient-to-r from-orange-500 via-orange-600 to-orange-700 text-white p-8 w-full max-w-md rounded-2xl shadow-lg transform hover:scale-105 transition-transform duration-300">
        <p className="text-center font-bold text-white text-2xl  font-sans">Balance</p>
        <h1 className="text-center text-5xl font-extrabold mt-4 tracking-wide">
          ₦{netBalance}
        </h1>
      </div>

      <div className="grid grid-cols-2 gap-6 w-full max-w-lg">
        <div className="bg-gradient-to-r from-green-400 to-green-600 text-white p-6 rounded-2xl shadow-md transform hover:scale-105 transition-transform duration-300">
          <p className="text-center text-lg font-semibold font-sans">Deposits</p>
          <h1 className="text-center text-2xl font-bold mt-2">
            ₦{deposit}
          </h1>
        </div>
        <div className="bg-gradient-to-r from-red-400 to-red-600 text-white p-6 rounded-2xl shadow-md transform hover:scale-105 transition-transform duration-300">
          <p className="text-center text-lg font-semibold font-sans">Withdrawal</p>
          <h1 className="text-center text-2xl font-bold mt-2">
            ₦{withdrawal}
          </h1>
        </div>
      </div>
    </div>
  );
}

function FieldsInput({ onAddItems }) {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [select, setSelect] = useState("");
  const [error, setError] = useState("");

  function onSubmit(e) {
    e.preventDefault();
    if (!description || !amount || !select) {
      setError("Please fill out all fields");
      return;
    }
    if (parseFloat(amount) <= 0) {
      setError("Amount must be greater than zero");
      return;
    }
    const itemList = {
  id: Date.now(),
  Description: description,
  Amount: parseFloat(amount),
  select: select,
  Date: new Date().toDateString(), 
};

    onAddItems(itemList);
    setDescription("");
    setAmount("");
    setSelect("");
    setError("");
  }

  return (
    <div className="flex justify-center items-center mt-10">
      <div className="w-full max-w-lg bg-white p-6 rounded-2xl shadow-xl">
        <h1 className="text-center text-2xl font-bold text-gray-700 mb-6">
          Add Transaction
        </h1>
        <form onSubmit={onSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="focus:outline-none focus:ring-2 focus:ring-blue-500 p-4 w-full rounded-xl border border-gray-300"
          />
          <input
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="focus:outline-none focus:ring-2 focus:ring-blue-500 p-4 w-full rounded-xl border border-gray-300"
          />
          <select
            value={select}
            onChange={(e) => setSelect(e.target.value)}
            className="focus:outline-none focus:ring-2 focus:ring-blue-500 p-4 w-full rounded-xl border border-gray-300"
          >
            <option value="" disabled>
              Select type
            </option>
            <option value="deposit">Deposit</option>
            <option value="withdrawal">Withdrawal</option>
          </select>
          <p className="text-red-500 text-sm">{error}</p>
          <button
            type="submit"
            className="w-full bg-green-500 text-white rounded-xl p-4 font-semibold hover:bg-orange-600 transition duration-300"
          >
            Add Transaction
          </button>
        </form>
      </div>
    </div>
  );
}

function Transactions({ items }) {
  return (
    <div className="m-20">
      <h1 className="text-center text-gray-400">
        {items.length === 0
          ? "No transactions available"
          : "Transaction History"}
      </h1>
    </div>
  );
}

function FirstList({ items }) {
  return (
    <div className="overflow-x-auto mt-6 bg-white shadow-lg rounded-lg" style={{cursor:"pointer"}}>
      <table className="w-full text-left table-auto border-collapse">
        <thead>
          <tr className="bg-orange-500 text-white">
            <th className="px-6 py-4 text-sm font-semibold">Description</th>
            <th className="px-6 py-4 text-sm font-semibold">Amount</th>
            <th className="px-6 py-4 text-sm font-semibold">Type</th>
            <th className="px-6 py-4 text-sm font-semibold">Date</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr
              key={item.id}
              className={`transition-all duration-200  ${
                item.select === "deposit"
                  ? "hover:bg-green-50"
                  : "hover:bg-red-50" 
              }`}
            >
              <td className="px-6 py-4 text-gray-800 font-medium">
                {item.Description}
              </td>
              <td className="px-6 py-4 text-gray-800 font-semibold">
                ₦{item.Amount.toFixed(2)}
              </td>
              <td
                className={`px-6 py-4 font-semibold ${
                  item.select === `deposit`? "text-green-600" : "text-red-600"
                }`}
              >
                {item.select}
              </td>
              <td className="px-6 py-4 text-gray-500">{item.Date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
} 
export default FinanceTracker

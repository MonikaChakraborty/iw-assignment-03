import { useState } from "react";
import { formatMoney } from "../utils/format-money";
import { useEntries } from "../hooks/useEntries";

const IncomeList = () => {
  const { entries, setEntries } = useEntries();
  const incomeEntries = entries.filter((entry) => entry.type === "income");

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [editedValue, setEditedValue] = useState("");

  const openEditModal = (id, value) => {
    setSelectedItemId(id);
    setEditedValue(value.toString());
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setEditedValue("");
    setSelectedItemId(null);
  };

  const handleEdit = () => {
    if (!isNaN(parseFloat(editedValue))) {
      const editedEntries = entries.map((entry) =>
        entry.id === selectedItemId
          ? { ...entry, value: parseFloat(editedValue) }
          : entry
      );
      setEntries(editedEntries);
      closeEditModal();
    }
  };

  const handleDelete = (id) => {
    const isConfirmed = window.confirm("Do you want to delete this entry?");

    if (isConfirmed) {
      const editedEntries = entries.filter((entry) => entry.id !== id);
      setEntries(editedEntries);
    }
  };

  return (
    <div>
      <h2 className="border-b pb-2 font-medium text-green-600">Income</h2>
      {incomeEntries.length === 0 && (
        <p className="py-2.5 text-gray-600">There are no expenses.</p>
      )}

      <ul id="income-list" className="divide-y">
        {incomeEntries.map((income) => {
          return (
            <li key={income.id} className="py-2.5">
              <div className="group flex justify-between gap-2 text-sm">
                <span>{income.title}</span>

                <div>
                  <span className="text-green-600">
                    +{formatMoney(income.value)}
                  </span>
                  <span
                    className="ml-2 cursor-pointer font-medium hidden text-orange-500 group-hover:inline-block"
                    onClick={() => openEditModal(income.id, income.value)}
                  >
                    Edit
                  </span>
                  <span
                    className="ml-2 cursor-pointer font-medium hidden text-red-500 group-hover:inline-block"
                    onClick={() => handleDelete(income.id)}
                  >
                    Delete
                  </span>
                </div>
              </div>
            </li>
          );
        })}
      </ul>

      {/* Edit Modal */}

      {isEditModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-5 rounded shadow-lg">
            <h2 className="text-lg font-medium mb-3">Edit Value</h2>
            <input
              type="number"
              value={editedValue}
              onChange={(e) => setEditedValue(e.target.value)}
              className="w-full py-1.5 px-3 border rounded mb-3"
              placeholder="Enter new value"
            />
            <div className="flex justify-end">
              <button
                className="bg-blue-500 text-white px-4 py-1.5 rounded mr-2"
                onClick={handleEdit}
              >
                Update
              </button>
              <button
                className="bg-gray-500 text-white px-4 py-1.5 rounded"
                onClick={closeEditModal}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default IncomeList;

// import { formatMoney } from "../utils/format-money";
// import { useEntries } from "../hooks/useEntries";

// const IncomeList = () => {
//   const { entries, setEntries } = useEntries();
//   const incomeEntries = entries.filter((entry) => entry.type === "income");

//   const handleEdit = (id) => {
//     const currentValue = incomeEntries.find((entry) => entry.id === id).value;
//     const newValue = prompt("Update a the value:", currentValue);

//     if (!isNaN(parseFloat(newValue))) {
//       const newEntries = entries.map((entry) =>
//         entry.id === id ? { ...entry, value: parseFloat(newValue) } : entry
//       );
//       setEntries(newEntries);
//     }
//   };

//   const handleDelete = (id) => {
//     const isConfirmed = window.confirm("Do you want to delete this entry?");

//     if (isConfirmed) {
//       const newEntries = entries.filter((entry) => entry.id !== id);
//       setEntries(newEntries);
//     }
//   };
//   return (
//     <div>
//       <h2 className="border-b pb-2 font-medium text-green-600">Income</h2>
//       {incomeEntries.length === 0 && (
//         <p className="py-2.5 text-gray-600">There are no expenses.</p>
//       )}

//       <ul id="income-list" className="divide-y">
//         {incomeEntries.map((income) => {
//           return (
//             <li key={income.id} className="py-2.5">
//               <div className="group flex justify-between gap-2 text-sm">
//                 <span>{income.title}</span>

//                 <div>
//                   <span className="text-green-600">
//                     +{formatMoney(income.value)}
//                   </span>
//                   <span className="ml-2 hidden cursor-pointer font-medium text-orange-500 group-hover:inline-block" onClick={() => handleEdit(income.id)}>
//                     Edit
//                   </span>
//                   <span className="ml-2 hidden cursor-pointer font-medium text-red-500 group-hover:inline-block" onClick={() => handleDelete(income.id)}>
//                     Delete
//                   </span>
//                 </div>
//               </div>
//             </li>
//           );
//         })}
//       </ul>
//     </div>
//   );
// };

// export default IncomeList;

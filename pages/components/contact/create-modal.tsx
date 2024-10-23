import React, { useState } from "react";

type CreateModalProps = {
  onCancel: () => void;
  refreshContacts: () => Promise<void>;
};

const CreateModal: React.FC<CreateModalProps> = ({ onCancel, refreshContacts }) => {
    const [error, setError] = useState("");
    const [newContact, setNewContact] = useState({
        name: "",
        phone: "",
        adress: "",
    });

  // Handle input changes
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewContact({ ...newContact, [name]: value });
    };

  // Handle form submission to create a new contact
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Reset error state sebelum mengirim data
    setError("");

    try {
      const res = await fetch("/api/contacts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newContact), // Sesuaikan "adress" dengan schema
      });

      if (res.ok) {
        await refreshContacts(); // Call refreshContacts to update the list
        onCancel()
      } else {
        const { error } = await res.json();
        throw new Error(error || "Failed to create contact");
      }
    } catch (err) {
        const errorMessage = (err as Error).message || "Something went wrong";
        setError(errorMessage);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg w-1/3 p-5">
        <h3 className="text-lg font-semibold mb-4">Create New Contact</h3>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <div className="mb-4">
          <label className="block text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            value={newContact.name}
            onChange={handleChange}
            className="border p-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Phone Number</label>
          <input
            type="text"
            name="phone"
            value={newContact.phone}
            onChange={handleChange}
            className="border p-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Address</label>
          <input
            type="text"
            name="adress"
            value={newContact.adress}
            onChange={handleChange}
            className="border p-2 w-full"
          />
        </div>
        <div className="flex justify-end space-x-3">
          <button
            onClick={onCancel}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateModal;


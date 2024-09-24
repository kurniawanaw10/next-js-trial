import React, { useState } from "react";

type contactType = {
    id: number;
    name: string;
    phone: string;
    adress: string;
};

type EditModalProps = {
  contact: contactType;
  onSave: (updatedContact: contactType) => void;
  onCancel: () => void;
};

const EditModal: React.FC<EditModalProps> = ({ contact, onSave, onCancel }) => {
  const [editedContact, setEditedContact] = useState(contact);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedContact({ ...editedContact, [name]: value });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg w-1/3 p-5">
        <h3 className="text-lg font-semibold mb-4">Edit Contact</h3>
        <div className="mb-4">
          <label className="block text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            value={editedContact.name}
            onChange={handleChange}
            className="border p-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Phone Number</label>
          <input
            type="text"
            name="phone"
            value={editedContact.phone}
            onChange={handleChange}
            className="border p-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Address</label>
          <input
            type="text"
            name="adress"
            value={editedContact.adress}
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
            onClick={() => onSave(editedContact)}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditModal;

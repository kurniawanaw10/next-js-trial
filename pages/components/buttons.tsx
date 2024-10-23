import { IoAddSharp } from "react-icons/io5";
import { useState } from "react";
import CreateModal from "../components/contact/create-modal"; // Import the CreateModal component

type CreateButtonProps = {
    refreshContacts: () => Promise<void>; // Define the prop type for refreshContacts
};

export const CreateButton: React.FC<CreateButtonProps> = ({ refreshContacts }) => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  // Open the modal
  const openCreateModal = () => {
    setIsCreateModalOpen(true);
  };

  // Close the modal
  const closeCreateModal = () => {
    setIsCreateModalOpen(false);
  };

  return (
    <div>
      <button
        onClick={openCreateModal}
        className="inline-flex items-center space-x-1 text-white bg-blue-700 hover:bg-blue-800 rounded-md px-4 py-[9px]"
      >
        <IoAddSharp size={20} />
        Create
      </button>

      {/* Conditionally render the Create Modal */}
      {isCreateModalOpen && (
        <CreateModal onCancel={closeCreateModal} refreshContacts={refreshContacts} />
      )}
    </div>
  );
};

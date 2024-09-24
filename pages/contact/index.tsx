import { Navbar } from "@/pages/section/header/navbar";
import ConfirmModal from "../components/contact/ConfirmModal";
import EditModal from "../components/contact/edit-modal";
import Search from "../components/search";
import { CreateButton } from "../components/buttons";
import { useEffect, useState } from "react";
import { FaRegTrashCan } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";

type contactType = {
      id: number;
      name: string;
      phone: string;
      adress: string;
  };

const ContactPage = () => {
    const [contacts, setContacts] = useState<contactType[]>([])
    const [contactToDelete, setContactToDelete] = useState<number | null>(null)
    const [contactToEdit, setContactToEdit] = useState<contactType | null>(null) // Store ID of contact to delete
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isEditModalOpen, setIsEditModalOpen] = useState(false)

    useEffect(() => {
       fetch("/api/contacts").then((res) => res.json()).then((response) => setContacts(response.data))
    },[])

    const deleteContact = async (id: number) => {
        if (confirm("Are you sure you want to delete this contact?")) {
          const res = await fetch(`/api/contacts`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ id }), // Kirim ID untuk DELETE
          });
    
          if (res.ok) {
            setContacts(contacts.filter((contact: contactType) => contact.id !== id));
          } else {            
            alert("Failed to delete contact");
          }
        }
      };

    const updateContact = async (updatedContact: contactType) => {
        const res = await fetch(`/api/contacts`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedContact),
        });
    
        if (res.ok) {
          const updatedData = await res.json();
          setContacts(
            contacts.map((contact) =>
              contact.id === updatedData.data.id ? updatedData.data : contact
            )
          );
          setIsEditModalOpen(false); // Close the modal after saving
        } else {
          alert("Failed to update contact");
        }
      };

    const openEditModal = (contact: contactType) => {
    setContactToEdit(contact);
        setIsEditModalOpen(true);
    }

    const closeEditModal = () => {
        setIsEditModalOpen(false);
    }
    const openModal = (id: number) => {
        setContactToDelete(id);
        setIsModalOpen(true); // Open the modal
    }

    const closeModal = () => {
        setIsModalOpen(false); // Close the modal
    }
    
    return (
    <div>
        <Navbar/>
        <div className="max-w-screen-md mx-auto mt-5">
            <div className="flex items-center justify-between gap-1 mb-5">
                <Search/>
                <CreateButton/>
            </div>
            <table className="w-full text-sm text-left text-gray-500">
                <thead className="text-sm text-gray-700 uppercase bg-gray-50">
                    <tr>
                        <th className="py-3 px-6">#</th>
                        <th className="py-3 px-6">Name</th>
                        <th className="py-3 px-6">Phone Number</th>
                        <th className="py-3 px-6">Adress</th>
                        <th className="py-3 px-6 text-center">Actions</th>
                    </tr>
                </thead>
                <tbody>
                {contacts.map((contact: contactType, index) => (
                    <tr key={contact.id} className="bg-white border-b">
                        <td className="py-3 px-6">{index+1}</td>
                        <td className="py-3 px-6">{contact.name}</td>
                        <td className="py-3 px-6">{contact.phone}</td>
                        <td className="py-3 px-6">{contact.adress}</td>
                        <td>
                            <div className="flex items-center justify-center gap-3">
                                <FaEdit className="text-blue-700 cursor-pointer" onClick={() => openEditModal(contact)}/>
                                <FaRegTrashCan className="text-red-700 cursor-pointer" onClick={() => openModal(contact.id)}/> 
                            </div>
                        </td>
                    </tr> 
                ))}
                </tbody>
            </table> 
            {isModalOpen && (
                <ConfirmModal
                message="Are you sure you want to delete this contact?"
                onConfirm={() => contactToDelete !== null && deleteContact(contactToDelete)} // Execute delete on confirm
                onCancel={closeModal} // Close modal on cancel
                />
            )} 
            
            {isEditModalOpen && contactToEdit && (
                <EditModal
                contact={contactToEdit}
                onSave={updateContact}
                onCancel={closeEditModal}
                />
            )}
        </div>
    </div>
    );
};

export default ContactPage;
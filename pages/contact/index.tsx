import { Navbar } from "@/pages/section/header/navbar";
import ContactTable from "../components/contact-table";
import Search from "../components/search";
import { CreateButton } from "../components/buttons";
import { useEffect, useState } from "react";

type contactType = {
      id: number;
      name: string;
      phone: string;
      adress: string;
      createdAt: Date;
  };

const ContactPage = () => {
    const [contacts, setContacts] = useState([])

    useEffect(() => {
       fetch("/api/contacts").then((res) => res.json()).then((response) => setContacts(response.data))
    },[])
    return (
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
                    <td></td>
                </tr> 
             ))}
            </tbody>
        </table>    
    </div>
    );
};

export default ContactPage;
import { useState } from "react";
import { useRouter } from "next/router";
import { Navbar } from "@/pages/section/header/navbar";

const CreateContact = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [adress, setAdress] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  // Fungsi untuk menangani submit form
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
        body: JSON.stringify({ name, phone, adress }), // Sesuaikan "adress" dengan schema
      });

      if (!res.ok) {
        const { error } = await res.json();
        throw new Error(error || "Failed to create contact");
      }

      // Redirect ke halaman lain setelah berhasil
      router.push("/contact");
    } catch (err) {
        const errorMessage = (err as Error).message || "Something went wrong";
        setError(errorMessage);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="max-w-md mx-auto mt-5">
        <h1 className="text-2xl text-center mb-2">Add New Contact</h1>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-5">
            <label htmlFor="name" className="block text-sm font-medium text-gray-900">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Full Name..."
              required
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            />
          </div>

          <div className="mb-5">
            <label htmlFor="phone" className="block text-sm font-medium text-gray-900">
              Phone
            </label>
            <input
              type="text"
              name="phone"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Phone Number..."
              required
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            />
          </div>

          <div className="mb-5">
            <label htmlFor="address" className="block text-sm font-medium text-gray-900">
              Address
            </label>
            <input
              type="text"
              name="address"
              id="address"
              value={adress}
              onChange={(e) => setAdress(e.target.value)}
              placeholder="Address..."
              required
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            />
          </div>

          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateContact;

import React, { useState } from "react";
import axios from "axios";
import { useModal } from "../ui/AnimatedModal";
import { FaArrowRight } from "react-icons/fa6";

const ModalForm = () => {
  const [formData, setFormData] = useState({ name: "", email: "" });
  const [submittedData, setSubmittedData] = useState([]);
  const [error, setError] = useState(null);
  const { setOpen } = useModal();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://paypips.vercel.app/api/submit", formData);
      setSubmittedData([...submittedData, formData]);
      setFormData({ name: "", email: "" });
      setError(null);
      window.location.href = "https://t.me/paypips_adminBot";
      setOpen(false);
    } catch (error) {
      console.error("Error submitting data:", error);
      setError("Failed to submit data. Please try again.");
    }
  };

  return (
    <div className="w-full rounded-xl space-y-4">
      
      <form onSubmit={handleSubmit} className="space-y-16">
        <div className="space-y-2">
          <div>
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="name"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm"
              required
            />
          </div>
          <div>
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="email"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm"
              required
            />
          </div>
        </div>
        {error && <div className="text-red-500">{error}</div>}
        <div className="flex justify-end mt-10">
          <button
            type="submit"
            className="bg-blue-accent px-4 text-sm flex gap-2 items-center text-white p-2 rounded-md shadow-md hover:bg-blue-700"
          >
            Proceed <FaArrowRight />
          </button>
        </div>
      </form>
    </div>
  );
};

export default ModalForm;

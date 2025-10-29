import React, { useEffect } from "react";

const AdminHome = () => {
  const fetchAdminData = async () => {
    try {
      console.log("API URL:", import.meta.env.VITE_API_URL); // debug
      const res = await fetch(`${import.meta.env.VITE_API_URL}/admin`);

      if (!res.ok) {
        throw new Error(`Failed to fetch data: ${res.status}`);
      }

      const data = await res.json();
      console.log("✅ Admin data:", data);
    } catch (error) {
      console.error("❌ Error fetching admin data:", error);
    }
  };

  useEffect(() => {
    fetchAdminData();
  }, []);

  return <div>Admin Home</div>;
};

export default AdminHome;

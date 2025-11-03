import React, { useContext, useEffect } from "react";
import Sidebar from "../AdminComponents/Shared/Sidebar/Sidebar";
import { Outlet, useNavigate } from "react-router";
import { AuthContext } from "../Context/AuthContext";
import { toast } from "react-toastify";

const AdminLayout = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (user && user.isActive === false) {
      toast.warning("Your account has been deactivated.");
      logout(); // Call your existing logout function
      navigate("/login");
    }
  }, [user, logout, navigate]);
  return (
    <div>
      <Sidebar></Sidebar>
    </div>
  );
};

export default AdminLayout;

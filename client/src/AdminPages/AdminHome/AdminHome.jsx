import React, { useContext, useEffect } from "react";
import { AuthContext } from "../../Context/AuthContext";

const AdminHome = () => {
  const {user} = useContext(AuthContext)
  console.log(user)
  return <div>Admin Home</div>;
};

export default AdminHome;

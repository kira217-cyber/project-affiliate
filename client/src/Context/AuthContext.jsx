// context/AuthContext.jsx
import { createContext, useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const { data, refetch } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const userId = localStorage.getItem("userId");
      if (!userId) throw new Error("No user");
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/admin?id=${userId}`);
      return res.data.user;
    },
    enabled: false,
    retry: false,
  });

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      refetch();
    } else {
      setLoading(false);
    }
  }, [refetch]);

  useEffect(() => {
    if (data) {
      setUser(data);
      setLoading(false);
    }
  }, [data]);

  const logout = () => {
    setUser(null);
    localStorage.removeItem("userID");
  };

  if (loading) return <p className="text-white text-center mt-10">Loading...</p>;

  return (
    <AuthContext.Provider value={{ user, setUser, loading,logout }}>
      {children}
    </AuthContext.Provider>
  );
};
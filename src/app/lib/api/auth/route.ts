import axiosInstance from "../../axiosInstance";

// Login API Call
export const login = async (credentials: {
  email: string;
  password: string;
}) => {
  const { data } = await axiosInstance.post("/user/login", credentials);

  if (typeof window !== "undefined") {
    localStorage.setItem("token", data.token); // Store token in localStorage (optional)
  }

  return data;
};
export const register = async (credentials: {
  name: string;
  email: string;
  phone: string;
  password: string;
}) => {
  const { data } = await axiosInstance.post("/user/register", credentials);

  if (typeof window !== "undefined") {
    localStorage.setItem("token", data.token); // Store token in localStorage (optional)
  }

  return data;
};

// Logout API Call
// export const logout = async () => {
//   await axiosInstance.get("/auth/logout");

//   if (typeof window !== "undefined") {
//     localStorage.removeItem("token");
//     window.location.href = "/login";
//   }
// };

// // Fetch Authenticated User
// export const getUser = async () => {
//   const { data } = await axiosInstance.get("/auth/me");
//   return data;
// };

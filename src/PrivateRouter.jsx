import { useNavigate } from "react-router-dom";

const PrivateRouter = ({ children }) => {
  const nav = useNavigate();

  const userId = JSON.parse(localStorage.getItem("userId") || "{}");
  if (!userId || userId !== 1) {
    alert("ban khong co quyen truy cap!");
    setTimeout(() => {
      nav("/signin");
    }, 500);
  }
  return children;
};

export default PrivateRouter;

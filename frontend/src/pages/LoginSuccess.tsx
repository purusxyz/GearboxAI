import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginSuccess() {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (!token) {
      navigate("/login", { replace: true });
      return;
    }

    // Save JWT in localStorage
    localStorage.setItem("token", token);

    // Remove token from URL (security cleanup)
    window.history.replaceState({}, document.title, "/login-success");

    // Redirect to dashboard
    navigate("/dashboard", { replace: true });
  }, [navigate]);

  return (
    <div className="flex items-center justify-center h-screen">
      <p className="text-lg font-medium">Logging you in...</p>
    </div>
  );
}
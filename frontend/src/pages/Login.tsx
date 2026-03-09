import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function LoginPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/dashboard");
    }
  }, []);

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  return (
    <div className="min-h-screen bg-[#f7f7f8]">
      <header className="p-6 text-2xl font-semibold">Chat-GPT</header>

      <div className="max-w-sm mx-auto text-center mt-10 px-6">
        <h1 className="text-3xl font-semibold">Log in or sign up</h1>

        <p className="text-gray-500 mt-4 text-sm leading-6">
          You'll get smarter response and can upload files,
          images, and more.
        </p>

        <div className="mt-8">
          <form
            className="space-y-4"
            onSubmit={(e) => e.preventDefault()}
          >
            <Input placeholder="Email address" />

            <Button className="w-full h-12 text-base">
              Continue
            </Button>
          </form>

          <div className="flex items-center gap-3 my-8">
            <div className="flex-1 h-px bg-gray-300"></div>
            <span className="text-xs font-medium text-gray-600">
              OR
            </span>
            <div className="flex-1 h-px bg-gray-300"></div>
          </div>

          <div className="space-y-4">
            <Button
              variant="secondary"
              onClick={() =>
                window.location.href =
                  `${BACKEND_URL}/auth/google`
              }
              className="w-full h-12 flex items-center justify-start px-6 gap-3"
            >
              <img
                src="/google.svg"
                alt="Google"
                className="w-5 h-5"
              />
              Continue with Google
            </Button>

            <Button
              variant="secondary"
              className="w-full h-12 flex items-center justify-start px-6 gap-3"
            >
              <img
                src="/microsoft.svg"
                alt="Microsoft"
                className="w-5 h-5"
              />
              Continue with Microsoft
            </Button>

            <Button
              variant="secondary"
              className="w-full h-12 flex items-center justify-start px-6 gap-3"
            >
              <img
                src="/apple.svg"
                alt="Apple"
                className="w-5 h-5"
              />
              Continue with Apple
            </Button>

            <Button
              variant="secondary"
              className="w-full h-12 flex items-center justify-start px-6 gap-3"
            >
              <img
                src="/phone.svg"
                alt="Phone"
                className="w-5 h-5"
              />
              Continue with Phone
            </Button>
          </div>

          <div className="mt-12 flex justify-center items-center gap-3 text-sm text-gray-500">
            <Link to="#" className="hover:underline">
              Terms of Service
            </Link>
            <span>|</span>
            <Link to="#" className="hover:underline">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
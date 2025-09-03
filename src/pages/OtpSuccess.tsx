import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const OtpSuccess = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-green-100">
      <div className="bg-white p-6 rounded-lg shadow-md text-center">
        <h1 className="text-2xl font-bold text-green-600 mb-2">OTP Verified Successfully!</h1>
        <p className="text-gray-600 mb-4">
          You can now reset your password or go back to login.
        </p>
        <div className="space-x-4">
          <Button onClick={() => navigate("/login")}>Back to Login</Button>
          <Button variant="violet" onClick={() => navigate("/reset-password")}>
            Reset Password
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OtpSuccess;

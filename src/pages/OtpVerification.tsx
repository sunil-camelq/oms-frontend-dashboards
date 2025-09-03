import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

const OtpVerification = () => {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [timer, setTimer] = useState(60);
  const [isResendDisabled, setIsResendDisabled] = useState(true);
  const navigate = useNavigate();

  // Timer for resend button
  useEffect(() => {
    if (timer > 0) {
      const countdown = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(countdown);
    } else {
      setIsResendDisabled(false);
    }
  }, [timer]);

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp === "123456") {
      navigate("/otp-success");
    } else {
      setError("Invalid OTP. Please try again.");
    }
  };

  const handleResend = () => {
    setOtp("");
    setTimer(60);
    setIsResendDisabled(true);
    setError("");
    alert("OTP resent successfully! (Use 123456)");
  };

  return (
    <div className="min-h-screen flex items-center justify-center 
    bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 
    px-4">
      <div className="w-full max-w-md">
        <Card className="shadow-lg border border-white/20 backdrop-blur-md bg-white/10 rounded-xl p-6">
          <CardHeader>
            <CardTitle className="text-2xl text-center">OTP Verification</CardTitle>
            <CardDescription className="text-center text-white">
              Enter the 6-digit OTP sent to your email
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleVerify} className="space-y-4">
              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <Input
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                maxLength={6}
                required
              />

              <div className="flex justify-between items-center">
                {timer > 0 ? (
                  <p className="text-sm text-white">
                    Resend OTP in <span className="font-bold">{timer}s</span>
                  </p>
                ) : (
                  <p className="text-sm text-white">Didn't receive OTP?</p>
                )}
                <Button
                  type="button"
                  variant="link"
                  className="text-blue-200 hover:underline"
                  disabled={isResendDisabled}
                  onClick={handleResend}
                >
                  Resend OTP
                </Button>
              </div>

              <Button type="submit" className="w-full">
                Verify OTP
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default OtpVerification;

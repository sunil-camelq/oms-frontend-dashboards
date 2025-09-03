import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { DashboardLayout } from "./components/Layout/Layout"; // Sidebar + Header layout
// import Login from "./pages/Login";
import Dashboard from "./components/Layout/Dashboard";
import Tasks from "./pages/Tasks";
import Attendance from "./pages/Attendance";
import Leave from "./pages/Leave";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import Payroll from "./pages/Payroll";
import Profile from "./pages/Profile";
import ExportData from "./pages/ExportData";
import ForgotPassword from "./pages/ForgotPassword";
import OtpVerification from "./pages/OtpVerification";
import OtpSuccess from "./pages/OtpSuccess";
import Feedback from "./pages/Feedback";
import Projects from "./pages/Projects";
import Documents from "./pages/Documents";
import Messages from "./pages/Messages";
import TeamChat from "./pages/TeamChat";
import Performance from "./pages/Performance";


const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Public routes */}
          {/* <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} /> */}
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/otp-verification" element={<OtpVerification />} />
          <Route path="/otp-success" element={<OtpSuccess />} />

          {/* Dashboard routes with layout */}
          <Route element={<DashboardLayout />}>
            <Route path="/emp/dashboard" element={<Dashboard />} />
            <Route path="/emp/payroll" element={<Payroll />} />
            <Route path="/emp/attendance" element={<Attendance />} />
            <Route path="/emp/leave" element={<Leave />} />
            <Route path="/emp/documents" element={<Documents  />} />
            <Route path="/emp/tasks" element={<Tasks />} />
            <Route path="/emp/performance" element={<Performance />} />
            <Route path="/emp/projects" element={<Projects />} />
            <Route path="/emp/messages" element={<Messages />} />
            <Route path="/emp/exportdata" element={<ExportData />} />
            <Route path="/emp/team" element={<TeamChat />} />
            <Route path="/emp/profile" element={<Profile />} />
            <Route path="/emp/reports" element={<Reports />} />
            <Route path="/emp/feedback" element={<Feedback />} />
            <Route path="/emp/settings" element={<Settings />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;




import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  CheckCircle,
  Circle,
  FileText,
  User,
  GraduationCap,
  Briefcase,
  CreditCard,
  Heart,
  Building,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface FormData {
  fullName: string;
  dob: string;
  gender: string;
  nationality: string;
  contact: string;
  email: string;
  currentAddress: string;
  permanentAddress: string;

  aadhaar: string;
  pan: string;
  passport: string;
  drivingLicense: string;
  voterId: string;
  identityDocs: FileList | null;

  highestQualification: string;
  university: string;
  graduationYear: string;
  cgpa: string;
  eduDocs: FileList | null;

  lastCompany: string;
  designation: string;
  experienceYears: string;
  lastSalary: string;
  expDocs: FileList | null;

  accountNumber: string;
  confirmAccount: string;
  ifsc: string;
  bankName: string;
  branch: string;
  bankDocs: FileList | null;

  bloodGroup: string;
  emergencyContact: string;
  medicalHistory: string;
  healthDocs: FileList | null;

  offerLetter: FileList | null;
  ndaDocs: FileList | null;
  joiningDate: string;
  department: string;
  additionalDocs: FileList | null;
}

const steps = [
  { id: 1, title: "Profile Info", icon: User },
  { id: 2, title: "Identity", icon: FileText },
  { id: 3, title: "Education", icon: GraduationCap },
  { id: 4, title: "Experience", icon: Briefcase },
  { id: 5, title: "Bank Details", icon: CreditCard },
  { id: 6, title: "Medical", icon: Heart },
  { id: 7, title: "Documents", icon: Building },
];

export default function DocumentVerification() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({} as FormData);
  const { toast } = useToast();
  const totalSteps = steps.length;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;

    if (type === "file") {
      const files = (e.target as HTMLInputElement).files;
      setFormData((prev) => ({ ...prev, [name]: files }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Application Submitted",
      description:
        "Your document verification application has been submitted successfully!",
    });
    console.log("Form Data:", formData);
  };

  const getStepIcon = (stepNumber: number) => {
    if (stepNumber < step) return CheckCircle;
    if (stepNumber === step) return steps[stepNumber - 1].icon;
    return Circle;
  };

  const getStepColor = (stepNumber: number) => {
    if (stepNumber < step) return "text-green-600";
    if (stepNumber === step) return "text-blue-600";
    return "text-gray-400";
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Document Verification</h1>
            <p className="text-muted-foreground">Fill all the details for submitting the application.</p>
          </div>
        </div>
  

      {/* Step Indicator */}
      <div className="bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {steps.map((stepItem, index) => {
              const StepIcon = getStepIcon(stepItem.id);
              const isCompleted = stepItem.id < step;
              const isActive = stepItem.id === step;

              return (
                <div key={stepItem.id} className="flex items-center">
                  <div className="flex flex-col items-center">
                    <div
                      className={`
                        w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-200
                        ${isCompleted
                          ? "bg-green-600 border-green-600 text-white"
                          : isActive
                            ? "bg-blue-600 border-blue-600 text-white"
                            : "bg-white border-gray-400 text-gray-400"
                        }
                      `}
                    >
                      <StepIcon className="w-5 h-5" />
                    </div>
                    <div className="mt-2 text-center">
                      <p
                        className={`text-xs font-medium ${getStepColor(
                          stepItem.id
                        )}`}
                      >
                        {stepItem.id}
                      </p>
                      <p
                        className={`text-xs mt-1 ${getStepColor(stepItem.id)}`}
                      >
                        {stepItem.title}
                      </p>
                    </div>
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={`w-12 h-0.5 mx-2 mt-[-20px] transition-colors duration-200 ${stepItem.id < step ? "bg-green-600" : "bg-gray-300"
                        }`}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Form */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <Card className="shadow-lg">
          <CardHeader className="pb-4">
            <div className="text-center">
              <h2 className="text-lg font-semibold text-primary">
                Step {step} of {totalSteps}
              </h2>
              <p className="text-sm text-muted-foreground mt-1">
                Please fill in all required information accurately
              </p>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="flex-1 flex flex-col">
              <div className="flex-1 relative overflow-hidden min-h-96">
                <AnimatePresence mode="wait">
                  {/* Step 1 - Profile */}
                  {step === 1 && (
                    <motion.div
                      key="profile"
                      initial={{ x: 100, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      exit={{ x: -100, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="grid grid-cols-1 md:grid-cols-2 gap-4"
                    >
                      <div>
                        <Label>Full Name</Label>
                        <Input name="fullName" onChange={handleChange} />
                      </div>
                      <div>
                        <Label>Date of Birth</Label>
                        <Input type="date" name="dob" onChange={handleChange} />
                      </div>
                      <div>
                        <Label>Gender</Label>
                        <Input name="gender" onChange={handleChange} />
                      </div>
                      <div>
                        <Label>Nationality</Label>
                        <Input name="nationality" onChange={handleChange} />
                      </div>
                      <div>
                        <Label>Contact</Label>
                        <Input name="contact" onChange={handleChange} />
                      </div>
                      <div>
                        <Label>Email</Label>
                        <Input name="email" type="email" onChange={handleChange} />
                      </div>
                      {/* Addresses side by side */}
                      <div className="md:col-span-1">
                        <Label>Current Address</Label>
                        <Textarea name="currentAddress" onChange={handleChange} />
                      </div>
                      <div className="md:col-span-1">
                        <Label>Permanent Address</Label>
                        <Textarea name="permanentAddress" onChange={handleChange} />
                      </div>
                    </motion.div>
                  )}

                  {/* Step 2 - Identity */}
                  {step === 2 && (
                    <motion.div
                      key="identity"
                      initial={{ x: 100, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      exit={{ x: -100, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="grid grid-cols-1 md:grid-cols-2 gap-4"
                    >
                      <div>
                        <Label>Aadhaar</Label>
                        <Input name="aadhaar" onChange={handleChange} />
                      </div>
                      <div>
                        <Label>PAN</Label>
                        <Input name="pan" onChange={handleChange} />
                      </div>
                      <div>
                        <Label>Passport</Label>
                        <Input name="passport" onChange={handleChange} />
                      </div>
                      <div>
                        <Label>Driving License</Label>
                        <Input name="drivingLicense" onChange={handleChange} />
                      </div>
                      <div>
                        <Label>Voter ID</Label>
                        <Input name="voterId" onChange={handleChange} />
                      </div>
                      <div className="md:col-span-2">
                        <Label>Upload Identity Documents</Label>
                        <Input
                          type="file"
                          name="identityDocs"
                          onChange={handleChange}
                          multiple
                        />
                      </div>
                    </motion.div>
                  )}

                  {/* Step 3 - Education */}
                  {step === 3 && (
                    <motion.div
                      key="education"
                      initial={{ x: 100, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      exit={{ x: -100, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="grid grid-cols-1 md:grid-cols-2 gap-4"
                    >
                      <div>
                        <Label>Highest Qualification</Label>
                        <Input
                          name="highestQualification"
                          onChange={handleChange}
                        />
                      </div>
                      <div>
                        <Label>University</Label>
                        <Input name="university" onChange={handleChange} />
                      </div>
                      <div>
                        <Label>Graduation Year</Label>
                        <Input name="graduationYear" onChange={handleChange} />
                      </div>
                      <div>
                        <Label>CGPA</Label>
                        <Input name="cgpa" onChange={handleChange} />
                      </div>
                      <div className="md:col-span-2">
                        <Label>Upload Education Docs</Label>
                        <Input
                          type="file"
                          name="eduDocs"
                          onChange={handleChange}
                          multiple
                        />
                      </div>
                    </motion.div>
                  )}

                  {/* Step 4 - Experience */}
                  {step === 4 && (
                    <motion.div
                      key="experience"
                      initial={{ x: 100, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      exit={{ x: -100, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="grid grid-cols-1 md:grid-cols-2 gap-4"
                    >
                      <div>
                        <Label>Last Company</Label>
                        <Input name="lastCompany" onChange={handleChange} />
                      </div>
                      <div>
                        <Label>Designation</Label>
                        <Input name="designation" onChange={handleChange} />
                      </div>
                      <div>
                        <Label>Years of Experience</Label>
                        <Input
                          name="experienceYears"
                          onChange={handleChange}
                        />
                      </div>
                      <div>
                        <Label>Last Salary</Label>
                        <Input name="lastSalary" onChange={handleChange} />
                      </div>
                      <div className="md:col-span-2">
                        <Label>Upload Experience Docs</Label>
                        <Input
                          type="file"
                          name="expDocs"
                          onChange={handleChange}
                          multiple
                        />
                      </div>
                    </motion.div>
                  )}

                  {/* Step 5 - Bank */}
                  {step === 5 && (
                    <motion.div
                      key="bank"
                      initial={{ x: 100, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      exit={{ x: -100, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="grid grid-cols-1 md:grid-cols-2 gap-4"
                    >
                      <div>
                        <Label>Account Number</Label>
                        <Input name="accountNumber" onChange={handleChange} />
                      </div>
                      <div>
                        <Label>Confirm Account Number</Label>
                        <Input name="confirmAccount" onChange={handleChange} />
                      </div>
                      <div>
                        <Label>IFSC</Label>
                        <Input name="ifsc" onChange={handleChange} />
                      </div>
                      <div>
                        <Label>Bank Name</Label>
                        <Input name="bankName" onChange={handleChange} />
                      </div>
                      <div>
                        <Label>Branch</Label>
                        <Input name="branch" onChange={handleChange} />
                      </div>
                      <div className="md:col-span-2">
                        <Label>Upload Bank Docs</Label>
                        <Input
                          type="file"
                          name="bankDocs"
                          onChange={handleChange}
                          multiple
                        />
                      </div>
                    </motion.div>
                  )}

                  {/* Step 6 - Medical */}
                  {step === 6 && (
                    <motion.div
                      key="medical"
                      initial={{ x: 100, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      exit={{ x: -100, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="grid grid-cols-1 md:grid-cols-2 gap-4"
                    >
                      <div>
                        <Label>Blood Group</Label>
                        <Input name="bloodGroup" onChange={handleChange} />
                      </div>
                      <div>
                        <Label>Emergency Contact</Label>
                        <Input name="emergencyContact" onChange={handleChange} />
                      </div>
                      <div className="md:col-span-2">
                        <Label>Medical History</Label>
                        <Textarea
                          name="medicalHistory"
                          onChange={handleChange}
                        />
                      </div>
                      <div className="md:col-span-2">
                        <Label>Upload Health Docs</Label>
                        <Input
                          type="file"
                          name="healthDocs"
                          onChange={handleChange}
                          multiple
                        />
                      </div>
                    </motion.div>
                  )}

                  {/* Step 7 - Documents */}
                  {step === 7 && (
                    <motion.div
                      key="documents"
                      initial={{ x: 100, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      exit={{ x: -100, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="grid grid-cols-1 md:grid-cols-2 gap-4"
                    >
                      <div>
                        <Label>Offer Letter</Label>
                        <Input
                          type="file"
                          name="offerLetter"
                          onChange={handleChange}
                        />
                      </div>
                      <div>
                        <Label>NDA Documents</Label>
                        <Input
                          type="file"
                          name="ndaDocs"
                          onChange={handleChange}
                        />
                      </div>
                      <div>
                        <Label>Joining Date</Label>
                        <Input
                          type="date"
                          name="joiningDate"
                          onChange={handleChange}
                        />
                      </div>
                      <div>
                        <Label>Department</Label>
                        <Input name="department" onChange={handleChange} />
                      </div>
                      <div className="md:col-span-2">
                        <Label>Additional Docs</Label>
                        <Input
                          type="file"
                          name="additionalDocs"
                          onChange={handleChange}
                          multiple
                        />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Navigation */}
              <div className="flex justify-between mt-6 pt-4 border-t border-border">
                {step > 1 && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setStep(step - 1)}
                    className="min-w-20 h-9"
                  >
                    Back
                  </Button>
                )}
                <div className="ml-auto">
                  {step < totalSteps ? (
                    <Button
                      type="button"
                      onClick={() => setStep(step + 1)}
                      className="min-w-28 h-9"
                    >
                      Save & Next
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      className="min-w-28 h-9 bg-emerald-600 hover:bg-emerald-700 text-white"
                    >
                      Submit Application
                    </Button>
                  )}
                </div>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
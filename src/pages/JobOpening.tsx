



// import { useState, useEffect } from "react";
// import axios from "axios";
// import { Card, CardContent } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Button } from "@/components/ui/button";
// import {
//   Briefcase,
//   Clock,
//   Calendar,
//   Users,
//   UserPlus,
// } from "lucide-react";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogDescription,
// } from "@/components/ui/dialog";
// import { Label } from "@/components/ui/label";
// import { Textarea } from "@/components/ui/textarea";

// // -------------------- Stats Card --------------------
// interface StatsCardProps {
//   title: string;
//   value: string | number;
//   change: string;
//   changeType: "positive" | "negative" | "neutral";
//   icon: React.ElementType;
//   gradient: string;
//   description: string;
// }

// function StatsCard({
//   title,
//   value,
//   change,
//   changeType,
//   icon: Icon,
//   gradient,
//   description,
// }: StatsCardProps) {
//   const changeColors =
//     changeType === "positive"
//       ? "text-green-500"
//       : changeType === "negative"
//       ? "text-red-500"
//       : "text-gray-500";

//   return (
//     <Card className="rounded-xl shadow-md hover:shadow-lg transition-transform transform hover:scale-105">
//       <CardContent className="p-4">
//         <div className="flex items-center justify-between">
//           <div>
//             <h3 className="text-sm font-medium text-gray-500">{title}</h3>
//             <p className="text-lg font-semibold">{value}</p>
//           </div>
//           <div
//             className={`w-10 h-10 flex items-center justify-center rounded-lg text-white ${gradient}`}
//           >
//             <Icon className="w-5 h-5" />
//           </div>
//         </div>
//         <div className="mt-2 flex items-center justify-between text-xs">
//           <span className={changeColors}>{change}</span>
//           <span className="text-gray-400">{description}</span>
//         </div>
//       </CardContent>
//     </Card>
//   );
// }

// // -------------------- Add Job Opening Form --------------------
// function AddJobOpeningForm({ onSubmit }: { onSubmit: () => void }) {
//   const [departments, setDepartments] = useState<{ id: number; name: string }[]>([]);
//   const [branches, setBranches] = useState<{ id: number; name: string }[]>([]);
//   const [employmentTypes, setEmploymentTypes] = useState<{ id: number; name: string }[]>([]);

//   const [formData, setFormData] = useState({
//     title: "",
//     department: "",
//     employmentType: "",
//     location: "",
//     experience: "",
//     salaryMin: "",
//     salaryMax: "",
//     openings: "",
//     deadline: "",
//     description: "",
//     requirements: "",
//     responsibilities: "",
//     dept_id: "",
//     branch_id: "",
//     designation_id: "",
//     job_status: "",
//   });

//   useEffect(() => {
//     axios
//       .get("http://localhost:3000/api/departments")
//       .then((res) => setDepartments(res.data))
//       .catch((err) => console.error("Error fetching departments:", err));

//     axios
//       .get("http://localhost:3000/api/branches")
//       .then((res) => setBranches(res.data))
//       .catch((err) => console.error("Error fetching branches:", err));

//     axios
//       .get("http://localhost:3000/api/employment-types")
//       .then((res) => setEmploymentTypes(res.data))
//       .catch((err) => console.error("Error fetching employment types:", err));
//   }, []);

//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//   ) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSelectChange = (name: string, value: string) => {
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     try {
//       await axios.post("http://localhost:3000/api/job-openings", formData);
//       onSubmit();
//     } catch (error) {
//       console.error("Error adding job opening:", error);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-4">
//       {/* Job Title */}
//       <div>
//         <Label>Job Title</Label>
//         <Input
//           name="title"
//           value={formData.title}
//           onChange={handleChange}
//           placeholder="e.g. Software Engineer"
//         />
//       </div>

//       {/* Department Dropdown */}
//       <div>
//         <Label>Department</Label>
//         <Select
//           onValueChange={(val) => handleSelectChange("department", val)}
//           value={formData.department}
//         >
//           <SelectTrigger>
//             <SelectValue placeholder="Select Department" />
//           </SelectTrigger>
//           <SelectContent>
//             {departments.map((dept) => (
//               <SelectItem key={dept.id} value={String(dept.id)}>
//                 {dept.name}
//               </SelectItem>
//             ))}
//           </SelectContent>
//         </Select>
//       </div>

//       {/* Employment Type Dropdown */}
//       <div>
//         <Label>Employment Type</Label>
//         <Select
//           onValueChange={(val) => handleSelectChange("employmentType", val)}
//           value={formData.employmentType}
//         >
//           <SelectTrigger>
//             <SelectValue placeholder="Select Employment Type" />
//           </SelectTrigger>
//           <SelectContent>
//             {employmentTypes.map((type) => (
//               <SelectItem key={type.id} value={String(type.id)}>
//                 {type.name}
//               </SelectItem>
//             ))}
//           </SelectContent>
//         </Select>
//       </div>

//       {/* Department ID Dropdown */}
//       <div>
//         <Label>Department ID</Label>
//         <Select
//           onValueChange={(val) => handleSelectChange("dept_id", val)}
//           value={formData.dept_id}
//         >
//           <SelectTrigger>
//             <SelectValue placeholder="Select Department ID" />
//           </SelectTrigger>
//           <SelectContent>
//             {departments.map((dept) => (
//               <SelectItem key={dept.id} value={String(dept.id)}>
//                 {dept.id} - {dept.name}
//               </SelectItem>
//             ))}
//           </SelectContent>
//         </Select>
//       </div>

//       {/* Branch ID Dropdown */}
//       <div>
//         <Label>Branch ID</Label>
//         <Select
//           onValueChange={(val) => handleSelectChange("branch_id", val)}
//           value={formData.branch_id}
//         >
//           <SelectTrigger>
//             <SelectValue placeholder="Select Branch ID" />
//           </SelectTrigger>
//           <SelectContent>
//             {branches.map((branch) => (
//               <SelectItem key={branch.id} value={String(branch.id)}>
//                 {branch.id} - {branch.name}
//               </SelectItem>
//             ))}
//           </SelectContent>
//         </Select>
//       </div>

//       {/* Designation ID */}
//       <div>
//         <Label>Designation ID</Label>
//         <Input
//           name="designation_id"
//           value={formData.designation_id}
//           onChange={handleChange}
//           placeholder="Enter designation ID"
//         />
//       </div>

//       {/* Job Status */}
//       <div>
//         <Label>Job Status</Label>
//         <Select
//           onValueChange={(val) => handleSelectChange("job_status", val)}
//           value={formData.job_status}
//         >
//           <SelectTrigger>
//             <SelectValue placeholder="Select status" />
//           </SelectTrigger>
//           <SelectContent>
//             <SelectItem value="active">Active</SelectItem>
//             <SelectItem value="inactive">Inactive</SelectItem>
//             <SelectItem value="expired">Expired</SelectItem>
//           </SelectContent>
//         </Select>
//       </div>

//       {/* Job Description */}
//       <div>
//         <Label>Job Description</Label>
//         <Textarea
//           name="description"
//           value={formData.description}
//           onChange={handleChange}
//           placeholder="Enter job description..."
//           rows={4}
//         />
//       </div>

//       {/* Requirements */}
//       <div>
//         <Label>Requirements</Label>
//         <Textarea
//           name="requirements"
//           value={formData.requirements}
//           onChange={handleChange}
//           placeholder="List requirements..."
//           rows={3}
//         />
//       </div>

//       {/* Submit */}
//       <div className="flex justify-end">
//         <Button type="submit" className="px-6">
//           Submit Job
//         </Button>
//       </div>
//     </form>
//   );
// }

// // -------------------- Job Openings Page --------------------
// interface JobOpening {
//   id: number;
//   title: string;
//   department: string;
//   dept_id: string;
//   branch_id: string;
//   designation_id: string;
//   job_status: string;
//   employmentType: string;
//   description: string;
// }

// export default function JobOpening() {
//   const totalJobOpenings = 120;
//   const currentJobOpenings = 45;
//   const expiredJobOpenings = 12;
//   const requestJobOpenings = 8;

//   const [jobOpenings, setJobOpenings] = useState<JobOpening[]>([]);
//   const [search, setSearch] = useState("");
//   const [filter, setFilter] = useState("all");
//   const [selectedJob, setSelectedJob] = useState<JobOpening | null>(null);
//   const [openAddDialog, setOpenAddDialog] = useState(false);

//   useEffect(() => {
//     fetchJobOpenings();
//   }, []);

//   const fetchJobOpenings = async () => {
//     try {
//       const res = await axios.get("http://localhost:3000/api/job-openings");
//       setJobOpenings(res.data);
//     } catch (error) {
//       console.error("Error fetching job openings:", error);
//     }
//   };

//   const deleteJobOpening = async (id: number) => {
//     try {
//       await axios.delete(`http://localhost:3000/api/job-openings/${id}`);
//       setJobOpenings(jobOpenings.filter((job) => job.id !== id));
//     } catch (error) {
//       console.error("Error deleting job opening:", error);
//     }
//   };

//   const filteredJobs = jobOpenings.filter((job) => {
//     const matchesSearch = job.title.toLowerCase().includes(search.toLowerCase());
//     const matchesFilter = filter === "all" || job.department === filter;
//     return matchesSearch && matchesFilter;
//   });

//   return (
//     <div className="space-y-6">
//       {/* Header */}
//       <div className="flex items-center justify-between">
//         <div>
//           <h1 className="text-3xl font-bold text-foreground">Job Openings</h1>
//           <p className="text-muted-foreground mt-1">
//             Welcome back! Here’s what’s happening with job openings today.
//           </p>
//         </div>
//         <div className="flex space-x-3">
//           <Button variant="violet" onClick={() => setOpenAddDialog(true)}>
//             <UserPlus className="h-4 w-4 mr-2" />
//             Add Job Opening
//           </Button>
//         </div>
//       </div>

//       {/* Stats */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//         <StatsCard
//           title="Total Job Openings"
//           value={totalJobOpenings}
//           change="+5%"
//           changeType="positive"
//           icon={Briefcase}
//           gradient="bg-gradient-to-r from-indigo-500 to-blue-500"
//           description="Overall postings"
//         />
//         <StatsCard
//           title="Current Openings"
//           value={currentJobOpenings}
//           change="+2"
//           changeType="positive"
//           icon={Clock}
//           gradient="bg-gradient-to-r from-green-500 to-emerald-500"
//           description="Active jobs"
//         />
//         <StatsCard
//           title="Expired Openings"
//           value={expiredJobOpenings}
//           change="-1"
//           changeType="negative"
//           icon={Calendar}
//           gradient="bg-gradient-to-r from-red-500 to-pink-500"
//           description="Closed jobs"
//         />
//         <StatsCard
//           title="Requested Openings"
//           value={requestJobOpenings}
//           change="3 pending"
//           changeType="neutral"
//           icon={Users}
//           gradient="bg-gradient-to-r from-yellow-500 to-orange-500"
//           description="Awaiting approval"
//         />
//       </div>

//       {/* Search + Filter */}
//       <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
//         <Input
//           placeholder="Search jobs..."
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           className="w-full md:w-1/3"
//         />
//         <Select onValueChange={(val) => setFilter(val)} defaultValue="all">
//           <SelectTrigger className="w-full md:w-48">
//             <SelectValue placeholder="Filter by department" />
//           </SelectTrigger>
//           <SelectContent>
//             <SelectItem value="all">All Departments</SelectItem>
//             <SelectItem value="IT">IT</SelectItem>
//             <SelectItem value="HR">HR</SelectItem>
//             <SelectItem value="Design">Design</SelectItem>
//             <SelectItem value="QA">QA</SelectItem>
//           </SelectContent>
//         </Select>
//       </div>

//       {/* Job Openings List */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//         {filteredJobs.map((job) => (
//           <Card
//             key={job.id}
//             className="p-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 cursor-pointer"
//           >
//             <h3 className="text-lg font-semibold">{job.title}</h3>
//             <p className="text-sm text-gray-600">{job.department}</p>
//             <p className="text-xs text-gray-400">Dept ID: {job.dept_id}</p>
//             <p className="text-xs text-gray-400">Branch ID: {job.branch_id}</p>
//             <p className="text-xs text-gray-400">Designation ID: {job.designation_id}</p>
//             <p className="text-xs text-gray-400">Employment: {job.employmentType}</p>
//             <p
//               className={`mt-2 text-sm font-semibold ${
//                 job.job_status === "active"
//                   ? "text-green-600"
//                   : job.job_status === "expired"
//                   ? "text-red-600"
//                   : "text-gray-600"
//               }`}
//             >
//               Status: {job.job_status}
//             </p>
//             <div className="flex gap-2 mt-4">
//               <Button
//                 size="sm"
//                 variant="outline"
//                 onClick={() => setSelectedJob(job)}
//               >
//                 View Details
//               </Button>
//               <Button
//                 size="sm"
//                 variant="destructive"
//                 onClick={() => deleteJobOpening(job.id)}
//               >
//                 Delete
//               </Button>
//             </div>
//           </Card>
//         ))}

//         {filteredJobs.length === 0 && (
//           <p className="text-gray-500 italic">No job openings found.</p>
//         )}
//       </div>

//       {/* Job Details Popup */}
//       <Dialog open={!!selectedJob} onOpenChange={() => setSelectedJob(null)}>
//         <DialogContent className="max-w-md sm:max-w-lg">
//           <DialogHeader>
//             <DialogTitle>{selectedJob?.title}</DialogTitle>
//             <DialogDescription>
//               Detailed information about this job opening
//             </DialogDescription>
//           </DialogHeader>
//           {selectedJob && (
//             <div className="space-y-3">
//               <p>
//                 <strong>Department:</strong> {selectedJob.department}
//               </p>
//               <p>
//                 <strong>Dept ID:</strong> {selectedJob.dept_id}
//               </p>
//               <p>
//                 <strong>Branch ID:</strong> {selectedJob.branch_id}
//               </p>
//               <p>
//                 <strong>Designation ID:</strong> {selectedJob.designation_id}
//               </p>
//               <p>
//                 <strong>Employment:</strong> {selectedJob.employmentType}
//               </p>
//               <p>
//                 <strong>Status:</strong> {selectedJob.job_status}
//               </p>
//               <p>
//                 <strong>Description:</strong> {selectedJob.description}
//               </p>
//             </div>
//           )}
//         </DialogContent>
//       </Dialog>

//       {/* Add Job Opening Dialog */}
//       <Dialog open={openAddDialog} onOpenChange={setOpenAddDialog}>
//         <DialogContent className="max-w-lg max-h-[80vh] overflow-y-auto rounded-lg">
//           <DialogHeader>
//             <DialogTitle>Add Job Opening</DialogTitle>
//             <DialogDescription>
//               Fill in the details below to create a new job opening.
//             </DialogDescription>
//           </DialogHeader>
//           <AddJobOpeningForm
//             onSubmit={() => {
//               setOpenAddDialog(false);
//               fetchJobOpenings();
//             }}
//           />
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// }


import { useState, useEffect } from "react";
import axios from "axios";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
    Briefcase,
    Clock,
    Calendar,
    Users,
    UserPlus,
} from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

// -------------------- Stats Card --------------------
interface StatsCardProps {
    title: string;
    value: string | number;
    change: string;
    changeType: "positive" | "negative" | "neutral";
    icon: React.ElementType;
    gradient: string;
    description: string;
}

function StatsCard({
    title,
    value,
    change,
    changeType,
    icon: Icon,
    gradient,
    description,
}: StatsCardProps) {
    const changeColors =
        changeType === "positive"
            ? "text-green-500"
            : changeType === "negative"
                ? "text-red-500"
                : "text-gray-500";

    return (
        <Card className="rounded-xl shadow-md hover:shadow-lg transition-transform transform hover:scale-105">
            <CardContent className="p-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="text-sm font-medium text-gray-500">{title}</h3>
                        <p className="text-lg font-semibold">{value}</p>
                    </div>
                    <div
                        className={`w-10 h-10 flex items-center justify-center rounded-lg text-white ${gradient}`}
                    >
                        <Icon className="w-5 h-5" />
                    </div>
                </div>
                <div className="mt-2 flex items-center justify-between text-xs">
                    <span className={changeColors}>{change}</span>
                    <span className="text-gray-400">{description}</span>
                </div>
            </CardContent>
        </Card>
    );
}

// -------------------- Add Job Opening Form --------------------
function AddJobOpeningForm({ onSubmit }: { onSubmit: () => void }) {
    const [departments, setDepartments] = useState<{ id: number; name: string }[]>([]);
    const [branches, setBranches] = useState<{ id: number; name: string }[]>([]);
    const [designations, setDesignations] = useState<{ id: number; name: string }[]>([]);
    const [employmentTypes, setEmploymentTypes] = useState<{ id: number; name: string }[]>([]);

    const [formData, setFormData] = useState({
        title: "",
        branch_id: "",
        department: "",
        employmentType: "",
        description: "",
        requirements: "",
        designation_id: "",
        job_status: "",
    });

    useEffect(() => {
        axios.get("http://localhost:3000/api/departments")
            .then((res) => setDepartments(res.data))
            .catch((err) => console.error("Error fetching departments:", err));

        axios.get("http://localhost:3000/api/branches")
            .then((res) => setBranches(res.data))
            .catch((err) => console.error("Error fetching branches:", err));

        axios.get("http://localhost:3000/api/designations")
            .then((res) => setDesignations(res.data))
            .catch((err) => console.error("Error fetching designations:", err));

        axios.get("http://localhost:3000/api/employment-types")
            .then((res) => setEmploymentTypes(res.data))
            .catch((err) => console.error("Error fetching employment types:", err));
    }, []);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSelectChange = (name: string, value: string) => {
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            await axios.post("http://localhost:3000/api/job-openings", formData);
            onSubmit();
        } catch (error) {
            console.error("Error adding job opening:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {/* Job Title */}
            <div>
                <Label>Job Title</Label>
                <Input
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="e.g. Software Engineer"
                />
            </div>

            {/* Branch ID Dropdown */}
            <div>
                <Label>Branch</Label>
                <Select
                    onValueChange={(val) => handleSelectChange("branch_id", val)}
                    value={formData.branch_id}
                >
                    <SelectTrigger>
                        <SelectValue placeholder="Select Branch" />
                    </SelectTrigger>
                    <SelectContent>
                        {branches.map((branch) => (
                            <SelectItem key={branch.id} value={String(branch.id)}>
                                {branch.id} - {branch.name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            {/* Department Dropdown */}
            <div>
                <Label>Department</Label>
                <Select
                    onValueChange={(val) => handleSelectChange("department", val)}
                    value={formData.department}
                >
                    <SelectTrigger>
                        <SelectValue placeholder="Select Department" />
                    </SelectTrigger>
                    <SelectContent>
                        {departments.map((dept) => (
                            <SelectItem key={dept.id} value={dept.name}>
                                {dept.name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>


            {/* Designation ID Dropdown */}
            <div>
                <Label>Designation</Label>
                <Select
                    onValueChange={(val) => handleSelectChange("designation_id", val)}
                    value={formData.designation_id}
                >
                    <SelectTrigger>
                        <SelectValue placeholder="Select Designation" />
                    </SelectTrigger>
                    <SelectContent>
                        {designations.map((desig) => (
                            <SelectItem key={desig.id} value={String(desig.id)}>
                                {desig.id} - {desig.name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            {/* Employment Type Dropdown */}
            <div>
                <Label>Employment Type</Label>
                <Select
                    onValueChange={(val) => handleSelectChange("employmentType", val)}
                    value={formData.employmentType}
                >
                    <SelectTrigger>
                        <SelectValue placeholder="Select Employment Type" />
                    </SelectTrigger>
                    <SelectContent>
                        {employmentTypes.map((type) => (
                            <SelectItem key={type.id} value={type.name}>
                                {type.name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>







            {/* Job Status */}
            <div>
                <Label>Job Status</Label>
                <Select
                    onValueChange={(val) => handleSelectChange("job_status", val)}
                    value={formData.job_status}
                >
                    <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                        <SelectItem value="expired">Expired</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            {/* Job Description */}
            <div>
                <Label>Job Description</Label>
                <Textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Enter job description..."
                    rows={4}
                />
            </div>

            {/* Requirements */}
            <div>
                <Label>Requirements</Label>
                <Textarea
                    name="requirements"
                    value={formData.requirements}
                    onChange={handleChange}
                    placeholder="List requirements..."
                    rows={3}
                />
            </div>

            {/* Submit */}
            <div className="flex justify-end">
                <Button type="submit" className="px-6">
                    Submit Job
                </Button>
            </div>
        </form>
    );
}

// -------------------- Job Openings Page --------------------
interface JobOpening {
    id: number;
    title: string;
    department: string;
    dept_id: string;
    branch_id: string;
    designation_id: string;
    job_status: string;
    employmentType: string;
    description: string;
}

export default function JobOpening() {
    const totalJobOpenings = 120;
    const currentJobOpenings = 45;
    const expiredJobOpenings = 12;
    const requestJobOpenings = 8;

    const [jobOpenings, setJobOpenings] = useState<JobOpening[]>([]);
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("all");
    const [selectedJob, setSelectedJob] = useState<JobOpening | null>(null);
    const [openAddDialog, setOpenAddDialog] = useState(false);

    useEffect(() => {
        fetchJobOpenings();
    }, []);

    const fetchJobOpenings = async () => {
        try {
            const res = await axios.get("http://localhost:3000/api/job-openings");
            setJobOpenings(res.data);
        } catch (error) {
            console.error("Error fetching job openings:", error);
        }
    };

    const deleteJobOpening = async (id: number) => {
        try {
            await axios.delete(`http://localhost:3000/api/job-openings/${id}`);
            setJobOpenings(jobOpenings.filter((job) => job.id !== id));
        } catch (error) {
            console.error("Error deleting job opening:", error);
        }
    };

    const filteredJobs = jobOpenings.filter((job) => {
        const matchesSearch = job.title.toLowerCase().includes(search.toLowerCase());
        const matchesFilter = filter === "all" || job.department === filter;
        return matchesSearch && matchesFilter;
    });

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-foreground">Job Openings</h1>
                    <p className="text-muted-foreground mt-1">
                        Welcome back! Here’s what’s happening with job openings today.
                    </p>
                </div>
                <div className="flex space-x-3">
                    <Button variant="violet" onClick={() => setOpenAddDialog(true)}>
                        <UserPlus className="h-4 w-4 mr-2" />
                        Add Job Opening
                    </Button>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatsCard
                    title="Total Job Openings"
                    value={totalJobOpenings}
                    change="+5%"
                    changeType="positive"
                    icon={Briefcase}
                    gradient="bg-gradient-to-r from-indigo-500 to-blue-500"
                    description="Overall postings"
                />
                <StatsCard
                    title="Current Openings"
                    value={currentJobOpenings}
                    change="+2"
                    changeType="positive"
                    icon={Clock}
                    gradient="bg-gradient-to-r from-green-500 to-emerald-500"
                    description="Active jobs"
                />
                <StatsCard
                    title="Expired Openings"
                    value={expiredJobOpenings}
                    change="-1"
                    changeType="negative"
                    icon={Calendar}
                    gradient="bg-gradient-to-r from-red-500 to-pink-500"
                    description="Closed jobs"
                />
                <StatsCard
                    title="Requested Openings"
                    value={requestJobOpenings}
                    change="3 pending"
                    changeType="neutral"
                    icon={Users}
                    gradient="bg-gradient-to-r from-yellow-500 to-orange-500"
                    description="Awaiting approval"
                />
            </div>

            {/* Search + Filter */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <Input
                    placeholder="Search jobs..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full md:w-1/3"
                />
                <Select onValueChange={(val) => setFilter(val)} defaultValue="all">
                    <SelectTrigger className="w-full md:w-48">
                        <SelectValue placeholder="Filter by department" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Departments</SelectItem>
                        <SelectItem value="IT">IT</SelectItem>
                        <SelectItem value="HR">HR</SelectItem>
                        <SelectItem value="Design">Design</SelectItem>
                        <SelectItem value="QA">QA</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            {/* Job Openings List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredJobs.map((job) => (
                    <Card
                        key={job.id}
                        className="p-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 cursor-pointer"
                    >
                        <h3 className="text-lg font-semibold">{job.title}</h3>
                        <p className="text-sm text-gray-600">{job.department}</p>
                        <p className="text-xs text-gray-400">Dept ID: {job.dept_id}</p>
                        <p className="text-xs text-gray-400">Branch ID: {job.branch_id}</p>
                        <p className="text-xs text-gray-400">Designation ID: {job.designation_id}</p>
                        <p className="text-xs text-gray-400">Employment: {job.employmentType}</p>
                        <p
                            className={`mt-2 text-sm font-semibold ${job.job_status === "active"
                                ? "text-green-600"
                                : job.job_status === "expired"
                                    ? "text-red-600"
                                    : "text-gray-600"
                                }`}
                        >
                            Status: {job.job_status}
                        </p>
                        <div className="flex gap-2 mt-4">
                            <Button
                                size="sm"
                                variant="outline"
                                onClick={() => setSelectedJob(job)}
                            >
                                View Details
                            </Button>
                            <Button
                                size="sm"
                                variant="destructive"
                                onClick={() => deleteJobOpening(job.id)}
                            >
                                Delete
                            </Button>
                        </div>
                    </Card>
                ))}

                {filteredJobs.length === 0 && (
                    <p className="text-gray-500 italic">No job openings found.</p>
                )}
            </div>

            {/* Job Details Popup */}
            <Dialog open={!!selectedJob} onOpenChange={() => setSelectedJob(null)}>
                <DialogContent className="max-w-md sm:max-w-lg">
                    <DialogHeader>
                        <DialogTitle>{selectedJob?.title}</DialogTitle>
                        <DialogDescription>
                            Detailed information about this job opening
                        </DialogDescription>
                    </DialogHeader>
                    {selectedJob && (
                        <div className="space-y-3">
                            <p>
                                <strong>Department:</strong> {selectedJob.department}
                            </p>
                            <p>
                                <strong>Dept ID:</strong> {selectedJob.dept_id}
                            </p>
                            <p>
                                <strong>Branch ID:</strong> {selectedJob.branch_id}
                            </p>
                            <p>
                                <strong>Designation ID:</strong> {selectedJob.designation_id}
                            </p>
                            <p>
                                <strong>Employment:</strong> {selectedJob.employmentType}
                            </p>
                            <p>
                                <strong>Status:</strong> {selectedJob.job_status}
                            </p>
                            <p>
                                <strong>Description:</strong> {selectedJob.description}
                            </p>
                        </div>
                    )}
                </DialogContent>
            </Dialog>

            {/* Add Job Opening Dialog */}
            <Dialog open={openAddDialog} onOpenChange={setOpenAddDialog}>
                <DialogContent className="max-w-lg max-h-[80vh] overflow-y-auto rounded-lg">
                    <DialogHeader>
                        <DialogTitle>Add Job Opening</DialogTitle>
                        <DialogDescription>
                            Fill in the details below to create a new job opening.
                        </DialogDescription>
                    </DialogHeader>
                    <AddJobOpeningForm
                        onSubmit={() => {
                            setOpenAddDialog(false);
                            fetchJobOpenings();
                        }}
                    />
                </DialogContent>
            </Dialog>
        </div>
    );
}

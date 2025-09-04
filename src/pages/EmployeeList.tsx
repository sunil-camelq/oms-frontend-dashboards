

import { useState, useEffect } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2, UserPlus } from "lucide-react";
import { Input } from "@/components/ui/input";

// API Base URL (adjust as per backend)
const API_URL = "http://localhost:3000/api/employees";

export default function EmployeeList() {
  const [employees, setEmployees] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    email: "",
    phone: "",
    role: "",
    department: "",
    joiningDate: "",
    status: "Active",
  });
  const [isEditing, setIsEditing] = useState(false);

  // Fetch employees
  const fetchEmployees = async () => {
    try {
      setLoading(true);
      const res = await axios.get(API_URL);
      setEmployees(res.data);
    } catch (err) {
      console.error("Error fetching employees:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  // Handle input change
  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Add employee
  const handleAdd = async () => {
    try {
      await axios.post(API_URL, formData);
      fetchEmployees();
      resetForm();
    } catch (err) {
      console.error("Error adding employee:", err);
    }
  };

  // Edit employee
  const handleEdit = (emp: any) => {
    setIsEditing(true);
    setFormData(emp);
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`${API_URL}/${formData.id}`, formData);
      fetchEmployees();
      resetForm();
      setIsEditing(false);
    } catch (err) {
      console.error("Error updating employee:", err);
    }
  };

  // Delete employee
  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchEmployees();
    } catch (err) {
      console.error("Error deleting employee:", err);
    }
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      id: "",
      name: "",
      email: "",
      phone: "",
      role: "",
      department: "",
      joiningDate: "",
      status: "Active",
    });
    setIsEditing(false);
  };

  return (
    <Card className="w-full shadow-md rounded-2xl">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-xl font-semibold">Employee List</CardTitle>
      </CardHeader>

      {/* Form Section */}
      <CardContent className="mb-6">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-3">
          <Input
            placeholder="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          <Input
            placeholder="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          <Input
            placeholder="Phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
          <Input
            placeholder="Role"
            name="role"
            value={formData.role}
            onChange={handleChange}
          />
          <Input
            placeholder="Department"
            name="department"
            value={formData.department}
            onChange={handleChange}
          />
          <Input
            placeholder="Joining Date (YYYY-MM-DD)"
            name="joiningDate"
            value={formData.joiningDate}
            onChange={handleChange}
          />
        </div>

        <div className="flex gap-2">
          {isEditing ? (
            <Button onClick={handleUpdate} className="bg-blue-500 text-white">
              Update Employee
            </Button>
          ) : (
            <Button onClick={handleAdd} className="bg-green-500 text-white">
              <UserPlus className="w-4 h-4 mr-2" />
              Add Employee
            </Button>
          )}
          {isEditing && (
            <Button onClick={resetForm} variant="outline">
              Cancel
            </Button>
          )}
        </div>
      </CardContent>

      {/* Employee Table */}
      <CardContent>
        {loading ? (
          <p>Loading employees...</p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Joining Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-center">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {employees.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={9} className="text-center">
                    No employees found.
                  </TableCell>
                </TableRow>
              ) : (
                employees.map((emp) => (
                  <TableRow key={emp.id}>
                    <TableCell>{emp.id}</TableCell>
                    <TableCell className="font-medium">{emp.name}</TableCell>
                    <TableCell>{emp.email}</TableCell>
                    <TableCell>{emp.phone}</TableCell>
                    <TableCell>{emp.role}</TableCell>
                    <TableCell>{emp.department}</TableCell>
                    <TableCell>{emp.joiningDate}</TableCell>
                    <TableCell>
                      <Badge
                        className={
                          emp.status === "Active"
                            ? "bg-green-500"
                            : "bg-red-500 text-white"
                        }
                      >
                        {emp.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="flex justify-center gap-2">
                      <Button
                        size="icon"
                        variant="outline"
                        onClick={() => handleEdit(emp)}
                      >
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <Button
                        size="icon"
                        variant="destructive"
                        onClick={() => handleDelete(emp.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}



import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

type Employee = {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  gender: string;
  dob: string;
  address: string;
  designation: string;
  department: string;
  joiningDate: string;
  salary: string;
  employeeId: string;
  password: string;
  confirmPassword: string;
};

const AddEmployee: React.FC = () => {
  const [formData, setFormData] = useState<Employee>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    gender: "",
    dob: "",
    address: "",
    designation: "",
    department: "",
    joiningDate: "",
    salary: "",
    employeeId: "",
    password: "",
    confirmPassword: "",
  });

  const [employees, setEmployees] = useState<Employee[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);

  // Fetch employees
  const fetchEmployees = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/employees");
      setEmployees(res.data);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSelect = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (editingId) {
        await axios.put(
          `http://localhost:3000/api/employees/${editingId}`,
          formData
        );
        setEditingId(null);
      } else {
        await axios.post("http://localhost:3000/api/employees", formData);
      }
      fetchEmployees();
      resetForm();
    } catch (error) {
      console.error("Error saving employee:", error);
    }
  };

  const handleEdit = (employee: Employee) => {
    setFormData(employee);
    setEditingId(employee.id || null);
  };

  const handleDelete = async (id?: number) => {
    if (!id) return;
    try {
      await axios.delete(`http://localhost:3000/api/employees/${id}`);
      fetchEmployees();
    } catch (error) {
      console.error("Error deleting employee:", error);
    }
  };

  const resetForm = () => {
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      gender: "",
      dob: "",
      address: "",
      designation: "",
      department: "",
      joiningDate: "",
      salary: "",
      employeeId: "",
      password: "",
      confirmPassword: "",
    });
  };

  return (
    <div className="flex flex-col items-center p-6 space-y-8">
      {/* Add/Edit Employee Form */}
      <Card className="w-full max-w-3xl shadow-lg rounded-2xl">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-center">
            {editingId ? "Edit Employee" : "Add New Employee"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <div>
              <Label>First Name</Label>
              <Input
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <Label>Last Name</Label>
              <Input
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <Label>Email</Label>
              <Input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <Label>Phone</Label>
              <Input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <Label>Gender</Label>
              <Select
                onValueChange={(val) => handleSelect("gender", val)}
                value={formData.gender}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Date of Birth</Label>
              <Input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <Label>Employee ID</Label>
              <Input
                name="employeeId"
                value={formData.employeeId}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <Label>Designation</Label>
              <Input
                name="designation"
                value={formData.designation}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <Label>Department</Label>
              <Input
                name="department"
                value={formData.department}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <Label>Joining Date</Label>
              <Input
                type="date"
                name="joiningDate"
                value={formData.joiningDate}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <Label>Salary</Label>
              <Input
                type="number"
                name="salary"
                value={formData.salary}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <Label>Password</Label>
              <Input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <Label>Confirm Password</Label>
              <Input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>

            <div className="md:col-span-2">
              <Label>Address</Label>
              <Textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
              />
            </div>

            <div className="md:col-span-2 flex justify-center mt-4">
              <Button type="submit" className="w-1/2">
                {editingId ? "Update Employee" : "Add Employee"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Employee List */}
      <Card className="w-full max-w-5xl shadow-lg rounded-2xl">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-center">
            Employee List
          </CardTitle>
        </CardHeader>
        <CardContent>
          {employees.length === 0 ? (
            <p className="text-gray-500 text-center">No employees found</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border">
                <thead className="bg-gray-200">
                  <tr>
                    <th className="p-2 border">Employee ID</th>
                    <th className="p-2 border">Name</th>
                    <th className="p-2 border">Email</th>
                    <th className="p-2 border">Department</th>
                    <th className="p-2 border">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {employees.map((emp) => (
                    <tr key={emp.id} className="text-center border">
                      <td className="p-2 border">{emp.employeeId}</td>
                      <td className="p-2 border">
                        {emp.firstName} {emp.lastName}
                      </td>
                      <td className="p-2 border">{emp.email}</td>
                      <td className="p-2 border">{emp.department}</td>
                      <td className="p-2 border space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleEdit(emp)}
                        >
                          Edit
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleDelete(emp.id)}
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AddEmployee;

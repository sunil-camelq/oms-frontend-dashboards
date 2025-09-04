





import { useState, useEffect } from "react";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

type Applicant = {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  resume: File | null;
  coverLetter: File | null;
};

export default function AddApplicant() {
  const [formData, setFormData] = useState<Applicant>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    resume: null,
    coverLetter: null,
  });

  const [applicants, setApplicants] = useState<Applicant[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);

  // Fetch all applicants
  const fetchApplicants = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/applicants");
      setApplicants(res.data);
    } catch (error) {
      console.error("Error fetching applicants:", error);
    }
  };

  useEffect(() => {
    fetchApplicants();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: "resume" | "coverLetter"
  ) => {
    setFormData({
      ...formData,
      [field]: e.target.files ? e.target.files[0] : null,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const data = new FormData();
      data.append("firstName", formData.firstName);
      data.append("lastName", formData.lastName);
      data.append("email", formData.email);
      data.append("phone", formData.phone);

      if (formData.resume) {
        data.append("resume", formData.resume);
      }
      if (formData.coverLetter) {
        data.append("coverLetter", formData.coverLetter);
      }

      if (editingId) {
        await axios.put(
          `http://localhost:3000/api/applicants/${editingId}`,
          data
        );
        setEditingId(null);
      } else {
        await axios.post("http://localhost:3000/api/applicants", data);
      }

      fetchApplicants();
      resetForm();
    } catch (error) {
      console.error("Error submitting applicant:", error);
    }
  };

  const handleEdit = (applicant: Applicant) => {
    setFormData(applicant);
    setEditingId(applicant.id || null);
  };

  const handleDelete = async (id: number | undefined) => {
    if (!id) return;
    try {
      await axios.delete(`http://localhost:3000/api/applicants/${id}`);
      fetchApplicants();
    } catch (error) {
      console.error("Error deleting applicant:", error);
    }
  };

  const resetForm = () => {
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      resume: null,
      coverLetter: null,
    });
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100 p-6 space-y-10">
      {/* Applicant Form */}
      <Card className="w-full max-w-3xl p-8 shadow-lg rounded-2xl bg-white">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            {editingId ? "Edit Applicant" : "Add Applicant"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* First & Last Name */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label>First Name</Label>
                <Input
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  className="w-full"
                />
              </div>
              <div>
                <Label>Last Name</Label>
                <Input
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  className="w-full"
                />
              </div>
            </div>

            {/* Email & Phone */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label>Email</Label>
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full"
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
                  className="w-full"
                />
              </div>
            </div>

            {/* Resume Upload */}
            <div>
              <Label>Upload Resume</Label>
              <Input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={(e) => handleFileChange(e, "resume")}
                required={!editingId}
                className="w-full"
              />
            </div>

            {/* Cover Letter Upload */}
            <div>
              <Label>Upload Cover Letter</Label>
              <Input
                type="file"
                accept=".pdf"
                onChange={(e) => handleFileChange(e, "coverLetter")}
                required={!editingId}
                className="w-full"
              />
            </div>

            <Button type="submit" className="w-full text-lg py-3">
              {editingId ? "Update Applicant" : "Submit Applicant"}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Applicants List */}
      <Card className="w-full max-w-6xl p-8 shadow-lg rounded-2xl bg-white">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Applicants List
          </CardTitle>
        </CardHeader>
        <CardContent>
          {applicants.length === 0 ? (
            <p className="text-gray-500 text-center">No applicants found</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border text-sm md:text-base">
                <thead className="bg-gray-200">
                  <tr>
                    <th className="p-3 border">Name</th>
                    <th className="p-3 border">Email</th>
                    <th className="p-3 border">Phone</th>
                    <th className="p-3 border">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {applicants.map((app) => (
                    <tr key={app.id} className="text-center border hover:bg-gray-50">
                      <td className="p-3 border">
                        {app.firstName} {app.lastName}
                      </td>
                      <td className="p-3 border">{app.email}</td>
                      <td className="p-3 border">{app.phone}</td>
                      <td className="p-3 border space-x-2">
                        <Button
                          size="sm"
                          onClick={() => handleEdit(app)}
                          variant="outline"
                        >
                          Edit
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => handleDelete(app.id)}
                          variant="destructive"
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
}

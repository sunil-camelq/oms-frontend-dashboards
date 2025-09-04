import { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import {
  Search,
  UserPlus,
  Download,
  MoreHorizontal,
  Edit,
  Trash2,
  Eye,
  Mail,
  Phone,
  Users,
  UserCheck,
  UserX,
  Building2
} from 'lucide-react';
import { departments } from '@/data/mockData';
import { useToast } from '@/hooks/use-toast';

const Employees = () => {
  const { toast } = useToast();

  // Dummy data as fallback
  const dummyEmployees = [
    { id: 1, name: 'Hari Krishna', email: 'hk@camelq.com', role: 'Software Engineer', department: 'Engineering', status: 'Active', joinDate: '2023-04-15' },
    { id: 2, name: 'B Vijay', email: 'bv@camelq.com', role: 'Product Manager', department: 'Product', status: 'Inactive', joinDate: '2022-08-10' },
    { id: 3, name: 'S Behera', email: 'sb@camelq.com', role: 'UI/UX Designer', department: 'Design', status: 'Active', joinDate: '2021-01-20' },
  ];

  const [employees, setEmployees] = useState(dummyEmployees);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newEmployee, setNewEmployee] = useState({ name: '', email: '', role: '', department: '' });

  // Fetch employees from API or use dummy data
  useEffect(() => {
    // Uncomment when backend is ready
    /*
    axios.get('http://localhost:3000/api/employees')
      .then((res) => {
        if (res.data && res.data.length > 0) {
          setEmployees(res.data);
        }
      })
      .catch(() => {
        setEmployees(dummyEmployees);
      });
    */
    setEmployees(dummyEmployees);
  }, []);

  // Stats
  const totalEmployees = employees.length;
  const activeEmployees = employees.filter(e => e.status === 'Active').length;
  const inactiveEmployees = employees.filter(e => e.status === 'Inactive').length;
  const totalDepartments = departments.length;

  // CREATE
  const handleAddEmployee = () => {
    const payload = {
      ...newEmployee,
      status: 'Active',
      joinDate: new Date().toISOString(),
    };

    // Uncomment when backend is ready
    /*
    axios.post('http://localhost:3000/api/employees', payload)
      .then((res) => {
        setEmployees([...employees, res.data]);
        toast({ title: 'Employee Added', description: 'New employee added successfully' });
        setIsAddDialogOpen(false);
        setNewEmployee({ name: '', email: '', role: '', department: '' });
      })
      .catch(() => {
        toast({ title: 'Error', description: 'Failed to add employee', variant: 'destructive' });
      });
    */
    setEmployees([...employees, { id: Date.now(), ...payload }]);
    setIsAddDialogOpen(false);
  };

  // UPDATE
  const handleEdit = (employee) => {
    const updatedData = { ...employee, role: employee.role + ' (Updated)' };

    // Uncomment when backend is ready
    /*
    axios.put(`http://localhost:3000/api/employees/${employee.id}`, updatedData)
      .then((res) => {
        const updated = employees.map(e => e.id === employee.id ? res.data : e);
        setEmployees(updated);
        toast({ title: 'Employee Updated', description: `${employee.name} updated successfully` });
      })
      .catch(() => {
        toast({ title: 'Error', description: 'Failed to update employee', variant: 'destructive' });
      });
    */
    const updated = employees.map(e => e.id === employee.id ? updatedData : e);
    setEmployees(updated);
  };

  // DELETE
  const handleDelete = (employee) => {
    // Uncomment when backend is ready
    /*
    axios.delete(`http://localhost:3000/api/employees/${employee.id}`)
      .then(() => {
        const filtered = employees.filter(e => e.id !== employee.id);
        setEmployees(filtered);
        toast({ title: 'Employee Deleted', description: `${employee.name} removed`, variant: 'destructive' });
      })
      .catch(() => {
        toast({ title: 'Error', description: 'Failed to delete employee', variant: 'destructive' });
      });
    */
    const filtered = employees.filter(e => e.id !== employee.id);
    setEmployees(filtered);
  };

  // VIEW
  const handleView = (employee) => {
    toast({ title: 'Employee Profile', description: `Viewing ${employee.name}` });
  };

  // FILTER
  const filteredEmployees = employees.filter((employee) => {
    const matchesSearch =
      employee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee.role.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDepartment = selectedDepartment === 'all' || employee.department === selectedDepartment;
    const matchesStatus = selectedStatus === 'all' || employee.status === selectedStatus;
    return matchesSearch && matchesDepartment && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Employee Management</h1>
          <p className="text-muted-foreground mt-1">Manage your team members</p>
        </div>
      </div>

      {/* Compact Stats Cards */}
<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
  {/* Total Employees */}
  <Card className="shadow-sm rounded-lg border">
    <CardContent className="flex items-center justify-between p-4">
      <div>
        <h3 className="text-xs font-medium text-gray-500 uppercase">Total Employees</h3>
        <p className="mt-1 text-2xl font-bold text-gray-900">{totalEmployees}</p>
        <span className="text-xs text-gray-400">Overall count</span>
      </div>
      <div className="bg-indigo-100 p-2 rounded-md">
        <Users className="h-5 w-5 text-indigo-600" />
      </div>
    </CardContent>
  </Card>

  {/* Active Employees */}
  <Card className="shadow-sm rounded-lg border">
    <CardContent className="flex items-center justify-between p-4">
      <div>
        <h3 className="text-xs font-medium text-gray-500 uppercase">Active</h3>
        <p className="mt-1 text-2xl font-bold text-gray-900">{activeEmployees}</p>
        <span className="text-xs text-green-500">Currently active</span>
      </div>
      <div className="bg-green-100 p-2 rounded-md">
        <UserCheck className="h-5 w-5 text-green-600" />
      </div>
    </CardContent>
  </Card>

  {/* Inactive Employees */}
  <Card className="shadow-sm rounded-lg border">
    <CardContent className="flex items-center justify-between p-4">
      <div>
        <h3 className="text-xs font-medium text-gray-500 uppercase">Inactive</h3>
        <p className="mt-1 text-2xl font-bold text-gray-900">{inactiveEmployees}</p>
        <span className="text-xs text-red-500">On leave / resigned</span>
      </div>
      <div className="bg-red-100 p-2 rounded-md">
        <UserX className="h-5 w-5 text-red-600" />
      </div>
    </CardContent>
  </Card>

  {/* Departments */}
  <Card className="shadow-sm rounded-lg border">
    <CardContent className="flex items-center justify-between p-4">
      <div>
        <h3 className="text-xs font-medium text-gray-500 uppercase">Departments</h3>
        <p className="mt-1 text-2xl font-bold text-gray-900">{totalDepartments}</p>
        <span className="text-xs text-gray-400">Company-wide</span>
      </div>
      <div className="bg-yellow-100 p-2 rounded-md">
        <Building2 className="h-5 w-5 text-yellow-600" />
      </div>
    </CardContent>
  </Card>
</div>


      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4" />
              <Input
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
              <SelectTrigger className="lg:w-48"><SelectValue placeholder="All Departments" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Departments</SelectItem>
                {departments.map((dept) => (
                  <SelectItem key={dept.id} value={dept.name}>{dept.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="lg:w-32"><SelectValue placeholder="All Status" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Employee Table */}
      <Card>
        <CardHeader>
          <CardTitle>Total Employees ({filteredEmployees.length})</CardTitle>
          <CardDescription>Manage your team members and their roles</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Employee</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Join Date</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredEmployees.map((employee) => (
                  <TableRow key={employee.id}>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center text-white font-semibold">
                          {employee.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <p className="font-medium">{employee.name}</p>
                          <p className="text-sm text-muted-foreground">{employee.email}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{employee.role}</TableCell>
                    <TableCell><Badge variant="secondary">{employee.department}</Badge></TableCell>
                    <TableCell>
                      <Badge variant={employee.status === 'Active' ? 'default' : 'secondary'}>
                        {employee.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{new Date(employee.joinDate).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button variant="ghost" size="sm"><Mail className="h-4 w-4" /></Button>
                        <Button variant="ghost" size="sm"><Phone className="h-4 w-4" /></Button>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm"><MoreHorizontal className="h-4 w-4" /></Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleView(employee)}><Eye className="mr-2 h-4 w-4" /> View</DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleEdit(employee)}><Edit className="mr-2 h-4 w-4" /> Edit</DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleDelete(employee)} className="text-danger"><Trash2 className="mr-2 h-4 w-4" /> Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Employees;

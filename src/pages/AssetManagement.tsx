import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';

import {
  Download,
  FileText,
  Package,
  Layers,
  CheckCircle,
  AlertTriangle,
  Plus,
  Edit,
  Trash2
} from 'lucide-react';

// ======================== MOCK DATA ===============================

const initialAssets = [
  { id: 1, name: 'Dell Laptop', category: 'Electronics', status: 'In Use', value: 75000 },
  { id: 2, name: 'Office Chair', category: 'Furniture', status: 'Available', value: 3500 },
  { id: 3, name: 'Projector', category: 'Electronics', status: 'In Maintenance', value: 22000 },
  { id: 4, name: 'Air Conditioner', category: 'Appliances', status: 'In Use', value: 45000 },
  { id: 5, name: 'Printer', category: 'Electronics', status: 'In Use', value: 18000 }
];

const assetDistribution = [
  { category: 'Electronics', count: 15 },
  { category: 'Furniture', count: 8 },
  { category: 'Appliances', count: 6 }
];

const assetStatus = [
  { status: 'In Use', count: 18 },
  { status: 'Available', count: 6 },
  { status: 'In Maintenance', count: 5 }
];

const COLORS = ['#3B82F6', '#10B981', '#F59E0B'];

const AssetManagement = () => {
  const [assets, setAssets] = useState(initialAssets);

  // ========== CRUD OPERATIONS (mock) ================
  const handleAdd = () => {
    const newAsset = {
      id: assets.length + 1,
      name: `New Asset ${assets.length + 1}`,
      category: 'Miscellaneous',
      status: 'Available',
      value: 10000
    };
    setAssets([...assets, newAsset]);
  };

  const handleEdit = (id: number) => {
    const updatedAssets = assets.map((asset) =>
      asset.id === id ? { ...asset, status: 'In Use' } : asset
    );
    setAssets(updatedAssets);
  };

  const handleDelete = (id: number) => {
    const filtered = assets.filter((asset) => asset.id !== id);
    setAssets(filtered);
  };

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Asset Management</h1>
          <p className="text-muted-foreground mt-1">
            Track and manage company assets with full lifecycle operations
          </p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Assets
          </Button>
          <Button>
            <FileText className="h-4 w-4 mr-2" />
            Generate Report
          </Button>
        </div>
      </div>

      {/* SUMMARY CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="shadow-custom-md">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-gradient-primary rounded-2xl">
                <Layers className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Assets</p>
                <p className="text-2xl font-bold text-foreground">{assets.length}</p>
                <Badge variant="secondary" className="mt-1">Across categories</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-custom-md">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-gradient-success rounded-2xl">
                <CheckCircle className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">In Use</p>
                <p className="text-2xl font-bold text-foreground">
                  {assets.filter((a) => a.status === 'In Use').length}
                </p>
                <Badge variant="secondary" className="mt-1">Assigned to employees</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-custom-md">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-gradient-warning rounded-2xl">
                <AlertTriangle className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">In Maintenance</p>
                <p className="text-2xl font-bold text-foreground">
                  {assets.filter((a) => a.status === 'In Maintenance').length}
                </p>
                <Badge variant="secondary" className="mt-1">Needs attention</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* CHARTS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Asset by Category */}
        <Card className="shadow-custom-md">
          <CardHeader>
            <CardTitle>Assets by Category</CardTitle>
            <CardDescription>Current distribution</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={assetDistribution}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="category" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#3B82F6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Asset Status */}
        <Card className="shadow-custom-md">
          <CardHeader>
            <CardTitle>Asset Status</CardTitle>
            <CardDescription>Usage and availability</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={assetStatus}
                  dataKey="count"
                  nameKey="status"
                  outerRadius={90}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {assetStatus.map((entry, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* ASSET TABLE */}
      <Card className="shadow-custom-md">
        <CardHeader className="flex items-center justify-between">
          <div>
            <CardTitle>Asset Inventory</CardTitle>
            <CardDescription>Manage company assets</CardDescription>
          </div>
          <Button onClick={handleAdd}>
            <Plus className="h-4 w-4 mr-2" />
            Add Asset
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Value (₹)</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {assets.map((asset) => (
                <TableRow key={asset.id}>
                  <TableCell>{asset.id}</TableCell>
                  <TableCell>{asset.name}</TableCell>
                  <TableCell>{asset.category}</TableCell>
                  <TableCell>{asset.status}</TableCell>
                  <TableCell>{asset.value.toLocaleString()}</TableCell>
                  <TableCell className="flex space-x-2">
                    <Button variant="outline" size="icon" onClick={() => handleEdit(asset.id)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="destructive" size="icon" onClick={() => handleDelete(asset.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default AssetManagement;





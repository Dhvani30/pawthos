"use client";

import { useState } from 'react';
import ClientLayout from '@/components/ClientLayout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Search, 
  Filter, 
  Download, 
  Eye, 
  Edit,
  CheckCircle,
  Clock,
  AlertCircle,
  FileText,
  TrendingUp
} from 'lucide-react';

interface Consultation {
  id: string;
  caseId: string;
  ownerName: string;
  petName: string;
  species: string;
  city: string;
  phone: string;
  email: string;
  injury: string;
  status: 'submitted' | 'scanned' | 'designed' | 'printed' | 'fitted' | 'completed';
  submittedDate: string;
  lastUpdate: string;
}

export default function AdminDashboard() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  // Mock data - In production, this would come from an API
  const consultations: Consultation[] = [
    {
      id: '1',
      caseId: 'PAP-2025-1001',
      ownerName: 'Rajesh Kumar',
      petName: 'Buddy',
      species: 'dog',
      city: 'Mumbai',
      phone: '+91 98765 43210',
      email: 'rajesh@example.com',
      injury: 'Front leg amputation due to accident',
      status: 'designed',
      submittedDate: '2025-01-15',
      lastUpdate: '2025-01-18'
    },
    {
      id: '2',
      caseId: 'PAP-2025-1002',
      ownerName: 'Priya Sharma',
      petName: 'Mimi',
      species: 'cat',
      city: 'Delhi',
      phone: '+91 98765 43211',
      email: 'priya@example.com',
      injury: 'Back leg deformity from birth',
      status: 'scanned',
      submittedDate: '2025-01-16',
      lastUpdate: '2025-01-17'
    },
    {
      id: '3',
      caseId: 'PAP-2025-1003',
      ownerName: 'Amit Patel',
      petName: 'Rocky',
      species: 'dog',
      city: 'Bengaluru',
      phone: '+91 98765 43212',
      email: 'amit@example.com',
      injury: 'Leg injury from fall',
      status: 'fitted',
      submittedDate: '2025-01-14',
      lastUpdate: '2025-01-19'
    },
    {
      id: '4',
      caseId: 'PAP-2025-1004',
      ownerName: 'Sneha Reddy',
      petName: 'Luna',
      species: 'cat',
      city: 'Hyderabad',
      phone: '+91 98765 43213',
      email: 'sneha@example.com',
      injury: 'Leg infection requiring amputation',
      status: 'submitted',
      submittedDate: '2025-01-19',
      lastUpdate: '2025-01-19'
    },
    {
      id: '5',
      caseId: 'PAP-2025-1005',
      ownerName: 'Vikram Singh',
      petName: 'Max',
      species: 'dog',
      city: 'Pune',
      phone: '+91 98765 43214',
      email: 'vikram@example.com',
      injury: 'Front leg paralysis from accident',
      status: 'printed',
      submittedDate: '2025-01-13',
      lastUpdate: '2025-01-18'
    }
  ];

  const statusConfig = {
    submitted: { label: 'Submitted', color: 'bg-blue-500', icon: FileText },
    scanned: { label: 'Scanned', color: 'bg-purple-500', icon: Eye },
    designed: { label: 'Designed', color: 'bg-yellow-500', icon: Edit },
    printed: { label: 'Printed', color: 'bg-orange-500', icon: AlertCircle },
    fitted: { label: 'Fitted', color: 'bg-indigo-500', icon: Clock },
    completed: { label: 'Completed', color: 'bg-green-500', icon: CheckCircle }
  };

  const stats = [
    { label: 'Total Cases', value: '156', icon: FileText, color: 'text-blue-500' },
    { label: 'Active Cases', value: '23', icon: Clock, color: 'text-orange-500' },
    { label: 'Completed', value: '128', icon: CheckCircle, color: 'text-green-500' },
    { label: 'Success Rate', value: '95%', icon: TrendingUp, color: 'text-purple-500' }
  ];

  const filteredConsultations = consultations.filter(consultation => {
    const matchesSearch = 
      consultation.caseId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      consultation.ownerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      consultation.petName.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || consultation.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  return (
    <ClientLayout>
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Admin Dashboard
            </h1>
            <p className="text-gray-600 mt-2">Manage consultation requests and case status</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <Card key={index} className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                      <p className="text-3xl font-bold text-gray-900" style={{ fontFamily: 'Poppins, sans-serif' }}>
                        {stat.value}
                      </p>
                    </div>
                    <Icon className={`w-10 h-10 ${stat.color}`} />
                  </div>
                </Card>
              );
            })}
          </div>

          {/* Filters */}
          <Card className="p-6 mb-8">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    placeholder="Search by case ID, owner name, or pet name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              
              <div className="flex gap-2">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4CAF50]"
                >
                  <option value="all">All Status</option>
                  <option value="submitted">Submitted</option>
                  <option value="scanned">Scanned</option>
                  <option value="designed">Designed</option>
                  <option value="printed">Printed</option>
                  <option value="fitted">Fitted</option>
                  <option value="completed">Completed</option>
                </select>
                
                <Button variant="outline" size="icon">
                  <Download className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>

          {/* Cases Table */}
          <Card className="overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Case ID
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Owner / Pet
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Species
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Location
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Last Update
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredConsultations.map((consultation) => {
                    const statusInfo = statusConfig[consultation.status];
                    return (
                      <tr key={consultation.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="font-mono text-sm font-semibold text-gray-900">
                            {consultation.caseId}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div>
                            <p className="font-medium text-gray-900">{consultation.ownerName}</p>
                            <p className="text-sm text-gray-500">{consultation.petName}</p>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="capitalize text-sm text-gray-600">
                            {consultation.species}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                          {consultation.city}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Badge className={`${statusInfo.color} text-white`}>
                            {statusInfo.label}
                          </Badge>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                          {new Date(consultation.lastUpdate).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button variant="outline" size="sm">
                              <Edit className="w-4 h-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </Card>

          {/* No Results */}
          {filteredConsultations.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">No consultations found matching your criteria.</p>
            </div>
          )}
        </div>
      </div>
    </ClientLayout>
  );
}
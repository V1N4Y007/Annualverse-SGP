// import Link from "next/link";
import React, { useState, useEffect } from "react";
import { Layout } from "@/components/Layout";
import { DepartmentCard } from "@/components/DepartmentCard";
import { CustomizationPanel } from "@/components/CustomizationPanel";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";

// Sample data
const departments = [
  {
    id: "engineering",
    name: "Engineering",
    description: "Technical innovations and infrastructure development reports",
    reportCount: 8,
    lastUpdated: "2 days ago",
    color: "bg-blue-100",
  },
  {
    id: "marketing",
    name: "Marketing",
    description: "Brand campaigns, market analysis and promotional activities",
    reportCount: 5,
    lastUpdated: "1 week ago",
    color: "bg-green-100",
  },
];

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredDepartments, setFilteredDepartments] = useState(departments);

  useEffect(() => {
    const filtered = departments.filter((dept) =>
      dept.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dept.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredDepartments(filtered);
  }, [searchQuery]);

  return (
    <Layout>
      {/* Login and Sign Up Buttons */}
      <div className="flex justify-end p-4 space-x-4">
      <a href="/login">
  <Button variant="outline">Login</Button>
</a>

<a href="/signup">
  <Button variant="outline">sign in</Button>
</a>

      </div>

      <div className="min-h-screen pt-16">
        <div className="mb-8">
          <Badge variant="outline" className="mb-2">Dashboard</Badge>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Annual Report Portal
          </h1>
        </div>

        <div className="mb-8">
          <Tabs defaultValue="departments">
            <TabsList className="mb-4">
              <TabsTrigger value="departments">Departments</TabsTrigger>
            </TabsList>
            <TabsContent value="departments" className="space-y-6">
              <div className="flex flex-col space-y-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <input
                    type="text"
                    placeholder="Search departments or reports..."
                    className="w-full pl-10 pr-4 py-2 border rounded-md"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-2">
                  {filteredDepartments.map((department) => (
                    <DepartmentCard key={department.id} {...department} />
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <CustomizationPanel />
    </Layout>
  );
};

export default Index;

import React from "react";
import { Link } from "react-router-dom";
import { ChevronRight, Folder, Download } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import jsPDF from "jspdf";

export const DepartmentCard = ({
  id,
  name,
  description,
  reportCount,
  lastUpdated,
  color = "bg-primary/10",
}) => {

  const generatePDF = () => {
    const doc = new jsPDF();

    // Title
    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.text(`Department Report: ${name}`, 20, 20);

    // Content
    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    doc.text(`Description: ${description}`, 20, 40);
    doc.text(`Total Reports: ${reportCount}`, 20, 60);
    doc.text(`Last Updated: ${lastUpdated}`, 20, 80);
    // Save as PDF
    doc.save(`${name}-Report.pdf`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -5 }}
      className="h-full"
    >
      <Link to={`/department/${id}`} className="block h-full">
        <Card className="h-full overflow-hidden border card-hover">
          <CardHeader className="pb-2">
            <div className="flex items-start justify-between">
              <div className={cn("w-10 h-10 rounded-md flex items-center justify-center", color)}>
                <Folder className="w-5 h-5 text-primary" />
              </div>
              <Badge variant="outline" className="text-xs">
                {reportCount} {reportCount === 1 ? "report" : "reports"}
              </Badge>
            </div>
            <CardTitle className="text-xl mt-3 font-display">{name}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground line-clamp-2">{description}</p>
          </CardContent>
          <CardFooter className="flex items-center justify-between pt-2 text-xs text-muted-foreground">
            <span>Updated {lastUpdated}</span>
            <ChevronRight className="w-4 h-4" />
          </CardFooter>
          <CardFooter className="p-4">
            <Button onClick={generatePDF} className="w-full" variant="outline">
              <Download className="w-4 h-4 mr-2" /> Download Report
            </Button>
          </CardFooter>
        </Card>
      </Link>
    </motion.div>
  );
};

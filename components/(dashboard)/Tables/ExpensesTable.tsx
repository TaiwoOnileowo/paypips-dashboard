import React from "react";
import { File, ListFilter } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { expenses } from "@/lib/data/employeedata";

const ExpensesTable = () => {
  return (
    <Card
      className="rounded-3xl border-none mt-6"
      x-chunk="dashboard-05-chunk-3"
      style={{
        background:
          "linear-gradient(127deg, rgba(6, 11, 40, 0.74) 28.26%, rgba(10, 14, 35, 0.71) 91.2%)",
      }}
    >
      <CardHeader className="px-7 flex justify-between items-center w-full flex-row">
        <div>
          <CardTitle>Recent Expenses</CardTitle>
          <CardDescription>Recent SyncGram money outs.</CardDescription>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="h-7 gap-1 text-sm bg-card_gradient"
              >
                <ListFilter className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only">Filter</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-card_gradient">
              <DropdownMenuLabel>Filter by</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuCheckboxItem checked>
                Fulfilled
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem>Declined</DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem>Refunded</DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button
            size="sm"
            variant="outline"
            className="h-7 gap-1 text-sm bg-card_gradient"
          >
            <File className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only">Export</span>
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="h-7 gap-1 text-sm bg-card_gradient"
          >
            <File className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only">Add New</span>
          </Button>
        </div>
      </CardHeader>
      <CardContent className="w-full text-white overflow-auto">
        <Table className="w-full table-auto">
          <TableHeader>
            <TableRow>
              <TableHead>Vendor/Service</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {expenses.map((expense, i) => (
              <TableRow
                className="font-medium border-t p-4 border-[#56577A]/50"
                key={i}
              >
                <TableCell className="text-left font-medium max-md:text-sm">
                  {expense.vendor}
                </TableCell>
                <TableCell className="text-left text-sm font-medium max-md:text-xs">
                  {expense.amount}
                </TableCell>
                <TableCell className="text-left text-sm font-medium max-md:text-xs">
                  {expense.category}
                </TableCell>
                <TableCell className="text-left text-sm font-medium max-md:text-xs">
                  {expense.description}
                </TableCell>
                <TableCell className="text-left text-sm font-medium max-md:text-xs">
                  {expense.date}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default ExpensesTable;

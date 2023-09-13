import { Transaction } from "@/app/types/global";
import { TABLE_HEADERS } from "@/lib/constants";
import { AppContext } from "@/lib/context";
import { sortTransactions } from "@/lib/utils";
import { useContext } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { DashboardCard } from "./ui/dashboard-card";

export function LastTransactions() {
  const { transactions } = useContext(AppContext);

  const shortedTransactions = sortTransactions(transactions);
  const lastTransactions = shortedTransactions.slice(
    sortTransactions.length - 11
  );

  return (
    <DashboardCard title="Last transactions">
      <Table key="expenses-table">
        <TableHeader>
          <TableRow>
            {TABLE_HEADERS.map((header, index) => (
              <TableHead className="p-2 lg:pr-44 md:pr-28" key={index}>
                {header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        {lastTransactions.map((item: Transaction, index: number) => (
          <TableBody key={index}>
            <TableRow key={index}>
              <TableCell className="p-2" key={`${index}-date`}>
                {item.date}
              </TableCell>
              <TableCell className="p-2" key={`${index}-concept`}>
                {item.concept}
              </TableCell>
              <TableCell className="p-2" key={`${index}-amount`}>
                {item.amount}
              </TableCell>
              <TableCell className="p-2" key={`${index}-category`}>
                {item.category}
              </TableCell>
            </TableRow>
          </TableBody>
        ))}
      </Table>
    </DashboardCard>
  );
}
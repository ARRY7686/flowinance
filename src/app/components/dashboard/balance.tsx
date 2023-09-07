import { DashboardContext } from "@/lib/context";
import { useContext } from "react";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";

export function Balance() {
  const { transactions } = useContext(DashboardContext);

  function getBalance() {
    const balance = transactions.reduce((acc, curr) => {
      return acc + curr.amount;
    }, 0);

    return balance;
  }

  return (
    <Card className="pr-14">
      <CardHeader>
        <CardDescription>Balance</CardDescription>
        <CardTitle>{getBalance()}€</CardTitle>
      </CardHeader>
    </Card>
  );
}

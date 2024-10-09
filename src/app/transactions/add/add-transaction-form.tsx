"use client";
import { Button } from "@/app/components/ui/button";
import { Card } from "@/app/components/ui/card";
import { Input } from "@/app/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/components/ui/table";
import { useToast } from "@/app/components/ui/use-toast";
import { useSupabase } from "@/app/supabase-provider";
import { ALL_CATEGORIES } from "@/lib/categories";
import { TABLE_HEADERS } from "@/lib/constants";
import {
  addTransactionToSupabase,
  formatDateToString,
  getUserId,
} from "@/lib/utils";
import { useState } from "react";

export default function AddTransactionForm() {
  const [concept, setConcept] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const { supabase } = useSupabase();

  const { toast } = useToast();

  const date = formatDateToString(new Date());

  function handleAmountChange(value: any) {
    if (isNaN(value)) {
      toast({
        description: "ℹ️ Amount must be a positive number.",
      });
      return;
    }
    setAmount(value);
  }

  async function uploadTransaction() {
    const userId = await getUserId(supabase);
    if (!userId) {
      toast({
        description: "Error uploading transaction, try again later",
      });
      return;
    }
    const transaction = {
      concept,
      amount,
      category,
      date,
      user_id: userId,
    };
    await addTransactionToSupabase(supabase, transaction);
    resetForm();
  }

  function resetForm() {
    setConcept("");
    setAmount("");
    setCategory("");
    toast({
      description: "🎉 Transaction uploaded",
    });
  }

  return (
    <>
      <Card className="p-2">
        <Table key="form-table">
          <TableHeader>
            <TableRow>
              {TABLE_HEADERS.map((header, index) => (
                <TableHead className="p-2 lg:pr-44 md:pr-28" key={index}>
                  {header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="p-2" key="form-date">
                {date}
              </TableCell>
              <TableCell className="p-2" key="form-concept">
                <Input
                  onChange={(e) => setConcept(e.target.value)}
                  value={concept}
                  placeholder="Concept"
                />
              </TableCell>
              <TableCell className="p-2" key="form-amount">
                <Input
                  onChange={(e) => handleAmountChange(e.target.value)}
                  value={amount}
                  placeholder="Amount"
                />
              </TableCell>
              <TableCell className="p-2" key="form-category">
                <select
                  className="w-[180px] p-2 border rounded dark:text-gray-800"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="" disabled selected>
                    Select category
                  </option>
                  {ALL_CATEGORIES.map((item, index) => (
                    <option value={item} key={index}>
                      {item}
                    </option>
                  ))}
                </select>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Card>
      <div className="flex justify-center mt-10">
        <Button
          onClick={uploadTransaction}
          className="bg-emerald-200 text-black hover:text-white"
          disabled={!concept || !amount || !category}
        >
          Upload transaction
        </Button>
      </div>
    </>
  );
}

import React from "react";
import { useQuery } from "@apollo/client";
import { GetAllTransactions } from "../queries";
import { Transaction, TransactionsData } from "../types";
import { navigate } from "./NaiveRouter";
import { weiToEth } from "../utils";

const TransactionList: React.FC = () => {
  const { loading, error, data } =
    useQuery<TransactionsData>(GetAllTransactions);

  const handleNavigate = (hash: string) => navigate(`/transaction/${hash}`);

  function renderTransaction({ hash, to, from, value }: Transaction) {
    const weiToEthValue = value ? weiToEth(+value) : undefined;

    return (
      <div
        key={hash}
        className="bg-white shadow-sm p-4 md:p-5 border rounded border-gray-300 mt-3 hover:border-blue-500 cursor-pointer"
        onClick={() => handleNavigate(hash)}
      >
        <span className="font-bold">{weiToEthValue || value} ETH</span> sent from{" "}
        <span className="font-bold">{from}</span> to{" "}
        <span className="font-bold">{to}</span>
      </div>
    );
  }
  if (loading) {
    return (
      <div className="flex flex-col mt-20">
        <div className="max-w-[85rem] w-full mx-auto px-4 sm:flex sm:items-center sm:justify-between">
          Loading...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col mt-20">
        <div className="max-w-[85rem] w-full mx-auto px-4 sm:flex sm:items-center sm:justify-between text-red-600 font-bold">
          Error: {error.message}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col mt-20">
      <div className="max-w-[85rem] w-full mx-auto px-4 sm:flex sm:items-center sm:justify-between">
        <div className="p-1.5 min-w-full inline-block align-middle">
          {!!data?.getAllTransactions?.length ? (
            <>
              {data.getAllTransactions.map((transaction) =>
                renderTransaction(transaction)
              )}
            </>
          ) : (
            <p>No transactions available yet</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TransactionList;

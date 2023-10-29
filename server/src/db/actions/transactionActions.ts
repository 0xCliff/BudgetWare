import { Transaction } from '../schemas/transactions';

const getTransactionById = (id: string) => Transaction.findById(id);
const getTransactionsByCategory = (category: string) => Transaction.find({ category: category });
const createTransaction = (values: Record<string, any>) =>
  new Transaction(values).save().then((transaction: any) => transaction.toObject());
const deleteTransactionById = (id: string) => Transaction.findByIdAndDelete({ _id: id });
const updateTransactionById = (id: string, values: Record<string, any>) => Transaction.findByIdAndUpdate(id, values);

export { getTransactionById, createTransaction, deleteTransactionById, updateTransactionById };

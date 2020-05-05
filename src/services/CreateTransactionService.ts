import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: Omit<Transaction, 'id'>): Transaction {
    if (type !== 'income' && type !== 'outcome') {
      throw Error(
        "Invalid 'type' for request: should be 'income' or 'outcome'.",
      );
    }
    if (
      value > this.transactionsRepository.getBalance().total &&
      type === 'outcome'
    ) {
      throw Error('Insufficient balance to complete operation.');
    }
    const transaction = this.transactionsRepository.create({
      title,
      value,
      type,
    });
    return transaction;
  }
}

export default CreateTransactionService;

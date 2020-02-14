class Transaction {
  constructor(amount, account) {
    this.amount = amount;
    this.account = account;
  }
  commit() {
    if (this.isAllowed() === false) {
      return false;
    }
    this.time = new Date();
    this.account.addTransaction(this);
    return true;
  }
}

class Withdrawal extends Transaction {
  get value() {
    return -this.amount;
  }
  isAllowed() {
    if (this.account.balance < this.amount) {
      return false;
    }
    return true;
  }
}

class Deposit extends Transaction {
  get value() {
    return this.amount;
  }
  isAllowed() {
    return true;
  }
}

class Account {
  constructor(username) {
    this.username = username;
    this.transaction = [];
  }
  get balance() {
    let balance = 0;
    for (const t of this.transaction) {
      balance += t.value;
    }
    return balance;
  }
  addTransaction(transaction) {
    this.transaction.push(transaction);
  }
}

// DRIVER CODE BELOW
// We use the code below to "drive" the application logic above and make sure it's working as expected

const myAccount = new Account("snow-patrol");

t1 = new Withdrawal(50.25, myAccount);
t1.commit();
console.log("Transaction 1:", t1);
console.log("Transaction success? ", t1.isAllowed());
console.log("Balance: ", myAccount.balance);

t2 = new Withdrawal(9.99, myAccount);
t2.commit();
console.log("Transaction 2:", t2);
console.log("Transaction success? ", t1.isAllowed());
console.log("Balance: ", myAccount.balance);

t3 = new Deposit(120.0, myAccount);
t3.commit();
console.log("Transaction 3:", t3);
console.log("Transaction success? ", t1.isAllowed());
console.log("Balance:", myAccount.balance);

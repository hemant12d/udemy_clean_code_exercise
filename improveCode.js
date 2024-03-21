main();

function main() {
  const transactions = [
    {
      id: "t1",
      type: "PAYMENT",
      status: "OPEN",
      method: "CREDIT_CARD",
      amount: "23.99",
    },
    {
      id: "t2",
      type: "PAYMENT",
      status: "OPEN",
      method: "PAYPAL",
      amount: "100.43",
    },
    {
      id: "t3",
      type: "REFUND",
      status: "OPEN",
      method: "CREDIT_CARD",
      amount: "10.99",
    },
    {
      id: "t4",
      type: "PAYMENT",
      status: "CLOSED",
      method: "PLAN",
      amount: "15.99",
    },
  ];

  try {
    processTransactions(transactions);
  }catch(error){
    console.log(error.message)
  }
}

function processTransactions(transactions) {

    validateTransactions(transactions)

    for (const transaction of transactions) {    
        try {
            processTransaction(transaction)
        }catch(error){
            console.log(error.message)
        }
    }
 
}

function processTransaction(transaction) {

    validateTransaction(transaction)

    processor = getTransactionProcessor()

    if (transaction.type === "PAYMENT") {
        processor.payment()
    }
    else {
        processor.refund()
    }


}

function validateTransactions(transactions){
    if (isEmpty(transactions)) {
        const error = new Error("No transactions provided!");
        error.code = 1;
        throw error
    }
}

function validateTransaction(transaction){
    if (transaction.status === "OPEN"){
        error = new Error("Invalid transaction type!");
        error.code = 1
        throw error
    }

    if (transaction.type !== "PAYMENT" && transaction.type === "REFUND")  {
        error = new Error("Invalid transaction type!");
        error.code = 1
        error.item = transaction
        throw error
    }
}

function isEmpty(transactions) {
    return !transactions || transactions.length === 0;
}



function getTransactionProcessor(transaction) {
    processor = {
        payment: null,
        refund: null
    }

    if (transaction.method === "CREDIT_CARD"){
        processor.payment = processCreditCardPayment
        processor.refund = processCreditCardRefund
    } else if (transaction.method === "PAYPAL") {
        processor.payment = processPayPalPayment
        processor.refund = processPayPalRefund
    } else if (transaction.method === "PLAN") {
        processor.payment = processPlanPayment
        processor.refund = processPlanRefund
    }

    return processor
}

function processCreditCardPayment(transaction) {
  console.log(
    "Processing credit card payment for amount: " + transaction.amount
  );
}

function processCreditCardRefund(transaction) {
  console.log(
    "Processing credit card refund for amount: " + transaction.amount
  );
}

function processPayPalPayment(transaction) {
  console.log("Processing PayPal payment for amount: " + transaction.amount);
}

function processPayPalRefund(transaction) {
  console.log("Processing PayPal refund for amount: " + transaction.amount);
}

function processPlanPayment(transaction) {
  console.log("Processing plan payment for amount: " + transaction.amount);
}

function processPlanRefund(transaction) {
  console.log("Processing plan refund for amount: " + transaction.amount);
}

# Project Title

Challenge2-solana

## Description

Building on Solana using Javascript - A close look at transactions and fees.

## Getting Started

* Clone this repository to get an exact copy of this program on your computer by running the following command.

```
git clone https://github.com/Adesdesk/Challenge2-solana.git
```
### Installing

* Open the repository folder (now in your device) using an IDE like VSCode where you can simultaneously use the terminal.
* In the terminal, ensure to be pointing at the project folder and run the following command
```
npm install
```

### Executing program

Open the file "index.js" where you will find a section of code delimited within two sets of continous lines as follows.
```
// _________________________________________________________________________________________________________
Block(s) of code...
// _________________________________________________________________________________________________________
```

* The code block in the first of these sets of lines enables you create a wallet and derive its secret key (in the "DEMO_FROM_SECRET_KEY" array).
* The code block in the second of these sets of lines implements the function "transferSol" which helps to derive a Keypair from its Secret Key, generate another Keypair - the receiving wallet, aidrop 2 SOL to Sender wallet, and send funds from the "from" wallet into "to" wallet.
* The active code blocks outside the lines and comments implement a transaction that fetches the balance of the sender wallet, transfers 50% of that amount to the receiver wallet, and outputs coresponding wallet balances to the console.
* In terminal, ensure that you are accessing this project folder 
* Once in, run the following command, ensuring to understand and comment out the irrelevant blocks of code for each transaction you prefer to run at each instance. 

```
node index.js
```

## Help

* You must have NodeJS installed to your PC to run this program as described.

## Authors

Contributor(s) names and contact info

Name: Adeola David Adelakun  

Email: aadelakun28@gmail.com

## License

This project is licensed under the MIT License - see the LICENSE.md file for details
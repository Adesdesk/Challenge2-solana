// Import Solana web3 functionalities
const {
    Connection,
    PublicKey,
    clusterApiUrl,
    Keypair,
    LAMPORTS_PER_SOL,
    Transaction,
    SystemProgram,
    sendAndConfirmRawTransaction,
    sendAndConfirmTransaction
} = require("@solana/web3.js");


// Get the sender wallet and derive its secret key [array below] thus;
// const _from = Keypair.generate();
//     console.log('The new keypair is: ', _from.secretKey);

const DEMO_FROM_SECRET_KEY = new Uint8Array(
    [
        219, 176, 171, 130, 190, 250, 213,  32, 110,  46, 195,
        188, 128, 202, 242, 213,  26, 251, 248,  40, 109, 140,
          7, 117,  82,  14,  89,  65,  58,  49, 127,  29,  72,
        166, 219,  80,  59, 180,  21, 242, 211,  43,  42,  14,
         90,  73,  29, 250, 143, 150, 112, 117,  80,  82, 102,
         67,  11, 200, 233, 121, 207,  56, 243,  27
      ]            
);


const transferSol = async () => {
    const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

    // Get Keypair from Secret Key
    var from = Keypair.fromSecretKey(DEMO_FROM_SECRET_KEY);

    // Generate another Keypair (account we'll be sending to)
    const to = Keypair.generate();

    // Get the balance of the sender's wallet
    const senderBalance = await connection.getBalance(from.publicKey);
    console.log("Sender balance:", senderBalance / LAMPORTS_PER_SOL, "SOL");

    // Calculate the amount to transfer (50% of the sender's balance)
    const transferAmount = senderBalance / 2;

    // Send money from "from" wallet to "to" wallet
    var transaction = new Transaction().add(
        SystemProgram.transfer({
            fromPubkey: from.publicKey,
            toPubkey: to.publicKey,
            lamports: transferAmount
        })
    );

    // Sign transaction
    var signature = await sendAndConfirmTransaction(
        connection,
        transaction,
        [from]
    );
    console.log('Transfer completed. Signature:', signature);

    // Get the balance of the recipient's wallet
    const recipientBalance = await connection.getBalance(to.publicKey);
    console.log("Recipient balance:", recipientBalance / LAMPORTS_PER_SOL, "SOL");
};

transferSol();

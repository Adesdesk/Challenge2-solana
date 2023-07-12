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

/*
// __________________________________________________________________________________
// Get the sender wallet and derive its secret key [array below] thus;
const _from = Keypair.generate();
    console.log('The new keypair is: ', _from.secretKey);
// __________________________________________________________________________________
*/

const DEMO_FROM_SECRET_KEY = new Uint8Array(
    [
        13, 232, 188,  31, 197, 128,  71, 121,  96, 116, 245,
        75,  16,  95,  79, 110,  72,  46,  88,  19, 251, 151,
        36, 167, 171,  43,  25,  62, 182, 140, 196,  64, 107,
        149, 239, 138,  85, 149, 172,  99,  68, 214, 205, 126,
        114,  54,  33, 127,  90, 200, 149, 141,  86, 230, 119,
        44, 204,  65,  88, 100,  76, 232,  56, 128
        ]            
);

/*
// __________________________________________________________________________________
const transferSol = async() => {
    const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

    // Get Keypair from Secret Key
    var from = Keypair.fromSecretKey(DEMO_FROM_SECRET_KEY);

    // Other things to try: 
    // 1) Form array from userSecretKey
    // const from = Keypair.fromSecretKey(Uint8Array.from(userSecretKey));
    // 2) Make a new Keypair (starts with 0 SOL)
    // const from = Keypair.generate();

    // Generate another Keypair (account we'll be sending to)
    const to = Keypair.generate();

    // Aidrop 2 SOL to Sender wallet
    console.log("Airdopping some SOL to Sender wallet!");
    const fromAirDropSignature = await connection.requestAirdrop(
        new PublicKey(from.publicKey),
        2 * LAMPORTS_PER_SOL
    );

    // Latest blockhash (unique identifer of the block) of the cluster
    let latestBlockHash = await connection.getLatestBlockhash();

    // Confirm transaction using the last valid block height (refers to its time)
    // to check for transaction expiration
    await connection.confirmTransaction({
        blockhash: latestBlockHash.blockhash,
        lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
        signature: fromAirDropSignature
    });

    console.log("Airdrop completed for the Sender account");

    // Send money from "from" wallet and into "to" wallet
    var transaction = new Transaction().add(
        SystemProgram.transfer({
            fromPubkey: from.publicKey,
            toPubkey: to.publicKey,
            lamports: LAMPORTS_PER_SOL / 100
        })
    );

    // Sign transaction
    var signature = await sendAndConfirmTransaction(
        connection,
        transaction,
        [from]
    );
    console.log('Signature is ', signature);
// __________________________________________________________________________________
}*/

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


// invoke the transferSol() function
transferSol();
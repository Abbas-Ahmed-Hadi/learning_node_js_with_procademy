// 4- First Node.js Project
import readline from 'readline';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question("Enter your name: ", (name) => {
    console.log("Your name:", name);
    rl.close();
});

rl.on("close", () => {
    console.log("\nInterface is closed.");
    process.exit(0);
});

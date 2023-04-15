import yargs from "yargs";
import { saveContacts } from "./contacts.js";
import { hideBin } from "yargs/helpers";

yargs(hideBin(process.argv))
  .command({
    command: "add",
    describe: "Menambahkan contact baru",
    builder: {
      nama: {
        describe: "Nama lengkap",
        demandOption: true,
        type: "string",
      },
      email: {
        describe: "Nama lengkap",
        demandOption: false,
        type: "string",
      },
      noHP: {
        describe: "Nama lengkap",
        demandOption: true,
        type: "string",
      },
    },
    handler: (argv) => {
      saveContacts(argv.nama, argv.email, argv.noHP);
    },
  })
  .parse();

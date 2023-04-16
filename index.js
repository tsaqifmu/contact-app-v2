import yargs from "yargs";
import {
  saveContacts,
  listContact,
  detailContact,
  deleteContact,
} from "./contacts.js";
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
  //command to show name and number phone list contact
  .command({
    command: "list",
    describe: "Menampilkan semua nama & no HP",
    handler() {
      listContact();
    },
  })
  //command to show detail list contact
  .command({
    command: "detail",
    describe: "Menampilkan detail sebuah contact berdasarkan nama",
    builder: {
      nama: {
        describe: "Nama lengkap",
        demandOption: true,
        type: "string",
      },
    },
    handler(argv) {
      detailContact(argv.nama);
    },
  })
  //delete contact by name
  .command({
    command: "delete",
    describe: "menghapus sebuah contact berdasarkan nama",
    builder: {
      nama: {
        describe: "Nama lengkap",
        demandOption: true,
        type: "string",
      },
    },
    handler(argv) {
      deleteContact(argv.nama);
    },
  })
  .demandCommand()

  //show all contacts name & phone number

  .parse();

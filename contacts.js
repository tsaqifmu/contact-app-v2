import { existsSync, readFileSync } from "node:fs";
import * as fs from "node:fs/promises";
import chalk from "chalk";
import validator from "validator";

// make data folder
const dirPath = "./data";
if (!existsSync(dirPath)) {
  fs.mkdir(dirPath);
}

// make contacs.json if not already there
const dataPath = "./data/contacts.json";
if (!existsSync(dataPath)) {
  fs.writeFile(dataPath, "[]", "utf-8");
}

export const saveContacts = (nama, email, noHp) => {
  const contact = { nama, email, noHp };

  //read data folder first
  const file = readFileSync(dataPath, "utf-8");

  //change from string to json so it can be pushed
  const contacts = JSON.parse(file);

  // duplicate name check
  const duplikat = contacts.find((contact) => contact.nama === nama);
  if (duplikat) {
    console.log(
      chalk.whiteBright.bgRed.bold("kontak sudah terdaftar, gunakan nama lain"),
    );
    return false;
  }

  // email check
  if (email) {
    if (!validator.isEmail(email)) {
      console.log(chalk.red.inverse.bold("Email tidak valid"));
      return false;
    }
  }

  // mobilephone check
  if (!validator.isMobilePhone(noHp, "id-ID")) {
    console.log(chalk.red.inverse.bold("nomor HP tidak valid"));
    return false;
  }

  // push to contacts
  contacts.push(contact);

  //write file into contacts.json
  fs.writeFile(dataPath, JSON.stringify(contacts));
  console.log(chalk.green.inverse.bold(`Data berhasil di masukkan`));
};

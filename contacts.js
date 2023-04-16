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

// load Contacts
const loadContact = () => {
  //read data folder first
  const file = readFileSync(dataPath, "utf-8");

  //change from string to json so it can be pushed
  const contacts = JSON.parse(file);
  return contacts;
};

export const saveContacts = (nama, email, noHp) => {
  const contact = { nama, email, noHp };

  // load contacts
  const contacts = loadContact();

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

export const listContact = () => {
  const contacts = loadContact();
  console.log(chalk.blueBright.inverse.bold(`Daftar kontak`));
  contacts.forEach((contact, i) => {
    console.log(`${i + 1}. ${contact.nama} - ${contact.noHp}`);
  });
};

export const detailContact = (nama) => {
  const contacts = loadContact();
  const contact = contacts.find(
    (contact) => contact.nama.toLowerCase() === nama.toLowerCase(),
  );
  //if contact not match
  if (!contact) {
    console.log(chalk.red.inverse.bold(`${nama} tidak ditemukan`));
    return false;
  }

  // contact match
  console.log(
    chalk.blueBright.inverse.bold(
      `contact dengan nama ${contact.nama} ditemukan`,
    ),
  );
  console.log(`${contact.nama}`);
  console.log(`${contact.noHp}`);
  if (contact.email) {
    console.log(`${contact.email}`);
  }
};

export const deleteContact = (nama) => {
  const contacts = loadContact();
  const newContacts = contacts.filter(
    (contact) => contact.nama.toLowerCase() !== nama.toLowerCase(),
  );

  if (contacts.length === newContacts.length) {
    console.log(chalk.red.inverse.bold(`${nama} tidak ditemukan`));
    return false;
  }

  fs.writeFile(dataPath, JSON.stringify(newContacts));
  console.log(
    chalk.green.inverse.bold(`data contact ${nama} berhasil dihapus`),
  );
};

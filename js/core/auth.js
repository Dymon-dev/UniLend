// auth.js: demo account creation and sign-in.
//
// DEMO ONLY: accounts and passwords are saved in localStorage, which anyone
// can read in dev tools. This is NOT real authentication.
// TODO: BACKEND: replace with server-side sign-up and secure sessions.

import { resetDemoData, saveDB, setSession } from "./storage.js";

export function registerUser({ fullName, email, phone, password }) {
  const cleanEmail = email.trim().toLowerCase();
  const db = resetDemoData(); // fresh demo data; one account per browser

  db.user = {
    id: crypto.randomUUID(),
    fullName: fullName.trim(),
    email: cleanEmail,
    phone: phone.replace(/[\s-]/g, ""), // store digits only, no spaces or dashes
    // TODO: BACKEND: never store plain-text passwords
    password,
    createdAt: new Date().toISOString(),
  };

  saveDB(db);
  setSession(cleanEmail); // setSession expects a plain string
}
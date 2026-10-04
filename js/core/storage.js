// storage.js: the ONLY file that reads or writes localStorage.
// Every other file asks this one for data.
//
// DEMO ONLY: localStorage can be viewed and edited by anyone using
// browser dev tools, so it is never secure.
// TODO: BACKEND: replace this file with calls to a real server + database.

const DB_KEY = "unilend_db";           // all app data lives under this key
const SESSION_KEY = "unilend_session"; // who is logged in (kept separate)

// Returns a date string like "2026-10-04", offset by N days from today.
// Uses local date parts (not toISOString) so the day isn't shifted by time zone.
function daysFromToday(offset) {
  const date = new Date();
  date.setDate(date.getDate() + offset);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

// The starting data for a new demo account. Edit these values freely.
// All money is in CENTAVOS: 2035000 = ₱20,350.00
function createSeedData() {
  return {
    user: null, // filled in when the student registers (Phase 3)
    verification: {
      studentId: "pending",   // "pending" | "verified"
      enrollment: "pending",  // "pending" | "verified"
      school: "Manuel S. Enverga University",
      term: "Spring 2026",
    },
    wallet: { balanceCentavos: 2035000 },
    loan: {
      originalCentavos: 1550000,       // ₱15,500.00 borrowed
      remainingCentavos: 1569000,      // ₱15,690.00 owed (includes interest)
      aprPercent: 3.5,
      termMonths: 6,
      minimumPaymentCentavos: 261500,  // ₱2,615.00 per month
      nextDueDate: daysFromToday(14),
      availableCreditCentavos: 1050000, // ₱10,500.00
    },
    budget: { weeklyLimitCentavos: 500000 }, // ₱5,000.00
    transactions: [
      { id: "t1", type: "deposit",   description: "Allowance top-up",    amountCentavos: 500000, direction: "in",  date: daysFromToday(-6), status: "completed" },
      { id: "t2", type: "transfer",   description: "Sent to John Smith",  amountCentavos: 80000,  direction: "out", date: daysFromToday(-4), status: "completed" },
      { id: "t3", type: "expense",    description: "Lunch",               amountCentavos: 125000, direction: "out", date: daysFromToday(-1), status: "completed" },
    ],
    expenses: [
      { id: "e1", category: "Food",           description: "Groceries and meals", amountCentavos: 125000, date: daysFromToday(-1) },
      { id: "e2", category: "Transportation", description: "Jeep and tricycle",   amountCentavos: 80000,  date: daysFromToday(-2) },
      { id: "e3", category: "Other",          description: "Printing",            amountCentavos: 30000,  date: daysFromToday(-3) },
    ],
    contacts: [
      { id: "c1", name: "John Smith",   email: "john.smith@university.edu" },
      { id: "c2", name: "Emma Davis",   email: "emma.d@university.edu" },
      { id: "c3", name: "Mike Chen",    email: "m.chen@university.edu" },
      { id: "c4", name: "Emman Wilson", email: "e.wilson@university.edu" },
    ],
    settings: { notifications: { transfers: true, reminders: true } },
  };
}

// ---- DATABASE ----

// Reads the saved data. Returns null if nothing is saved yet
// OR if the saved text is damaged (so the app never crashes on bad JSON).
export function loadDB() {
  try {
    const savedText = localStorage.getItem(DB_KEY);
    return savedText ? JSON.parse(savedText) : null;
  } catch (error) {
    console.error("Could not read saved data:", error);
    return null;
  }
}

// Saves the whole data object. Pages call this after changing something.
export function saveDB(db) {
  localStorage.setItem(DB_KEY, JSON.stringify(db));
}

// Returns the data, creating the seed data first if none exists yet.
// Most pages will call this instead of loadDB().
export function ensureDB() {
  let db = loadDB();
  if (!db) {
    db = createSeedData();
    saveDB(db);
  }
  return db;
}

// Wipes everything back to the starting data (handy while developing).
export function resetDemoData() {
  const db = createSeedData();
  saveDB(db);
  return db;
}

// ---- SESSION ----

export function getSession() {
  try {
    const savedText = localStorage.getItem(SESSION_KEY);
    return savedText ? JSON.parse(savedText) : null;
  } catch (error) {
    return null;
  }
}

export function setSession(email) {
  localStorage.setItem(
    SESSION_KEY,
    JSON.stringify({ email, loggedInAt: new Date().toISOString() })
  );
}

export function clearSession() {
  localStorage.removeItem(SESSION_KEY);
}
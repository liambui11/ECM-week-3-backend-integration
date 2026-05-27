// Simple auto-incrementing ID generator for in-memory data.

const INITIAL_ID = 6; // Mock data uses IDs 1–5

let currentId: number = INITIAL_ID;

export const generateId = (): number => {
  const id = currentId;
  currentId += 1;
  return id;
};

export const resetIdCounter = (): void => {
  currentId = INITIAL_ID;
};

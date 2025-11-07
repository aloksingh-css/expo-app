export function getGreeting(name: string): string {
  if (!name || name.trim() === '') {
    throw new Error('Name cannot be empty');
  }
  return `Hello, ${name}!`;
}

export function getFormalGreeting(name: string): string {
  if (!name || name.trim() === '') {
    throw new Error('Name cannot be empty');
  }
  return `Good day, ${name}.`;
}


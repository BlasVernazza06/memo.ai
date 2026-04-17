const apiUrl = process.env.API_URL;

export async function getWorkspaces() {
  const response = await fetch(`${apiUrl}/workspaces`);
  const data = await response.json();
  return data;
}

export async function getFlashcards() {
  const response = await fetch(`${apiUrl}/workspaces`);
  const data = await response.json();
  return data;
}

export async function getQuizzes() {
  const response = await fetch(`${apiUrl}/workspaces/`);
  const data = await response.json();
  return data;
}

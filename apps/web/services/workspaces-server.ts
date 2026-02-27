const apiUrl = process.env.API_URL;

export async function getWorkspaces() {
  const response = await fetch(`${apiUrl}/workspaces`);
  const data = await response.json();
  return data;
}

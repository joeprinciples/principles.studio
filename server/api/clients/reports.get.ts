// Returns the logged-in client's own report list for the /clients index page.
export default defineEventHandler(async (event) => {
  const { user } = await requireUserSession(event);
  const client = String(user.client);
  return {
    client,
    label: user.label,
    reports: await listReports(client),
  };
});

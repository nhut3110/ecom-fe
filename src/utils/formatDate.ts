export const formatDate = (dateString?: string) => {
  if (!dateString) return new Date().toString();

  const date = new Date(dateString);
  return date.toLocaleDateString("en-GB").toString();
};

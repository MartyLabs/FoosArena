export const truncateText = (text, maxLength = 20) => {
  if (!text) return "Aucune description disponible";
  return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
};

export const formatDate = (dateString) => {
  if (!dateString) return "Date unknown";
  return new Date(dateString).toLocaleDateString("fr-FR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

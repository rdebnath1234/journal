export const formatDate = (date) =>
  new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
  }).format(new Date(date));

export const truncate = (text, length = 140) => {
  if (!text) return '';
  return text.length > length ? `${text.slice(0, length)}...` : text;
};

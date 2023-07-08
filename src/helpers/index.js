export function scrollToTop(ref) {
  ref.current?.scrollToOffset({
    offset: 0,
    animated: true,
  });
}

export function formatDate(date) {
  const currentDate = new Date();
  const inputDate = new Date(date);
  const diffTime = Math.abs(currentDate - inputDate);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return `${diffDays}d`;
}

export function getTimeAgo(date) {
  const diffMillis = new Date() - date;
  const diffMinutes = Math.floor(diffMillis / (1000 * 60));
  const diffHours = Math.floor(diffMillis / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMillis / (1000 * 60 * 60 * 24));

  if (diffDays > 0) {
    return `${diffDays} ${diffDays === 1 ? 'day' : 'days'} ago`;
  } else if (diffHours > 0) {
    return `${diffHours} ${diffHours === 1 ? 'hour' : 'hours'} ago`;
  } else {
    return `${diffMinutes} ${diffMinutes === 1 ? 'minute' : 'minutes'} ago`;
  }
}
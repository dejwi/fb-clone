import differenceInHours from 'date-fns/differenceInHours'
import differenceInMinutes from 'date-fns/differenceInMinutes'

const niceDate = (date: string) => {
  const now = new Date();
  const postDate = new Date(date);
  const diffHrs = differenceInHours(now, postDate);
  const diffMins = differenceInMinutes(now, postDate);
  const fullDate = postDate.toLocaleDateString("en-gb", {
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
  const displayDate =
    diffMins < 5
      ? `Just now`
      : diffHrs < 1
        ? `${diffMins}m`
        : diffHrs > 24
          ? fullDate
          : `${diffHrs}h`;
  return displayDate;
};

export default niceDate;

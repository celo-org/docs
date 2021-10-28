import { GET_GITHUB_STATS, GET_NPM_DOWNLOADS_IN_RANGE } from './stats.routes';
import { GITHUB_FORKS, GITHUB_STARS, NPM_DOWNLOADS } from './stats.controller';
import { GetGithubStatsInterface } from './stats.interface';

const nextMonth = (date: Date) => {
  date.setMonth(date.getMonth() + 1);
  return date;
};

const formatDate = (date: Date) => {
  return date.toISOString().slice(0, 10);
};

const getDateMonthRanges = (from: Date, to: Date) => {
  const dates = [];

  while (from < to)
    dates.push(`${formatDate(from)}:${formatDate(nextMonth(from))}`);

  return dates;
};

export const getGithubStats = async (): Promise<GetGithubStatsInterface> => {
  const stats = await GET_GITHUB_STATS();

  GITHUB_STARS.set(stats.stars);
  GITHUB_FORKS.set(stats.forks);

  return stats;
};

export const getNPMDownloads = async (
  from: Date = new Date('2020-08-24'),
  to: Date = new Date()
): Promise<number> => {
  const dates = getDateMonthRanges(from, to);
  const lastRange = dates.pop()!;

  const downloadsArray = await Promise.all(
    dates
      .map((range) => GET_NPM_DOWNLOADS_IN_RANGE(range))
      .concat(GET_NPM_DOWNLOADS_IN_RANGE(lastRange))
  );
  const downloads = downloadsArray.reduce((a, b) => a + b, 0);

  NPM_DOWNLOADS.set(downloads);

  return downloads;
};

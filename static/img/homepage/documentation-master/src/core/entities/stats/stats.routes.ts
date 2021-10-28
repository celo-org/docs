import api from '../../api';
import { GetGithubStatsInterface } from './stats.interface';

export const GET_GITHUB_STATS = async (): Promise<GetGithubStatsInterface> => {
  const response = await api
    .with({
      baseURL: `https://api.github.com`,
    })
    .get(`repos/agile-ts/agile`);

  return {
    stars: response.data.stargazers_count || 0,
    forks: response.data.forks_count || 0,
  };
};

export const GET_NPM_DOWNLOADS_IN_RANGE = async (
  range: string
): Promise<number> => {
  const response = await api
    .with({
      baseURL: `https://api.npmjs.org`,
    })
    .get(`downloads/point/${range}/@agile-ts/core`);

  return response.data.downloads || 0;
};

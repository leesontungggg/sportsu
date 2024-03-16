import customAxios from './interceptor';

export const handleGetLeagues = (date: any) => {
  return customAxios.get(`/leagues/date/${date}`);
};

export const handleGetLeague = (league_id: String) => {
  return customAxios.get(`/leagues/${league_id}`);
};

export const handleGetLiveLeagues = () => {
  return customAxios.get('/leagues/live');
};

export const handleGetVenues = () => {
  return customAxios.get('/venues');
};

export const handleGetFixtures = (isLive: boolean, date: any) => {
  return customAxios.get(
    `/${
      isLive ? 'livescores/inplay' : `fixtures/date/${date}`
    }?include=league;participants;events;state`,
  );
};

export const handleGetDetailFixture = (fixtureId: String) => {
  return customAxios.get(
    `/fixtures/${fixtureId}?include=league;participants;events;state;statistics;timeline`,
  );
};

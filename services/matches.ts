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

export const handleSearchFixturesByParticipantName = (name: any) => {
  return customAxios.get(
    `/fixtures?filter=participantsearch:${name};todaydate&include=participants`,
  );
};

export const handleGetDetailFixture = (fixtureId: String) => {
  return customAxios.get(
    `/fixtures/${fixtureId}?include=scores;league;participants;events;state;statistics;timeline`,
  );
};

export const handleGetStandingBySeasonId = (seasonId: String) => {
  return customAxios.get(`/standings/seasons/${seasonId}?include=participant`);
};

export const handleGetDetailLeague = (leagueId: String) => {
  return customAxios.get(`/leagues/${leagueId}?include=seasons&per_page=50`);
};

export const handleGetDetailSeason = (seasonId: String) => {
  return customAxios.get(`/seasons/${seasonId}?include=statistics`);
};

export const handleGetDetailTeam = (teamId: String) => {
  return customAxios.get(`/teams/${teamId}`);
};

export const handleGetDetailFormation = (fixtureId: String) => {
  return customAxios.get(
    `/fixtures/${fixtureId}?include=lineups.player;formations;coaches`,
  );
};

export const handleGetFixturesTodayByLeagueId = (leagueId: String) => {
  return customAxios.get(
    `/fixtures?filter=fixtureLeagues:${leagueId};todaydate&include=participants`,
  );
};

export const handleGetFixturesDateRangeByLeagueId = (
  from: any,
  to: any,
  leagueId: String,
) => {
  return customAxios.get(
    `/fixtures/between/${from}/${to}?filter=fixtureLeagues:${leagueId}&include=participants;scores`,
  );
};

export const getCurrentSeasonByLeagueId = (leagueId: String) => {
  return customAxios.get(`/leagues/${leagueId}?include=currentSeason`);
};

export const getStatisticsBySeasonId = (seasonId: String) => {
  return customAxios.get(`/seasons/${seasonId}?include=statistics&per_page=50`);
};

export const handleGetFixturesyLeagueId = (leagueId: String) => {
  return customAxios.get(
    `/fixtures?filter=fixtureLeagues:${leagueId}&include=participants`,
  );
};

export const getHotLeagues = () => {
  return customAxios.get(
    'https://api.sportmonks.com/v3/football/leagues?api_token=9mwqmFDMx9AR4SjVm59p5VYIaBwCxIPRHuEsnt8gA7CaO9tK0ADzzjCVyPKc&filters=leagueLeagues:8,2,5,24,564,384,82,301',
  );
};

export const getHotTeams = () => {
  return customAxios.get(
    'https://api.sportmonks.com/v3/football/teams?api_token=9mwqmFDMx9AR4SjVm59p5VYIaBwCxIPRHuEsnt8gA7CaO9tK0ADzzjCVyPKc&filters=teamCountries:32,17,251,11,462,41&per_page=50',
  );
};

import * as React from 'react';
import {Image, ScrollView, Text, View} from 'react-native';
import {
  FootballSVG,
  CardSVG,
  OffSideSVG,
  ChangePeopleSVG,
  InjureChangePeopleSVG,
  DoubleCard,
  SmallFootballSVG,
  PenaltySVG,
  FailPenaltySVG,
} from '../vectors';
import {
  handleGetDetailLeague,
  handleGetFixturesTodayByLeagueId,
  handleGetStandingBySeasonId,
} from '../../services/matches';
import moment from 'moment';
import {TouchableOpacity} from 'react-native-gesture-handler';

export default function LeagueOverall({route}: any) {
  const {leagueId} = route.params;
  const [leagueData, setLeagueData] = React.useState(null);
  // const [previousSeasonId, setPreviousSeasonId] = React.useState(null);
  const [currentSeasonStandingData, setCurrentSeasonStandingData] =
    React.useState([]);
  const [previousSeasonStandingData, setPreviousSeasonStandingData] =
    React.useState([]);
  const [todayFixtures, setTodayFixtures] = React.useState([]);

  React.useEffect(() => {
    handleGetDetailLeague(leagueId).then((result: any) => {
      if (result.data.data) {
        setLeagueData(result.data.data);

        const seasons = result.data.data.seasons;

        const currentSeason = seasons.find(item => !!item.is_current);

        handleGetFixturesTodayByLeagueId(leagueId).then(val => {
          if (val.data.data) {
            setTodayFixtures(val.data.data);
          }
        });

        handleGetStandingBySeasonId(currentSeason.id).then(val => {
          if (val.data.data) {
            setCurrentSeasonStandingData(val.data.data);
          }
        });

        const previousSeason = seasons.find(
          item =>
            +moment(item.ending_at, 'YYYY-MM-DD').year() + 1 ===
            +moment(currentSeason.ending_at, 'YYYY-MM-DD').year(),
        );

        if (previousSeason) {
          handleGetStandingBySeasonId(previousSeason.id).then(val => {
            if (val.data.data) {
              setPreviousSeasonStandingData(val.data.data);
            }
          });
        }
      }
    });
  }, [leagueId]);

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{flexGrow: 1}}>
      <View className="h-[2000px] py-4 px-2">
        <View className="w-full py-4 px-2 h-auto flex flex-row bg-white rounded-lg">
          <View className="flex-1 flex items-center">
            <Text>Nhà vô địch mùa trước</Text>
            <Image
              source={{
                uri: previousSeasonStandingData[0]?.participant?.image_path,
              }}
              className="w-16 h-16 mt-4"
            />
            <Text className="mt-2">
              {previousSeasonStandingData[0]?.participant?.name}
            </Text>
          </View>
          <View className="flex-1 flex items-center">
            <Text>Mạnh nhất mùa này</Text>
            <Image
              source={{
                uri: currentSeasonStandingData[0]?.participant?.image_path,
              }}
              className="w-16 h-16 mt-4"
            />
            <Text className="mt-2">
              {currentSeasonStandingData[0]?.participant?.name}
            </Text>
          </View>
        </View>
        <View className="flex flex-row w-full mt-4 px-2">
          <Text>Trận đấu hôm nay</Text>
        </View>
        <View className="flex w-full h-fit">
          {todayFixtures?.map((match: any) => (
            <TouchableOpacity className="w-full h-16 bg-white rounded-lg mt-2 px-2 py-[10px] flex flex-row items-center justify-between">
              <View className="flex flex-row items-center">
                <Text className="text-[#120802] text-[11px] font-normal">
                  {moment(match?.starting_at, 'YYYY-MM-DD HH:mm:ss').format(
                    'HH:mm',
                  )}
                </Text>
                <View className="ml-2 flex gap-y-1">
                  <View className="flex flex-row gap-x-2">
                    <Image
                      source={{
                        uri: match?.participants[0]?.image_path,
                      }}
                      className="w-4 h-4 rounded-full"
                    />
                    <Text className="text-[#120802] text-[14px] font-semibold">
                      {match?.participants[0]?.name}
                    </Text>
                  </View>
                  <View className="flex flex-row gap-x-2">
                    <Image
                      source={{
                        uri: match?.participants[1]?.image_path,
                      }}
                      className="w-4 h-4 rounded-full"
                    />
                    <Text className="text-[#120802] text-[14px] font-semibold">
                      {match?.participants[1]?.name}
                    </Text>
                  </View>
                </View>
              </View>
              <View className="flex flex-row-reverse">
                {/* <TouchableOpacity className="w-12 h-12 justify-center items-center">
          <EmptyStarSVG />
        </TouchableOpacity> */}
                {/* <View className="flex gap-y-1 items-end justify-center">
          <Text className="text-[#120802]/40 text-xs font-semibold">100</Text>
          <Text className="text-[#120802]/40 text-xs font-semibold">98</Text>
        </View> */}
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

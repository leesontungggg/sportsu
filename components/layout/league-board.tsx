import * as React from 'react';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
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
  getCurrentSeasonByLeagueId,
  getStatisticsBySeasonId,
  handleGetDetailFixture,
  handleGetDetailLeague,
  handleGetStandingBySeasonId,
} from '../../services/matches';

export default function LeagueBoard({route}: any) {
  const {leagueId} = route.params;
  const [leagueData, setLeagueData] = React.useState(null);
  const [currentFilter, setCurrentFilter] = React.useState(1);
  const [currentSeason, setCurrentSeason] = React.useState(null);
  const [standingData, setStandingData] = React.useState([]);
  const [statisticsData, setStatisticsData] = React.useState(null);

  React.useEffect(() => {
    getCurrentSeasonByLeagueId(leagueId).then((result: any) => {
      if (result.data.data) {
        setLeagueData(result.data.data);

        const currentSeason = result.data.data.currentseason;
        handleGetStandingBySeasonId(currentSeason.id).then(val => {
          if (val.data.data) {
            setStandingData(val.data.data);
            // console.log('val.data.data', val.data.data);
          }
        });

        getStatisticsBySeasonId(currentSeason.id).then(val => {
          // console.log('val.data.data', val.data.data);
          if (val.data.data) {
            setStatisticsData(val.data.data);
            // console.log('val.data.data', val.data.data);
          }
        });
      }
    });
  }, [leagueId]);

  console.log('statisticsData', statisticsData);

  if (leagueData && !!standingData.length) {
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{flexGrow: 1}}>
        <View className="h-[2000px] px-2">
          <View className="h-[56px] p-3">
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <TouchableOpacity
                className={`border-[1px] ${
                  currentFilter === 1
                    ? 'border-[#F97700] bg-[#FFA755]/10'
                    : 'border-[#D8D8D8]'
                } rounded-3xl py-[6px] px-2`}
                onPress={() => setCurrentFilter(1)}>
                <Text
                  className={`${
                    currentFilter === 1 ? 'text-[#F97700]' : 'text-[#595959]'
                  } px-[6px]`}>
                  Điểm
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                className={`border-[1px] ${
                  currentFilter === 2
                    ? 'border-[#F97700] bg-[#FFA755]/10'
                    : 'border-[#D8D8D8]'
                } rounded-3xl py-[6px] px-2 ml-2`}
                onPress={() => setCurrentFilter(2)}>
                <Text
                  className={`${
                    currentFilter === 2 ? 'text-[#F97700]' : 'text-[#595959]'
                  } px-[6px]`}>
                  Chuỗi
                </Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
          <View className="bg-white rounded-lg flex">
            <View className="flex flex-row">
              <View className="w-[28px] flex flex-row items-center justify-center text-[12px] text-[#120802]">
                <Text className="text-[12px] text-[#919191]">#</Text>
              </View>
              <View className="flex-1 flex flex-row items-start text-[12px] text-[#120802]">
                <Text className="text-[12px] text-[#919191]">Đội thi đấu</Text>
              </View>
              <View className="w-[28px] flex flex-row items-center justify-center text-[12px] text-[#120802]">
                <Text className="text-[12px] text-[#919191]">ST</Text>
              </View>
              <View className="w-[28px] flex flex-row items-center justify-center text-[12px] text-[#120802]">
                <Text className="text-[12px] text-[#919191]">T</Text>
              </View>
              <View className="w-[28px] flex flex-row items-center justify-center text-[12px] text-[#120802]">
                <Text className="text-[12px] text-[#919191]">H</Text>
              </View>
              <View className="w-[28px] flex flex-row items-center justify-center text-[12px] text-[#120802]">
                <Text className="text-[12px] text-[#919191]">B</Text>
              </View>
              <View className="w-[28px] flex flex-row items-center justify-center text-[12px] text-[#120802]">
                <Text className="text-[12px] text-[#919191]">Tg</Text>
              </View>
              <View className="w-[28px] flex flex-row items-center justify-center text-[12px] text-[#120802]">
                <Text className="text-[12px] text-[#919191]">Th</Text>
              </View>
              <View className="w-[28px] flex flex-row items-center justify-center text-[12px] text-[#120802]">
                <Text className="text-[12px] text-[#919191]">HS</Text>
              </View>
              <View className="w-[28px] flex flex-row items-center justify-center text-[12px] text-[#120802]">
                <Text className="text-[12px] text-[#919191]">Đ</Text>
              </View>
            </View>
            {standingData.map((data: any, index: any) => (
              <View className="flex flex-row py-1">
                <View className="w-[28px] flex flex-row items-center justify-center text-[12px] text-[#120802]">
                  <Text className="text-[12px] text-[#919191]">
                    {index + 1}
                  </Text>
                </View>
                <View className="flex-1 flex flex-row items-start text-[12px] text-[#120802]">
                  <Text className="text-[12px] text-[#919191]">
                    {data.participant.name}
                  </Text>
                </View>
                <View className="w-[28px] flex flex-row items-center justify-center text-[12px] text-[#120802]">
                  <Text className="text-[12px] text-[#919191]">ST</Text>
                </View>
                <View className="w-[28px] flex flex-row items-center justify-center text-[12px] text-[#120802]">
                  <Text className="text-[12px] text-[#919191]">T</Text>
                </View>
                <View className="w-[28px] flex flex-row items-center justify-center text-[12px] text-[#120802]">
                  <Text className="text-[12px] text-[#919191]">H</Text>
                </View>
                <View className="w-[28px] flex flex-row items-center justify-center text-[12px] text-[#120802]">
                  <Text className="text-[12px] text-[#919191]">B</Text>
                </View>
                <View className="w-[28px] flex flex-row items-center justify-center text-[12px] text-[#120802]">
                  <Text className="text-[12px] text-[#919191]">Tg</Text>
                </View>
                <View className="w-[28px] flex flex-row items-center justify-center text-[12px] text-[#120802]">
                  <Text className="text-[12px] text-[#919191]">Th</Text>
                </View>
                <View className="w-[28px] flex flex-row items-center justify-center text-[12px] text-[#120802]">
                  <Text className="text-[12px] text-[#919191]">HS</Text>
                </View>
                <View className="w-[28px] flex flex-row items-center justify-center text-[12px] text-[#120802]">
                  <Text className="text-[12px] text-[#919191]">
                    {data.points}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    );
  } else {
    return <></>;
  }
}

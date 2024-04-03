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
  handleGetDetailFixture,
  handleGetDetailLeague,
  handleGetFixturesDateRangeByLeagueId,
} from '../../services/matches';
import {TouchableOpacity} from 'react-native';
import moment from 'moment';
import _ from 'lodash';

export default function LeagueFixture({route}: any) {
  const {leagueId} = route.params;
  const [leagueData, setLeagueData] = React.useState(null);
  const [currentFilter, setCurrentFilter] = React.useState(1);
  const from = moment().subtract(2, 'days').format('YYYY-MM-DD');
  const to = moment().add(2, 'days').format('YYYY-MM-DD');
  const [fixtures, setFixtures] = React.useState<any>(null);

  React.useEffect(() => {
    handleGetFixturesDateRangeByLeagueId(from, to, leagueId).then(
      (result: any) => {
        if (result.data.data) {
          const twoDaysAgoFixtures: any = [];
          const oneDayAgoFixtures: any = [];
          const todayFixtures: any = [];
          const tomorrowFixtures: any = [];
          const nextDaysFixtures: any = [];

          result.data.data.map((item: any) => {
            const temp = moment(item.starting_at, 'YYYY-MM-DD HH:mm:ss');

            if (temp.diff(moment(), 'days') === -2) {
              twoDaysAgoFixtures.push(item);
            }
            if (temp.diff(moment(), 'days') === -1) {
              oneDayAgoFixtures.push(item);
            }
            if (temp.diff(moment(), 'days') === 0) {
              todayFixtures.push(item);
            }
            if (temp.diff(moment(), 'days') === 1) {
              tomorrowFixtures.push(item);
            }
            if (temp.diff(moment(), 'days') === 2) {
              nextDaysFixtures.push(item);
            }
          });

          setFixtures({
            twoDaysAgoFixtures,
            oneDayAgoFixtures,
            todayFixtures,
            tomorrowFixtures,
            nextDaysFixtures,
          });
        }
      },
    );
  }, [leagueId, from, to]);

  if (fixtures) {
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{flexGrow: 1}}>
        <View className="h-[2000px]">
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
                  Lịch thi đấu
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
                  Kết quả
                </Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
          <View className="px-2">
            <Text>Hôm nay</Text>
            {fixtures.todayFixtures?.map((match: any) => (
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
              </TouchableOpacity>
            ))}
            {fixtures.tomorrowFixtures.length > 0 && currentFilter === 1 && (
              <Text className="mt-2">Ngày mai</Text>
            )}
            {currentFilter === 1 &&
              fixtures.tomorrowFixtures?.map((match: any) => (
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
                </TouchableOpacity>
              ))}
            {currentFilter === 1 && fixtures.nextDaysFixtures.length > 0 && (
              <Text className="mt-2">{`${
                +moment().add(2, 'days').format('E') < 7
                  ? `Thứ ${+moment().add(2, 'days').format('E')}`
                  : 'Chủ Nhật'
              }${moment()
                .add(2, 'days')
                .format(', [ngày] D [tháng] M [năm] YYYY')}`}</Text>
            )}
            {currentFilter === 1 &&
              fixtures.nextDaysFixtures?.map((match: any) => (
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
                </TouchableOpacity>
              ))}
            {fixtures.oneDayAgoFixtures.length > 0 && currentFilter === 2 && (
              <Text className="mt-2">Hôm qua</Text>
            )}
            {currentFilter === 2 &&
              fixtures.oneDayAgoFixtures?.map((match: any) => (
                <TouchableOpacity className="w-full h-16 bg-white rounded-lg mt-2 px-2 py-[10px] flex flex-row items-center justify-between">
                  <View className="flex flex-row items-center">
                    <Text className="text-[#120802] text-[11px] font-normal">
                      FT
                    </Text>
                    <View className="ml-2 flex gap-y-1 flex-1">
                      <View className="flex flex-row gap-x-2 w-full">
                        <Image
                          source={{
                            uri: match?.participants[0]?.image_path,
                          }}
                          className="w-4 h-4 rounded-full"
                        />
                        <Text className="text-[#120802] text-[14px] font-semibold flex-1">
                          {match?.participants[0]?.name}
                        </Text>
                        <Text className="justify-self-end">
                          {
                            match?.scores.find(
                              (item: any) =>
                                item.description === '2ND_HALF' &&
                                item.participant_id ===
                                  match?.participants[0]?.id,
                            )?.score.goals
                          }
                        </Text>
                      </View>
                      <View className="flex flex-row gap-x-2 w-full">
                        <Image
                          source={{
                            uri: match?.participants[1]?.image_path,
                          }}
                          className="w-4 h-4 rounded-full"
                        />
                        <Text className="text-[#120802] text-[14px] font-semibold flex-1">
                          {match?.participants[1]?.name}
                        </Text>
                        <Text className="justify-self-end">
                          {
                            match?.scores.find(
                              (item: any) =>
                                item.description === '2ND_HALF' &&
                                item.participant_id ===
                                  match?.participants[1]?.id,
                            )?.score.goals
                          }
                        </Text>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            {fixtures.twoDaysAgoFixtures.length > 0 && currentFilter === 2 && (
              <Text className="mt-2">Hôm kia</Text>
            )}
            {currentFilter === 2 &&
              fixtures.twoDaysAgoFixtures?.map((match: any) => (
                <TouchableOpacity className="w-full h-16 bg-white rounded-lg mt-2 px-2 py-[10px] flex flex-row items-center justify-between">
                  <View className="flex flex-row items-center">
                    <Text className="text-[#120802] text-[11px] font-normal">
                      FT
                    </Text>
                    <View className="ml-2 flex gap-y-1 flex-1">
                      <View className="flex flex-row gap-x-2 w-full">
                        <Image
                          source={{
                            uri: match?.participants[0]?.image_path,
                          }}
                          className="w-4 h-4 rounded-full"
                        />
                        <Text className="text-[#120802] text-[14px] font-semibold flex-1">
                          {match?.participants[0]?.name}
                        </Text>
                        <Text className="justify-self-end">
                          {
                            match?.scores.find(
                              (item: any) =>
                                item.description === '2ND_HALF' &&
                                item.participant_id ===
                                  match?.participants[0]?.id,
                            )?.score.goals
                          }
                        </Text>
                      </View>
                      <View className="flex flex-row gap-x-2 w-full">
                        <Image
                          source={{
                            uri: match?.participants[1]?.image_path,
                          }}
                          className="w-4 h-4 rounded-full"
                        />
                        <Text className="text-[#120802] text-[14px] font-semibold flex-1">
                          {match?.participants[1]?.name}
                        </Text>
                        <Text className="justify-self-end">
                          {
                            match?.scores.find(
                              (item: any) =>
                                item.description === '2ND_HALF' &&
                                item.participant_id ===
                                  match?.participants[1]?.id,
                            )?.score.goals
                          }
                        </Text>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
          </View>
        </View>
      </ScrollView>
    );
  } else {
    return <></>;
  }
}

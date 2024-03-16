import * as React from 'react';
import {Image, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {
  EmptyStarSVG16,
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
import {handleGetDetailFixture} from '../../services/matches';
import moment from 'moment';

const Details = ({route}: any) => {
  const {fixtureId} = route.params;
  const [fixtureData, setFixtureData] = React.useState(null);

  const state = fixtureData?.state;
  const startTime = fixtureData?.starting_at.split(' ');

  React.useEffect(() => {
    handleGetDetailFixture(fixtureId).then((result: any) => {
      if (result.data.data) {
        setFixtureData(result.data.data);
      }
    });
  }, [fixtureId]);

  const events = fixtureData?.events.sort((a: any, b: any) =>
    a.minute - b.minute > 0 ? 1 : a.minute - b.minute < 0 ? -1 : 0,
  );

  const timeline = fixtureData?.timeline.sort((a: any, b: any) =>
    a.minute - b.minute > 0 ? 1 : a.minute - b.minute < 0 ? -1 : 0,
  );

  console.log('this is timeline', timeline && timeline[1]);

  const participantA = fixtureData?.participants[0];
  const participantAGoal = fixtureData?.events
    .filter(
      (event: any) =>
        event.type_id === 14 && event.participant_id === participantA.id,
    )
    .sort((a: any, b: any) =>
      a.minute > b.minute ? 1 : a.minute < b.minute ? -1 : 0,
    );

  const participantB = fixtureData?.participants[1];
  const participantBGoal = fixtureData?.events
    .filter(
      (event: any) =>
        event.type_id === 14 && event.participant_id === participantB.id,
    )
    .sort((a: any, b: any) =>
      a.minute > b.minute ? 1 : a.minute < b.minute ? -1 : 0,
    );

  const teamAStatistic = fixtureData?.statistics.filter(
    (item: any) => item.participant_id === participantA.id,
  );

  const teamBStatistic = fixtureData?.statistics.filter(
    (item: any) => item.participant_id === participantB.id,
  );

  const totalAttacks =
    fixtureData &&
    teamBStatistic?.find((item: any) => item.type_id === 43)?.data.value +
      teamAStatistic?.find((item: any) => item.type_id === 43)?.data.value;

  const totalDangerousAttacks =
    fixtureData &&
    teamBStatistic?.find((item: any) => item.type_id === 44)?.data.value +
      teamAStatistic?.find((item: any) => item.type_id === 44)?.data.value;

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{flexGrow: 1}}>
      <View className="flex flex-col w-full min-h-screen bg-[#F5F5F7] h-[2000px]">
        {fixtureData && (
          <View className="w-full px-2">
            <View className="w-full px-2 h-[120px] flex flex-row rounded-lg bg-[#FFD9B7] items-center justify-between">
              <View className="flex flex-col items-center max-w-[112px]">
                <View className="flex flex-row items-center">
                  <TouchableOpacity className="bg-white/25 rounded-full w-6 h-6 items-center justify-center">
                    <EmptyStarSVG16 />
                  </TouchableOpacity>
                  <Image
                    source={{uri: fixtureData?.participants[0].image_path}}
                    className="w-16 h-16"
                  />
                </View>
                <Text className="mt-1 pl-6 text-center text-black">
                  {fixtureData?.participants[0].name}
                </Text>
              </View>
              <View className="flex flex-col">
                <Text className="text-center text-black">
                  {state?.id === 1
                    ? `${moment(startTime[0]).format('DD/MM')}\n${
                        startTime[1]
                      } `
                    : `${participantAGoal.length} - ${participantBGoal.length}`}
                </Text>
              </View>
              <View className="flex flex-col items-center max-w-[112px]">
                <View className="flex flex-row items-center">
                  <Image
                    source={{uri: fixtureData?.participants[1].image_path}}
                    className="w-16 h-16"
                  />
                  <TouchableOpacity className="bg-white/25 rounded-full w-6 h-6 items-center justify-center">
                    <EmptyStarSVG16 />
                  </TouchableOpacity>
                </View>
                <Text className="mt-1 pr-6 text-center text-black">
                  {fixtureData?.participants[1].name}
                </Text>
              </View>
            </View>
            {state?.id !== 1 && (
              <>
                <Text className="py-[11px] px-2 text-black">Thống kê</Text>
                <View className="rounded-lg bg-white w-full h-fit py-3 flex flex-row items-start justify-center">
                  <View className="flex flex-col flex-1 items-end mr-2">
                    {participantAGoal?.map(item => (
                      <Text className="text-right text-black">
                        {`${item.player_name} `}
                        <Text className="text-[#120802]/40">
                          {item.minute}'
                        </Text>
                      </Text>
                    ))}
                  </View>
                  <FootballSVG fill="#000" />
                  <View className="flex flex-col flex-1 ml-2">
                    {participantBGoal?.map(item => (
                      <Text className="text-left text-black">
                        <Text className="text-[#120802]/40">
                          {item.minute}'
                        </Text>
                        {` ${item.player_name}`}
                      </Text>
                    ))}
                  </View>
                </View>
                <View className="mt-2 w-full h-[168px] bg-white rounded-lg">
                  <View className="flex flex-row w-full h-12 justify-between items-center px-2">
                    <View className="w-8 h-8 items-center justify-center">
                      <Text className="text-xs text-black">
                        {fixtureData &&
                          teamAStatistic?.find(
                            (item: any) => item.type_id === 42,
                          )?.data.value}
                      </Text>
                    </View>
                    <Text className="text-xs text-black">Tổng lần sút</Text>
                    <View className="w-8 h-8 items-center justify-center">
                      <Text className="text-xs text-black">
                        {fixtureData &&
                          teamBStatistic?.find(
                            (item: any) => item.type_id === 42,
                          )?.data.value}
                      </Text>
                    </View>
                  </View>
                  <View className="w-[300px] h-[120px] flex flex-col justify-between bg-[#5D656F]/10 rounded-t-lg mx-auto">
                    <View className="flex flex-row justify-between items-center">
                      <View className="w-10 h-10 items-center justify-center">
                        <Text className="text-xs text-black">
                          {fixtureData &&
                            teamAStatistic?.find(
                              (item: any) => item.type_id === 41,
                            )?.data.value}
                        </Text>
                      </View>
                      <Text className="text-xs text-black">
                        Sút trượt khung thành
                      </Text>
                      <View className="w-10 h-10 items-center justify-center">
                        <Text className="text-xs text-black">
                          {fixtureData &&
                            teamBStatistic?.find(
                              (item: any) => item.type_id === 41,
                            )?.data.value}
                        </Text>
                      </View>
                    </View>
                    <View className="w-[200px] h-[80px] bg-white mx-auto rounded-t-lg border-t-[4px] border-x-[4px] border-solid border-[#5D656F] flex flex-row items-center justify-between">
                      <View className="w-10 h-10 items-center justify-center self-start">
                        <Text className="text-xs text-black">
                          {fixtureData &&
                            teamAStatistic?.find(
                              (item: any) => item.type_id === 86,
                            )?.data.value}
                        </Text>
                      </View>
                      <Text className="text-xs text-black">
                        Sút vào khung thành
                      </Text>
                      <View className="w-10 h-10 items-center justify-center self-start">
                        <Text className="text-xs text-black">
                          {fixtureData &&
                            teamBStatistic?.find(
                              (item: any) => item.type_id === 86,
                            )?.data.value}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
                {/* End of goal shoot */}
                <View className="w-full bg-white rounded-lg mt-2">
                  <View className="flex flex-row justify-between items-center py-2 px-3">
                    <View className="flex flex-row">
                      <View className="flex flex-col w-10 h-11 items-center justify-center">
                        <OffSideSVG />
                        <Text className="mt-1 text-sm text-black">
                          {teamAStatistic &&
                            teamAStatistic?.find(
                              (item: any) => item.type_id === 34,
                            )?.data.value}
                        </Text>
                      </View>
                      <View className="flex flex-col w-10 h-11 items-center justify-center">
                        <CardSVG fill="#F04939" />
                        <Text className="mt-1 text-sm text-black">
                          {teamAStatistic &&
                            teamAStatistic?.find(
                              (item: any) => item.type_id === 83,
                            )?.data.value}
                        </Text>
                      </View>
                      <View className="flex flex-col w-10 h-11 items-center justify-center">
                        <CardSVG fill="#FDDC30" />
                        <Text className="mt-1 text-sm text-black">
                          {teamAStatistic &&
                            teamAStatistic?.find(
                              (item: any) => item.type_id === 84,
                            )?.data.value}
                        </Text>
                      </View>
                    </View>
                    <View className="flex flex-row">
                      <View className="flex flex-col w-10 h-11 items-center justify-center">
                        <CardSVG fill="#FDDC30" />
                        <Text className="mt-1 text-sm text-black">
                          {teamBStatistic &&
                            teamBStatistic?.find(
                              (item: any) => item.type_id === 84,
                            )?.data.value}
                        </Text>
                      </View>
                      <View className="flex flex-col w-10 h-11 items-center justify-center">
                        <CardSVG fill="#F04939" />
                        <Text className="mt-1 text-sm text-black">
                          {teamBStatistic &&
                            teamBStatistic?.find(
                              (item: any) => item.type_id === 83,
                            )?.data.value}
                        </Text>
                      </View>
                      <View className="flex flex-col w-10 h-11 items-center justify-center">
                        <OffSideSVG />
                        <Text className="mt-1 text-sm text-black">
                          {teamBStatistic &&
                            teamBStatistic?.find(
                              (item: any) => item.type_id === 34,
                            )?.data.value}
                        </Text>
                      </View>
                    </View>
                  </View>
                  {/* End card section */}
                  <View className="w-full p-3 flex border-b-[#071B3C]/10 border-b-[1px] border-solid">
                    <View className="w-full flex flex-row justify-between items-center">
                      <View className="flex flex-1">
                        <Text>
                          {teamAStatistic &&
                            teamAStatistic?.find(
                              (item: any) => item.type_id === 45,
                            )?.data.value}
                        </Text>
                      </View>
                      <Text className="text-sm text-black">
                        Tỉ lệ sở hữu bóng (%)
                      </Text>
                      <View className="flex flex-1 items-end">
                        <Text>
                          {teamBStatistic &&
                            teamBStatistic?.find(
                              (item: any) => item.type_id === 45,
                            )?.data.value}
                        </Text>
                      </View>
                    </View>
                    <View className="flex flex-row mt-1 gap-x-1">
                      <View className="flex h-2 w-full flex-1 bg-[#071B3C]/10 rounded-l-lg items-end">
                        <View
                          className="h-full rounded-l-lg"
                          style={{
                            backgroundColor: '#F97700',
                            width: `${
                              (teamAStatistic &&
                                teamAStatistic?.find(
                                  (item: any) => item.type_id === 45,
                                )?.data.value) ||
                              '50'
                            }%`,
                          }}
                        />
                      </View>
                      <View className="flex h-2 w-full flex-1 bg-[#071B3C]/10 rounded-r-lg">
                        <View
                          className="h-full rounded-r-lg"
                          style={{
                            backgroundColor: '#5D656F',
                            width: `${
                              (teamBStatistic &&
                                teamBStatistic?.find(
                                  (item: any) => item.type_id === 45,
                                )?.data.value) ||
                              '50'
                            }%`,
                          }}
                        />
                      </View>
                    </View>
                  </View>
                  <View className="w-full p-3 flex border-b-[#071B3C]/10 border-b-[1px] border-solid">
                    <View className="w-full flex flex-row justify-between items-center">
                      <View className="flex flex-1">
                        <Text>
                          {teamAStatistic &&
                            teamAStatistic?.find(
                              (item: any) => item.type_id === 43,
                            )?.data.value}
                        </Text>
                      </View>
                      <Text className="text-sm text-black">Tấn công</Text>
                      <View className="flex flex-1 items-end">
                        <Text>
                          {teamBStatistic &&
                            teamBStatistic?.find(
                              (item: any) => item.type_id === 43,
                            )?.data.value}
                        </Text>
                      </View>
                    </View>
                    <View className="flex flex-row mt-1 gap-x-1">
                      <View className="flex h-2 w-full flex-1 bg-[#071B3C]/10 rounded-l-lg items-end">
                        <View
                          className="h-full rounded-l-lg"
                          style={{
                            backgroundColor: '#F97700',
                            width: `${
                              (teamAStatistic?.find(
                                (item: any) => item.type_id === 43,
                              )?.data.value /
                                totalAttacks) *
                                100 || '50'
                            }%`,
                          }}
                        />
                      </View>
                      <View className="flex h-2 w-full flex-1 bg-[#071B3C]/10 rounded-r-lg">
                        <View
                          className="h-full rounded-r-lg"
                          style={{
                            backgroundColor: '#5D656F',
                            width: `${
                              (teamBStatistic?.find(
                                (item: any) => item.type_id === 43,
                              )?.data.value /
                                totalAttacks) *
                                100 || '50'
                            }%`,
                          }}
                        />
                      </View>
                    </View>
                  </View>
                  <View className="w-full p-3 flex border-b-[#071B3C]/10 border-b-[1px] border-solid">
                    <View className="w-full flex flex-row justify-between items-center">
                      <View className="flex flex-1">
                        <Text>
                          {teamAStatistic &&
                            teamAStatistic?.find(
                              (item: any) => item.type_id === 44,
                            )?.data.value}
                        </Text>
                      </View>
                      <Text className="text-sm text-black">
                        Đòn tấn công nguy hiểm
                      </Text>
                      <View className="flex flex-1 items-end">
                        <Text>
                          {teamBStatistic &&
                            teamBStatistic?.find(
                              (item: any) => item.type_id === 44,
                            )?.data.value}
                        </Text>
                      </View>
                    </View>
                    <View className="flex flex-row mt-1 gap-x-1">
                      <View className="flex h-2 w-full flex-1 bg-[#071B3C]/10 rounded-l-lg items-end">
                        <View
                          className="h-full rounded-l-lg"
                          style={{
                            backgroundColor: '#F97700',
                            width: `${
                              (teamAStatistic?.find(
                                (item: any) => item.type_id === 44,
                              )?.data.value /
                                totalDangerousAttacks) *
                                100 || '50'
                            }%`,
                          }}
                        />
                      </View>
                      <View className="flex h-2 w-full flex-1 bg-[#071B3C]/10 rounded-r-lg">
                        <View
                          className="h-full rounded-r-lg"
                          style={{
                            backgroundColor: '#5D656F',
                            width: `${
                              (teamBStatistic?.find(
                                (item: any) => item.type_id === 44,
                              )?.data.value /
                                totalDangerousAttacks) *
                                100 || '50'
                            }%`,
                          }}
                        />
                      </View>
                    </View>
                  </View>
                </View>
                {/* End of progressbar */}

                <Text className="mt-4 py-[11px] px-2 text-black">Sự kiện</Text>
                <View className="bg-white w-full py-3 flex flex-col rounded-lg relative">
                  <View className="absolute w-[1px] h-full left-[50%] top-3 border-r-[1px] border-[#071B3C]/10 border-solid"></View>
                  {/* Single Item Render */}
                  <View className="flex flex-row w-full justify-center h-12 items-center">
                    <View className="flex flex-1"></View>
                    <Text className="bg-white p-1 text-black">03'</Text>
                    <View className="flex flex-1 flex-row items-center">
                      <FootballSVG fill="#000" />
                      <Text className="ml-2 text-xs text-black">
                        (0-1) Tên ng ghi bàn{'\n'}
                        Tên ng hỗ trợ
                      </Text>
                    </View>
                  </View>
                  {/* End Single Item Render */}
                  <View className="flex flex-row w-full justify-center h-12 items-center">
                    <View className="flex flex-1 flex-row items-center justify-end">
                      <Text className="mr-2 text-xs text-right text-black">
                        Tên ng ghi bàn (0-1){'\n'}
                        Tên ng hỗ trợ
                      </Text>
                      <FootballSVG fill="#000" />
                    </View>
                    <Text className="bg-white p-1 text-black">06'</Text>
                    <View className="flex flex-1 flex-row items-center"></View>
                  </View>
                  {/* Single Item Render */}
                  <View className="flex flex-row w-full justify-center h-12 items-center">
                    <View className="flex flex-1"></View>
                    <Text className="bg-white p-1 text-black">09'</Text>
                    <View className="flex flex-1 flex-row items-center">
                      <CardSVG fill="#F04939" />
                      <Text className="ml-2 text-xs text-black">
                        (0-1) Tên ng ghi bàn{'\n'}
                        Tên ng hỗ trợ
                      </Text>
                    </View>
                  </View>
                  {/* End Single Item Render */}
                  <View className="flex flex-row w-full justify-center h-12 items-center">
                    <View className="flex flex-1 flex-row items-center justify-end">
                      <Text className="mr-2 text-xs text-right text-black">
                        Tên ng ghi bàn (0-1){'\n'}
                        Tên ng hỗ trợ
                      </Text>
                      <CardSVG fill="#FDDC30" />
                    </View>
                    <Text className="bg-white p-1 text-black">13'</Text>
                    <View className="flex flex-1 flex-row items-center"></View>
                  </View>
                  <View className="flex flex-row my-8 justify-center items-center border-t-2 border-solid border-[#071B3C]/10">
                    <Text className="bg-white p-4 -mt-7 text-black">
                      (HT) 1-1
                    </Text>
                  </View>
                  {/* Single Item Render */}
                  <View className="flex flex-row w-full justify-center h-12 items-center">
                    <View className="flex flex-1"></View>
                    <Text className="bg-white p-1 text-black">03'</Text>
                    <View className="flex flex-1 flex-row items-center">
                      <FootballSVG fill="#000" />
                      <Text className="ml-2 text-xs text-black">
                        (0-1) Tên ng ghi bàn{'\n'}
                        Tên ng hỗ trợ
                      </Text>
                    </View>
                  </View>
                  {/* End Single Item Render */}
                  <View className="flex flex-row w-full justify-center h-12 items-center">
                    <View className="flex flex-1 flex-row items-center justify-end">
                      <Text className="mr-2 text-xs text-right text-black">
                        Tên ng ghi bàn (0-1){'\n'}
                        Tên ng hỗ trợ
                      </Text>
                      <FootballSVG fill="#000" />
                    </View>
                    <Text className="bg-white p-1 text-black">06'</Text>
                    <View className="flex flex-1 flex-row items-center"></View>
                  </View>
                  {/* Single Item Render */}
                  <View className="flex flex-row w-full justify-center h-12 items-center">
                    <View className="flex flex-1"></View>
                    <Text className="bg-white p-1 text-black">09'</Text>
                    <View className="flex flex-1 flex-row items-center">
                      <CardSVG fill="#F04939" />
                      <Text className="ml-2 text-xs text-black">
                        (0-1) Tên ng ghi bàn{'\n'}
                        Tên ng hỗ trợ
                      </Text>
                    </View>
                  </View>
                  {/* End Single Item Render */}
                  <View className="flex flex-row w-full justify-center h-12 items-center">
                    <View className="flex flex-1 flex-row items-center justify-end">
                      <Text className="mr-2 text-xs text-right text-black">
                        Tên ng ghi bàn (0-1){'\n'}
                        Tên ng hỗ trợ
                      </Text>
                      <CardSVG fill="#FDDC30" />
                    </View>
                    <Text className="bg-white p-1 text-black">13'</Text>
                    <View className="flex flex-1 flex-row items-center"></View>
                  </View>
                  <View className="flex flex-row mt-8 justify-center items-center border-t-2 border-solid border-[#071B3C]/10">
                    <Text className="bg-white p-4 -mt-7 text-black">
                      (FT) 1-1
                    </Text>
                  </View>
                </View>
                <Text className="mt-2 py-[11px] px-2 text-black">Ghi chú</Text>
                <View className="w-full p-2 flex flex-row">
                  <View className="w-[50%] flex flex-col">
                    <View className="p-2 flex flex-row items-center">
                      <ChangePeopleSVG />
                      <Text className="ml-2 text-black">Thay người</Text>
                    </View>
                    <View className="p-2 flex flex-row items-center">
                      <InjureChangePeopleSVG />
                      <Text className="ml-2 text-black">
                        Chấn thương thay ra
                      </Text>
                    </View>
                    <View className="p-2 flex flex-row items-center">
                      <CardSVG />
                      <Text className="ml-2 text-black">Thẻ vàng</Text>
                    </View>
                    <View className="p-2 flex flex-row items-center">
                      <CardSVG fill="#F04939" />
                      <Text className="ml-2 text-black">Thẻ đỏ</Text>
                    </View>
                    <View className="p-2 flex flex-row items-center">
                      <DoubleCard />
                      <Text className="ml-2 text-black">2 thẻ vàng</Text>
                    </View>
                  </View>
                  <View className="w-[50%] flex flex-col">
                    <View className="p-2 flex flex-row items-center">
                      <SmallFootballSVG />
                      <Text className="ml-2 text-black">Bàn thắng</Text>
                    </View>
                    <View className="p-2 flex flex-row items-center">
                      <OffSideSVG />
                      <Text className="ml-2 text-black">Phạt góc</Text>
                    </View>
                    <View className="p-2 flex flex-row items-center">
                      <PenaltySVG />
                      <Text className="ml-2 text-black">Phạt đền</Text>
                    </View>
                    <View className="p-2 flex flex-row items-center">
                      <FailPenaltySVG />
                      <Text className="ml-2 text-black">Hỏng phạt đền</Text>
                    </View>
                    <View className="p-2 flex flex-row items-center">
                      <SmallFootballSVG fill="#F04939" />
                      <Text className="ml-2 text-black">Phản lưới nhà</Text>
                    </View>
                  </View>
                </View>
              </>
            )}
          </View>
        )}
      </View>
    </ScrollView>
  );
};

export default Details;

import * as React from 'react';
import {ScrollView, Text, View, Image, Dimensions} from 'react-native';
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
  PitchSVG,
  ChangePeopleOutSVG,
  ChangePeopleInSVG,
} from '../vectors';
import {
  handleGetDetailFixture,
  handleGetDetailFormation,
} from '../../services/matches';

export default function Formation({route}: any) {
  const {fixtureId} = route.params;
  const [fixtureData, setFixtureData] = React.useState(null);
  const [formationData, setFormationData] = React.useState(null);

  React.useEffect(() => {
    handleGetDetailFixture(fixtureId).then((result: any) => {
      if (result.data.data) {
        setFixtureData(result.data.data);
      }
    });

    handleGetDetailFormation(fixtureId).then((result: any) => {
      if (result.data.data) {
        setFormationData(result.data.data);
      }
    });
  }, [fixtureId]);

  const participantA = fixtureData?.participants[0];
  const participantB = fixtureData?.participants[1];

  const formationTeamA = formationData?.formations.find(
    (formation: any) => formation.participant_id === participantA?.id,
  );

  const formationTeamB = formationData?.formations.find(
    (formation: any) => formation.participant_id === participantB?.id,
  );

  const lineupTeamA = formationData?.lineups.filter(
    (lineup: any) => lineup.team_id === participantA?.id,
  );

  const lineupTeamB = formationData?.lineups.filter(
    (lineup: any) => lineup.team_id === participantB?.id,
  );

  const goalKeeperA = lineupTeamA?.find(
    (item: any) => item.position_id === 24 && item.type_id === 11,
  );
  const goalKeeperB = lineupTeamB?.find(
    (item: any) => item.position_id === 24 && item.type_id === 11,
  );
  const defenderA = lineupTeamA?.filter(
    (item: any) => item.position_id === 25 && item.type_id === 11,
  );
  const defenderB = lineupTeamB?.filter(
    (item: any) => item.position_id === 25 && item.type_id === 11,
  );
  const midA = lineupTeamA?.filter(
    (item: any) => item.position_id === 26 && item.type_id === 11,
  );
  const attackA = lineupTeamA?.filter(
    (item: any) => item.position_id === 27 && item.type_id === 11,
  );

  const coachA = formationData?.coaches.find(
    (coach: any) => coach.meta.participant_id === participantA?.id,
  );

  const coachB = formationData?.coaches.find(
    (coach: any) => coach.meta.participant_id === participantB?.id,
  );

  if (fixtureData) {
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{flexGrow: 1}}>
        <View className="h-[2000px] w-full">
          <View className="h-fit bg-[#CBE1CA] p-2 w-full">
            <View className="flex flex-row">
              <View className="flex-1 flex flex-row items-center gap-x-1">
                <Image
                  source={{uri: fixtureData?.participants[0].image_path}}
                  className="w-4 h-4"
                />
                <Text className="my-2">
                  {fixtureData?.participants[0].name}
                </Text>
              </View>
              <View className="flex-1 flex flex-row justify-end">
                <Text className="my-2">{formationTeamA?.formation}</Text>
              </View>
            </View>
            <View className="relative">
              <PitchSVG className="absolute top-0 left-0" />
              <View className="absolute top-0 left-0 flex h-[360px] w-full">
                <View className="flex-1 flex flex-col justify-center items-center">
                  <Image
                    source={{uri: goalKeeperA?.player.image_path}}
                    className="w-8 h-8 bg-white rounded-full"
                  />
                  <Text className="text-[10px]">
                    {goalKeeperA?.player.display_name}
                  </Text>
                </View>
                <View className="flex-1 flex flex-row w-full">
                  {defenderA?.map((player: any) => (
                    <View className="flex-1 flex flex-col justify-center items-center">
                      <Image
                        source={{uri: player?.player.image_path}}
                        className="w-8 h-8 bg-white rounded-full"
                      />
                      <Text className="text-[10px] text-center">
                        {player?.player.display_name}
                      </Text>
                    </View>
                  ))}
                </View>
                <View className="flex-1 flex flex-row w-full">
                  {midA?.map((player: any) => (
                    <View className="flex-1 flex flex-col justify-center items-center">
                      <Image
                        source={{uri: player?.player.image_path}}
                        className="w-8 h-8 bg-white rounded-full"
                      />
                      <Text className="text-[10px] text-center">
                        {player?.player.display_name}
                      </Text>
                    </View>
                  ))}
                </View>
                <View className="flex-1 flex flex-row w-full">
                  {attackA?.map((player: any) => (
                    <View className="flex-1 flex flex-col justify-center items-center">
                      <Image
                        source={{uri: player?.player.image_path}}
                        className="w-8 h-8 bg-white rounded-full"
                      />
                      <Text className="text-[10px] text-center">
                        {player?.player.display_name}
                      </Text>
                    </View>
                  ))}
                </View>
                <Text className="flex-1 w-full"></Text>
              </View>
            </View>
            <View className="relative">
              <PitchSVG
                className="absolute top-0 left-0"
                style={{transform: [{rotate: '180deg'}]}}
              />
              <View className="absolute top-0 left-0 flex h-[360px] w-full">
                <Text className="flex-1 w-full"></Text>
                <Text className="flex-1 w-full"></Text>
                <Text className="flex-1 w-full"></Text>
                <Text className="flex-1 w-full"></Text>
                <View className="flex-1 flex flex-col justify-center items-center">
                  <Image
                    source={{uri: goalKeeperB?.player.image_path}}
                    className="w-8 h-8 bg-white rounded-full"
                  />
                  <Text className="text-[10px]">
                    {goalKeeperB?.player.display_name}
                  </Text>
                </View>
              </View>
            </View>

            {/* <PitchSVG style={{transform: [{rotate: '180deg'}]}} /> */}
            <View className="flex flex-row">
              <View className="flex-1 flex flex-row items-center gap-x-1">
                <Image
                  source={{uri: fixtureData?.participants[1].image_path}}
                  className="w-4 h-4"
                />
                <Text className="my-2">
                  {fixtureData?.participants[1].name}
                </Text>
              </View>
              <View className="flex-1 flex flex-row justify-end">
                <Text className="my-2">{formationTeamB?.formation}</Text>
              </View>
            </View>
          </View>
          <View className="flex flex-row gap-2 px-2 mt-2">
            <View className="flex-1 flex flex-row bg-[#EBEBEB] p-1 rounded-lg items-center gap-x-1">
              <Image
                source={{uri: fixtureData?.participants[0].image_path}}
                className="w-4 h-4"
              />
              <Text className="my-2">{fixtureData?.participants[0].name}</Text>
            </View>
            <View className="flex-1 flex flex-row bg-[#EBEBEB] p-1 rounded-lg items-center gap-x-1">
              <Image
                source={{uri: fixtureData?.participants[1].image_path}}
                className="w-4 h-4"
              />
              <Text className="my-2">{fixtureData?.participants[1].name}</Text>
            </View>
          </View>
          <Text className="text-lg mt-4 px-4 font-bold">
            Thông tin thay người
          </Text>
          <View className="flex flex-row gap-2 px-4 mt-2">
            <View className="flex-1 flex flex-col p-1 rounded-lg">
              <View className="flex flex-row items-center gap-2">
                <Text className="">16'</Text>
                <View className="flex flex-col">
                  <View className="flex flex-row gap-2">
                    <ChangePeopleOutSVG />
                    <Text>John Terry</Text>
                  </View>
                  <View className="flex flex-row gap-2 mt-[1px]">
                    <ChangePeopleInSVG />
                    <Text>John Terry</Text>
                  </View>
                </View>
              </View>
            </View>
            <View className="flex-1 flex flex-col p-1 rounded-lg">
              <View className="flex flex-row items-center gap-2">
                <Text className="">16'</Text>
                <View className="flex flex-col">
                  <View className="flex flex-row gap-2">
                    <ChangePeopleOutSVG />
                    <Text>John Terry</Text>
                  </View>
                  <View className="flex flex-row gap-2 mt-[1px]">
                    <ChangePeopleInSVG />
                    <Text>John Terry</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
          <Text className="text-lg mt-4 px-4 font-bold">Huấn luyện viên</Text>
          <View className="flex flex-row gap-2 px-4 mt-2">
            <Text className="flex-1">{coachA?.display_name}</Text>
            <Text className="flex-1">{coachB?.display_name}</Text>
          </View>
          <Text className="text-lg mt-4 px-4 font-bold">Đội hình dự bị</Text>
          <View className="flex flex-row gap-2 px-4 mt-2">
            <View className="flex-1 flex flex-col p-1 rounded-lg">
              <View className="flex flex-row items-center gap-2">
                <Text className="">16</Text>
                <Text>John Terry</Text>
              </View>
            </View>
            <View className="flex-1 flex flex-col p-1 rounded-lg">
              <View className="flex flex-row items-center gap-2">
                <Text className="">16</Text>
                <Text>John Terry</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    );
  } else {
    return <></>;
  }
}

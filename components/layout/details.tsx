import * as React from 'react';
import {Image, ScrollView, Text, View} from 'react-native';
import {handleGetDetailFixture} from '../../services/matches';
import moment from 'moment';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Overall from './overall';
import Formation from './formation';
const Tab = createMaterialTopTabNavigator();

const Details = ({route, navigation}: any) => {
  const {fixtureId} = route.params;
  const [fixtureData, setFixtureData] = React.useState(null);

  const state = fixtureData?.state;
  const league = fixtureData?.league;
  const startTime = fixtureData?.starting_at.split(' ');

  React.useEffect(() => {
    if (league)
      navigation.setOptions({
        title: league?.name,
      });
  }, [league, navigation]);

  React.useEffect(() => {
    handleGetDetailFixture(fixtureId).then((result: any) => {
      if (result.data.data) {
        setFixtureData(result.data.data);
      }
    });
  }, [fixtureId]);

  const participantA = fixtureData?.participants[0];
  const participantB = fixtureData?.participants[1];

  const participantAGoal = fixtureData?.events
    .filter(
      (event: any) =>
        event.type_id === 14 && event.participant_id === participantA.id,
    )
    .sort((a: any, b: any) =>
      a.minute > b.minute ? 1 : a.minute < b.minute ? -1 : 0,
    );

  const participantBGoal = fixtureData?.events
    .filter(
      (event: any) =>
        event.type_id === 14 && event.participant_id === participantB.id,
    )
    .sort((a: any, b: any) =>
      a.minute > b.minute ? 1 : a.minute < b.minute ? -1 : 0,
    );

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{flexGrow: 1}}>
      <View className="flex flex-col w-full min-h-screen bg-[#F5F5F7] mt-6">
        {fixtureData && (
          <View className="w-full px-2 mt-2">
            <View className="w-full px-2 h-[120px] flex flex-row rounded-lg bg-[#FFD9B7] items-center justify-between">
              <View className="flex flex-col items-center justify-center h-full flex-1">
                <View className="flex flex-row items-center">
                  <Image
                    source={{uri: fixtureData?.participants[0].image_path}}
                    className="w-16 h-16"
                  />
                </View>
                <Text className="mt-1 text-center text-black">
                  {fixtureData?.participants[0].name}
                </Text>
              </View>
              <View className="flex flex-col flex-1">
                <Text className="text-center text-black font-bold text-xl">
                  {state?.id === 1
                    ? `${moment(startTime[0]).format('DD/MM')}\n${
                        startTime[1]
                      } `
                    : fixtureData?.state?.state === 'POSTPONED'
                    ? 'Đã Tạm Hoãn'
                    : `${participantAGoal.length} - ${participantBGoal.length}`}
                </Text>
              </View>
              <View className="flex flex-col items-center flex-1">
                <View className="flex flex-row items-center">
                  <Image
                    source={{uri: fixtureData?.participants[1].image_path}}
                    className="w-16 h-16"
                  />
                </View>
                <Text className="mt-1 text-center text-black">
                  {fixtureData?.participants[1].name}
                </Text>
              </View>
            </View>
          </View>
        )}
        <Tab.Navigator
          screenOptions={{
            lazy: true,
            tabBarInactiveTintColor: 'black',
            tabBarActiveTintColor: '#F97700',
            tabBarIndicatorStyle: {
              backgroundColor: '#F97700',
            },
            tabBarScrollEnabled: true,
          }}>
          <Tab.Screen
            name="Tổng quan"
            component={Overall}
            initialParams={{
              fixtureId,
            }}
          />
          <Tab.Screen
            name="Thống kê"
            component={Overall}
            initialParams={{
              fixtureId,
            }}
          />
          <Tab.Screen
            name="Đội hình"
            component={Formation}
            initialParams={{
              fixtureId,
            }}
          />
        </Tab.Navigator>
      </View>
    </ScrollView>
  );
};

export default Details;

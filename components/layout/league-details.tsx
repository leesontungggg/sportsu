import * as React from 'react';
import {Image, ScrollView, Text, View} from 'react-native';
import {
  handleGetDetailFixture,
  handleGetDetailLeague,
} from '../../services/matches';
import moment from 'moment';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Overall from './overall';
import Formation from './formation';
import LeagueOverall from './league-overall';
import LeagueFixture from './league-fixtures';
import LeagueBoard from './league-board';
import LeagueTeam from './league-team';
import LeaguePlayer from './league-player';
const Tab = createMaterialTopTabNavigator();

const LeagueDetails = ({route, navigation}: any) => {
  const {leagueId} = route.params;
  // console.log('leagueId', leagueId);
  const [leagueData, setLeagueData] = React.useState(null);

  React.useEffect(() => {
    handleGetDetailLeague(leagueId).then((result: any) => {
      if (result.data.data) {
        setLeagueData(result.data.data);
      }
    });
  }, [leagueId]);

  React.useEffect(() => {
    if (leagueData)
      navigation.setOptions({
        title: leagueData?.name,
      });
  }, [leagueData, navigation]);

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View className="flex flex-col w-full min-h-screen bg-[#F5F5F7]">
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
            component={LeagueOverall}
            initialParams={{
              leagueId,
            }}
          />
          <Tab.Screen
            name="Trận đấu"
            component={LeagueFixture}
            initialParams={{
              leagueId,
            }}
          />
          <Tab.Screen
            name="Bảng điểm"
            component={LeagueBoard}
            initialParams={{
              leagueId,
            }}
          />
          <Tab.Screen
            name="Thông tin đội"
            component={LeagueTeam}
            initialParams={{
              leagueId,
            }}
          />
          <Tab.Screen
            name="Thông tin cầu thủ"
            component={LeaguePlayer}
            initialParams={{
              leagueId,
            }}
          />
        </Tab.Navigator>
      </View>
    </ScrollView>
  );
};

export default LeagueDetails;

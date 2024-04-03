import * as React from 'react';
import {Image, ScrollView, Text, View} from 'react-native';
import {handleGetDetailFixture} from '../../services/matches';
import moment from 'moment';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Overall from './overall';
import Formation from './formation';
import LeagueOverall from './league-overall';
import LeagueFixture from './league-fixtures';
import LeagueBoard from './league-board';
import LeagueTeam from './league-team';
import LeaguePlayer from './league-player';
import TeamFixture from './team-fixture';
import TeamBoard from './team-board';
const Tab = createMaterialTopTabNavigator();

const TeamDetails = ({route, navigation}: any) => {
  const {teamId} = route.params;
  // console.log('teamId', teamId);
  const [teamData, setTeamData] = React.useState(null);

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{flexGrow: 1}}>
      <View className="flex flex-col w-full min-h-screen bg-[#F5F5F7] mt-6">
        <Tab.Navigator
          screenOptions={{
            lazy: true,
            tabBarInactiveTintColor: 'black',
            tabBarActiveTintColor: '#F97700',
            tabBarIndicatorStyle: {
              backgroundColor: '#F97700',
            },
          }}>
          <Tab.Screen
            name="Trận đấu"
            component={TeamFixture}
            initialParams={{
              teamId,
            }}
          />
          <Tab.Screen
            name="Bảng điểm"
            component={TeamBoard}
            initialParams={{
              teamId,
            }}
          />
        </Tab.Navigator>
      </View>
    </ScrollView>
  );
};

export default TeamDetails;

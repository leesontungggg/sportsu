import * as React from 'react';
import {ScrollView, Text, View} from 'react-native';
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
import {handleGetDetailTeam} from '../../services/matches';

export default function TeamBoard({route}: any) {
  const {teamId} = route.params;
  const [teamData, setTeamData] = React.useState(null);

  React.useEffect(() => {
    handleGetDetailTeam(teamId).then((result: any) => {
      if (result.data.data) {
        setTeamData(result.data.data);
      }
    });
  }, [teamId]);

  if (teamData) {
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{flexGrow: 1}}>
        <View className="h-[2000px]"></View>
      </ScrollView>
    );
  } else {
    return <></>;
  }
}

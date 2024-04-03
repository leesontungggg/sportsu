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
import {
  handleGetDetailFixture,
  handleGetDetailLeague,
} from '../../services/matches';

export default function LeaguePlayer({route}: any) {
  const {leagueId} = route.params;
  const [leagueData, setLeagueData] = React.useState(null);

  React.useEffect(() => {
    handleGetDetailLeague(leagueId).then((result: any) => {
      if (result.data.data) {
        setLeagueData(result.data.data);
      }
    });
  }, [leagueId]);

  if (leagueData) {
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

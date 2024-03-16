import * as React from 'react';
import {
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
  Modal,
  Alert,
  ScrollView,
  Button,
} from 'react-native';
import {Calendar} from 'react-native-calendars';
import moment from 'moment';
import * as _ from 'lodash';

import {SafeAreaView} from 'react-native-safe-area-context';
import {createStackNavigator} from '@react-navigation/stack';

import {
  ArrowLeft,
  EmptyStarSVG,
  FootballSVG,
  // NbaSVG,
  StarSVG,
  BackSVG,
  LiveSVG,
} from '../../components/vectors';
import {handleGetFixtures} from '../../services/matches';
import {useNavigation} from '@react-navigation/native';
import Details from '../layout/details';

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba1',
    title: 'asd',
    isLive: true,
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f633',
    title: 'Second Item',
    isLive: false,
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d724',
    title: 'Third Item',
    isLive: false,
  },
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
    isLive: false,
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
    isLive: false,
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
    isLive: false,
  },
];

// const AdsSlot = () => {
//   return (
//     <View className="w-[320px] h-[100px] flex justify-center items-center border-[#005FB7] border-dashed border my-2 bg-[#005FB7]/10">
//       <Text className="text-[#005FB7]">AD slot (320x100)</Text>
//     </View>
//   );
// };

const INITIAL_DATE = moment().format('YYYY-MM-DD');

const Toggle = () => {
  const [isFootball, setIsFootball] = React.useState(true);

  return (
    <View className="flex flex-row items-center justify-between h-12 w-fit rounded-[99px] bg-[#F5F5F7] px-1">
      <TouchableOpacity
        className={`${
          isFootball ? 'w-[92px] bg-white' : ''
        } h-10 rounded-[99px]  flex flex-row items-center justify-center p-2`}
        onPress={() => setIsFootball(true)}>
        {/* <Image
          className="w-6 h-6"
          source={require('./assets/vectors/football.png')}
        /> */}
        <FootballSVG
          fill={isFootball ? '#F97700' : '#120802'}
          fillOpacity={isFootball ? 1 : 0.2}
        />
        {isFootball && (
          <Text className="text-[#F97700] text-xs ml-1">Bóng đá</Text>
        )}
      </TouchableOpacity>
      {/* <TouchableOpacity
        className={`${
          !isFootball ? 'w-[92px] bg-white' : ''
        } h-10 rounded-[99px]  flex flex-row-reverse items-center justify-center p-2`}
        onPress={() => setIsFootball(false)}>
        <NbaSVG
          fill={!isFootball ? '#F97700' : '#120802'}
          fillOpacity={!isFootball ? 1 : 0.2}
        />
        {!isFootball && (
          <Text className="text-[#F97700] text-xs mr-1">Bóng rổ</Text>
        )}
      </TouchableOpacity> */}
    </View>
  );
};

const Header = () => {
  return (
    <View className="w-full flex flex-row justify-between items-center h-16 bg-white px-2">
      <Toggle />
      <Search />
    </View>
  );
};

const Search = () => {
  return (
    <View className="w-12 h-12 flex items-center justify-center">
      <Image
        className="w-6 h-6"
        source={require('../../assets/vectors/search.png')}
      />
    </View>
  );
};

const Filter = ({setCurrentDate, isLive, toggleLive}: any) => {
  const [modalVisible, setModalVisible] = React.useState(false);
  const [selected, setSelected] = React.useState(INITIAL_DATE);
  const [usingCalendar, setUsingCalendar] = React.useState(false);
  const [currentIndex, setCurrentIndex] = React.useState(3);

  const onDayPress = (day: any) => {
    setCurrentDate(day.dateString);
    setSelected(day.dateString);
    setModalVisible(false);
    setUsingCalendar(true);
  };

  return (
    <View className="flex flex-row justify-between items-center w-full mt-4">
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <TouchableOpacity
          className="flex flex-col-reverse w-screen h-screen bg-black/50"
          onPress={() => setModalVisible(false)}>
          <View className="px-2 w-full h-fit pb-12 rounded-2xl">
            <Calendar
              minDate={INITIAL_DATE}
              current={selected}
              onDayPress={onDayPress}
              className="rounded-2xl"
            />
          </View>
        </TouchableOpacity>
      </Modal>
      <TouchableOpacity
        className="w-12 h-12 items-center justify-center"
        onPress={toggleLive}>
        <View
          className={`py-1 px-2 ${
            isLive ? 'bg-[#F04939]' : 'bg-white'
          } rounded flex justify-center items-center`}>
          <LiveSVG fill={isLive ? '#FFFFFF' : '#F04939'} />
          <Text
            className={`font-semibold ${
              isLive ? 'text-white' : 'text-[#F04939]'
            } text-xs`}>
            LIVE
          </Text>
        </View>
      </TouchableOpacity>
      <View className="flex flex-row gap-x-1">
        <TouchableOpacity
          className={`w-12 h-[54px] flex items-center justify-center ${
            !usingCalendar && currentIndex === 1
              ? 'bg-white border-[1px] border-[#FFA755]'
              : ''
          } rounded-[10px]`}
          onPress={() => {
            setCurrentDate(moment().subtract(2, 'days').format('YYYY-MM-DD'));
            setUsingCalendar(false);
            setCurrentIndex(1);
          }}>
          <Text className="text-[10px] text-black">
            {moment().subtract(2, 'days').format('E') !== '7'
              ? `T${+moment().subtract(2, 'days').format('E') + 1}`
              : 'CNhật'}
          </Text>
          <Text className="text-[10px] text-black">
            {moment().subtract(2, 'days').format('DD/MM')}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          className={`w-12 h-[54px] flex items-center justify-center ${
            !usingCalendar && currentIndex === 2
              ? 'bg-white border-[1px] border-[#FFA755]'
              : ''
          } rounded-[10px]`}
          onPress={() => {
            setCurrentDate(moment().subtract(1, 'days').format('YYYY-MM-DD'));
            setUsingCalendar(false);
            setCurrentIndex(2);
          }}>
          <Text className="text-[10px] text-black">
            {moment().subtract(1, 'days').format('E') !== '7'
              ? `T${+moment().subtract(1, 'days').format('E') + 1}`
              : 'CNhật'}
          </Text>
          <Text className="text-[10px] text-black">
            {moment().subtract(1, 'days').format('DD/MM')}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          className={`w-12 h-[54px] flex items-center justify-center ${
            !usingCalendar && currentIndex === 3
              ? 'bg-white border-[1px] border-[#FFA755]'
              : ''
          } rounded-[10px]`}
          onPress={() => {
            setCurrentDate(moment().format('YYYY-MM-DD'));
            setUsingCalendar(false);
            setCurrentIndex(3);
          }}>
          <Text className="text-[10px] text-[#F97700]">H.Nay</Text>
          <Text className="text-[10px] text-[#F97700]">
            {moment().format('DD/MM')}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          className={`w-12 h-[54px] flex items-center justify-center ${
            !usingCalendar && currentIndex === 4
              ? 'bg-white border-[1px] border-[#FFA755]'
              : ''
          } rounded-[10px]`}
          onPress={() => {
            setCurrentDate(moment().add(1, 'days').format('YYYY-MM-DD'));
            setUsingCalendar(false);
            setCurrentIndex(4);
          }}>
          <Text className="text-[10px] text-black">
            {moment().add(1, 'days').format('E') !== '7'
              ? `T${+moment().add(1, 'days').format('E') + 1}`
              : 'CNhật'}
          </Text>
          <Text className="text-[10px] text-black">
            {moment().add(1, 'days').format('DD/MM')}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          className={`w-12 h-[54px] flex items-center justify-center ${
            !usingCalendar && currentIndex === 5
              ? 'bg-white border-[1px] border-[#FFA755]'
              : ''
          } rounded-[10px]`}
          onPress={() => {
            setCurrentDate(moment().add(2, 'days').format('YYYY-MM-DD'));
            setUsingCalendar(false);
            setCurrentIndex(5);
          }}>
          <Text className="text-[10px] text-black">
            {moment().add(2, 'days').format('E') !== '7'
              ? `T${+moment().add(2, 'days').format('E') + 1}`
              : 'CNhật'}
          </Text>
          <Text className="text-[10px] text-black">
            {moment().add(2, 'days').format('DD/MM')}
          </Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        className={`w-12 h-12 items-center justify-center rounded-[10px] ${
          usingCalendar ? 'bg-white border-[1px] border-[#FFA755]' : ''
        }`}
        onPress={() => {
          setModalVisible(true);
        }}>
        <Image
          className="w-6 h-6"
          source={require('../../assets/vectors/calendar.png')}
        />
      </TouchableOpacity>
    </View>
  );
};

const League = ({league}: any) => {
  return (
    <View className="flex flex-row w-full justify-between h-[46px] px-2 mt-1">
      <View className="flex flex-row items-center justify-center">
        <Image
          source={{
            uri: league.image_path,
          }}
          className="w-6 h-6 rounded-full"
        />
        <View className="flex flex-col ml-2">
          <View className="flex flex-row gap-x-1 justify-center items-center">
            <Text className="text-sm font-semibold text-black mr-2">
              {league.name}
            </Text>
            {/* <StarSVG /> */}
          </View>
          {/* <Text className="text-[11px] font-normal text-[#120802]">
            Description
          </Text> */}
        </View>
      </View>
      {/* <TouchableOpacity className="flex flex-row items-center justify-center w-8 h-8">
        <ArrowLeft className="" />
      </TouchableOpacity> */}
    </View>
  );
};

const Match = ({fixture}: any) => {
  const participants = fixture.participants;
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      className="w-full h-16 bg-white rounded-lg mt-2 px-2 py-[10px] flex flex-row items-center justify-between"
      onPress={() => navigation.navigate('Details', {fixtureId: fixture.id})}>
      <View className="flex flex-row items-center">
        <Text className="text-[#120802] text-[11px] font-normal">
          {moment(fixture.starting_at, 'YYYY-MM-DD HH:mm:ss').format('HH:mm')}
        </Text>
        <View className="ml-2 flex gap-y-1">
          <View className="flex flex-row gap-x-2">
            <Image
              source={{
                uri: participants[0].image_path,
              }}
              className="w-4 h-4 rounded-full"
            />
            <Text className="text-[#120802] text-[14px] font-semibold">
              {participants[0].name}
            </Text>
          </View>
          <View className="flex flex-row gap-x-2">
            <Image
              source={{
                uri: participants[1].image_path,
              }}
              className="w-4 h-4 rounded-full"
            />
            <Text className="text-[#120802] text-[14px] font-semibold">
              {participants[1].name}
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
  );
};

const Matches = ({league, fixtures}: any) => {
  return (
    <View className="h-fit">
      <League league={league} />
      {fixtures.map((fixture: any, id: any) => (
        <Match fixture={fixture} id={id} />
      ))}
    </View>
  );
};

const Item = ({isLive}: any) => {
  return (
    <View className="w-[120px] h-[120px] flex items-center rounded-lg bg-gradient-to-r bg-[#FFD9B7] to-[#FFD9B7]/25 px-4 py-[18px]">
      <View className="flex flex-row gap-x-6">
        <View className="bg-white w-8 h-8 rounded-full"></View>
        <View className="bg-white w-8 h-8 rounded-full"></View>
      </View>
      {isLive ? (
        <View className="mt-3 w-[52px] h-4 rounded-[99px] bg-white flex flex-row items-center justify-center">
          <View className="rounded-full w-2 h-2 bg-[#F04939]" />
          <Text className="text-xs ml-1 text-black">Live</Text>
        </View>
      ) : (
        <View className="mt-3 w-[52px] h-4 rounded-[99px] flex flex-row items-center justify-center">
          <Text className="text-xs ml-1 text-black">Hôm nay</Text>
        </View>
      )}
      <Text
        className={`${isLive && 'text-[#F04939] font-semibold'} text-sm mt-1`}>
        {isLive ? "79'" : '15:30'}
      </Text>
    </View>
  );
};

const Favorite = () => {
  return (
    <View className="w-full flex justify-between items-center h-[176px] p-2 bg-[#F5F5F7]">
      <View className="w-full flex flex-row justify-between items-center p-1">
        <View className="flex flex-row items-center justify-center">
          <Image
            className="w-6 h-6"
            source={require('../../assets/vectors/star.png')}
          />
          <Text className="text-[#120802] text-sm ml-[6px]">Đang theo dõi</Text>
        </View>
        <TouchableOpacity>
          <Text className="text-[#F97700] text-sm">Xem tất cả {'>'}</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        contentContainerStyle={{
          justifyContent: 'center',
          flexDirection: 'row',
          // flexWrap: 'wrap',
          gap: 8,
        }}
        className="flex flex-row"
        data={DATA}
        renderItem={(data: any) => {
          const {item} = data;
          return <Item isLive={item.isLive} title={item.title} />;
        }}
        keyExtractor={item => item.id}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

const CalendarSection = () => {
  const [currentDate, setCurrentDate] = React.useState(INITIAL_DATE);
  const [fixtures, setFixtures] = React.useState<any>(null);
  const leaguesId = !!fixtures && Object.keys(fixtures);
  const [isLive, setIsLive] = React.useState(false);

  React.useEffect(() => {
    handleGetFixtures(isLive, currentDate).then(result => {
      if (result.data.data) {
        const groupFixtures = _.groupBy(
          result.data.data,
          item => item.league.id,
        );
        setFixtures(groupFixtures);
      }
    });
  }, [currentDate, isLive]);

  return (
    <View className="px-2 flex items-center w-full bg-[#F5F5F7]">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{flexGrow: 1}}>
        <View className="w-full items-center h-[3000px]">
          {/* <Favorite /> */}
          <Filter
            setCurrentDate={setCurrentDate}
            isLive={isLive}
            toggleLive={() => setIsLive(!isLive)}
          />
          {leaguesId &&
            leaguesId.length > 0 &&
            leaguesId.map((leagueId: any, index: any) => (
              <Matches
                id={index}
                league={fixtures[leagueId][0]?.league}
                fixtures={fixtures[leagueId]}
              />
            ))}
        </View>
      </ScrollView>
    </View>
  );
};

const Stack = createStackNavigator();

const Home = ({navigation}) => {
  return (
    <View className="w-screen">
      <Header />
      <CalendarSection />
    </View>
  );
};

function HomeScreen() {
  return (
    <Stack.Navigator screenOptions={{headerTintColor: '#F97700'}}>
      <Stack.Screen
        options={{headerShown: false}}
        name="Home"
        component={Home}
      />
      <Stack.Screen
        name="Details"
        component={Details}
        options={{
          title: '',
          headerBackImage: () => (
            <View className="p-4">
              <BackSVG />
            </View>
          ),
          headerBackTitleVisible: false,
          headerStyle: {
            backgroundColor: '#F5F5F7',
          },
          headerShadowVisible: false,
        }}
      />
    </Stack.Navigator>
  );
}

export default HomeScreen;

import * as React from 'react';
import {
  SafeAreaView,
  Text,
  View,
  TextInput,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {getHotLeagues, getHotTeams} from '../../services/matches';
import moment from 'moment';
import {CancelSVG, TeamSVG, TrophySVG} from '../vectors';
import * as _ from 'lodash';
import {HOT_TEAMS, HOT_LEAGUES} from '../../types/constant';
import {handleSearchFixturesByParticipantName} from '../../services/matches';

const SearchPage = ({navigation}) => {
  const [isFocus, setIsFocus] = React.useState(false);
  const [hotLeagues, setHotLeagues] = React.useState([]);
  const [searchInput, setSearchInput] = React.useState('');

  const [currentFilter, setCurrentFilter] = React.useState(1);
  const inputRef = React.useRef(null);
  const [searchResult, setSearchResult] = React.useState(null);

  const handleBlurInput = () => {
    if (inputRef.current) {
      inputRef.current.blur();
    }
  };

  React.useEffect(() => {
    if (searchInput.length > 0) {
      if (currentFilter === 1) {
        const delayDebounceFn = setTimeout(() => {
          handleSearchFixturesByParticipantName(searchInput).then(val => {
            if (val.data.data) {
              setSearchResult(val.data.data);
            } else {
              setSearchResult(null);
            }
          });
          // Send Axios request here
        }, 1000);

        return () => clearTimeout(delayDebounceFn);
      }
      if (currentFilter === 2) {
        const result: any = [];
        HOT_LEAGUES.map((x: any) => {
          if (x.name?.includes(searchInput)) {
            result.push(x);
          }
        });

        setSearchResult(result);
      }

      if (currentFilter === 3) {
        const result: any = [];
        HOT_TEAMS.map((x: any) => {
          if (x.name?.includes(searchInput)) {
            result.push(x);
          }
        });

        setSearchResult(result);
      }
    } else {
      setSearchResult(null);
    }
  }, [searchInput, currentFilter]);

  // React.useEffect(() => {
  //   getHotLeagues().then(result => {
  //     if (result.data.data) {
  //       const hotLeaguesData = result.data.data;
  //       hotLeaguesData.sort((a: any, b: any) => {
  //         const timeA = moment(a.last_played_at, 'YYYY-MM-DD HH:mm:ss');
  //         const timeB = moment(b.last_played_at, '2024-MM-DD HH:mm:ss');
  //         return timeB.diff(timeA);
  //       });

  //       setHotLeagues(hotLeaguesData);
  //     }
  //   });
  // }, []);

  const renderSearchResult = () => {
    if (currentFilter === 1) {
      if (Object.keys(searchResult[0]).includes('participants'))
        return (
          <View className="w-full px-2">
            {searchResult === null ? (
              <View className="flex flex-row w-full mt-4 justify-center items-centert">
                <Text>Không tìm thấy lịch thi đấu hôm nay</Text>
              </View>
            ) : (
              searchResult?.map((match: any) => (
                <TouchableOpacity
                  className="w-full h-16 bg-white rounded-lg mt-2 px-2 py-[10px] flex flex-row items-center justify-between"
                  onPress={() =>
                    navigation.navigate('Details', {fixtureId: match?.id})
                  }>
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
              ))
            )}
          </View>
        );
    }

    if (currentFilter === 2) {
      return (
        <View className="py-3 px-2 gap-y-2">
          {searchResult?.map((league: any) => (
            <View className="py-[15px] px-2 bg-white rounded-lg flex flex-row items-center">
              <Image
                source={{
                  uri: league.image_path,
                }}
                className="w-6 h-6 rounded-full"
              />
              <View className="flex ml-2">
                <Text className="text-[14px] font-semibold">{league.name}</Text>
              </View>
            </View>
          ))}
        </View>
      );
    }

    if (currentFilter === 3) {
      return (
        <View className="py-3 px-2 gap-y-2">
          {searchResult?.map((league: any) => (
            <View className="py-[15px] px-2 bg-white rounded-lg flex flex-row items-center">
              <Image
                source={{
                  uri: league.image_path,
                }}
                className="w-6 h-6 rounded-full"
              />
              <View className="flex ml-2">
                <Text className="text-[14px] font-semibold">{league.name}</Text>
              </View>
            </View>
          ))}
        </View>
      );
    }
  };

  return (
    <SafeAreaView className="w-screen min-h-screen">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{flexGrow: 1}}>
        <View className="h-[2000px] w-screen">
          <View className="w-full h-16 flex flex-row px-2 py-3 bg-white">
            <Image
              className="w-6 h-6 absolute top-5 left-5"
              source={require('../../assets/vectors/search.png')}
            />
            {isFocus && (
              <TouchableOpacity
                className="absolute top-5 right-5 z-10"
                onPress={() => {
                  setIsFocus(false);
                  setSearchInput('');
                  handleBlurInput();
                }}>
                <CancelSVG />
              </TouchableOpacity>
            )}
            <TextInput
              className="w-full h-full py-2 pl-10 pr-3 border-[1px] border-[#D8D8D8] rounded-3xl flex-1"
              onChange={e => {
                // console.log(e.target);
              }}
              onChangeText={setSearchInput}
              value={searchInput}
              onFocus={() => {
                setIsFocus(true);
              }}
              onBlur={() => {
                setIsFocus(false);
              }}
              ref={inputRef}
            />
            {!isFocus && (
              <TouchableOpacity
                className="w-auto flex flex-row items-center justify-center px-2 ml-2"
                onPress={() => navigation.navigate('Home')}>
                <Text className="text-[#F97700] font-semibold">Hủy</Text>
              </TouchableOpacity>
            )}
          </View>
          {(isFocus || searchInput.length > 0) && (
            <View className="bg-white h-[56px] p-3">
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {/* <TouchableOpacity
                  className={`border-[1px] ${
                    currentFilter === 0
                      ? 'border-[#F97700] bg-[#FFA755]/10'
                      : 'border-[#D8D8D8]'
                  } rounded-3xl py-[6px] px-2`}
                  onPress={() => setCurrentFilter(0)}>
                  <Text
                    className={`${
                      currentFilter === 0 ? 'text-[#F97700]' : 'text-[#595959]'
                    } px-[6px]`}>
                    Tất cả
                  </Text>
                </TouchableOpacity> */}
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
                    Trận đấu
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
                    Giải đấu
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  className={`border-[1px] ${
                    currentFilter === 3
                      ? 'border-[#F97700] bg-[#FFA755]/10'
                      : 'border-[#D8D8D8]'
                  } rounded-3xl py-[6px] px-2 ml-2`}
                  onPress={() => setCurrentFilter(3)}>
                  <Text
                    className={`${
                      currentFilter === 3 ? 'text-[#F97700]' : 'text-[#595959]'
                    } px-[6px]`}>
                    Đội thi đấu
                  </Text>
                </TouchableOpacity>
              </ScrollView>
            </View>
          )}
          {searchInput.length === 0 && (
            <>
              <View className="w-full h-8 mt-2 py-1 px-3 flex flex-row items-center font-semibold text-[14px]">
                <TrophySVG />
                <Text className="ml-[6px]">Top giải đấu</Text>
              </View>
              <View className="py-3 px-2 gap-y-2">
                {_.sampleSize(HOT_LEAGUES, 5).map((league: any) => (
                  <View className="py-[15px] px-2 bg-white rounded-lg flex flex-row items-center">
                    <Image
                      source={{
                        uri: league.image_path,
                      }}
                      className="w-6 h-6 rounded-full"
                    />
                    <View className="flex ml-2">
                      <Text className="text-[14px] font-semibold">
                        {league.name}
                      </Text>
                    </View>
                  </View>
                ))}
              </View>
              <View className="w-full h-8 mt-2 py-1 px-3 flex flex-row items-center font-semibold text-[14px]">
                <TeamSVG />
                <Text className="ml-[6px]">Top đội thi đấu</Text>
              </View>
              <View className="py-3 px-2 gap-y-2">
                {_.shuffle(HOT_TEAMS).map((team: any) => (
                  <View className="py-[15px] px-2 bg-white rounded-lg flex flex-row items-center">
                    <Image
                      source={{
                        uri: team.image_path,
                      }}
                      className="w-6 h-6 rounded-full"
                    />
                    <View className="flex ml-2">
                      <Text className="text-[14px] font-semibold">
                        {team.name}
                      </Text>
                    </View>
                  </View>
                ))}
              </View>
            </>
          )}
          {searchInput.length > 0 && !!searchResult && renderSearchResult()}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SearchPage;

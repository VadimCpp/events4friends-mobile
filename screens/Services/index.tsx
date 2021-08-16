import React, { useState, useContext, useCallback, useEffect } from 'react';
import { ScrollView, View, StyleSheet, Text } from 'react-native';

// components
import ServicesListItem from '@components/ServicesListItem';
import Button from '@components/Button';
import NoDataContainer from '@components/NoDataContainer';

// contexts
import AuthContext from '@context/AuthContext';
import DataContext from '@context/DataContext';
import StorageContext from '@context/StorageContext';

// constants
import { NOTICE_CONNECTING, NOTICE_LOADING } from '@utils/constants';

// utils
import { COLORS } from '@utils/constants';
import { IService, INavigation, ICommunity } from '@utils/interfaces';
import { calcSize } from '@utils/misc';

enum ServiceSortingType {
  SortByName = 'SORT_BY_NAME',
  SortByService = 'SORT_BY_SERVICE',
  SortByPrice = 'SORT_BY_PRICE',
  // TODO: add more sorting types here
}

interface ServicesScreenParams {
  navigation: INavigation;
}

const ServicesScreen = (props: ServicesScreenParams) => {
  const { navigation } = props;

  const authContext = useContext(AuthContext);
  const dataContext = useContext(DataContext);
  const storageContext = useContext(StorageContext);

  const { connectingToFirebase } = authContext;
  const { services, loadingServices, communities } = dataContext;
  const { getCommunityID } = storageContext;

  const [community, setCommunity] = useState<ICommunity | null>(null);
  const [sortingType, setSortingType] = useState(
    ServiceSortingType.SortByService,
  );
  const [sortedServices, setSortedServices] = useState<Array<IService>>([]);

  useEffect(() => {
    const anId = `${getCommunityID()}`;
    const aCommunity = communities.find(c => c.id === anId) || null;
    setCommunity(aCommunity);
  }, [communities, getCommunityID]);

  useEffect(() => {
    navigation.setOptions({
      headerBackTitle: 'На главную',
    });
  }, [navigation]);

  const onServicePress = useCallback(
    service => {
      navigation.navigate('ServiceScreen', {
        service,
      });
    },
    [navigation],
  );

  useEffect(() => {
    // Номер сообщества по умолчанию - 1 - events4friends
    const DEFAULT_COMMUNITY_ID = '1';
    const communityId = community?.id;
    if (communityId) {
      let sorted: Array<IService> = services.filter((s: IService) => {
        const sCommunityId = s.communityId
          ? s.communityId
          : DEFAULT_COMMUNITY_ID;
        return sCommunityId === communityId;
      });
      if (sortingType === ServiceSortingType.SortByName) {
        sorted.sort((a: IService, b: IService): number => {
          return a.name ? a.name.localeCompare(b.name) : 0;
        });
      } else if (sortingType === ServiceSortingType.SortByService) {
        sorted.sort((a: IService, b: IService): number => {
          return a.service ? a.service.localeCompare(b.service) : 0;
        });
      } else if (sortingType === ServiceSortingType.SortByPrice) {
        sorted.sort((a: IService, b: IService): number => {
          //
          // NOTE!
          // Сначала показываем бесплатные услуги
          // Потом по возрастанию цены
          // В конце - услуги без указания цены
          //
          if (a.isFree && b.isFree) {
            return 0;
          } else if (a.isFree) {
            return -1;
          } else if (b.isFree) {
            return 1;
          } else if (a.price && b.price) {
            return a.price < b.price ? -1 : 0;
          } else if (a.price && !b.price) {
            return -1;
          } else if (a.price && !b.price) {
            return 1;
          }
          return 0;
        });
      }
      setSortedServices(sorted);
    }
  }, [services, sortingType, community]);

  return (
    <View style={styles.backgroundContainer}>
      <ScrollView style={styles.scrollView} bounces={false}>
        {connectingToFirebase || loadingServices ? (
          <NoDataContainer
            label={connectingToFirebase ? NOTICE_CONNECTING : NOTICE_LOADING}
          />
        ) : (
          <View style={styles.container}>
            <View>
              <View style={styles.sortContainer}>
                <Text>Сортировка</Text>
                <Button
                  title="Услуга"
                  onPress={() =>
                    setSortingType(ServiceSortingType.SortByService)
                  }
                  style={
                    sortingType === ServiceSortingType.SortByService
                      ? styles.sortButtonFocused
                      : styles.sortButton
                  }
                  textStyle={
                    sortingType === ServiceSortingType.SortByService
                      ? {
                          color: COLORS.DARK_GRAY,
                        }
                      : {
                          color: COLORS.GRAY,
                        }
                  }
                  selected={sortingType === ServiceSortingType.SortByService}
                />
                <Button
                  title="Имя"
                  onPress={() => setSortingType(ServiceSortingType.SortByName)}
                  style={
                    sortingType === ServiceSortingType.SortByName
                      ? styles.sortButtonFocused
                      : styles.sortButton
                  }
                  textStyle={
                    sortingType === ServiceSortingType.SortByName
                      ? {
                          color: COLORS.DARK_GRAY,
                        }
                      : {
                          color: COLORS.GRAY,
                        }
                  }
                  selected={sortingType === ServiceSortingType.SortByName}
                />
                <Button
                  title="Цена"
                  onPress={() => setSortingType(ServiceSortingType.SortByPrice)}
                  style={
                    sortingType === ServiceSortingType.SortByPrice
                      ? styles.sortButtonFocused
                      : styles.sortButton
                  }
                  textStyle={
                    sortingType === ServiceSortingType.SortByPrice
                      ? {
                          color: COLORS.DARK_GRAY,
                        }
                      : {
                          color: COLORS.GRAY,
                        }
                  }
                  selected={sortingType === ServiceSortingType.SortByPrice}
                />
              </View>
              {sortedServices.map((service: IService) => {
                return (
                  <ServicesListItem
                    key={service.id}
                    service={service}
                    highlightName={
                      sortingType === ServiceSortingType.SortByName
                    }
                    onPress={() => onServicePress(service)}
                  />
                );
              })}
              {sortedServices.length === 0 && (
                <View>
                  <Text style={styles.emptyLabel}>Список пуст</Text>
                </View>
              )}
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  backgroundContainer: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
    alignItems: 'center',
    width: '100%',
  },
  scrollView: {
    flex: 1,
    width: '100%',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
    marginTop: 30,
  },
  sortContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    width: calcSize(300),
  },
  sortButton: {
    backgroundColor: COLORS.STRONG_CYAN_OPACITY_02,
    borderColor: COLORS.STRONG_CYAN,
    borderWidth: 2,
    width: 100,
    marginLeft: 10,
    marginBottom: 10,
  },
  sortButtonFocused: {
    borderColor: COLORS.DARK_CYAN,
    backgroundColor: COLORS.DARK_CYAN_OPACITY_02,
    borderWidth: 2,
    color: COLORS.GRAY,
    width: 100,
    marginLeft: 10,
    marginBottom: 10,
  },
  emptyLabel: {
    marginTop: 20,
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.DARK_GRAY,
    textAlign: 'center',
  },
});

export default ServicesScreen;

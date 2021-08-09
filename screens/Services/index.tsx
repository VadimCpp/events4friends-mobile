import React, { useState, useContext, useCallback } from 'react';
import { ScrollView, View, StyleSheet, Text } from 'react-native';

// components
import ServicesListItem from '../../components/ServicesListItem';
import Button from '../../components/Button';
import NoDataContainer from '../../components/NoDataContainer';

// contexts
import AuthContext from '../../context/AuthContext';
import DataContext from '../../context/DataContext';

// utils
import { IService, INavigation } from '../../utils/interfaces';
import { NOTICE_CONNECTING, NOTICE_LOADING } from '../../utils/constants';
import { calcSize } from '../../utils/misc';

enum ServiceSortingType {
  SortByName = 'SORT_BY_NAME',
  SortByService = 'SORT_BY_SERVICE',
  SortByPrice = 'SORT_BY_PRICE',
  // TODO: add more sorting types here
}

interface ServicesScreenParams {
  navigation: INavigation;
}

function ServicesScreen(props: ServicesScreenParams) {
  const { navigation } = props;
  const authContext = useContext(AuthContext);
  const dataContext = useContext(DataContext);
  const { connectingToFirebase } = authContext;
  const { services, loadingServices } = dataContext;
  const [sortingType, setSortingType] = useState(
    ServiceSortingType.SortByService,
  );

  const onServicePress = useCallback(
    service => {
      navigation.navigate('ServiceScreen', {
        service,
      });
    },
    [navigation],
  );

  //
  // NOTE!
  // При сортировке сначала в результате названия с латинскими буквами
  //
  let sorted: Array<IService> = [];
  if (sortingType === ServiceSortingType.SortByName) {
    sorted = services.sort((a: IService, b: IService): number => {
      return a.name ? a.name.localeCompare(b.name) : 0;
    });
  } else if (sortingType === ServiceSortingType.SortByService) {
    sorted = services.sort((a: IService, b: IService): number => {
      return a.service ? a.service.localeCompare(b.service) : 0;
    });
  } else if (sortingType === ServiceSortingType.SortByPrice) {
    sorted = services.sort((a: IService, b: IService): number => {
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

  return (
    <View style={styles.backgroundContainer}>
      <ScrollView style={styles.scrollView} bounces={false}>
        {connectingToFirebase || loadingServices ? (
          <NoDataContainer
            label={connectingToFirebase ? NOTICE_CONNECTING : NOTICE_LOADING}
          />
        ) : (
          <View style={styles.container}>
            {services.length > 0 ? (
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
                    selected={sortingType === ServiceSortingType.SortByService}
                  />
                  <Button
                    title="Имя"
                    onPress={() =>
                      setSortingType(ServiceSortingType.SortByName)
                    }
                    style={
                      sortingType === ServiceSortingType.SortByName
                        ? styles.sortButtonFocused
                        : styles.sortButton
                    }
                    selected={sortingType === ServiceSortingType.SortByName}
                  />
                  <Button
                    title="Цена"
                    onPress={() =>
                      setSortingType(ServiceSortingType.SortByPrice)
                    }
                    style={
                      sortingType === ServiceSortingType.SortByPrice
                        ? styles.sortButtonFocused
                        : styles.sortButton
                    }
                    selected={sortingType === ServiceSortingType.SortByPrice}
                  />
                </View>
                {sorted.map((service: IService) => {
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
              </View>
            ) : (
              <View>
                <Text style={styles.emptyLabel}>Список пуст</Text>
              </View>
            )}
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  backgroundContainer: {
    flex: 1,
    backgroundColor: '#fff',
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
    backgroundColor: '#24BA7B',
    width: 100,
    marginLeft: 10,
    marginBottom: 10,
  },
  sortButtonFocused: {
    backgroundColor: '#007946',
    color: '#aaa',
    width: 100,
    marginLeft: 10,
    marginBottom: 10,
  },
  emptyLabel: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#404040',
    textAlign: 'center',
  },
});

export default ServicesScreen;

import React from 'react';
import { StyleSheet, View } from 'react-native';
import * as Linking from 'expo-linking';

// components
import Button from '../../../../components/Button';

// interfaces
import { ICommunity } from '../../../../utils/interfaces';

// local components
import Header from '../Header';

// utils
import { COLORS } from '../../../../utils/constants';
import { calcSize } from '../../../../utils/misc';

interface WebLinksBlockProps {
  community: ICommunity;
}

const WebLinksBlock = (props: WebLinksBlockProps) => {
  const {
    community: { vkontakte, instagram, youtube, strava, website },
  } = props;
  const atLeastOneSocial = Boolean(
    vkontakte || instagram || youtube || strava || website,
  );

  if (!atLeastOneSocial) {
    return null;
  }

  const handleLinkClick = async (slug: string, url: string) => {
    try {
      console.log(`Opening ${slug}: ${url}`);
      await Linking.openURL(url);
    } catch (e) {
      alert(`Ошибка! Не могу открыть ${slug}: ${url}`);
    }
  };

  return (
    <View style={styles.container}>
      <Header
        title={'Ссылки'}
        subTitle={
          'В этом разделе ссылки на Instagram, YouTube, социальные сети и т.п.'
        }
      />
      {Boolean(vkontakte) && (
        <Button
          title={'ВКонтакте'}
          onPress={() => handleLinkClick('ВКонтакте', `${vkontakte}`)}
          style={styles.simpleButton}
          textStyle={styles.simpleButtonText}
        />
      )}
      {Boolean(instagram) && (
        <Button
          title={'Instagram'}
          onPress={() => handleLinkClick('Instagram', `${instagram}`)}
          style={styles.simpleButton}
          textStyle={styles.simpleButtonText}
        />
      )}
      {Boolean(youtube) && (
        <Button
          title={'Youtube'}
          onPress={() => handleLinkClick('Youtube', `${youtube}`)}
          style={styles.simpleButton}
          textStyle={styles.simpleButtonText}
        />
      )}
      {Boolean(strava) && (
        <Button
          title={'Strava'}
          onPress={() => handleLinkClick('Strava', `${strava}`)}
          style={styles.simpleButton}
          textStyle={styles.simpleButtonText}
        />
      )}
      {Boolean(website) && (
        <Button
          title={'Сайт'}
          onPress={() => handleLinkClick('Сайт', `${website}`)}
          style={styles.simpleButton}
          textStyle={styles.simpleButtonText}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    width: calcSize(285),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  simpleButton: {
    width: calcSize(210),
    height: calcSize(55),
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    borderWidth: 2,
    marginTop: 30,
    borderColor: COLORS.VERY_LIGHT_BLUE,
    backgroundColor: COLORS.VERY_LIGHT_BLUE_OPACITY_02,
  },
  simpleButtonText: {
    color: COLORS.DARK_GRAY,
    fontSize: 28,
    textAlign: 'center',
  },
});

export default WebLinksBlock;

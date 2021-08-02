import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as Linking from "expo-linking";

// components
import Button from "../../../../components/Button";

// interfaces
import { ICommunity } from "../../../../utils/interfaces";

// utils
import { calcSize } from "../../../../utils/misc";

interface WebLinksBlockProps {
  community: ICommunity;
}

const WebLinksBlock = (props: WebLinksBlockProps) => {
  const { community: { vkontakte, instagram, youtube, strava, website } } = props;
  const atLeastOneSocial = Boolean(vkontakte || instagram || youtube || strava || website);

  if (!atLeastOneSocial) {
    return null;
  }

  const handleLinkClick = async (slug: string, url: string) => {
    try {
      console.log(`Opening ${slug}: ${url}`);
      await Linking.openURL(url);
    }
    catch (e) {
      alert(`Ошибка! Не могу открыть ${slug}: ${url}`);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Ссылки</Text>
        <Text style={styles.subTitle}>В этом разделе ссылки на Instagram, YouTube, социальные сети и т.п.</Text>
      </View>
      { Boolean(vkontakte) && (
        <Button
          title={"ВКонтакте"}
          onPress={() => handleLinkClick("ВКонтакте", vkontakte || '')}
          style={styles.simpleButton}
          textStyle={styles.simpleButtonText}
        />
      )}
      { Boolean(instagram) && (
        <Button
          title={"Instagram"}
          onPress={() => handleLinkClick("Instagram", instagram || '')}
          style={styles.simpleButton}
          textStyle={styles.simpleButtonText}
        />
      )}
      { Boolean(youtube) && (
        <Button
          title={"Youtube"}
          onPress={() => handleLinkClick("Youtube", youtube || '')}
          style={styles.simpleButton}
          textStyle={styles.simpleButtonText}
        />
      )}
      { Boolean(strava) && (
        <Button
          title={"Strava"}
          onPress={() => handleLinkClick("Strava", strava || '')}
          style={styles.simpleButton}
          textStyle={styles.simpleButtonText}
        />
      )}
      { Boolean(website) && (
        <Button
          title={"Сайт"}
          onPress={() => handleLinkClick("Сайт", website || '')}
          style={styles.simpleButton}
          textStyle={styles.simpleButtonText}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    width: calcSize(285),
  },
  simpleButton: {
    width: 310,
    height: 80,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    borderColor: 'grey',
    borderWidth: 2,
    marginTop: 30,
  },
  simpleButtonText: {
    color: '#404040',
    fontSize: 28,
    textAlign: 'center',
  },
  titleContainer: {
    marginTop: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#404040',
    textAlign: 'center',
    textShadowColor: 'white',
    textShadowRadius: 2,
    textShadowOffset: { height: 1, width: 1 },
  },
  subTitle: {
    marginTop: 10,
    color: '#404040',
  },
});

export default WebLinksBlock;

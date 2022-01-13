import React from 'react';
import {
  Image,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {ImageInterface} from '../../../screens/Home';

const {width: windowWidth} = Dimensions.get('window');

interface IImageRenderer {
  item: ImageInterface;
  numColumns: number;
  handleDeleteItem: (index: string) => void;
  activateDeleteMode: () => void;
  isDeleteModeEnabled: boolean;
}

export const ImageRenderer = ({
  item,
  numColumns,
  handleDeleteItem,
  activateDeleteMode,
  isDeleteModeEnabled,
}: IImageRenderer) => {
  const imageWidth = windowWidth * (0.9 / numColumns);

  return (
    <TouchableOpacity
      onLongPress={activateDeleteMode}
      delayLongPress={400}
      style={styles.container}
    >
      {isDeleteModeEnabled && (
        <View style={styles.absoluteContainer}>
          <TouchableOpacity onPress={() => handleDeleteItem(item.fileName)}>
            <Icon name="times-circle" size={30} style={{color: 'red'}} />
          </TouchableOpacity>
        </View>
      )}
      <Image
        source={{
          uri: item.uri,
        }}
        style={{width: imageWidth, height: imageWidth, borderRadius: 5}}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    marginBottom: 15,
  },
  absoluteContainer: {
    position: 'absolute',
    right: -15,
    top: -15,
    width: 27,
    height: 27,
    backgroundColor: 'white',
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
    borderRadius: 15,
    zIndex: 1,
  },
});

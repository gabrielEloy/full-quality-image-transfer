import React, {useState, useImperativeHandle, forwardRef} from 'react';
import {FlatList, Dimensions, StyleSheet} from 'react-native';
import {ImageInterface} from '../../screens/Home';
import {ImageRenderer} from './ImageRenderer';

interface Props {
  data: ImageInterface[];
  numColumns?: number;
  handleDeleteItem: (index: string) => void;
}

const {width: windowWidth} = Dimensions.get('window');

const ImagesGrid = (
  {data, numColumns = 3, handleDeleteItem}: Props,
  ref: any,
) => {
  const [isDeleteModeEnabled, setIsDeleteModeEnabled] = useState(false);

  useImperativeHandle(ref, () => ({
    cancelDeleteMode: () => setIsDeleteModeEnabled(false),
  }));

  const activateDeleteMode = () => setIsDeleteModeEnabled(true);
  return (
    <FlatList
      columnWrapperStyle={{
        justifyContent: 'space-between',
        paddingHorizontal: 10,
      }}
      data={data}
      numColumns={numColumns}
      renderItem={({item}) => (
        <ImageRenderer
          handleDeleteItem={handleDeleteItem}
          item={item}
          numColumns={numColumns}
          activateDeleteMode={activateDeleteMode}
          isDeleteModeEnabled={isDeleteModeEnabled}
        />
      )}
      style={styles.container}
      keyExtractor={item => item.fileName}
    />
  );
};

const styles = StyleSheet.create({
  container: {width: windowWidth, height: 400, paddingTop: 20},
});

export default forwardRef(ImagesGrid);

import React, {useState, useRef} from 'react';
import {
  View,
  Button,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import ImagesGrid from '../../components/ImagesGrid';

interface Props {}

export interface ImageInterface {
  type: string;
  fileName: string;
  width: number;
  height: number;
  uri: string;
  fileSize: number;
}

const Home = (props: Props) => {
  const [images, setImages] = useState<ImageInterface[]>([]);
  const imagesGridRef = useRef<any>(null);

  const toggleDeleteMode = () => {
    imagesGridRef?.current?.cancelDeleteMode();
  };

  const handleOpenGallery = async () => {
    const photos = await launchImageLibrary({
      mediaType: 'photo',
      quality: 1,
      selectionLimit: 0,
    });

    const assets = photos.assets as ImageInterface[];
    setImages(assets);
  };

  const handleDeleteItem = (index: string) =>
    setImages(images.filter(image => image.fileName !== index));

  return (
    <TouchableWithoutFeedback onPress={toggleDeleteMode}>
      <View style={styles.container}>
        <Button title="Open gallery" onPress={handleOpenGallery} />
        <View>
          <ImagesGrid
            ref={imagesGridRef}
            handleDeleteItem={handleDeleteItem}
            data={images}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
  },
});

export default Home;

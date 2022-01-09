import React from 'react'
import { View, Text, Button, StyleSheet } from 'react-native'
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
interface Props {
  
}

const App = (props: Props) => {
  const handleOpenGallery = async () => {
    const photos = await launchImageLibrary({
      mediaType: 'photo',
      quality: 1,
      selectionLimit: 0
    }, );

    console.log({photos})
  }
  
  return (
    <View style={styles.container}>
      <Button title="Open gallery" onPress={handleOpenGallery}/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
  }
})

export default App

import { Alert, Image, StyleSheet, View, Text } from 'react-native';
import { launchCameraAsync, useCameraPermissions, PermissionStatus } from 'expo-image-picker';
import { useState } from 'react';
import { Colors } from '../../constants/colors';
import OutlinedButton from '../ui/OutlinedButton';

const ImagePicker = ({onTakeImage}) => {

    const [pickedImage, setPickedImage] = useState();

    // For IOS Camera Permissions
    const [cameraPermissionInformation, requestPermission] = useCameraPermissions();

    const verifyPermissions = async () => {
        if(cameraPermissionInformation.status === PermissionStatus.UNDETERMINED){
            const permissionResponse = await requestPermission();
        
            return permissionResponse.granted;
        }

        if(cameraPermissionInformation.status === PermissionStatus.DENIED){
            Alert.alert(
                'Insufficent Permissions!', 
                'You need to grant camera permissions to use this app.'
                );

            return false;
        }

        return true;
    }

    const takeImageHandler = async () => {
        const hasPermissions = await verifyPermissions();

        if(!hasPermissions) return;

        const image = await launchCameraAsync({
            allowsEditing: true,
            aspect: [16,9],
            quality: 0.5,
        });
       
        setPickedImage(image.uri);
        onTakeImage(image.uri);
    }

    let imagePreview = <Text>No image taken yet.</Text>;

    if(pickedImage)
    {
        // if we're not requiring the image (require()), we need to set a width and a height
        imagePreview = <Image style={styles.image} source={{uri: pickedImage}} />; 
    }

    return (
        <View>
            <View style={styles.imagePreview}>
                {imagePreview}
            </View>
            <OutlinedButton
                icon="camera" 
                onPress={takeImageHandler}>
                Take Image
            </OutlinedButton>
        </View>
    );
};

export default ImagePicker;

const styles = StyleSheet.create({
    imagePreview: {
        width: '100%',
        height: 200,
        marginVertical: 8,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.primary100,
        borderRadius: 4
    },
    image: {
        width: '100%',
        height: '100%'
    }
});

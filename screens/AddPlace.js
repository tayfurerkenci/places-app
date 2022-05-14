import { StyleSheet, View } from 'react-native';
import PlaceForm from '../components/Places/PlaceForm';
import { insertPlace } from '../util/database';

const AddPlace = ({navigation}) => {

    const createPlaceHandler= async place => {

        await insertPlace(place);

        navigation.navigate('AllPlaces', {
            place: place
        })
    }

    return (
        <View style={styles.root}>
            <PlaceForm onCreatePlace={createPlaceHandler} />
        </View>
    );
};

export default AddPlace;

const styles = StyleSheet.create({
    root: {
        flex: 1
    }
});

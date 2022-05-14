import { useIsFocused } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import PlacesList from '../components/Places/PlacesList';
import { fetchPlaces } from '../util/database';

const AllPlaces = () => {

    const [loadedPlaces, setLoadedPlaces] = useState([]);

    const isFocused=useIsFocused();

    useEffect(() => {

        const loadPlaces = async () => {
            const places = await fetchPlaces();
            setLoadedPlaces(places);
        }

        if(isFocused)
        {
            loadPlaces();
            // setLoadedPlaces(currPlaces => [...currPlaces, route.params.place]);
        }
    }, [isFocused]);

    return (
        <PlacesList places={loadedPlaces} />
    );
};

export default AllPlaces;

const styles = StyleSheet.create({

});

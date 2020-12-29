import React, { useEffect } from 'react';
import { Container, LoadingIcon } from './styles';
import { useNavigation } from '@react-navigation/native';
import {
    Thumbnail,
} from 'native-base';



function Preload() {
const navigation = useNavigation();
    

    useEffect(() => {
        setTimeout(() => {
            navigation.navigate('Login');
        }, 1000);

    }, []);

    return (
        <Container>
            <Thumbnail style={{height: 200, width: 200}} square large source={require(`../../../assets/logoBordaAzulEBranco.png`)} />
            <LoadingIcon size="large" color="#FFFFFF" />
        </Container>

    );
}

export default Preload;

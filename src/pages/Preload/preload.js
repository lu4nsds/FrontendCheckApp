import React, { useEffect } from 'react';
import { Container, LoadingIcon } from './styles';
import { useNavigation } from '@react-navigation/native';


import Check from '../../../assets/checked.svg';

function Preload() {
const navigation = useNavigation();
    

    useEffect(() => {
        setTimeout(() => {
            navigation.navigate('Login');
        }, 1000);

    }, []);

    return (
        <Container>
            <Check width="120%" height="160" />
            <LoadingIcon size="large" color="#FFFFFF" />
        </Container>

    );
}

export default Preload;

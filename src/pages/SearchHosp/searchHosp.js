import React, { useState, useEffect } from 'react';
import { Text } from 'react-native';
import { useNavigation } from "@react-navigation/native";
/* import RNPickerSelect from 'react-native-picker-select'; */
import {
    Container,
    Scroller,
    styles,
    HeaderArea,
    HeaderTitle,

    SearchArea,
    SearchButtonHosp,
    SearchButtonEquip,

    CustomText,


} from './styles';

import Logo from '../../../assets/logoHorizontalBordaAzul.svg'
import {
    Thumbnail,
    Image,
} from 'native-base';
import SearchBarHosp from './../../components/SearchBarHosp'
import Check from '../../../assets/checked.svg';


function SearchHosp() {
    
    const [hospital, setHospital] = useState(0);
    const navigation = useNavigation();
    function handleSetHospital(hosp)
    {
        setHospital(hosp);
    }
       
    let hospitais = async ()=> await handleTesteClick()
    
    const handleHospClick = () => {
        navigation.navigate('SearchEquip');

    }

    return (
        <Container>
            <Scroller>
                <HeaderArea>
                    <Logo width={'100%'} height={65}/>

                </HeaderArea>

                <SearchArea>

                    <SearchButtonHosp disabled={true} >
                        <CustomText>
                            Hospital
                        </CustomText>
                    </SearchButtonHosp>
                    <SearchButtonEquip onPress={handleHospClick}>
                        <CustomText >
                            Equipamento
                        </CustomText>
                        
                    </SearchButtonEquip>
                </SearchArea>

                <SearchBarHosp
                
                />
                

            </Scroller>

        </Container >


    );

}

export default SearchHosp;
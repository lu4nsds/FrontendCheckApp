import React, { Component, useState } from 'react';
import { useNavigation } from "@react-navigation/native"
import {
    Container,
    Scroller,

    HeaderArea,
    HeaderTitle,

    SearchArea,
    SearchButtonHosp,
    SearchButtonEquip,

    CustomText,
    
} from './styles';
import Logo from '../../../assets/logoHorizontalBordaAzul.svg'
import SearchBarEquip from '../../components/SearchBarEquip';




function SearchEquip() {

    const navigation = useNavigation();
    const handleEquipClick = () => {
        navigation.navigate('SearchHosp');

    }


    return (
        <Container>
            <Scroller>
                <HeaderArea>
                    
                    <Logo width={'100%'} height={65}/>

                </HeaderArea>

                <SearchArea>
                    <SearchButtonHosp onPress={handleEquipClick}>
                        <CustomText>
                            Hospital
                        </CustomText>
                    </SearchButtonHosp>
                    <SearchButtonEquip disabled={true} >
                        <CustomText>
                            Equipamento
                        </CustomText>
                    </SearchButtonEquip>
                </SearchArea>
                    
                <SearchBarEquip/>

            </Scroller>
        </Container>



    );

}
export default SearchEquip;
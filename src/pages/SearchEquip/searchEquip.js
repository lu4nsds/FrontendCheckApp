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

import api from '../../api.js'

import Check from '../../../assets/checked.svg';
import SearchBarEquip from '../../components/SearchBarEquip';




function SearchEquip() {
    const [hospitais, setHospitais] = useState('');
    const navigation = useNavigation();
    async function getEquips() {
        const response = await api.get('/equipamentos')
        const equips = response.data
        setHospitais({ equips })
        return equips
    }
    const handleTesteClick = async () => {
        let equips = await getEquips()
        if (equips) {
            console.log(equips)
        } else {
            alert("Não existem equipamentos cadastrados")
        }

    }
    

    const handleEquipClick = () => {
        navigation.navigate('SearchHosp');

    }


    return (
        <Container>
            <Scroller>
                <HeaderArea>
                    
                    <Check width="60" height="40" fill="#fff" />
                    <HeaderTitle numberOfLines={1}>Buscar Equipamento:</HeaderTitle>

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
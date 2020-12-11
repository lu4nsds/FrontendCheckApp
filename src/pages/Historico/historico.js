import React, { Component, useState } from 'react';
import { useNavigation } from "@react-navigation/native"
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
  } from "react-native-chart-kit";
import {
    Container,
    Scroller,

    HeaderArea,
    HeaderTitle,
    HeaderContent,
    InfoArea,
    SearchArea,
    SearchButtonHosp,
    SearchButtonEquip,
    styles,
    CustomText,
    
} from './styles';

import {
    Thumbnail,
    Text,
    Button,
} from 'native-base';

import Check from '../../../assets/checked.svg';
import SearchBarEquip from '../../components/SearchBarEquip';
import SearchBarManut from '../../components/SearchBarManut';




function Historico(historico) {    
    const navigation = useNavigation();
    const equip = historico.route.params.historico.equip
    const hosp = historico.route.params.historico.hosp


    const handleEquipClick = () => {
        navigation.navigate('SearchHosp');

    }


    return (
        <Container>
            <Scroller>
                <HeaderArea>
                        <HeaderTitle>
                            <Text style={styles.EquipName}>
                                Histórico do Equipamento
                            </Text>
                        </HeaderTitle> 

                        <HeaderContent>
                            <Thumbnail style ={styles.Thumbnail} square source={{ uri: equip.imgUrl }} />
                            <InfoArea style={styles.infoEquip}>
                                <HeaderTitle>
                                    <Text style={styles.EquipName}>
                                        {equip.name}
                                    </Text>
                                </HeaderTitle>
                                <Text style={styles.EquipSN}>
                                    Nº de Série: {equip.sn}
                                </Text>
                                <Text style={styles.EquipHosp}>
                                    Hospital: {hosp.name}
                                </Text> 
                            </InfoArea>
                                            
                        </HeaderContent>
                        
                </HeaderArea>






                <SearchBarManut
                    equip={equip}
                    hosp={hosp}
                />

            </Scroller>
        </Container>



    );

}
export default Historico;
import React, {component, useState, useEffect } from 'react';
import { useNavigation } from "@react-navigation/native"
import {
    Container,
    Scroller,
    ButtonArea,
    HeaderArea,
    HeaderTitle,
    
} from './styles';

import {
    Thumbnail,
    Text,
    Button,
} from 'native-base';


const styles = {
    EquipSN: {
        color: '#fff',
        fontSize: 15,
    },
    EquipName: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 18,
    },
    buttonEquip:{
        width: '100%',
        height: 80,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 40,
        marginTop: 10,
        borderRadius: 20
    },
    Thumbnail:{
        width: 200,
        height: 200,
        marginTop: 5,
        marginBottom: 5,
    }
};

function Equipamento(equipamento) {
    const navigation = useNavigation()
    const equip = equipamento.route.params.equipamento.equip
    const hosp = equipamento.route.params.equipamento.hosp
    


    return (
        <Container>
            <Scroller>
                <HeaderArea>
                    
                    <HeaderTitle>
                        <Text style={styles.EquipName}>
                            {equip.name}
                        </Text>    
                    </HeaderTitle>
                    <Thumbnail style ={styles.Thumbnail} square large source={{ uri: equip.imgUrl }} />
                    <Text style={styles.EquipSN}>
                        {hosp.name}
                    </Text>
                    <Text style={styles.EquipSN}>
                        Nº de Série: {equip.sn}
                    </Text>
                    
                </HeaderArea>
                <ButtonArea>  
                    <Button style={styles.buttonEquip}>
                        <Text>
                            Manutenção Preventiva
                        </Text>
                    </Button>
                    <Button style={styles.buttonEquip}>
                        <Text>
                            Manutenção Corretiva
                        </Text>
                    </Button>
                    <Button style={styles.buttonEquip}>
                        <Text>
                            Histórico
                        </Text>
                    </Button>
                </ButtonArea>
            </Scroller>
        </Container>


    );

}


export default Equipamento;
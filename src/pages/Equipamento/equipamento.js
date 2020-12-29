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
        color: '#ff0',
        fontWeight: 'bold',
        fontSize: 18,
    },
    EquipHosp: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
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
        borderRadius: 15,
    }
};

function Equipamento(equipamento) {
    const navigation = useNavigation()
    const equip = equipamento.route.params.equipamento.equip
    const hosp = equipamento.route.params.equipamento.hosp




    function HandleClickManutencao(equip, hosp, tipo){
        if(tipo == 1){
            navigation.navigate('ManutencaoCorretiva',{
                manutencao:{
                    equip,
                    hosp,
                }
            });
        } else{
            navigation.navigate('ManutencaoPreventiva',{
                manutencao:{
                    equip,
                    hosp,
                }
            });
        }; 
    }

    function handleHistorico(equip,hosp){
        
        navigation.navigate('Historico',{
            historico:{
                equip,
                hosp,
            }
        });

    }
    


    return (
        <Container>
            <Scroller>
                <HeaderArea>
                    
                    <HeaderTitle>
                        <Text style={styles.EquipName}>
                            {equip.name}
                        </Text>    
                    </HeaderTitle>
                    <Thumbnail style={styles.Thumbnail} square large source={{ uri: equip.imgUrl }} />
                    <Text style={styles.EquipHosp}>
                        Hospital: {hosp.name}
                    </Text>
                    <Text style={styles.EquipSN}>
                        Nº de Série: {equip.sn}
                    </Text>
                    
                </HeaderArea>
                <ButtonArea>  
                    <Button style={styles.buttonEquip}
                     onPress={() => {
                        HandleClickManutencao(equip, hosp, 2)
                     }}
                    >
                        <Text>
                            Manutenção Planejada
                        </Text>
                    </Button>
                    <Button style={styles.buttonEquip}
                            onPress = {()=>{
                                    HandleClickManutencao(equip, hosp, 1)
                                }
                            }
                    >
                        <Text>
                            Manutenção Corretiva
                        </Text>
                    </Button>
                    <Button
                    onPress={() => {
                        handleHistorico(equip, hosp)    
                        }
                    }
                    style={styles.buttonEquip}>
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
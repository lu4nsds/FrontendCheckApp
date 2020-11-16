import React, {component, useState, useEffect } from 'react';
import { useNavigation } from "@react-navigation/native"
import {
    Container,
    Scroller,
    HeaderArea,
    InfoArea,
    HeaderContent,
    HeaderTitle,
    InputArea,
    Input,
    ButtonSubmeter,
} from './styles';

import {
    Thumbnail,
    Content,
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
    ButtonText: {
        alignItems: 'center',
        color: '#fff',
        fontSize: 20,
        textAlign: 'center',
        justifyContent: 'center',
        fontWeight: 'bold',
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
        width: 100,
        height: 100,
        marginTop: 5,
        marginBottom: 5,
        borderRadius: 15,
    },
    headerContent:{
        flexDirection: 'row',
    },
    infoEquip:{
        flexDirection: 'column'
    }
};

function ManutencaoCorretiva(manutencao) {
    const equipCorretiva = manutencao.route.params.manutencao.equip
    const hospCorretiva = manutencao.route.params.manutencao.hosp
         

    return (
        <Container>
            <Scroller>
                <HeaderArea>
                    <HeaderTitle>
                        <Text style={styles.EquipName}>
                            Manutenção Corretiva
                        </Text>
                    </HeaderTitle> 
                    <HeaderContent>
                        <Thumbnail style ={styles.Thumbnail} square source={{ uri: equipCorretiva.imgUrl }} />
                        <InfoArea style={styles.infoEquip}>
                            <HeaderTitle>
                                <Text style={styles.EquipName}>
                                    {equipCorretiva.name}
                                </Text>
                            </HeaderTitle>
                            <Text style={styles.EquipSN}>
                                Nº de Série: {equipCorretiva.sn}
                            </Text>
                            <Text style={styles.EquipHosp}>
                                Hospital: {hospCorretiva.name}
                            </Text> 
                        </InfoArea>
                                         
                    </HeaderContent>
                    
                    
                </HeaderArea>
                <InputArea>                
                        <Text style={styles.EquipHosp}>
                            Problema:
                        </Text>
                        <Input
                            placeholder='Qual o problema?'>

                        </Input>
                        
                </InputArea>
                <InputArea>
                    <Text style={styles.EquipHosp}>
                            Solução:
                    </Text>
                    <Input
                    placeholder='Qual a resolução?'>
                        

                    </Input>
                    <ButtonSubmeter>
                        <Text style = {styles.ButtonText}>
                            Submeter
                        </Text>
                    </ButtonSubmeter>
                </InputArea>
                
            </Scroller>
        </Container>


    );

}


export default ManutencaoCorretiva;
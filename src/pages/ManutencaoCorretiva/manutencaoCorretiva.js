import React, {component, useState, useEffect } from 'react';
import { useNavigation } from "@react-navigation/native"
import DateTimePicker from '@react-native-community/datetimepicker';
// tentativas: DateTimePicker / nativeBase (antigo) / Tentar o do reactNative
import api from '../../api.js'
import { useUser } from '../../contexts/User';
import {
    Container,
    Scroller,
    HeaderArea,
    InfoArea,
    HeaderContent,
    HeaderTitle,
    InputArea,
    ButtonSubmeter,
    DateTimeArea,
    DateArea,
    TimeArea,
} from './styles';
import{
    TextInput,
    
} from 'react-native'
import {
    Thumbnail,
    Text,
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
        fontSize: 16
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
    },
    Input:{
        backgroundColor: '#fff',
        height: 100,
        borderRadius: 10,
        marginTop: 10,
        marginBottom: 20,
        padding: 10,
    },
    InputData:{
        backgroundColor: '#fff',
        borderRadius: 10,
        marginTop: 10,
        marginBottom: 20,
        padding: 10,
    }
};

function ManutencaoCorretiva(manutencao) {
    const equipCorretiva = manutencao.route.params.manutencao.equip
    const hospCorretiva = manutencao.route.params.manutencao.hosp
    const tipo = manutencao.route.params.manutencao.tipo
    const [problema, setProblema] = useState('')
    const [solucao, setSolucao] = useState('')
    const [data, setData] = useState('')
    const [hora, setHora] = useState('')
    /* const [date, setDate] = useState([1,10 ,2020]); */
    const { user } = useUser();

    async function handleSubmeter(data, hora, problema, solucao, user, tipo){
        // await getTime(data, hora)
        console.log(`${data} - ${hora}`);
        console.log(problema);
        console.log(solucao);
        console.log(user.id);
        console.log(equipCorretiva.id);
        console.log(tipo);
        // const response = await api.post('/manutencoes',{
        //     data,
        //     solucao,
        //     problema,
        //     equipamentoId,
        //     userId: user.id,
        //     tipo,
        // })
        /* 
        {
            data,
            solucao,
            problema,
            equipamentoId,
            userId,
            tipo,
        }
        */
    }
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
                        <DateTimeArea>

                            <DateTimePicker/>
                        {/* <DateArea>
                            <Text style={styles.EquipHosp}>
                                Data:
                            </Text>
                            <TextInput
                                style={styles.InputData}
                                placeholder='DD/MM/AAAA'
                                onChangeText={(text) => {
                                    setData(text)
                                }}
                            ></TextInput>   
                        </DateArea>
                        <TimeArea>
                            <Text style={styles.EquipHosp}>
                                    Hora:
                                </Text>
                            <TextInput
                                style={styles.InputData}
                                placeholder='HH:MM'
                                onChangeText={(text) => {
                                    setHora(text)
                                }}
                            ></TextInput>
                        </TimeArea> */}
                            
                        </DateTimeArea>  
                            <Text style={styles.EquipHosp}>
                                Problema:
                            </Text>
                      
                        <TextInput
                            multiline
                            style={styles.Input}
                            placeholder='Qual o problema?'
                            onChangeText={(text)=>{
                                setProblema(text)
                            }}
                            >
                            

                        </TextInput>
                    <Text style={styles.EquipHosp}>
                            Solução:
                    </Text>
                    <TextInput
                        multiline
                        style={styles.Input}
                        placeholder='Qual a resolução?'
                        onChangeText={(text) => {
                            setSolucao(text)
                        }}
                        >
                        

                    </TextInput>
                    <ButtonSubmeter
                        onPress={()=>{
                            handleSubmeter(data, hora, problema, solucao, user, 1)
                        }}
                    >
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
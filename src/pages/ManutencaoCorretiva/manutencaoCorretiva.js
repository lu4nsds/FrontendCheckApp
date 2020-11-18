import React, {component, useState, useEffect } from 'react';
import { useNavigation } from "@react-navigation/native"
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
    CheckBoxArea,
} from './styles';

import{
    TextInput,
} from 'react-native'

import {
    Thumbnail,
    Text,
    CheckBox,
    Body,
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
    const [show, setShow] = useState(false);
    const equipCorretiva = manutencao.route.params.manutencao.equip
    const hospCorretiva = manutencao.route.params.manutencao.hosp
    const tipo = manutencao.route.params.manutencao.tipo
    const [problema, setProblema] = useState('')
    const [solucao, setSolucao] = useState('')
    const [data, setData] = useState('')
    const [horaInicial, setHoraInicial] = useState('')
    const [horaFinal, setHoraFinal] = useState('')
    const [checkSim, setCheckSim] = useState(false)
    const [checkNao, setCheckNao] = useState(false)
    const [checkPeca, setCheckPeca] = useState(false)
    
  /*   const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [datePicker, setDatePicker] = useState(new Date()) */
    /* const [date, setDate] = useState([1,10 ,2020]); */
    const { user } = useUser();

    async function handleSubmeter(data, horaInicial, horaFinal, problema, solucao, user, tipo){
        // await getTime(data, hora)
        console.log(`${data} - ${horaInicial}`);
        console.log(`${data} - ${horaFinal}`);
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
                    <DateArea>
                        <Text style={styles.EquipHosp}>
                            Data:
                            </Text>
                        <TextInput
                            style={styles.InputData}
                            placeholder='DD/MM/AAAA'
                            onChangeText={(text) => {
                                if (text.length == 2 || text.length == 5) {
                                    text = text + '/'
                                }
                                setData(text)
                            }}
                            value={data}
                        ></TextInput>
                    </DateArea>
                    <DateTimeArea>
                        
                        <TimeArea>
                            <Text style={styles.EquipHosp}>
                                    Hora Inicial:
                                </Text>
                            <TextInput
                                style={styles.InputData}
                                placeholder='HH:MM'
                                onChangeText={(text) => {
                                    if (text.length == 2) {
                                        text = text + ':'
                                    }
                                    setHoraInicial(text)
                                }}
                                value={horaInicial}
                            ></TextInput>
                        </TimeArea>
                        <TimeArea>
                            <Text style={styles.EquipHosp}>
                                    Hora Final:
                                </Text>
                            <TextInput
                                style={styles.InputData}
                                placeholder='HH:MM'
                                onChangeText={(text) => {
                                    if (text.length == 2) {
                                        text = text + ':'
                                    }
                                    setHoraFinal(text)
                                }}
                                value={horaFinal}
                            ></TextInput>
                        </TimeArea>
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
                    <Text style = {styles.EquipHosp}>
                        Manutenção Concluida?
                    </Text>
                    

                    <CheckBoxArea>
                        <CheckBox
                        checked = {checkSim}
                        onPress = {() => {
                            // handleChangeCheck(checkSim)
                            if (checkSim === false) {
                                setCheckSim(true);
                                setCheckNao(false)
                                setCheckPeca(false)
                            } else {
                                setCheckSim(false);
                            }
                        }}
                        />
                        <Text style = {styles.EquipSN}>Sim</Text>
                        <CheckBox
                        checked = {checkNao}
                        onPress = {() => {
                            if (checkNao === false) {
                                setCheckSim(false);
                                setCheckNao(true)
                                setCheckPeca(false)
                            } else {
                                setCheckNao(false);
                            }
                        }}
                        />
                        <Text style = {styles.EquipSN}>Não</Text>
                        <CheckBox
                        checked = {checkPeca}
                        onPress = {() => {
                            if (checkPeca === false) {
                                setCheckSim(false);
                                setCheckNao(false)
                                setCheckPeca(true)
                            } else {
                                setCheckPeca(false);
                            }
                        }}
                        />
                        <Text style = {styles.EquipSN}>Aguardando Peça</Text>
                    </CheckBoxArea>

                    
                    <ButtonSubmeter
                        onPress={()=>{
                            handleSubmeter(data, horaInicial, horaFinal, problema, solucao, user, 1)
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
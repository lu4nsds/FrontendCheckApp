import React, {component, useState, useEffect } from 'react';
import { useNavigation } from "@react-navigation/native"
// tentativas: DateTimePicker / nativeBase (antigo) / Tentar o do reactNative
import api from '../../api.js'
import { useUser } from '../../contexts/User';
/* import RNHTMLtoPDF from 'react-native-html-to-pdf';
import RNPrint from 'react-native-print'; */
import * as Print from 'expo-print';

import OrdemDeServico from '../../../assets/OrdemDeServico/ordemDeServico';
import DateTime from '../../components/DateTime';

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
    CheckArea,
    CheckBoxArea,
} from './styles';

import{
    TextInput,
} from 'react-native'

import {
    Thumbnail,
    Text,
    CheckBox,
} from 'native-base';

import {styles} from './styles'

function ManutencaoCorretiva(manutencao) {
    const [show, setShow] = useState(false);
    const equipCorretiva = manutencao.route.params.manutencao.equip
    const hospCorretiva = manutencao.route.params.manutencao.hosp
    const tipo = manutencao.route.params.manutencao.tipo
    const [problema, setProblema] = useState('');
    const [solucao, setSolucao] = useState('');
    const [data, setData] = useState('23/09/1997');
    const [horaInicial, setHoraInicial] = useState('00:00');
    const [horaFinal, setHoraFinal] = useState('02:00');
    const [checkSim, setCheckSim] = useState(false);
    const [checkNao, setCheckNao] = useState(false);
    const [checkPeca, setCheckPeca] = useState(false);
    const [situacao, setSituacao] = useState('');
    const [pendencias, setPendencias] = useState('');
    const { user } = useUser();
    console.log(`Data em MC: ${data}`);
    async function handleSubmeter(equip, data, horaInicial, horaFinal, problema, solucao, user, tipo, situacao, pendencias){
        /* console.log(`${data} - ${horaInicial}`);
        console.log(`${data} - ${horaFinal}`);
        console.log(problema);
        console.log(solucao);
        console.log(user.id);
        console.log(equipCorretiva.id);
        console.log(tipo); */
        Print.printAsync({
            html: `${OrdemDeServico(equip, data, horaInicial, horaFinal, problema, solucao, user, tipo, situacao, pendencias)}`
        });
        
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
                    <DateTime
                        data={data}
                        setData={setData}
                        horaInicial={horaInicial}
                        setHoraInicial={setHoraInicial}
                        horaFinal={horaFinal}
                        setHoraFinal={setHoraFinal}
                        
                    />

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
                    <Text style={styles.EquipHosp}>
                            Pendências/Observações:
                    </Text>
                    <TextInput
                        multiline
                        style={styles.Input}
                        placeholder='Quais são as pendências?'
                        onChangeText={(text) => {
                            setPendencias(text)
                        }}
                        >
                        

                    </TextInput>
                    <CheckBoxArea>
                        <Text style = {styles.EquipHosp}>
                            Manutenção Concluida?
                        </Text>
                        

                        <CheckArea>
                            
                            <CheckBox
                            checked = {checkSim}
                            onPress = {() => {
                                // handleChangeCheck(checkSim)
                                if (checkSim === false) {
                                    setCheckSim(true);
                                    setCheckNao(false)
                                    setCheckPeca(false)
                                    setSituacao('Concluída')
                                } else {
                                    setCheckSim(false);
                                }
                            }}
                            />
                            <Text style = {styles.CheckText}>Sim</Text>
                            <CheckBox
                            checked = {checkNao}
                            onPress = {() => {
                                if (checkNao === false) {
                                    setCheckSim(false);
                                    setCheckNao(true)
                                    setCheckPeca(false)
                                    setSituacao('Não Concluída')
                                } else {
                                    setCheckNao(false);
                                }
                            }}
                            />
                            <Text style = {styles.CheckText}>Não</Text>
                            <CheckBox
                            checked = {checkPeca}
                            onPress = {() => {
                                if (checkPeca === false) {
                                    setCheckSim(false);
                                    setCheckNao(false)
                                    setCheckPeca(true)
                                    setSituacao('Aguardando Peça')
                                } else {
                                    setCheckPeca(false);
                                }
                            }}
                            />
                            <Text style = {styles.CheckText}>Aguardando Peça</Text>
                        </CheckArea>
                    </CheckBoxArea>         
                    
                    <ButtonSubmeter
                        onPress={()=>{
                            handleSubmeter(equipCorretiva , data, horaInicial, horaFinal, problema, solucao, user, 1, situacao, pendencias)
                            
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
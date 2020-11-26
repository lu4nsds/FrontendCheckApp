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
import CheckList from '../../components/CheckList'

import {
    Container,
    Scroller,
    HeaderArea,
    InfoArea,
    HeaderContent,
    HeaderTitle,
    InputArea,
    ButtonSubmeter,
    CheckArea,
    CheckBoxArea,
} from './styles';

import{
    TextInput,
    View,
} from 'react-native'

import {
    Thumbnail,
    Text,
    CheckBox,
} from 'native-base';

import {styles} from './styles'

function ManutencaoPreventiva(manutencao) {
    const [show, setShow] = useState(false);
    const equipPreventiva = manutencao.route.params.manutencao.equip
    const hospPreventiva = manutencao.route.params.manutencao.hosp
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
    const [list, setList] = useState([])
    const { user } = useUser();
    
    async function handleSubmeter(equip, list, problema, solucao, user, tipo, situacao, pendencias){

        Print.printAsync({
            html: `${OrdemDeServico(equip, list, problema, solucao, user, tipo, situacao, pendencias)}`
        });
        
    }



    return (
        <Container>
            <Scroller>
                <HeaderArea>
                    <HeaderTitle>
                        <Text style={styles.EquipName}>
                            Manutenção Preventiva
                        </Text>
                    </HeaderTitle> 
                    <HeaderContent>
                        <Thumbnail style ={styles.Thumbnail} square source={{ uri: equipPreventiva.imgUrl }} />
                        <InfoArea style={styles.infoEquip}>
                            <HeaderTitle>
                                <Text style={styles.EquipName}>
                                    {equipPreventiva.name}
                                </Text>
                            </HeaderTitle>
                            <Text style={styles.EquipSN}>
                                Nº de Série: {equipPreventiva.sn}
                            </Text>
                            <Text style={styles.EquipHosp}>
                                Hospital: {hospPreventiva.name}
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
                        list={list}
                        setList={setList}
                        
                    />


                    <View>
                        <CheckList
                            equip={equipPreventiva}
                            hosp={hospPreventiva}
                        />
                    </View>


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
                            handleSubmeter(equipPreventiva, list, problema, solucao, user, 2, situacao, pendencias)
                            
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


export default ManutencaoPreventiva;
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
    SituacaoArea,
    CheckBoxArea,
} from './styles';

import{
    TextInput,
    View,
    Alert,
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
    const [data, setData] = useState('23/09/2020');
    const [horaInicial, setHoraInicial] = useState('00:00');
    const [horaFinal, setHoraFinal] = useState('02:00');
    const [checkSim, setCheckSim] = useState(false);
    const [checkNao, setCheckNao] = useState(false);
    const [checkPeca, setCheckPeca] = useState(false);
    const [situacao, setSituacao] = useState('');
    const [pendencias, setPendencias] = useState('');
    const [list, setList] = useState([])
    const [itens, setItens] = useState([])
    const { user } = useUser();
    const navigation = useNavigation();
    
    async function handleSubmeter(equip, list, problema, solucao, user, tipo, situacao, pendencias, itens, hosp){

        const createButtonAlert = (manutencaoId) =>{
            Alert.alert(
                "Manutenção salva com Sucesso",
                "Deseja imprimir Ordem de Serviço?",
                [
                    {
                    text: "Imprimir OS",
                    onPress: () => {
                        Print.printAsync({
                            html: `${OrdemDeServico(equip, list, problema, solucao, user, tipo, situacao, pendencias, itens, hosp, manutencaoId)}`
                        });
                        handleNavigate(equip, hosp);
                    }
                    },
                    { text: "Não", onPress: () => {
                        handleNavigate(equip, hosp);                    
                    } }
                ],
                { cancelable: false }
            );
        }

        let horasTrabsTotais = horasTotais(list)  

        let response = await api.post('/manutencoes', {
            data: list[0].data,
            equipamentoId: equip.id,
            userId: user.id,
            hospitalId: hospPreventiva.id,
            observacoes: pendencias,
            situacao: situacao,
            checklistId: itens[0].checklistId,
            tipo: tipo,
            horasTotais: horasTrabsTotais,
        })
        
        let manut = response.data

        list.map(async(task)=>{
            await api.post('/tarefas', {
                data: task.data,
                horaInicial: task.horaInicial,
                horaFinal: task.horaFinal,
                manutencaoId: manut[0]
            })    
        })
        itens.map(async(item)=>{
            await api.post('/itens_status', {
                procedimento: item.procedimento,
                checado: item.checado,
                manutencaoId: manut[0]
            })    
        })
        

        createButtonAlert(manut[0]);

        function handleNavigate(equip, hosp){
            navigation.navigate('Equipamento',{
                equipamento: {
                    equip,
                    hosp,
                }
            
            });
        }
        
        
        
        function horasTotais(list){
            let horasTotais = 0
            list.map(task => {
                horasTotais = horasTotais + somarHoras(task.horaInicial, task.horaFinal)
            })
            return `${horasTotais.toFixed(2)}`
        };
        
    
        function somarHoras(horaInicial, horaFinal){
            
            let hInicial = Number(horaInicial.split(':')[0])
            let minInicial = Number(horaInicial.split(':')[1])
            let hFinal = Number(horaFinal.split(':')[0])
            let minFinal = Number(horaFinal.split(':')[1])
            
            let hTrabs = hFinal - hInicial
            
            let minTrabs = minFinal - minInicial
            
            if (minTrabs<0){
                minTrabs + 60
            }
            
            let minTrabsDeHora = minTrabs / 60.0
            
            let horasTrabs = Number(hTrabs) + Number(minTrabsDeHora.toFixed(2))
            return horasTrabs
        };
        
    }



    return (
        <Container>
            <Scroller>
                <HeaderArea>
                    <HeaderTitle>
                        <Text style={styles.EquipName}>
                            Manutenção Planejada
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

                    <Text style={styles.EquipHosp}>
                        Checklist:
                    </Text>
                    
                    <View style={styles.itensArea}>
                        <CheckList
                            equip={equipPreventiva}
                            hosp={hospPreventiva}
                            itens={itens}
                            setItens={setItens}
                        />
                    </View>
                      
                    
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
                        

                        <SituacaoArea>
                            
                            <CheckBox
                            style={styles.checkbox}
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
                            <Text style = {styles.situacaoText}>Sim</Text>
                            </SituacaoArea>
                        <SituacaoArea>
                            <CheckBox
                            style={styles.checkbox}
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
                            <Text style = {styles.situacaoText}>Não</Text>
                            </SituacaoArea>
                            <SituacaoArea>
                            <CheckBox
                            style={styles.checkbox}
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
                            <Text style = {styles.situacaoText}>Aguardando Peça</Text>
                        </SituacaoArea>
                    </CheckBoxArea>         
                    
                    <ButtonSubmeter
                        onPress={()=>{
                            const existItens = ()=>{
                                let exist = false
                                itens.map((item)=>{
                                    if(item.checado){
                                        exist = true
                                    }
                                })
                                return exist
                            }
                            let itensCheck = existItens(itens)
                            if(!list || !situacao || !itensCheck ){
                                Alert.alert('[ERRO]', 'Existem campos não preenchidos!')
                            }else{
                                handleSubmeter(equipPreventiva, list, problema, solucao, user, 2, situacao, pendencias, itens, hospPreventiva)
                            }                            
                            
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
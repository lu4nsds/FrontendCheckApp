import React, {component, useState, useEffect } from 'react';
import { useNavigation } from "@react-navigation/native"
import api from '../../api.js'
import { useUser } from '../../contexts/User';
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
    Alert
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
    const [list, setList] = useState([])
    const { user } = useUser();
    const navigation = useNavigation();
    
    async function handleSubmeter(equip, list, problema, solucao, user, tipo, situacao, pendencias, hosp){
        
        let itens =[]
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
            solucao: solucao,
            problema: problema,
            equipamentoId: equip.id,
            userId: user.id,
            hospitalId: hospCorretiva.id,
            observacoes: pendencias,
            situacao: situacao,
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
                        list={list}
                        setList={setList}
                        
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
                            Pendências/Observações 
                            <Text style={styles.opcao}>
                               : (Opcional)
                            </Text>
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
                            <Text style = {styles.CheckText}>Sim</Text>
                        </CheckArea>
                        
                        <CheckArea>
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
                            <Text style = {styles.CheckText}>Não</Text>
                        </CheckArea>
                        
                        <CheckArea>
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
                            <Text style = {styles.CheckText}>Aguardando Peça</Text>
                        </CheckArea>

                    </CheckBoxArea>         
                    
                    <ButtonSubmeter
                        onPress={()=>{
                            if(!list || !problema || !solucao ||!situacao){
                                Alert.alert('[ERRO]', 'Existem campos não preenchidos!')
                            }else{
                                handleSubmeter(equipCorretiva, list, problema, solucao, user, 1, situacao, pendencias, hospCorretiva)
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


export default ManutencaoCorretiva;
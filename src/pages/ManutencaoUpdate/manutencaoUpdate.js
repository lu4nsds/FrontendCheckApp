import React, {component, useState, useEffect } from 'react';
import { useNavigation } from "@react-navigation/native"
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
import ItensUpdate from '../../components/ItensUpdate';



function ManutencaoUpdate(manutencao) {
    const equip = manutencao.route.params.manutencao.equip
    const hosp = manutencao.route.params.manutencao.hosp
    const manut = manutencao.route.params.manutencao.manut
    const checks = checkSituation(manut)
    const tipo = manutencao.route.params.manutencao.manut.tipo
    const tarefas = manutencao.route.params.manutencao.tarefas
    const itensManut = manutencao.route.params.manutencao.itens
    const [show, setShow] = useState(manut.tipo);
    const [problema, setProblema] = useState(manut.problema);
    const [solucao, setSolucao] = useState(manut.solucao);
    const [data, setData] = useState('23/09/1997');
    const [horaInicial, setHoraInicial] = useState('00:00');
    const [horaFinal, setHoraFinal] = useState('02:00');
    const [checkSim, setCheckSim] = useState(checks[0]);
    const [checkNao, setCheckNao] = useState(checks[1]);
    const [checkPeca, setCheckPeca] = useState(checks[2]);
    const [situacao, setSituacao] = useState(manut.situacao);
    const [pendencias, setPendencias] = useState(manut.observacoes);
    const [list, setList] = useState(tarefas)    
    const [itens, setItens] = useState(itensManut)
    const { user } = useUser();
    const navigation = useNavigation();

    function checkSituation(manut){
        let status = [false, false, false]
        if(manut.situacao=='Concluída'){
            status[0] = true
            status[1] = false
            status[2] = false

        }else if(manut.situacao == 'Não Concluída'){
            status[0] = false
            status[1] = true
            status[2] = false
        }else if(manut.situacao == 'Aguardando Peça'){
            status[0] = false
            status[1] = false
            status[2] = true
        }
        return status
    }
    


    async function handleSubmeter(equip, list, problema, solucao, user, tipo, situacao, pendencias, itens, hosp, manut){

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
                        handleNavigate(equip, hosp, manut, list, itens);
                    }
                    },
                    { text: "Não", onPress: () => {
                        handleNavigate(equip, hosp, manut, list, itens);                    
                    } }
                ],
                { cancelable: false }
            );
        }

        let horasTrabsTotais = horasTotais(list)  

        if(tipo == 1){
            await api.put(`/manutencoes/${manut.id}`, {
                data: list[0].data,
                equipamentoId: equip.id,
                userId: user.id,
                observacoes: pendencias,
                situacao: situacao,
                problema: problema,
                solucao: solucao,
                tipo: tipo,
                horasTotais: horasTrabsTotais,
        })

        }else if(tipo == 2){
           await api.put(`/manutencoes/${manut.id}`, {
            data: list[0].data,
            equipamentoId: equip.id,
            userId: user.id,
            observacoes: pendencias,
            situacao: situacao,
            checklistId: manut.checklistId,
            tipo: tipo,
            horasTotais: horasTrabsTotais,
        })
        }      
        

        // Se houver ID usa metodo PUT para update, Se não utiliza os metodo POST para salvar nova TASK
        list.map(async(task, index)=>{
            if(task.id){
                await api.put(`/tarefas/${task.id}`, {
                    data: task.data,
                    horaInicial: task.horaInicial,
                    horaFinal: task.horaFinal,
                    manutencaoId: manut.id
                }) 
                
            }else{
                await api.post(`/tarefas`, {
                    data: task.data,
                    horaInicial: task.horaInicial,
                    horaFinal: task.horaFinal,
                    manutencaoId: manut.id
                }) 
            }
               
        })
               
        itens.map(async(item)=>{
            await api.put(`/itens_status/${item.id}`, {
                procedimento: item.procedimento,
                checado: item.checado,
                manutencaoId: manut.id
            })    
        })
        

        createButtonAlert(manut.id);

        function handleNavigate(equip, hosp, manut, tarefas, itens){
            navigation.popToTop();
        
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

    function tipoManut(text){
        if(text==1){
            return "Manutenção Corretiva"
        }else{
            return "Manutenção Preventiva"
        }
    }


    return (
        <Container>
            <Scroller>
                <HeaderArea>
                    <HeaderTitle>
                        <Text style={styles.EquipName}>
                            {tipoManut(manut.tipo)}
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
                    {show == 1 &&
                        <Text style={styles.EquipHosp}>
                            Problema:
                        </Text>
                    }
                    {show == 1 &&
                    <TextInput
                        multiline
                        style={styles.Input}
                        placeholder='Qual o problema?'
                        onChangeText={(text)=>{
                            setProblema(text)
                        }}
                        value={problema}
                    >
                            

                    </TextInput>
                    }
                    {show == 1 &&
                    <Text style={styles.EquipHosp}>
                            Solução:
                    </Text>
                    }
                    {show==1 &&
                    <TextInput
                        multiline
                        style={styles.Input}
                        placeholder='Qual a resolução?'
                        onChangeText={(text) => {
                            setSolucao(text)
                        }}
                        value={solucao}
                        >
                      

                    </TextInput>
                     }         
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
                        value={pendencias}
                        >
                        

                    </TextInput>
                    {show==2 &&
                    <Text style={styles.EquipHosp}>
                        Checklist:
                    </Text>
                    }
                    {show==2 &&
                    <View style={styles.itensArea}>
                        <ItensUpdate
                            equip={equip}
                            hosp={hosp}
                            itens={itens}
                            setItens={setItens}
                        />
                    </View>
                    }  
                    
                    
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
                            if(tipo == 1){
                                if(!list || !problema || !solucao ||!situacao){
                                    Alert.alert('[ERRO]', 'Existem campos não preenchidos!')
                                }else{
                                    handleSubmeter(equip, list, problema, solucao, user, tipo, situacao, pendencias, itens, hosp, manut)
                                }

                            }else if(tipo == 2){
                                const itensCheck = existItens(itens)
                                if(!list || !situacao || !itensCheck ){
                                    Alert.alert('[ERRO]', 'Existem campos não preenchidos!')
                                }else{
                                    handleSubmeter(equip, list, problema, solucao, user, tipo, situacao, pendencias, itens, hosp, manut)
                                }
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


export default ManutencaoUpdate;
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
    DateArea,
    DateTimeArea,
    DateTimeContainer,
    Container,
    Scroller,
    HeaderArea,
    InfoArea,
    HeaderContent,
    HeaderTitle,
    InputArea,
    TimeArea,
    ButtonSubmeter,
    CheckArea,
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


function Tarefas({ tarefa, index }) {
        return (
                <DateTimeArea key={index}>
                    <DateArea>
                        <Text>
                            {tarefa.data}
                        </Text>
                    </DateArea>
                    <TimeArea>
                        <Text>
                            {tarefa.horaInicial}
                        </Text>
                    </TimeArea>
                    <TimeArea>
                        <Text>
                            {tarefa.horaFinal}
                        </Text>
                    </TimeArea>
                </DateTimeArea>
            )

    
}

function Itens({ item, index }) {
    return (
        <View style={styles.checklistItem} key={index}>
            <View style={styles.checkboxArea}>
                <CheckBox style={styles.checkbox} 
                    checked={item.checado}
                />
            </View>
            <DateArea>
                <Text>
                    {item.procedimento}
                </Text>
            </DateArea>
            
        </View>
    )


}

function Manutencao(manutencao) {
    const equip = manutencao.route.params.manutencao.equip
    const hosp = manutencao.route.params.manutencao.hosp
    const manut = manutencao.route.params.manutencao.manut
    const itens = manutencao.route.params.manutencao.itens
    const tarefas = manutencao.route.params.manutencao.tarefas
    const horasTotais = manutencao.route.params.manutencao.manut.horasTrabalhadas
    const situacao = "Puxar do banco"
    const { user } = useUser();
    const navigation = useNavigation();
    


    function tipoManut(text) {
        if (text == 1) {
            return "Manutenção Corretiva"
        } else {
            return "Manutenção Preventiva"
        }
    }

    function isPreventiva(text){
        if (text == 2) {
            return true
        } else {
            return false
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
                    <Text style={styles.EquipHosp}>
                        Ordem de Serviço: Nº {manut.id}
                    </Text> 
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
                 <View style={styles.taskView}>
                    <Text style={styles.taskText}>
                       Data
                    </Text>
                    <Text style={styles.taskInicio}>
                        Início  
                    </Text>
                    <Text style={styles.taskText}>
                          Término
                    </Text>
                </View>   
                <DateTimeContainer>
                
                    {tarefas.map((tarefa, index)=>(
                    <Tarefas
                        key = {index}
                        tarefa={tarefa}
                        index={index}
                    />
               
                    ))}
                </DateTimeContainer>    
                    {!isPreventiva(manut.tipo) && 
                        <View>
                            <Text style={styles.EquipHosp}>
                                Problema:
                            </Text>
                            <View style={styles.itensArea} >
                            <Text>
                                {manut.problema}
                            </Text>

                            </View>
                            <Text style={styles.EquipHosp}>
                                Solução:
                            </Text>
                            <View style={styles.itensArea} >
                            <Text >
                                {manut.solucao}
                            </Text>


                            </View>
                        </View>
                        




                    }    
                
                    {isPreventiva(manut.tipo) &&
                        <View>
                            <Text style={styles.EquipHosp}>
                                Checklist:
                            </Text>
                            
                            <View style={styles.itensArea}>
                                
                                {itens.map((item, index)=>(
                                    
                                    <Itens
                                    key = {index}
                                    item={item}
                                    index={index}
                                    />
                
                                ))}
                            </View>
                        </View>  
                    }
                
                <View>
                    <Text style={styles.EquipHosp}>
                             Pendências/Observações
                    </Text>
                        <View style={styles.itensArea} >
                            <Text>
                              {manut.observacoes}
                            </Text>
                        </View>
                </View>     


                <View>
                    <Text style={styles.EquipHosp}>
                        Manutenção Concluída?
                    </Text>
                    
                    <View style={styles.situacao}>
                        <CheckBox style={styles.checkbox}
                                checked={true}
                            />
                        <View style={styles.textSituacao}>
                            
                            <Text style = {styles.CheckText}>
                                {situacao}
                            </Text>
                        
                        </View>
                    </View>
                </View>       
                
                
            </Scroller>
        </Container>


    )

}


export default Manutencao;
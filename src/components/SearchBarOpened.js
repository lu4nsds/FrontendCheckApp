import React, {Component, useState, useEffect} from 'react';
import { useNavigation } from "@react-navigation/native"
import styled from 'styled-components/native';
import {
    Input,
    Content,
    Left,
    Right,
    Body,
    Item,
    Icon,
    Text,
    ListItem,
    Thumbnail,
} from 'native-base';
import * as Print from 'expo-print';
import OrdemDeServico from '../../assets/OrdemDeServico/ordemDeServico';
import {
    styles,
    ButtonPrint,
} from '../pages/Historico/styles';

import api from '../api';
import { useUser } from '../contexts/User';

export default ({hosp, equip }) => {
    const [search, setSearch] = useState('');
    const [manutencoes, setManutencoes] = useState([]); 
    const [equipamentos, setEquipamentos] = useState([]);
    const [manutsFilter, setManutsFilter] = useState([]);
    const navigation = useNavigation();
    const { user } = useUser();

    useEffect(() => {

        async function loadManutencoesAbertas() {
            const response = await api.get(`/hospitais/${hosp.id}/manutencoes/abertas`);
            // PREENCHER UM ARRAY DE EQUIP ID
            await preencherItens(response.data);   
            //equipsPorId(equipsId);       
            
        }

        loadManutencoesAbertas();
        
    }, []);


    async function handleClickManutencao(manut) {
        const tarefas = await tarefasPorManut(manut);
        const itens = await itensPorManut(manut);
        const equip = await equipPorId(manut)
        navigation.navigate('ManutencaoUpdate',{
            manutencao:{
                manut: manut,
                tarefas: tarefas,
                itens: itens,
                equip: equip,
                hosp: hosp,
            }
        });
    }

    async function preencherItens(manutencoes) {

        let listManuts = [];
        let listEquips = [];
        manutencoes.map(manut => {

            listEquips = [...listEquips, manut.equipamentoId];
            listManuts = [...listManuts, manut];
            
        });

        setManutencoes(listManuts);
        setManutsFilter(listManuts);  
       
        
            
    }
    



    
    
    const searchFilterFunction = (text) => {
        // Check if searched text is not blank
        if (text) {
          // Inserted text is not blank
          // Filter the masterDataSource and update FilteredDataSource
          const newData = manutencoes.filter(function (item) {
            // Applying filter for the inserted text in search bar
            const itemData = item.data
              ? item.data.toUpperCase()
              : ''.toUpperCase();
            const textData = text.toUpperCase();
            return itemData.indexOf(textData) > -1;
            
          });
          setManutsFilter(newData);
          setSearch(text);
          
        } else {
          // Inserted text is blank
          // Update FilteredDataSource with masterDataSource
          setManutsFilter(manutencoes);
          setSearch(text);
        }
      };
      
      
    function tipoManut(text){
        if(text==1){
            return "Manutenção Corretiva"
        }else{
            return "Manutenção Planejada"
        }
    }



    async function equipPorId(manut) {
        const responseEquip = await api.get(`/equipamentos/${manut.equipamentoId}`);
        setEquipamentos(responseEquip.data)
        return responseEquip.data;
    } 

    
    function imageManut(manut) {
        if (manut.situacao != 'Concluída') {
            return require("../../assets/timing.png")

        } else {
            if (manut.tipo == 1) {
                return require("../../assets/repair.png")
            } else {
                return require("../../assets/checklist.png")
            }
        }

    }
    async function tarefasPorManut(manut) {
        const responseTarefas = await api.get(`/manutencoes/${manut.id}/tarefas`);
        return responseTarefas.data;
    } 
    async function itensPorManut(manut) {
        const responseItens = await api.get(`/manutencoes/${manut.id}/itens_status`);
        return responseItens.data;
    }
    




    async function handleButtonPrint(manut){

        const tarefas = await tarefasPorManut(manut)
        const itens = await itensPorManut(manut)
        const equip = await equipPorId(manut)
        let situacao = manut.situacao
            


        Print.printAsync({
            html: `${OrdemDeServico(equip, tarefas, manut.problema, manut.solucao, user, manut.tipo, situacao, manut.observacoes, itens, hosp, manut.id)}`
        });
    }
    return (
        <Content style={styles.content} searchBar rounded>
            <Item style={styles.input} >
                <Input 
                    placeholder='Buscar por data'
                    onChangeText={(text)=>{
                        searchFilterFunction(text)
                    }}
                />
                <Icon name='search' />
            </Item>
            {manutsFilter.map((manut, index) =>( 
                <ListItem
                onPress = {async ()=>{
                   await handleClickManutencao(manut)
                    
                }}
                style={styles.listItem}
                key={index}
                avatar
                >
                    <Left>
                        <Thumbnail square medium source={imageManut(manut.tipo)} />
                    </Left>
                    <Body>
                        <Text style = {styles.textBold}>
                            {tipoManut(manut.tipo)}
                        </Text>
                                
                        <Text note style={styles.text} >Ordem de Serviço: {manut.id}</Text>
                        <Text note style = {styles.text} >Data: {manut.data}</Text>
                        <Text note style={styles.text} >Equip: {manut.name}</Text>
                        <Text note style={styles.text} >Modelo:{manut.modelo}</Text>
                    </Body>
                    <Right>
                        <ButtonPrint onPress={async()=>{
                            await handleButtonPrint(manut)                            
                        }}>
                            <Thumbnail square small source={require("../../assets/file.png")}/>
                        
                        </ButtonPrint>
                    </Right>
                </ListItem> 
            ))}
               
        </Content>

    );
        


}
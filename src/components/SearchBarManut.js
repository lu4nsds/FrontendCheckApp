import React, {Component, useState, useEffect} from 'react';
import { useNavigation } from "@react-navigation/native"
import styled from 'styled-components/native';
import {
    Input,
    Content,
    Left,
    Body,
    Item,
    Icon,
    Text,
    ListItem,
    Thumbnail,
} from 'native-base';
import api from '../api';
const styles = {
    input:{
        height: 55,
        color: '#000000',
        backgroundColor: '#fff',
        borderRadius: 30,
        fontSize: 18,
        textAlign: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: {
            width: 4,
            height: 4,
        },
        padding: 10,
        elevation: 2,
        placeholder: {
        color: '#000000'
        },
        marginTop: 20,
        marginBottom: 20,
    },
    text: {
        color: '#45cbf3',
        fontSize: 15,
    },
    textBold:{
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 18,
    },
  };  

export default ( {equip, hosp} ) => {
    const [search, setSearch] = useState('');
    const [manutencoes, setManutencoes] = useState([]);
    const [manutsFilter, setManutsFilter] = useState([]);
    const navigation = useNavigation();

    useEffect(() => {
        async function loadManutencoesByEquipamentoId() {
            const response = await api.get(`/equipamentos/${equip.id}/manutencoes`);
            await preencherItens(response.data);
        }

        loadManutencoesByEquipamentoId();
    }, []);

    

    async function SingClickEquipamento(manut) {
        const hosp = await loadHospPorEquip(manut);
        navigation.navigate('Equipamento',{
            equipamento:{
                manut,
            }
        });
    }

    async function preencherItens(manutencoes) {
        let listManuts = [];
        manutencoes.map(manut => {


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
   
    return (
        <Content searchBar rounded>
            <Item style={styles.input} >
                <Input 
                    placeholder='Buscar Número de Série'
                    onChangeText={(text)=>{
                        searchFilterFunction(text)
                    }}
                />
                <Icon name='search' />
            </Item>
            {manutsFilter.map((manut, index)=>(
                <ListItem
                onPress = {async ()=>{
                   await SingClickEquipamento(manut)
                    
                }}
                style={styles.listItem}
                key={index}
                avatar
                >
                    <Left>
                        <Thumbnail source={{ uri: equip.imgUrl }} />
                    </Left>
                    <Body>
                        <Text style = {styles.textBold} >{manut.tipo}</Text>
                        <Text note style = {styles.text} >Data: {manut.data}</Text>
                    </Body>
                </ListItem> 
            ))}
               
        </Content>

    );
        


}
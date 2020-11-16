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

export default ( ) => {
    const [search, setSearch] = useState('');
    const [equipamentos, setEquipamentos] = useState([]);
    const [equipsFilter, setEquipsFilter] = useState([]);
    const [hosp, setHosp] = useState([]);
    const navigation = useNavigation();
    useEffect(() => {

        async function loadEquipamentos() {
            const response = await api.get('/equipamentos');
            await preencherItens(response.data);
        }

        loadEquipamentos();

    }, []);

    async function loadHospPorEquip(equip) {
        
        const responseHosp = await api.get(`/hospitais/${equip.hospitalId}`);
        await setHosp(responseHosp.data);
        
    } 
    async function SingClickEquipamento(equip) {
        console.log(hosp);
        await loadHospPorEquip(equip);
        console.log(hosp);
        navigation.navigate('Equipamento',{
            equipamento:{
                equip,
                hosp,
            }
        });
    }

    async function preencherItens(equips) {
        let listEquips = [];
        equips.map(equip => {


            listEquips = [...listEquips, equip];

        });
        setEquipamentos(listEquips);
        setEquipsFilter(listEquips);
            
    }

  

    /* function SingClickEquipamento(equip) {
        async function loadHospPorEquip(equip) {
            const responseHosp = await api.get(`/hospitais/${equip.hospitalId}`);

            setHosp(responseHosp.data)
        } 

        loadHospPorEquip(equip);
        navigation.navigate('Equipamento',{
            equipamento:{
                equip,
                hosp,
            }
        });
    } */
    
    const searchFilterFunction = (text) => {
        // Check if searched text is not blank
        if (text) {
          // Inserted text is not blank
          // Filter the masterDataSource and update FilteredDataSource
          const newData = equipamentos.filter(function (item) {
            // Applying filter for the inserted text in search bar
            const itemData = item.sn
              ? item.sn.toUpperCase()
              : ''.toUpperCase();
            const textData = text.toUpperCase();
            return itemData.indexOf(textData) > -1;
            
          });
          setEquipsFilter(newData);
          setSearch(text);
          
        } else {
          // Inserted text is blank
          // Update FilteredDataSource with masterDataSource
          setEquipsFilter(equipamentos);
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
            {equipsFilter.map((equip, index)=>(
                <ListItem
                onPress = {()=>{
                    SingClickEquipamento(equip)
                    
                }}
                style={styles.listItem}
                key={index}
                avatar
                >
                    <Left>
                        <Thumbnail source={{ uri: equip.imgUrl }} />
                    </Left>
                    <Body>
                        <Text style = {styles.textBold} >{equip.name}</Text>
                        <Text note style = {styles.text} >Nº de Série: {equip.sn}</Text>
                    </Body>
                </ListItem> 
            ))}
               
        </Content>

    );
        


}
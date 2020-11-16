import React, {Component, useState, useEffect} from 'react';
import { useNavigation } from "@react-navigation/native"
import {
    Input,
    Content,
    Left,
    Body,
    Right,
    Button,
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
    textLink:{
        color: '#45cbf3',
        fontWeight: 'bold',
        fontSize: 16,
    },
  };  

export default ( ) => {
    const [search, setSearch] = useState('');
    const [hospitais, setHospitais] = useState([]);
    const [hospFilter, setHospFilter] = useState([]);
    const navigation = useNavigation();
    //Função para adicionar a font do Button Transparent
    
    useEffect(() => {

        

        async function loadHospitais() {
            const response = await api.get('/hospitais');

            await preencherItens(response.data);

        }

        loadHospitais();

    }, []);

    async function preencherItens(hosps) {
        let listHosps = [];
        hosps.map(hosp => {


            listHosps = [...listHosps, hosp];

        });
        setHospitais(listHosps);
        setHospFilter(listHosps);
            
    }
    
    const searchFilterFunction = (text) => {
        // Check if searched text is not blank
        if (text) {
          // Inserted text is not blank
          // Filter the masterDataSource and update FilteredDataSource
          const newData = hospitais.filter(function (item) {
            // Applying filter for the inserted text in search bar
            const itemData = item.name
              ? item.name.toUpperCase()
              : ''.toUpperCase();
            const textData = text.toUpperCase();
            return itemData.indexOf(textData) > -1;
            
          });
          setHospFilter(newData);
          setSearch(text);
          
        } else {
          // Inserted text is blank
          // Update FilteredDataSource with masterDataSource
          setHospFilter(hospitais);
          setSearch(text);
        }
      };
    
    const handleHospClick = (hosp) => {
        navigation.navigate('Hospital',{
            hospital: hosp

        });
    };
    return (
        <Content searchBar rounded>
            <Item style={styles.input} >
                <Input
                    placeholder='Buscar Hospital'
                    onChangeText={(text)=>{
                        searchFilterFunction(text)
                    }}
                />
                <Icon name='search' />
            </Item>
            {hospFilter.map((hosp, index)=>(
                
                
                <ListItem
                style={styles.listItem}
                key={hosp.id}
                avatar
                onPress={()=>{
                    handleHospClick(hosp)
                }}
                >
                    <Left>
                        <Thumbnail square source={{ uri: 'https://images.squarespace-cdn.com/content/v1/546e1217e4b093626abfbae7/1511881792811-BAWT0VOSRGEQG5PGMP4Z/ke17ZwdGBToddI8pDm48kGfiFqkITS6axXxhYYUCnlRZw-zPPgdn4jUwVcJE1ZvWQUxwkmyExglNqGp0IvTJZUJFbgE-7XRK3dMEBRBhUpxQ1ibo-zdhORxWnJtmNCajDe36aQmu-4Z4SFOss0oowgxUaachD66r8Ra2gwuBSqM/Hospital+%28icon%29.png?format=300w' }} />
                    </Left>
                    <Body>
                        <Text style = {styles.textBold} >{hosp.name}</Text>
                        <Text note style = {styles.text} >{hosp.endereco}</Text>
                    </Body>
                    <Right>
                        
                    </Right>
                </ListItem> 
            ))}
               
        </Content>

    );
        


}
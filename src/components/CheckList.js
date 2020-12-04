import React, {useState, useEffect} from 'react';
import api from '../api.js'
import {
    DateTimeArea,
    DateArea,
    TimeArea,
    styles,
    DateTimeContainer,
    ScrollerTask,
    CheckBoxArea,
} from '../pages/ManutencaoPreventiva/styles';

import {
    TextInput,
} from 'react-native';

import {
    Text,
    View,
    CheckBox,
} from 'native-base';

function List({item, index}){
    const [check, setCheck] = useState(false);
        return (
            <View style={styles.checklistItem} key={index}>
                <View style={styles.checkboxArea}>
                    <CheckBox
                            key={index}
                            style={styles.checkbox}
                            checked={check}
                            //onValueChange={}
                            onPress={()=>{
                                if(item.checado){
                                    item.checado = false
                                    setCheck(item.checado)
                                }else{
                                    item.checado = true
                                    setCheck(item.checado)
                                }
                                // console.log(item.checado)
                            }}
                        /> 
                </View> 
                <View>   
                    <Text style={styles.procedimento}>
                        {item.procedimento}
                    </Text>
                </View>
            </View>
        )
    }         

function CheckList({equip, hosp, itens, setItens}){
    
    useEffect(()=>{
        async function getChecklist() {
            const response = await api.get(`/equipamentos/${equip.id}/checklist`);
            preencherItens(response.data);

        }

        getChecklist()

        
    }, []);
    
    async function preencherItens(itensChecklist) {
        let listItens = [];
        itensChecklist.map(item => {
            listItens = [...listItens, item];

        });


        setItens(listItens);
    };
    

    return (
        <View>
            {itens.map((item, index)=>(
                <List
                    key = {index}
                    item={item}
                    index={index}
                />
               
            ))
            }
        </View>
    );
}

export default CheckList;
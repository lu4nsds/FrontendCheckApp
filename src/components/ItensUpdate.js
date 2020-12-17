import React, {useState, useEffect} from 'react';
import api from '../api.js'
import {
    styles,
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
    const [check, setCheck] = useState(item.checado);
        return (
            <View style={styles.checklistItem} key={index}>
                <View style={styles.checkboxArea}>
                    <CheckBox
                            key={index}
                            style={styles.checkbox}
                            checked={check}
                            onPress={()=>{
                                if(item.checado){
                                    item.checado = false
                                    setCheck(item.checado)
                                }else{
                                    item.checado = true
                                    setCheck(item.checado)
                                }
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

function ItensUpdate({equip, hosp, itens, setItens}){


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

export default ItensUpdate;
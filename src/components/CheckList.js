import React, {useState, useEffect} from 'react';
import api from '../api.js'
import {
    DateTimeArea,
    DateArea,
    TimeArea,
    styles,
    DateTimeContainer,
    ScrollerTask,
} from '../pages/ManutencaoPreventiva/styles';

import {
    TextInput,
} from 'react-native';

import {
    Text,
    View,
} from 'native-base';

         

function CheckList({equip, hosp}){
    const [itens, setItens] = useState([]);
    
    async function getChecklist(){
        const response = await api.get(`/equipamentos/${equip.id}/checklist`);
        preencherItens(response.data);
            
    }

    getChecklist()
    
    async function preencherItens(itensChecklist) {
        let listItens = [];
        itensChecklist.map(item => {
            listItens = [...listItens, item];

        });


        setItens(listItens);
    };

    return(
        <View>
                <Text>
                    Coisinha
                </Text>  
        </View>

    )
};

export default CheckList;
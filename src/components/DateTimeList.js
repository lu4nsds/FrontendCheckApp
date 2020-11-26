import React, {useState} from 'react';

import {
    ButtonAdd,
    styles,
} from '../pages/ManutencaoCorretiva/styles';

import {
    Text,
    Item,
    View,
} from 'native-base';
import Plus from '../../assets/plus.svg';

function DateTimeList({data, horaInicial, horaFinal, list, setList}) {
    

    function handleAdd(){
        let tarefa = {
            data: data,
            horaInicial: horaInicial,
            horaFinal: horaFinal
        }    
        let listTask = [];

        listTask = [...list, tarefa];
        setList(listTask);
    }
    
    
    
    

    function render(){
        let Lista = list.map((task, index)=>{
            return (
                    <Item
                    style={styles.ListItem}
                    key={index}
                    pass_in_data={task}
                    > 

                        
                        <Text style={styles.ListItemText}>
                        {index+1} - {task.data}
                        </Text>


                        <Text style={styles.ListItemText}>
                            {task.horaInicial}
                        </Text>


                        <Text style={styles.ListItemText}>
                             {task.horaFinal}
                        </Text>
                    </Item>  
                )
            })
        return(

            <View>
                <View style={styles.listArea}>
                    {Lista}
                </View>    
                
                
                <ButtonAdd
                onPress={()=>{
                    handleAdd()
                }
                    
                }
            >
                    <Plus height="18px" width="18px"/>
                    <Text style = {styles.ButtonAdicionar}>
                        Adicionar
                    </Text>
                </ButtonAdd>
            </View>  
        
        )
    }
    return render();

}

export default DateTimeList;
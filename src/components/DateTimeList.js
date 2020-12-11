import React, {useState} from 'react';

import {
    ButtonAdd,
    styles,
} from '../pages/ManutencaoCorretiva/styles';

import {
    Text,
    Item,
    View,
    Thumbnail,
} from 'native-base';
import Plus from '../../assets/plus.svg';
import { TouchableOpacity } from 'react-native';



function DateTimeList({data, horaInicial, horaFinal, list, setList}) {
    const [show,setShow] = useState(false)    

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

    function handleRemove(list, index) {
        const newList = [...list]
        newList.splice(index, 1)
        setList(newList)
    }
    
    
    
    

    function render(){
        let Lista = list.map((task, index)=>{
            return (
                
                    <Item
                    style={styles.ListItem}
                    key={index}
                    pass_in_data={task}
                    > 
                        <View style={styles.taskItem}>

                            <Text style={styles.ListItemText}>
                            {index+1} - {task.data}
                            </Text>


                            <Text style={styles.ListItemText}>
                                {task.horaInicial}
                            </Text>


                            <Text style={styles.ListItemText}>
                                {task.horaFinal}
                            </Text>


                        </View>
                        
                        <TouchableOpacity style={styles.ButtonRemover}
                        onPress={()=>{
                            handleRemove(list,index)
                        }}
                        >
                            <Thumbnail
                            small
                            source={require("../../assets/delete.png")}
                            
                            />
                        </TouchableOpacity>
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
                    setShow(true)
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
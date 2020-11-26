import React, {useState} from 'react';

import {
    DateTimeArea,
    DateArea,
    TimeArea,
    ButtonAdd,
    styles,
    DateTimeContainer,
    ScrollerTask,
} from '../pages/ManutencaoCorretiva/styles';

import {
    TextInput,
} from 'react-native';

import {
    Text,
    ListItem,
    View,
} from 'native-base';
import Plus from '../../assets/plus.svg';

class DateTimeList extends React.Component {
    constructor(props) {
        super(props);
        this.handleAdd= this.handleAdd.bind(this);
        this.state={
            list: [],
            data: props.data,
            horaInicial: props.horaInicial,
            horaFinal: props.horaFinal,
        };
        
    }

    handleAdd(){
        let tarefa = {
            data: this.state.data,
            horaInicial: this.state.horaInicial,
            horaFinal: this.state.horaFinal,
        }    
        /* console.log(`TAREFA: ${tarefa.data}`); */
        
        this.setState({            
            list : [...this.state.list, tarefa],
        })
        

    }

    
    

    render(){/* 

        console.log(this.state.list); */
        let Lista = this.state.list.map((task, index)=>{
            return (
                    <ListItem
                    style={styles.ListItem}
                    key={index}
                    pass_in_data={task}
                    >
                        <Text style={styles.EquipSN}>
                            {task.data}
                        </Text>
                    </ListItem>  
                )
            })
        return(

            <View>
                <ButtonAdd
                onPress={()=>{
                    this.handleAdd()
                }
                    
                }
            >
                    <Plus height="18px" width="18px"/>
                    <Text style = {styles.ButtonAdicionar}>
                        Adicionar
                    </Text>
                </ButtonAdd>
                {Lista}   
            </View>  
        
        )
    }

}


function DateTime({data, setData, horaInicial, setHoraInicial, horaFinal, setHoraFinal}){
    const [show, setShow] = useState(false);
    const [tasks, setTasks] = useState([]);
    
    
    return (
        <DateTimeContainer>
            <DateArea>
                <Text style={styles.EquipHosp}>
                    Data:
                </Text>
                <TextInput
                    style={styles.InputData}
                    placeholder='DD/MM/AAAA'
                    onChangeText={(text) => {
                    if (text.length == 2 || text.length == 5) {
                        text = text + '/'
                    }
                    setData(text)
                }}
                value={data}
                >
                </TextInput>   
            </DateArea>
            <DateTimeArea>
                <TimeArea>
                    <Text style={styles.EquipHosp}>
                        Hora Inicial:
                    </Text>
                    <TextInput
                        style={styles.InputData}
                        placeholder='HH:MM'
                        onChangeText={(text) => {
                            if (text.length == 2) {
                                text = text + ':'
                            }
                            setHoraInicial(text)
                        }}
                        value={horaInicial}
                    >
                    </TextInput>
                </TimeArea>
                <TimeArea>
                    <Text style={styles.EquipHosp}>
                            Hora Final:
                        </Text>
                    <TextInput
                        style={styles.InputData}
                        placeholder='HH:MM'
                        onChangeText={(text) => {
                            if (text.length == 2) {
                                text = text + ':'
                            }
                            setHoraFinal(text)
                        }}
                        value={horaFinal}
                    ></TextInput>
                </TimeArea>
            </DateTimeArea>

            <ScrollerTask>  
                        <DateTimeList
                            data={data}
                            horaInicial={horaInicial}
                            horaFinal={horaFinal}
                        />
            </ScrollerTask> 
            
              
        </DateTimeContainer>
    )

}

export default DateTime;
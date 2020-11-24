import React, {useState} from 'react';

import {
    DateTimeArea,
    DateArea,
    TimeArea,
    ButtonAdd,
    styles,
    DateTimeContainer,
    ShowDateTime,
} from '../pages/ManutencaoCorretiva/styles';

import {
    TextInput,
} from 'react-native';

import {
    Text,
    Content,
} from 'native-base';
import Plus from '../../assets/plus.svg';

function DateTime({data, setData, horaInicial, setHoraInicial, horaFinal, setHoraFinal}){
    const [show, setShow] = useState(false);
    const [tasks, setTasks] = useState([]);
    async function handleAdd(data,horaInicial, horaFinal){
        setShow(true);
        let tarefa = {
            data,
            horaInicial,
            horaFinal,
        }
        await preencherTasks(tarefa);
    };

    async function preencherTasks(tarefa) {
        let listTask = [...tasks, tarefa]
        
        
        setTasks(listTask);
        console.log(tasks);
    };


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
            {show &&
              <ShowDateTime>
                
                {tasks.map(task => {
                    <Content>
                        <Text style={styles.CheckText}>
                            {task.data}
                            Coisinha
                        </Text>
                    </Content>
                })}
              </ShowDateTime>      
            }
            <ButtonAdd
                onPress={() => {
                    handleAdd(data, horaInicial, horaFinal)
                }}
            >
                <Plus height="18px" width="18px"/>
                <Text style = {styles.ButtonAdicionar}>
                    Adicionar
                </Text>
            </ButtonAdd>

        </DateTimeContainer>
    )
};

export default DateTime;
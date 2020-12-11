import React, {useState} from 'react';

import {
    DateTimeArea,
    DateArea,
    TimeArea,
    styles,
    DateTimeContainer,
    ScrollerTask,
} from '../pages/ManutencaoCorretiva/styles';

import DateTimeList from './DateTimeList'

import {
    TextInput,
    View,
} from 'react-native';

import {
    Text,
} from 'native-base';


function DateTime({data, setData, horaInicial, setHoraInicial, horaFinal, setHoraFinal, list, setList}){
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
            <View style={styles.taskView}>
                <Text style={styles.taskText}>
                    |    Data   |     Início    |    Término   |
                </Text>
            </View>   
            <ScrollerTask>  
                        <DateTimeList
                            data={data}
                            horaInicial={horaInicial}
                            horaFinal={horaFinal}
                            list={list}
                            setList={setList}
                        />
            </ScrollerTask> 
            
              
        </DateTimeContainer>
    )

}

export default DateTime;
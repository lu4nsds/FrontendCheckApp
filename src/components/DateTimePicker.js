import React, {useState} from 'react';
import {View, Button, Platform} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function CompDateTimePicker(){
  const [date, setDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'android');
    setDate(currentDate);
    // setShow(false)
    console.log(date);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };

  return (
    <View>
      <View>
              <Button onPress={showDatepicker} title={`${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`} />
      </View>
      <View>
              <Button onPress={showTimepicker} title={`${date.getHours()}:${date.getMinutes()}`} />
      </View>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          locale="pt-BR"
          mode={mode}
          is24Hour={true}
          display="spinner"
          onDateChange={onChange}
          onChange={onChange}
          
        />
      )}
    </View>
  );
};
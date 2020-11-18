import React, {useEffect, memo, useState} from 'react';
import {View, Button, Platform} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

  const CompDateTimePicker = ({onChange, mode, date}) => {
/*   const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date'); */
/*   console.log(new Date()); */

/*   const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    if (event.type === 'set') {
      setDate(currentDate);
      setShow((prevState) => setShow(!prevState));
    }  
  }; */
 /*  useEffect(() => {
    console.log('show:',show);
  }, [show]); */

  /* const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  }; */
/* 
  const showDatepicker = () => {
    setMode('date');
    setShow(true);
  };

  const showTimepicker = () => {
    setMode('time');
    setShow(true);
  }; */

  return (
    <View>
        <DateTimePicker
          testID="dateTimePicker"
          minimumDate={new Date()}
          value={date}
          locale="pt-BR"
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={onChange}
          
        />
    </View>
  );
};

export default memo(CompDateTimePicker);
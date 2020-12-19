import React, {useState} from 'react';
import { ScrollView } from "react-native";
import {VictoryBar, VictoryChart, VictoryGroup} from "victory-native";

import {
    styles,
    
} from '../pages/Hospital/styles';

import {
    Thumbnail,
    View,
    Text
} from 'native-base';


function Charts({hosp}){

    const data = {
        planned: [
            {x: 'week 1', y: 50}],


        actual: [],

    };
    

    

    return (
        <View> 
            <ScrollView
                style={{
                    backgroundColor: '#000000',
                    marginVertical: 0,
                    width: '100%',
                    marginTop: 50,
                }}
                horizontal={true}
                >
                    <VictoryChart>
                        <VictoryGroup>
                            <VictoryBar/>

                            <VictoryBar/>
                        </VictoryGroup>                     
                   
                    </VictoryChart>    
                            

            </ScrollView>         
                      


        </View>
         
    )
}

export default Charts;
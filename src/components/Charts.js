import React, {useState} from 'react';
import { ScrollView } from "react-native";
import {
  BarChart,
  StackedBarChart,
} from "react-native-chart-kit";
import {
    styles,
    
} from '../pages/Hospital/styles';

import {
    Thumbnail,
    View,
    Text
} from 'native-base';


function Charts({hosp}){

    
    const chartConfig = {
    backgroundGradientFrom: "#1E2923",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#08130D",
    backgroundGradientToOpacity: 0,
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    barPercentage: 0.8,
    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    propsForBackgroundLines: {margin: 5},
    
    useShadowColorFromDataset: false, // optional


    propsForBackgroundLines: {
        stroke: '#ffffff',
        strokeWidth: "0.5",
        strokeDashOffset: 10,
        scale: 0.75,
    },

    propsForVerticalLabels: {
            fontSize: 15,
            rotation: -45,
            decimalPlaces: 0,
            padding: 10,
        },
        
    propsForHorizontalLabels: {
            fontSize: 10,
            decimalPlaces:1,
            
        
        },
    };

    const data = {
        labels: ["jan", "fev", "mar","abr", "mai", "jun","jul", "ago", "set","out", "nov", "dez"],
        legend:['seu cu', 'seu anus', 'seu boga'],
        data: [
            [30, 60, 60],
            [30, 30, 60],
            [30, 30, 60],
            [30, 30, 60],
            [30, 30, 60],
            [30, 30, 60],
            [30, 30, 60],
            [30, 30, 60],
            [30, 30, 60],
            [30, 30, 60],
            [30, 30, 60],
            [30, 30, 60],
        ],
        barColors: ["#ffffff", "#555555", "#45cbf3"]
        };

    return (
        <View> 
            <ScrollView
            style={{
                backgroundColor: '#000000',
                marginVertical: 0,
                width: '100%',
            }}
            horizontal={true}
            >
                <StackedBarChart
                style={styles.barChart}
                data={data}
                width={800}
                height={300}             
                chartConfig={chartConfig}
                showLegend={true}
                /* propsForHorizontalLabels={{justifyContent: 'space-between'}} */
                />

            </ScrollView>         
                      


        </View>
         
    )
}

export default Charts;
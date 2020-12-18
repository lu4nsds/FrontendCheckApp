import React, {useState} from 'react';
import { Dimensions } from "react-native";
import {
  BarChart,
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
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false // optional
    };
    const screenWidth = Dimensions.get("window").width;

    const dados = {
        labels: ["January", "February", "March", "April", "May", "June"],
        datasets: [
            {
                data: [20, 45, 28, 80, 99, 43]
            }
        ]
    };

    return (
        <View> 
            <BarChart
                style={{
                        marginVertical: 8,
                        borderRadius: 16
                    }}
                data={dados.datasets.data}
                width={screenWidth}
                height={220}
                yAxisLabel="$"
                chartConfig={chartConfig}
                verticalLabelRotation={30}
            />

            

            


        </View>
         
    )
}

export default Charts;
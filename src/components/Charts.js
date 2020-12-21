import React, {useState, useEffect} from 'react';
import { ScrollView } from "react-native";
import {VictoryBar, VictoryChart, VictoryGroup} from "victory-native";
import api from '../api.js'
import {
    styles,
    
} from '../pages/Hospital/styles';

import {
    Thumbnail,
    View,
    Text
} from 'native-base';


function Charts({hosp}){
    const [manuts, setManuts] = useState([]);
    const [abertas, setAbertas] = useState([]);
    const [concluidas, setConcluidas] = useState([]);


    useEffect(() => {
        async function loadManutencoes() {
            const manutTodas = await api.get(`/hospitais/${hosp.id}/manutencoes`);
            await preencherManuts(manutTodas.data);
    
        }
        loadManutencoes();
        
        async function loadManutencoesAbertas() {
            const manutAbertas = await api.get(`/hospitais/${hosp.id}/manutencoes/abertas`);
            await preencherManutsAbertas(manutAbertas.data);
        }
        loadManutencoesAbertas();
    
        async function loadManutencoesConcluidas() {
            const manutConcluidas = await api.get(`/hospitais/${hosp.id}/manutencoes/concluidas`);
            await preencherManutsConcluidas(manutConcluidas.data);
        }
        loadManutencoesConcluidas();

    }, []);


    

    async function preencherManuts(manutencoes) {
        let listManuts = [];
        manutencoes.map(manut => {
            listManuts = [...listManuts, manut];
        });
        setManuts(listManuts);   
    }    
    async function preencherManutsAbertas(manutencoes) {
        let listManuts = [];
        manutencoes.map(manut => {
            listManuts = [...listManuts, manut];
        });
        setAbertas(listManuts);   
    }    
    async function preencherManutsConcluidas(manutencoes) {
        let listManuts = [];
        manutencoes.map(manut => {
            listManuts = [...listManuts, manut];
        });
        setConcluidas(listManuts);   
    }    


    const qtdTotalManutencoes = manuts.length; 
    const qtdManutencoesAbertas = abertas.length; 
    const qtdManutencoesConcluidas = concluidas.length; 
    //console.log(`Todas: ${qtdTotalManutencoes} - Abertas: ${qtdManutencoesAbertas} - Concluidas ${qtdManutencoesConcluidas}` )
    
    



    const data = {
        planned: [
            {x: 'week 1', y: 50}],


        actual: [],

    };

    const chartTheme = {
        axis: {
          style: {
            axis: {
                strokeWidth: 1.6,
            },
            tickLabels: {
                padding: 5,
              // this changed the color of my numbers to white
              fill: 'white',
            },         
            grid: {
                stroke: "none",       
            },    
            },
        },
      };
    

    

    return (
        <View> 
            <ScrollView
                style={{
                    width: '100%',
                    marginTop: 50,
                }}
                horizontal={true}
                >
                    <VictoryChart
                    theme={chartTheme}                    
                    >
                        <VictoryGroup offset={15}
                        colorScale={["yellow", "white", "#45cbf3"]}
                        >
                            <VictoryBar //TODAS
                            data={


                                [   { x: 'Jan', y: qtdTotalManutencoes }, 
                                { x: 'Fev', y: qtdManutencoesAbertas }, 
                                { x: 'Mar', y: qtdManutencoesConcluidas }, ]
                            
                            
                            
                            }
                            />
                            <VictoryBar //CONCLUIDAS
                            data={[{ x: 'Jan', y: 2 }, { x: 'Fev', y: 1 }, { x: 'Mar', y: 7 } ]}
                            />
                            <VictoryBar // NÃO CONCLUIDAS
                            data={[{ x: 'Jan', y: 3 }, { x: 'Fev', y: 4 }, { x: 'Mar', y: 9 }]}
                            />
                        </VictoryGroup>                     
                   
                    </VictoryChart>    
                            

            </ScrollView>         
                      


        </View>
         
    )
}

export default Charts;
import React, {useState, useEffect} from 'react';
import { Dimensions, ScrollView } from "react-native";
import {VictoryBar, VictoryChart, VictoryGroup, VictoryLegend, VictoryContainer, VictoryAxis} from "victory-native";
import api from '../api.js'
import { assign } from "lodash";
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
    const qtdManuts = manuts.length; 
    const qtdAbertas = abertas.length; 
    const qtdConcluidas = concluidas.length; 

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

    // PASSANDO MANUTS, ABERTAS E CONCLUIDAS
    function getEstatisticas(manuts){
        let qtdJan=0
        let qtdFev=0
        let qtdMar=0
        let qtdAbr=0
        let qtdMai=0
        let qtdJun=0
        let qtdJul=0
        let qtdAgo=0
        let qtdSet=0
        let qtdOut=0
        let qtdNov=0
        let qtdDez=0

        let mesAtual = new Date().getMonth()
        

        let stats = [{
                x: 'Jan',
                y: qtdJan
            },
            {
                x: 'Fev',
                y: qtdFev
            },
            {
                x: 'Mar',
                y: qtdMar
            },
            {
                x: 'Abr',
                y: qtdAbr
            },
            {
                x: 'Mai',
                y: qtdMai
            },
            {
                x: 'Jun',
                y: qtdJun
            },
            {
                x: 'Jul',
                y: qtdJul
            },
            {
                x: 'Ago',
                y: qtdAgo
            },
            {
                x: 'Set',
                y: qtdSet
            },
            {
                x: 'Out',
                y: qtdOut
            },
            {
                x: 'Nov',
                y: qtdNov
            },
            {
                x: 'Dez',
                y: qtdDez
            },
        ]

        manuts.map(manut=>{
            if(getMes(manut)=='Jan'){
                qtdJan++
                stats[0].y=qtdJan
            } else if(getMes(manut)=='Fev'){
                qtdFev++
                stats[1].y=qtdFev
            }else if(getMes(manut)=='Mar'){
                qtdMar++
                stats[2].y=qtdMar
            }else if(getMes(manut)=='Abr'){
                qtdAbr++
                stats[3].y=qtdAbr
            }else if(getMes(manut)=='Mai'){
                qtdMai++
                stats[4].y=qtdMai
            }else if(getMes(manut)=='Jun'){
                qtdJun++
                stats[5].y=qtdJun
            }else if(getMes(manut)=='Jul'){
                qtdJul++
                stats[6].y=qtdJul
            }else if(getMes(manut)=='Ago'){
                qtdAgo++
                stats[7].y=qtdAgo
            }else if(getMes(manut)=='Set'){
                qtdSet++
                stats[8].y=qtdSet
            }else if(getMes(manut)=='Out'){
                qtdOut++
                stats[9].y=qtdOut
            }else if(getMes(manut)=='Nov'){
                qtdNov++
                stats[10].y=qtdNov
            }else if(getMes(manut)=='Dez'){
                qtdDez++
                stats[11].y=qtdDez
            }
        })

        stats.map((stat, statIndex)=>{
            if(statIndex >Number(mesAtual)){
                stats.splice(statIndex)
            }
        })

        return stats      

    }
    getEstatisticas(manuts);

    function getMes(manut){
        
        let dataManut = manut.data
        let ano = new Date().getFullYear()
        let data = dataManut.split('/')
        let mes = ''
        if(data[1]=='01' && data[2] ==ano){
            mes='Jan'
        }else if(data[1]=='02' && data[2]==ano){
            mes='Fev'
        }else if(data[1]=='03' && data[2]==ano){
            mes='Mar'
        }else if(data[1]=='04' && data[2]==ano){
            mes='Abr'
        } else if (data[1]=='05' && data[2] ==ano) {
            mes = 'Mai'
        } else if (data[1]=='06' && data[2] ==ano) {
            mes = 'Jun'
        }else if(data[1]=='07' && data[2] ==ano){
            mes='Jul'
        }else if(data[1]=='08' && data[2] ==ano){
            mes='Ago'
        } else if (data[1]=='09' && data[2] ==ano) {
            mes = 'Set'
        }else if(data[1]=='10' && data[2] ==ano){
            mes='Out'
        }else if(data[1]=='11' && data[2] ==ano){
            mes='Nov'
        }else if(data[1]=='12' && data[2] ==ano){
            mes='Dez'
        }else{
            mes=''
        }

        return mes
    }
    

    // A GENTE VAI PRECISAS TER UMA VARIAVEL QUE TEM A QUANTIDADE DE MANUTENÇÕES POR MÊS
    const data = {
        planned: [
            {x: 'week 1', y: 50}],


        actual: [],

    };

    const chartTheme = {
        area: assign(
            {
              style: {
            
                width: 350,
                height: 350,
                padding: 50,

            }}),
        axis: {
          style: {
            axis: {
                strokeWidth: 1.6,
                padding: 10,
                
                
            },
            axisLabel: {
                padding: 10,
                
                
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
        <View
        style={{
            width: '100%',
            marginTop: 20,
        }}> 
            <VictoryLegend
            x={Dimensions.get('screen').width/2 -100}
            height={100}
                centerTitle
                orientation="vertical"
                gutter={20}
                style={{ data: {fill: 'white'}, }}
                data={[
                    {
                        name: "Manutenções Totais",
                        symbol: {
                            fill: "#45cbf3"
                            },
                        labels: {
                            fill: 'white'
                        }
                    },{
                    name: "Manutenções Concluídas", 
                    symbol: { fill: "#f3c444" }, 
                    labels: {
                        fill: 'white'} 
                    },{     
                    name: "Manutenções Abertas", 
                    symbol: { fill: "#f34473" }, 
                    labels: {
                        fill: 'white'} 
                    }
                ]}
            />
            <ScrollView
                horizontal={true}
                
                >
                    <VictoryChart
                    theme={chartTheme}
                    width={(getEstatisticas(manuts).length*120)}                
                    >   
                        <VictoryAxis label='Meses'
                        style={{
                            axisLabel: {
                                padding: 20,
                                fill: 'white'

                            }
                        }}
                        
                        />
                        <VictoryAxis dependentAxis label='N° de Manutenções'
                        style={{
                            axisLabel: {
                                padding: 35,
                                fill: 'white'

                            }
                        }}
                        />
                        <VictoryGroup offset={20}
                        colorScale={["#45cbf3", "#f3c444", "#f34473"]}
                        >
                            <VictoryBar //TODAS
                            data={getEstatisticas(manuts)}
                            />
                            <VictoryBar //CONCLUIDAS
                            data={getEstatisticas(concluidas)}
                            />
                            <VictoryBar // NÃO CONCLUIDAS
                            data={getEstatisticas(abertas)}
                            />
                        </VictoryGroup>                     
                        
                    </VictoryChart>    
                            

            </ScrollView>         
                      


        </View>
         
    )
}

export default Charts;
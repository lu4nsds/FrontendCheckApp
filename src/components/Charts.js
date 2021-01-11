import React, {useState, useEffect} from 'react';
import { Dimensions, ScrollView} from "react-native";
import {Picker} from '@react-native-picker/picker';
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
    const [ano, setAno] = useState(new Date().getFullYear());
    const [anoAtual, setAnoAtual] = useState(new Date().getFullYear());
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
    function getEstatisticas(manuts, ano){
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

        let mesAtual = null

        if(ano == new Date().getFullYear()){
            mesAtual = new Date().getMonth()

        }else{
            mesAtual = 11
        }

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
            if(getMes(manut, ano)=='Jan'){
                qtdJan++
                stats[0].y=qtdJan
            } else if(getMes(manut, ano)=='Fev'){
                qtdFev++
                stats[1].y=qtdFev
            }else if(getMes(manut, ano)=='Mar'){
                qtdMar++
                stats[2].y=qtdMar
            }else if(getMes(manut, ano)=='Abr'){
                qtdAbr++
                stats[3].y=qtdAbr
            }else if(getMes(manut, ano)=='Mai'){
                qtdMai++
                stats[4].y=qtdMai
            }else if(getMes(manut, ano)=='Jun'){
                qtdJun++
                stats[5].y=qtdJun
            }else if(getMes(manut, ano)=='Jul'){
                qtdJul++
                stats[6].y=qtdJul
            }else if(getMes(manut, ano)=='Ago'){
                qtdAgo++
                stats[7].y=qtdAgo
            }else if(getMes(manut, ano)=='Set'){
                qtdSet++
                stats[8].y=qtdSet
            }else if(getMes(manut, ano)=='Out'){
                qtdOut++
                stats[9].y=qtdOut
            }else if(getMes(manut, ano)=='Nov'){
                qtdNov++
                stats[10].y=qtdNov
            }else if(getMes(manut, ano)=='Dez'){
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

    function getMes(manut, ano){
        
        let dataManut = manut.data       
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
            
            <View style={styles.PickerArea}>
                <Picker
                    selectedValue={ano}
                    style={styles.Picker}
                    //onValueChange={(itemValue, itemIndex) => this.setState({ language: itemValue })}
                    onValueChange={(ano)=>{
                        setAno(ano)
                    }}
                >
                    <Picker.Item label={`${Number(anoAtual) - 0}`} value={`${Number(anoAtual)-0}`} />
                    <Picker.Item label={`${Number(anoAtual) - 1}`} value={`${Number(anoAtual)-1}`} />
                    <Picker.Item label={`${Number(anoAtual) - 2}`} value={`${Number(anoAtual)-2}`} />
                    <Picker.Item label={`${Number(anoAtual) - 3}`} value={`${Number(anoAtual)-3}`} />
                    <Picker.Item label={`${Number(anoAtual) - 4}`} value={`${Number(anoAtual)-4}`} />
                    <Picker.Item label={`${Number(anoAtual) - 5}`} value={`${Number(anoAtual)-5}`} />
                    <Picker.Item label={`${Number(anoAtual) - 6}`} value={`${Number(anoAtual)-6}`} />
                    <Picker.Item label={`${Number(anoAtual) - 7}`} value={`${Number(anoAtual)-7}`} />
                    <Picker.Item label={`${Number(anoAtual) - 8}`} value={`${Number(anoAtual)-8}`} />
                    <Picker.Item label={`${Number(anoAtual) - 9}`} value={`${Number(anoAtual)-9}`} />
                </Picker>
            </View>

            <ScrollView
                horizontal={true}
                
                >
                    <VictoryChart
                    theme={chartTheme}
                    width={(getEstatisticas(manuts, ano).length*120) + 100 }                
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
                            data={getEstatisticas(manuts, ano)}
                            />
                            <VictoryBar //CONCLUIDAS
                            data={getEstatisticas(concluidas, ano)}
                            />
                            <VictoryBar // NÃO CONCLUIDAS
                            data={getEstatisticas(abertas, ano)}
                            />
                        </VictoryGroup>                     
                        
                    </VictoryChart>    
                            

            </ScrollView>         
                      


        </View>
         
    )
}

export default Charts;
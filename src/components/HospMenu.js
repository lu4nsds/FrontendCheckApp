import React, {useState} from 'react';
import {Linking} from 'react-native';
import {
    styles,
    ButtonMenu,
    
} from '../pages/Hospital/styles';

import {
    Thumbnail,
    Text,
    View,
} from 'native-base';

function HospMenu({setShow, hosp}){

    return (
        <View style={styles.hospMenuArea}>
            <ButtonMenu
            onPress={()=>{
                setShow(1)
            }}
            >
                <Thumbnail
                    small
                    square
                    source={require('../../assets/equip.png')}
                />
            </ButtonMenu>

            <ButtonMenu 
                onPress={() => {
                    setShow(2)
                }}>
                <Thumbnail
                    square
                    small
                    source={require('../../assets/stats.png')}
                />
            </ButtonMenu>

            <ButtonMenu
            onPress={()=>{
                setShow(3)
            }}>
                <Thumbnail
                    square
                    small
                    source={require('../../assets/manut.png')}
                />
            </ButtonMenu>
            
            <ButtonMenu
            onPress={()=>{
                Linking.openURL(`https://www.google.com/maps/search/?api=1&query=${hosp.endereco}`);
            }}
            >
                <Thumbnail
                    square
                    small
                    source={require('../../assets/map.png')}
                />
            </ButtonMenu>
            
        </View>
    );
}

export default HospMenu;
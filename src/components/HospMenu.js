import React, {useState} from 'react';
import {
    styles,
    ButtonMenu,
    
} from '../pages/Hospital/styles';

import {
    Thumbnail,
    Text,
    View,
} from 'native-base';

function HospMenu({setShow}){

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
                console.log('Google Maps!')
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
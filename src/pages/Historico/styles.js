import React from 'react';
import styled from 'styled-components/native';


export const styles = {
    EquipSN: {
        color: '#fff',
        fontSize: 15,
    },
    EquipName: {
        color: '#ff0',
        fontWeight: 'bold',
        fontSize: 18,
    },
    EquipHosp: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    buttonEquip: {
        width: '100%',
        height: 80,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 40,
        marginTop: 10,
        borderRadius: 20
    },
    Thumbnail:{
        width: 100,
        height: 100,
        marginTop: 5,
        marginBottom: 5,
        borderRadius: 15,
    },
};

export const Container = styled.SafeAreaView`
    background-color: #263165;
    padding-top: 25px;
    height: 100%;
    width: 100%;
`;
export const Scroller = styled.ScrollView`
    background-color: #263165;
    padding-right: 20px;
    padding-left: 20px;
    padding-bottom: 10px;
    border-radius: 10px;
`;

export const ScrollerTask = styled.ScrollView`
    padding: 5px;
    border-radius: 10px;
    width: 100%;
`;

export const HeaderArea = styled.View`
    flex-direction: column;
    padding: 10px;
    width: 100%;
    align-items: center;
    margin-top: 20px;
    text-align: center;   
    
`;
export const HeaderTitle = styled.Text`
    font-size: 24px;
    font-weight: bold;
    color: #FFF;
    
`;

export const InfoArea = styled.View`
    flex-direction: column;
    width: 100%;
    border-radius: 100px;
    padding: 15px;
    padding-left: 30px;

`;
export const HeaderContent = styled.View`
    flex-direction: row;
    padding: 0px;
    margin-top: 15px;
    justify-content: space-between;
    width: 100%;
`;
export const DateTimeArea = styled.View`
    flex-direction: row;
    width: 100%;
`;
export const DateArea = styled.View`
    border-radius: 100px;
    width: 100%
    padding: 5px;
`;
export const TimeArea = styled.View`
    border-radius: 100px;
    width: 50%;
    padding: 5px;
`;


export const InputArea = styled.View`
    flex-direction: column;
    width: 100%;
    border-radius: 100px;
    margin-top: 10px;
    padding: 10px
`;

export const Input = styled.TextInput`
    background-color: #fff;
    height: 100px;
    border-radius: 10px;
    margin-top: 10px;
    padding: 10px;
`;

export const ButtonSubmeter = styled.TouchableOpacity`
    border-radius: 10px;
    margin-top:10px;
    padding: 25px;
    width: 100%;
    height: 80px;
    background-color: #45cbf3;

`;

export const CheckArea = styled.View`
    flex-direction: row;
    width: 100%;
    justify-content: space-between;
    background-color: #384C9D;
    border-radius: 20px;
    margin-top: 10px;
`;
export const CheckBoxArea = styled.View`
    flex-direction: column;
    width: 100%;
    justify-content: space-between;
    background-color: #384C9D;
    border-radius: 20px;
    margin-top: 10px;
    margin-bottom: 10px;
    padding: 20px;
`;
export const DateTimeContainer = styled.View`
    flex-direction: column;
    width: 100%;
    background-color: #384C9D;
    border-radius: 20px;
    margin-top: 10px;
    margin-bottom: 10px;
    padding: 10px;
`;
export const TaskArea = styled.View`
    flex-direction: column;
    width: 100%;
    background-color: #000000;
    border-radius: 20px;
    margin-bottom: 10px;
    padding: 20px;
`;

export const Content = styled.View`
    flex-direction: column;
    width: 100%;
    background-color: #000000;
    border-radius: 20px;
    margin-bottom: 10px;
    padding: 20px
`;

export const ButtonAdd = styled.TouchableOpacity`
    flex: 1;   
    flex-direction: row;
    border-radius: 20px;
    background-color: #263165;
    justify-content: center;
    align-items: center;
    padding: 10px
    width: 100%;
`;

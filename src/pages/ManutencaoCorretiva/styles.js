import React from 'react';
import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
    background-color: #263165;
    height: 100%;
`;
export const Scroller = styled.ScrollView`
    background-color: #263165;
    width: 100%;
    height: 100%;
    padding: 20px;
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


export const InputArea = styled.View`
    flex-direction: column;
    width: 100%;
    border-radius: 100px;
    margin-top:10px;
    padding: 10px;
    justify-content: center;

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
    margin-top:40px;
    padding: 25px;
    width: 100%;
    height: 80px;
    background-color: #384C9D;

`;
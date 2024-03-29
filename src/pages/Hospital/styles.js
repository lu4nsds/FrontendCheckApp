import React from 'react';
import styled from 'styled-components/native';

export const styles = {
    hospEnd: {
        color: '#fff',
        fontSize: 15,
        textAlign: 'center'
    },
    hospName: {
        color: '#ff0',
        fontWeight: 'bold',
        fontSize: 18,
        textAlign: 'center',
        padding: 10
    },
    hospMenuArea: {
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    buttonMenu:{
        borderRadius: 100,
        backgroundColor: '#45cbf3',
        padding: 15, 
    },
    barChart:{
        justifyContent: 'center',
    },
    PickerArea:{
        alignItems: 'flex-end',
        borderColor: '#45cbf3',
        marginBottom: 20,
        borderWidth: 2,
        borderRadius: 20,
        height: 30,
        width: '50%',
        marginLeft: 'auto',
        
        
    },
    Picker:{
        flex: 1,
        color: '#fff',
        width: '100%',
        fontWeight: 'bold',
        textDecorationStyle: "solid",
        textDecorationColor: "#fff",
    },

};

export const Container = styled.SafeAreaView`
    background-color: #263165;
    justify-content: center;
    align-items: center;
    padding: 20px;
    width: 100%;
    height: 100%;
    padding-bottom: 5px;
    padding-top: 25px;
`;
export const Scroller = styled.ScrollView`
    background-color: #263165;
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

export const SearchButtonHosp = styled.TouchableOpacity`
    height: 60px;
    width: 50%;
    color: #000000;
    flex-direction: row;
    justify-content: center;
    padding: 15px;
    borderBottomLeftRadius: 100px;
    borderBottomRightRadius: 0;
    borderTopLeftRadius: 100px;
    borderTopRightRadius: 0;
    background: #45cbf3;
    
`;
export const ButtonMenu = styled.TouchableOpacity`  
    border-radius: 100px;
    background: #45cbf3;
    padding: 15px;
    
`;
export const SearchButtonEquip = styled.TouchableOpacity`
    height: 60px;
    width: 50%;
    background: #45cDff;
    color: #000000;
    flex-direction: row;
    justify-content: center;
    padding: 15px;
    borderBottomLeftRadius: 0;
    borderBottomRightRadius: 100px;
    borderTopLeftRadius: 0;
    borderTopRightRadius: 100px;
    opacity: 0.6;

`;
export const CustomText = styled.Text`
    font-weight: 300;
    font-size: 18px;

`

export const SearchArea = styled.View`
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    border-radius: 100px;
    margin-top:20px;

`;
export const InputSearchArea = styled.View`
    flex-direction: row;
    padding: 0px;
    margin-top: 15px;
    justify-content: space-between;
    border-radius: 90px;
    align-items: center;
    width: 100%;
    background-color: #384C9D;
    border-radius: 100px;
`;
export const SearchInput = styled.TextInput`
    padding: 10px;
    color: #FFF;
    background-color: #384C9D;
    border-radius: 20px;
    width: 80%;
`;

export const TesteArea = styled.View`
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    border-radius: 100px;
    margin-top:20px;

`;


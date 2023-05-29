// SearchBar.js
import React, { useState } from "react";
import { StyleSheet, TextInput, View, Keyboard, Button } from "react-native";
import { Feather, Entypo} from 'react-native-vector-icons' ;
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

const SearchBar = () => {
    const[search , setSearch]= useState('')
// const[clicked , setSearchPhrase]= useState('')
// const[searchPhrase , setClicked]= useState('')
    return (
        <View style={styles.container}>
            <View
                style={
                    
                         styles.searchBar__unclicked
                }
            >
                {/* search Icon */}
                <MaterialIcons
                    name='search'
                    size={20} color='#666'
                    style={{ marginRight: 5  , }}
                     />


                {/* Input field */}


                <TextInput
                    style={styles.input}
                    placeholder="Search"
                    value={search}
                    onChangeText={text => setSearch(text)}
                    // onFocus={() => {
                    //     setClicked(true);
                    // }}
                />
                {/* cross Icon, depending on whether the search bar is clicked or not
                {clicked && (
                    {/* <Entypo name="cross" size={20} color="black" style={{ padding: 1 }} onPress={() => {
                        setSearchPhrase("")
                    }} /> */}
                {/* )} 
                */} 
            </View>
            {/* cancel button, depending on whether the search bar is clicked or not */}
            {/* { (
                <View>
                    <Button
                      style={{backgroundColor:'#666' , marginRight:30 , borderRadius:50}}
                        title="x"
                        onPress={() => {
                            Keyboard.dismiss();
                            setClicked(false);
                        }}
                    ></Button>
                </View>
            )} */}
        </View>
    );
};


// styles
const styles = StyleSheet.create({
    container: {
        margin: 15,
        justifyContent: "flex-start",
        alignItems: "center",
        flexDirection: "row",
        width: "90%",

    },
    searchBar__unclicked: {
        padding: 10,
        flexDirection: "row",
        width: "95%",
        backgroundColor: "#d9dbda",
        borderRadius: 15,
        alignItems: "center",
    },
    searchBar__clicked: {
        padding: 10,
        flexDirection: "row",
        width: "80%",
        backgroundColor: "#d9dbda",
        borderRadius: 15,
        alignItems: "center",
        justifyContent: "space-evenly",
    },
    input: {
        fontSize: 20,
        marginLeft: 10,
        width: "90%",
       
    },
});

export default SearchBar;

import { View, Text , TouchableOpacity, Keyboard , TextInput } from 'react-native'
import React from 'react'

const InputField = ({label , icon , userValue ,  inputType, keyboardType , fieldButtonLabel , fieldButtonFunction , value , onChangeText}) => {
  return (
    

    <View style={{
        flexDirection: 'row',

        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        paddingBottom: 8,
        marginBottom: 25,
        alignItems: 'center',
      }}>



        {icon}
        {inputType == "password" ? (
            <TextInput
          placeholder={label}
          keyboardType={keyboardType}
          style={{ flex: 1, paddingVertical: 0 }}
          secureTextEntry={true}
          value = {value}
          onChangeText = {onChangeText}
          />
        ):(   <TextInput
          placeholder={label}
          keyboardType={keyboardType}
          value = {value}
          onChangeText = {onChangeText}
         
          style={{ flex: 1, paddingVertical: 0 }}

         />
         )}
   
        <TouchableOpacity onPress={fieldButtonFunction}>
          <Text style={{ color: '#AD40AF', fontWeight: '700' }}>{fieldButtonLabel}</Text>
        </TouchableOpacity>

      </View>
  )
}

export default InputField
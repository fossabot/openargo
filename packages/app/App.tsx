import React from 'react';
import {View, StyleSheet, KeyboardAvoidingView} from 'react-native';
import {TextInput, Button, DefaultTheme, Provider} from 'react-native-paper';

export const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#600EE6',
    secondary: '#414757',
    error: '#f13a59',
  },
};

const App = () => {
  return (
    <Provider theme={theme}>
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <TextInput mode="outlined" label="Codice Scuola" returnKeyType="next" />
        <TextInput mode="outlined" label="Utente" returnKeyType="next" />
        <TextInput
          mode="outlined"
          label="Password"
          returnKeyType="done"
          secureTextEntry
        />
        <Button mode="contained" onPress={() => console.log('Pressed')}>
          Login
        </Button>
      </KeyboardAvoidingView>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    width: '100%',
    maxWidth: 340,
    alignSelf: 'center',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});

export default App;

import React from 'react';
import { View, Button } from 'react-native';

function CustomDrawerContentJogos(props) {
  return (
    <View>
      <Button title="Voltar para Home" onPress={() => props.navigation.navigate('Home')} />
      <Button title="Adicionar Jogo" onPress={() => props.navigation.navigate('AdicionarItem', { categoria: 'jogos' })} />
    </View>
  );
}

export default CustomDrawerContentJogos;

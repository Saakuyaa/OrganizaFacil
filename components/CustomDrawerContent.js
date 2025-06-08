import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';

function CustomDrawerContent({ navigation, category }) {
  
  const safeCategory = category || 'default';

  const menus = [
    { label: 'Completados', route: `${safeCategory}Completados` },
    { 
      label: safeCategory === 'Jogos' ? 'Jogando' : 'Assistindo', 
      route: `${safeCategory}Assistindo` 
    },
    { 
      label: safeCategory === 'Jogos' ? 'Planejo Jogar' : 'Planejo Assistir', 
      route: `${safeCategory}PlanejoAssistir` 
    },
  ];

  // 
  console.log('menus:', menus);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Menu {safeCategory.charAt(0).toUpperCase() + safeCategory.slice(1)}
      </Text>

      <TouchableOpacity
        style={styles.homeButton}
        onPress={() => navigation.navigate('HomeScreen')}
      >
        <Text style={styles.homeButtonText}>Voltar para Home</Text>
      </TouchableOpacity>

      <FlatList
        data={menus}
        // Garantindo key única combinando route + index
        keyExtractor={(item, index) => `${item.route}-${index}`}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => navigation.navigate(item.route)}
            activeOpacity={0.7}
          >
            <Text style={styles.menuText}>{item.label}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212', 
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#E0E0E0',
    marginBottom: 30,
    textAlign: 'center',
    letterSpacing: 1,
  },
  homeButton: {
    backgroundColor: '#BB86FC', 
    paddingVertical: 15,
    borderRadius: 12,
    marginBottom: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  homeButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F1F1F', 
    textAlign: 'center',
  },
  menuItem: {
    paddingVertical: 18,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#333', 
  },
  menuText: {
    fontSize: 20,
    color: '#CCCCCC',
  },
});

export default CustomDrawerContent;

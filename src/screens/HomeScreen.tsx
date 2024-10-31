import { View, Text, ScrollView, Image, Touchable, TouchableOpacity, StyleSheet, FlatList, } from 'react-native'
import React, { useCallback, useRef, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '@react-navigation/native';
import Icons from "@expo/vector-icons/MaterialIcons";
import MasonryList from 'reanimated-masonry-list';
import { BlurView } from 'expo-blur';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import CustomBackdrop from '../components/CustomBackdrop';


const CATEGORIAS = [
  "Roupas",
  "Sapatos",
  "Acessórios",
  "Acessórios1",
  "Acessórios2",
  "Acessórios3",
  "Acessórios3",
]

const AVATAR_URL = 
'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1528&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';

const HomeScreen = () => {
    const {colors} = useTheme()
    const [categoriaIndex, setCategoriaIndex] = useState(0)
    const bottomSheetModalRef = useRef<BottomSheetModal>(null); 

    const openFilterModal = useCallback (() => {
      bottomSheetModalRef.current?.present();
    }, []);
    

  return (
    <ScrollView>
      <SafeAreaView style={{ paddingVertical: 24, gap: 24 }}>
        {/* Sessão do Cabeçalho*/}
        <View 
        style={{
            paddingHorizontal: 24,
            flexDirection: "row", 
            alignItems:"center", 
            gap: 8}}
            >
            <Image 
            source={{
                uri: AVATAR_URL
            }} 
            style={{width: 52, aspectRatio: 1, borderRadius: 52, }}
            resizeMode="cover"
            />
            <View style={{flex: 1}}>
                <Text style={{fontSize:18, fontWeight:"600", marginBottom: 8, color: colors.text}} 
                numberOfLines={1}
                >
                    Olá, Jenny 👋
                </Text>
                <Text style={{color: colors.text, opacity: 0.65}} 
                numberOfLines={1}
                >
                    Descubra a moda que faz o seu estilo
                </Text>
            </View>
            <TouchableOpacity 
            style={{
              width: 52, 
              aspectRatio: 1, 
              alignItems: "center", 
              justifyContent: "center", 
              borderRadius: 52, 
              borderWidth: 1, 
              borderColor: colors.border,
            }}
            >
            <Icons name="notifications" size={24} color={colors.text} /> 
          </TouchableOpacity>
        </View>

        {/*Barra de Sessão de Pesquisa*/}
        <View style={{flexDirection: 'row', paddingHorizontal: 24, gap: 12}}>
            <TouchableOpacity 
            style={{
                flex: 1, 
                height: 52, 
                borderRadius: 52, 
                borderWidth: 1, 
                borderColor: colors.border,
                alignItems: "center",
                paddingHorizontal: 24,
                flexDirection: "row",
                gap: 12,
                }}
            >
                <Icons 
                name="search" 
                size={24} 
                color={colors.text}
                style={{ opacity: 0.5}}
              />
              <Text 
              style={{ 
                flex: 1, 
                fontSize: 16, 
                color:colors.text, 
                opacity:0.5
               }}
              >
              
              Pesquisar
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
            onPress={openFilterModal}
            style={{
              width: 52, 
              aspectRatio: 1, 
              alignItems: "center", 
              justifyContent: "center", 
              borderRadius: 52, 
              backgroundColor: colors.text,

            }}
            >
            <Icons name="tune" size={24} color={colors.background} /> 
          </TouchableOpacity>
        </View>

        {/* Grade de coleção nova */}
        <View style={{paddingHorizontal: 24}}>
          {/* Barra de titulo */}
          <View 
          style={{
            flexDirection: "row", 
            alignItems:"center", 
            justifyContent:"space-between",
            marginBottom: 12
            }}
        >
          <Text style={{fontSize: 20, fontWeight: "700"}}>Novas Coleções</Text>
          <TouchableOpacity>
            <Text>Veja Tudo</Text>
          </TouchableOpacity>
          </View>
          <View style={{flexDirection: "row", height: 200, gap: 12 }}>
            <Cartão  />
            <View style={{ flex: 1, gap: 12 }}>
              <Cartão />
              <Cartão />
            </View>
          </View>
        </View>

        {/* Seção de Categorias */}
        <FlatList 
        data={CATEGORIAS} 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 16,
          gap: 12,
        }}
        renderItem={({ item, index }) => {
          const estaSelecionada = categoriaIndex === index;
          return(
          <TouchableOpacity onPress={() => setCategoriaIndex(index)}
          style={{
            backgroundColor: estaSelecionada ? colors.text : colors.card,
            paddingHorizontal: 24,
            paddingVertical: 16,
            borderRadius: 100,
            borderWidth: estaSelecionada ? 0 : 1,
            borderColor: colors.border,
          }}
          >
            <Text 
            style={{
              color: estaSelecionada ? colors.background : colors.text,
              fontWeight: "600",
              fontSize: 16,
              opacity: estaSelecionada ? 1 : 0.5,
            }}
            >
              {item}
            </Text>
          </TouchableOpacity>
        );
        }} 
        />

        {/* Lista de Rolagem(MasonryList)  */}
        <MasonryList
        data={[1, 2, 3, 454, 4, 56, 44]}
        keyExtractor={(item): string => item}
        numColumns={2}
        contentContainerStyle={{paddingHorizontal: 12}}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, i }) => (
          <View style={{ padding: 6 }}>
            <View 
          style={{
            aspectRatio: i ===0 ? 1 : 2/3, 
            position: "relative", 
            overflow: "hidden",
            backgroundColor: "red",
            
            borderRadius: 24
          }}
          >
            {/* Grades das imagens de baixo */}
            <Image source={{
              uri: "https://i.snapcdn.app/photo?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJodHRwczovL3Njb250ZW50LmNkbmluc3RhZ3JhbS5jb20vdi90MzkuMzA4MDgtNi80MzA4MTYzODJfMTgzOTgyNDU5OTMwNjk4NDhfNzMxODc3NTIyMzU4MTQ0MjEyOF9uLmpwZz9zdHA9ZHN0LWpwZ19lMzVfcDQ4MHg0ODAmZWZnPWV5SjJaVzVqYjJSbFgzUmhaeUk2SW1sdFlXZGxYM1Z5YkdkbGJpNHhORFF3ZURFMk1qUXVjMlJ5TG1Zek1EZ3dPQzVrWldaaGRXeDBYMmx0WVdkbEluMCZfbmNfaHQ9c2NvbnRlbnQtaGVsMy0xLmNkbmluc3RhZ3JhbS5jb20mX25jX2NhdD0xMDAmX25jX29oYz1pZThuMXQyNzJzb1E3a052Z0hzYUt2MSZfbmNfZ2lkPTZlZjA3YTViODUxYjQ2YjRiOGM0MTg4YzU3Nzk5N2YxJmVkbT1BTFFST0ZrQUFBQUEmY2NiPTctNSZpZ19jYWNoZV9rZXk9TXpNeU1qZ3lNemszTWpBMU9EazBNems1TlElM0QlM0QuMy1jY2I3LTUmb2g9MDBfQVlBeDFOdlczb1dDNV85UHRmcFFDUVBpaTlwZWR6QXhhZlBfeHV5WDdGaTB3dyZvZT02NzI3NTk1NyZfbmNfc2lkPWZjOGRmYiIsImZpbGVuYW1lIjoiU25hcENsaXAuQXBwXzQzMDgxNjM4Ml8xODM5ODI0NTk5MzA2OTg0OF83MzE4Nzc1MjIzNTgxNDQyMTI4X24uanBnIiwibmJmIjoxNzMwMjUxNzY1LCJleHAiOjE3MzAyNTUzNjUsImlhdCI6MTczMDI1MTc2NX0.D_gOfBCdktbFRXa5pxVrOvLlOUJNRZhcWPXXd9Wf1e4",
            }} 
            resizeMode="cover" 
            style={StyleSheet.absoluteFill} 
          />
          {/* Formatação das tabelas de roupa de baixo */}
          <View 
          style={[
            StyleSheet.absoluteFill, 
            {
            padding: 12,
            },
          ]}>
            {/* Titulo da Tabela de Roupa */}
            <View style={{flexDirection: "row",  gap: 8, padding: 4}}>
              <Text 
              style={{
                flex: 1, 
                fontSize: 14, 
                fontWeight: "600", 
                color: colors.text
                }}
              >
               
                {'VESTIDO Longo Azul' }

              </Text>
              {/* Botão de Favoritar */}
              <View 
              style={{
                backgroundColor: colors.background, 
                borderRadius: 100, 
                height: 35, 
                aspectRatio: 1, 
                alignItems: "center",
                justifyContent: "center",
                }}
                >
                <Icons name="favorite-border" size={20} color={colors.text} />
              </View>
            </View>
            {/* View da tabela de preço e adição de carrinho */}
              <View style={{flex: 1}} />
            <BlurView 
            style={{
              flexDirection: 'row', 
              backgroundColor: "rgba(0,0,0,0.35)",
              alignItems: 'center',
              padding: 8,
              borderRadius: 100,
              overflow: "hidden"
              }} 
              intensity={20} 
              >
                <Text 
                style={{
                  flex: 1, 
                  fontSize: 16, 
                  fontWeight: '600',
                  color: "#fff",
                  marginLeft: 4,
                }}
                  numberOfLines={1}
                >
                  R$170
                </Text> 
                <TouchableOpacity
                  style={{
                    paddingHorizontal: 16,
                    paddingVertical: 8,
                    borderRadius: 100,
                    backgroundColor: "#fff"
                }}
                >
                  <Icons name="add-shopping-cart" size={20} color="#000" />
                </TouchableOpacity>
            </BlurView>
          </View>
          </View>
          </View>
          )}
        onEndReachedThreshold={0.1}
        />
      </SafeAreaView>


      {/* Funções do botão de filtrar */}
      <BottomSheetModal 
      snapPoints={['75%']} 
      index={0} 
      ref={bottomSheetModalRef}
      backdropComponent={(props) => <CustomBackdrop {...props} />}
     >
      <Text>Modal</Text>
      </BottomSheetModal>
    </ScrollView>
  );
};

export default HomeScreen;


const Cartão = () => {
  return(
  
  <View 
    style={{
      flex: 1, 
      position: 'relative', 
      overflow: "hidden",
      borderRadius: 24,
      }}
    >
    <Image 
    source={{
      uri: "https://i.snapcdn.app/photo?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJodHRwczovL3Njb250ZW50LmNkbmluc3RhZ3JhbS5jb20vdi90MzkuMzA4MDgtNi80NjI3MDYwNDdfMTg0MzQ1NTY2MjUwNjk4NDhfNDEzNTc3NjE2MTM2MDAxNDM4Nl9uLmpwZz9zdHA9ZHN0LWpwZ19lMzVfcDQ4MHg0ODAmZWZnPWV5SjJaVzVqYjJSbFgzUmhaeUk2SW1sdFlXZGxYM1Z5YkdkbGJpNHhORFF3ZURFM016Z3VjMlJ5TG1Zek1EZ3dPQzVrWldaaGRXeDBYMmx0WVdkbEluMCZfbmNfaHQ9c2NvbnRlbnQtaGVsMy0xLmNkbmluc3RhZ3JhbS5jb20mX25jX2NhdD0xMDAmX25jX29oYz13TzJLTGNEY0dHTVE3a052Z0dZQmZ2VSZfbmNfZ2lkPWIzOThiOWJlMTE0NzRlOWRhNDY0NjEwMjdiZmU2Yzc4JmVkbT1BTFFST0ZrQUFBQUEmY2NiPTctNSZpZ19jYWNoZV9rZXk9TXpRM05UZ3pNREkyTnpZNU9EUTJPVGt3TkElM0QlM0QuMy1jY2I3LTUmb2g9MDBfQVlCMHZzNWRGMXEyZkUydmVidUhWZjI3SG5fVnF3WDRRaXlmSDk0T3RldkIwQSZvZT02NzIwOUEwMyZfbmNfc2lkPWZjOGRmYiIsImZpbGVuYW1lIjoiU25hcENsaXAuQXBwXzQ2MjcwNjA0N18xODQzNDU1NjYyNTA2OTg0OF80MTM1Nzc2MTYxMzYwMDE0Mzg2X24uanBnIiwibmJmIjoxNzI5ODA1NjQ1LCJleHAiOjE3Mjk4MDkyNDUsImlhdCI6MTcyOTgwNTY0NX0.xhh2ds_MV9m-ZInGVQ-P72ZgdLQC1VqmoZ_edLvF2_Q",
    }} 
    resizeMode="cover"
    style={{
      position: "absolute",
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
    }}
    />
    <View 
    style={{ 
      position: "absolute", 
      left: 16, 
      top: 16, 
      paddingHorizontal: 16, 
      paddingVertical: 10,
      backgroundColor: "rgba(0,0,0,0.25)",
      borderRadius: 100,
      }}
      >
      <Text style={{ fontSize: 14, fontWeight: '600', color: "#fff",  }}>R$140</Text>
    </View>
    </View>
  );
};
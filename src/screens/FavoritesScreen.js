// src/screens/FavoritesScreen.js
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Pressable,
  Image,
  FlatList,
  Modal,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";

import { assets } from "../data/assets";
import { products } from "../data/products";
import { styles, modalStyles } from "../styles/styles";
import ProductCard from "../components/ProductCard";

const FAVORITES_KEY = "favorites";

export default function FavoritesScreen({ navigation }) {
  const insets = useSafeAreaInsets();

  const [favorites, setFavorites] = useState([]);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  const getAsset = (key) => {
    for (let i = 0; i < assets.length; i++) if (assets[i][0] === key) return assets[i][1];
    return null;
  };

  const loadFavorites = async () => {
    const raw = await AsyncStorage.getItem(FAVORITES_KEY);
    setFavorites(raw ? JSON.parse(raw) : []);
  };

  const saveFavorites = async (list) => {
    setFavorites(list);
    await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(list));
  };

  useEffect(() => {
    // reload every time screen opens
    const unsub = navigation.addListener("focus", loadFavorites);
    return unsub;
  }, [navigation]);

  const favProducts = products.filter((p) => favorites.includes(p[0]));

  const openDetails = (item) => {
    setSelected(item);
    setDetailsOpen(true);
  };

  const closeDetails = () => {
    setDetailsOpen(false);
    setSelected(null);
  };

  const toggleFavorite = async (productId) => {
    const isFav = favorites.includes(productId);
    const next = isFav ? favorites.filter((x) => x !== productId) : [...favorites, productId];
    await saveFavorites(next);

    // if removed while viewing details, close modal
    if (isFav && selected && selected[0] === productId) closeDetails();
  };

  const formatPrice = (n) => {
    const s = String(Math.round(n));
    let out = "";
    for (let i = 0; i < s.length; i++) {
      const idxFromEnd = s.length - i;
      out += s[i];
      if (idxFromEnd > 1 && idxFromEnd % 3 === 1) out += ",";
    }
    return out;
  };

  return (
    <LinearGradient colors={["#10192C", "#0B1324"]} style={{ flex: 1 }}>
      <StatusBar style="light" />

      <SafeAreaView style={{ flex: 1, paddingTop: insets.top, paddingBottom: insets.bottom }}>
        {/* Top Bar */}
        <View style={[styles.topBar, { paddingTop: 0 }]}>
          <Pressable style={styles.iconBtn} onPress={() => navigation.goBack()}>
            <Feather name="arrow-left" size={22} color="#EAF0FF" />
          </Pressable>

          <View>
            <Text style={styles.brandTitle}>Favorites</Text>
            <Text style={styles.brandSub}>{favorites.length} saved item(s)</Text>
          </View>
        </View>

        {/* List */}
        <FlatList
          data={favProducts}
          keyExtractor={(item) => item[0]}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listPad}
          ListEmptyComponent={() => (
            <View style={{ alignItems: "center", marginTop: 60, paddingHorizontal: 16 }}>
              <MaterialCommunityIcons name="heart-off" size={52} color="rgba(234,240,255,0.65)" />
              <Text style={{ marginTop: 12, color: "rgba(234,240,255,0.75)", fontWeight: "700" }}>
                No favorites yet
              </Text>
            </View>
          )}
          renderItem={({ item }) => (
            <ProductCard
              id={item[0]}
              price={item[2]}
              name={item[3]}
              image={getAsset(item[4])}
              bullets={item[5]}
              onDetails={() => openDetails(item)} // ✅ WORKS NOW
            />
          )}
        />

        {/* Details Modal */}
        <Modal visible={detailsOpen} transparent animationType="fade" onRequestClose={closeDetails}>
          <View style={modalStyles.backdrop}>
            <View style={modalStyles.card}>
              <Pressable style={modalStyles.closeBtn} onPress={closeDetails}>
                <Text style={modalStyles.closeTxt}>✕</Text>
              </Pressable>

              {selected && (
                <>
                  <Image source={getAsset(selected[4])} style={modalStyles.img} resizeMode="contain" />

                  <View style={modalStyles.headerRow}>
                    <View style={modalStyles.pricePill}>
                      <Text style={modalStyles.priceText}>₱ {formatPrice(selected[2])}</Text>
                    </View>
                    <Text style={modalStyles.name}>{selected[3]}</Text>
                  </View>

                  <Text style={modalStyles.sectionTitle}>Key Features</Text>
                  {(selected[5] || []).map((f, idx) => (
                    <Text key={idx} style={modalStyles.feature}>
                      • {f}
                    </Text>
                  ))}

                  {/* Add/Remove Favorites */}
                  <Pressable
                    style={modalStyles.favBtn}
                    onPress={() => toggleFavorite(selected[0])}
                  >
                    <Text style={modalStyles.favBtnText}>
                      {favorites.includes(selected[0]) ? "Remove from Favorites" : "Add to Favorites"}
                    </Text>
                  </Pressable>
                </>
              )}
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    </LinearGradient>
  );
}

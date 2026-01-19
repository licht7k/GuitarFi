// HomeScreen.js ✅ WORKING (stable spacing + no “pulled down” filters)
import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  Pressable,
  Image,
  FlatList,
  ScrollView,
  Modal,
  Dimensions,
  TouchableWithoutFeedback,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { MaterialCommunityIcons, Feather } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";

import { assets } from "../data/assets";
import { categories } from "../data/categories";
import { products } from "../data/products";
import { styles, modalStyles, drawerStyles, aboutStyles } from "../styles/styles";
import ProductCard from "../components/ProductCard";

/* ---------------- CONSTANTS ---------------- */
const SCREEN_WIDTH = Dimensions.get("window").width;
const DRAWER_WIDTH = Math.min(230, SCREEN_WIDTH * 0.78);

const FAVORITES_KEY = "favorites";

/* ✅ PRICE RANGES */
const priceRanges = [
  ["all", "All Prices"],
  ["0-3000", "₱0–3k"],
  ["3000-6000", "₱3k–6k"],
  ["6000-10000", "₱6k–10k"],
  ["10000+", "₱10k+"],
];

export default function HomeScreen({ navigation }) {
  const insets = useSafeAreaInsets();

  const [activeCat, setActiveCat] = useState("all");
  const [activePrice, setActivePrice] = useState("all");

  const [detailsOpen, setDetailsOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  const [favorites, setFavorites] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);

  /* ---------------- HELPERS ---------------- */
  const getAsset = (key) => {
    for (let i = 0; i < assets.length; i++) if (assets[i][0] === key) return assets[i][1];
    return null;
  };

  const loadFavorites = useCallback(async () => {
    const raw = await AsyncStorage.getItem(FAVORITES_KEY);
    setFavorites(raw ? JSON.parse(raw) : []);
  }, []);

  const saveFavorites = async (list) => {
    setFavorites(list);
    await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(list));
  };

  useFocusEffect(
    useCallback(() => {
      loadFavorites();
    }, [loadFavorites])
  );

  const toggleFavorite = async (productId) => {
    const isFav = favorites.includes(productId);
    const next = isFav ? favorites.filter((x) => x !== productId) : [...favorites, productId];
    await saveFavorites(next);
  };

  const openDetails = (item) => {
    setSelected(item);
    setDetailsOpen(true);
  };

  const closeDetails = () => {
    setDetailsOpen(false);
    setSelected(null);
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

  /* ---------------- FILTER LOGIC ---------------- */
  let filtered = activeCat === "all" ? products : products.filter((p) => p[1] === activeCat);

  if (activePrice !== "all") {
    filtered = filtered.filter((p) => {
      const price = p[2];
      if (activePrice === "0-3000") return price <= 3000;
      if (activePrice === "3000-6000") return price > 3000 && price <= 6000;
      if (activePrice === "6000-10000") return price > 6000 && price <= 10000;
      if (activePrice === "10000+") return price > 10000;
      return true;
    });
  }

  return (
    <LinearGradient colors={["#10192C", "#0B1324"]} style={styles.bg}>
      <StatusBar style="light" />

      {/* ✅ NO NEGATIVE SAFE AREA */}
      <SafeAreaView
        style={[
          styles.safe,
          { paddingTop: insets.top, paddingBottom: insets.bottom },
        ]}
      >
        {/* ✅ HEADER BLOCK (won’t stretch / won’t get “pulled down”) */}
        <View style={{ flexShrink: 0 }}>
          {/* ---------- TOP BAR ---------- */}
          <View style={styles.topBar}>
            <Pressable style={styles.iconBtn} onPress={() => setDrawerOpen(true)}>
              <Feather name="menu" size={22} color="#EAF0FF" />
            </Pressable>

            <View style={styles.brandWrap}>
              <View style={styles.logoWrap}>
                <Image source={getAsset("logo")} style={styles.logoImg} resizeMode="contain" />
              </View>

              <View>
                <Text style={styles.brandTitle}>GearMatch</Text>
                <Text style={styles.brandSub}>Find Your Perfect Sound</Text>
              </View>
            </View>
          </View>

          {/* ---------- CATEGORY FILTER ---------- */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.catRow}
          >
            {categories.map(([key, label, icon]) => {
              const active = key === activeCat;
              return (
                <Pressable
                  key={key}
                  onPress={() => {
                    setActiveCat(key);
                    setActivePrice("all");
                  }}
                  style={[styles.chip, active ? styles.chipActive : styles.chipInactive]}
                >
                  <MaterialCommunityIcons
                    name={icon}
                    size={16}
                    color={active ? "#FFFFFF" : "#D7DEEF"}
                  />
                  <Text
                    style={[
                      styles.chipText,
                      active ? styles.chipTextActive : styles.chipTextInactive,
                    ]}
                  >
                    {label}
                  </Text>
                </Pressable>
              );
            })}
          </ScrollView>

          {/* ---------- PRICE FILTER ---------- */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.priceRow}
          >
            {priceRanges.map(([key, label]) => {
              const active = key === activePrice;
              return (
                <Pressable
                  key={key}
                  onPress={() => setActivePrice(key)}
                  style={[
                    styles.priceChip,
                    active ? styles.priceChipActive : styles.priceChipInactive,
                  ]}
                >
                  <Text
                    style={[
                      styles.priceText,
                      active ? styles.priceTextActive : styles.priceTextInactive,
                    ]}
                  >
                    {label}
                  </Text>
                </Pressable>
              );
            })}
          </ScrollView>
        </View>

        {/* ✅ LIST takes remaining space, so header stays tight */}
        <FlatList
          style={{ flex: 1 }}
          data={filtered}
          keyExtractor={(item) => item[0]}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[styles.listPad, { paddingBottom: 24 }]}
          renderItem={({ item }) => (
            <ProductCard
              id={item[0]}
              price={item[2]}
              name={item[3]}
              image={getAsset(item[4])}
              bullets={item[5]}
              onDetails={() => openDetails(item)}
            />
          )}
          ListEmptyComponent={() => (
            <View style={{ alignItems: "center", marginTop: 24, padding: 16 }}>
              <Text style={{ color: "rgba(234,240,255,0.75)", fontWeight: "700" }}>
                No products in this price range
              </Text>
            </View>
          )}
        />

        {/* ---------- DETAILS MODAL ---------- */}
        <Modal
          visible={detailsOpen}
          transparent
          animationType="fade"
          onRequestClose={closeDetails}
        >
          <View style={modalStyles.backdrop}>
            <View style={modalStyles.card}>
              <Pressable style={modalStyles.closeBtn} onPress={closeDetails}>
                <Text style={modalStyles.closeTxt}>✕</Text>
              </Pressable>

              {selected && (
                <>
                  <Image
                    source={getAsset(selected[4])}
                    style={modalStyles.img}
                    resizeMode="contain"
                  />

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

                  <Pressable style={modalStyles.favBtn} onPress={() => toggleFavorite(selected[0])}>
                    <Text style={modalStyles.favBtnText}>
                      {favorites.includes(selected[0]) ? "Remove from Favorites" : "Add to Favorites"}
                    </Text>
                  </Pressable>
                </>
              )}
            </View>
          </View>
        </Modal>

        {/* ---------- SIDEBAR ---------- */}
        <Modal
          visible={drawerOpen}
          transparent
          animationType="fade"
          onRequestClose={() => setDrawerOpen(false)}
        >
          <TouchableWithoutFeedback onPress={() => setDrawerOpen(false)}>
            <View style={drawerStyles.backdrop} />
          </TouchableWithoutFeedback>

          <View style={[drawerStyles.panel, { width: DRAWER_WIDTH }]}>
            <Pressable style={drawerStyles.closeBtn} onPress={() => setDrawerOpen(false)}>
              <Text style={drawerStyles.closeTxt}>✕</Text>
            </Pressable>

            <Pressable
              style={drawerStyles.item}
              onPress={() => {
                setDrawerOpen(false);
                navigation.navigate("Favorites");
              }}
            >
              <MaterialCommunityIcons name="heart" size={18} color="#EAF0FF" />
              <Text style={drawerStyles.itemTxt}>Favorites</Text>
              <View style={drawerStyles.badge}>
                <Text style={drawerStyles.badgeTxt}>{favorites.length}</Text>
              </View>
            </Pressable>

            <Pressable
              style={drawerStyles.item}
              onPress={() => {
                setDrawerOpen(false);
                setAboutOpen(true);
              }}
            >
              <MaterialCommunityIcons name="information-outline" size={18} color="#EAF0FF" />
              <Text style={drawerStyles.itemTxt}>About</Text>
            </Pressable>
          </View>
        </Modal>

        {/* ---------- ABOUT ---------- */}
        <Modal
          visible={aboutOpen}
          transparent
          animationType="fade"
          onRequestClose={() => setAboutOpen(false)}
        >
          <View style={aboutStyles.backdrop}>
            <View style={aboutStyles.card}>
              <Pressable style={aboutStyles.closeBtn} onPress={() => setAboutOpen(false)}>
                <Text style={aboutStyles.closeTxt}>✕</Text>
              </Pressable>

              <Text style={aboutStyles.title}>What is GearMatch?</Text>
              <Text style={aboutStyles.body}>
                GearMatch is a guitar equipment recommendation app designed for Filipino musicians.
              </Text>

              <View style={aboutStyles.iconRow}>
                <MaterialCommunityIcons name="guitar-electric" size={90} color="#FFFFFF" />
                <MaterialCommunityIcons name="microphone-variant" size={90} color="#FFFFFF" />
              </View>

              <Text style={aboutStyles.footer}>
                THANKS FOR{"\n"}VISITING OUR{"\n"}APPS
              </Text>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    </LinearGradient>
  );
}

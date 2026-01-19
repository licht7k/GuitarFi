import React from "react";
import { View, Text, Image, Pressable } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { styles } from "../styles/homeStyles";

export default function ProductCard({ id, price, name, image, bullets, onDetails }) {
  const safeBullets = bullets || []; // ✅ prevents "map of undefined"

  return (
    <View style={styles.cardOuter}>
      <LinearGradient colors={["#0C1B36", "#071327"]} style={styles.card}>
        <Image source={image} style={styles.productImg} resizeMode="contain" />

        <View style={styles.pricePill}>
          <Text style={styles.priceText}>₱ {formatPrice(price)}</Text>
        </View>

        <Text style={styles.productName}>{name}</Text>

        <View style={styles.bullets}>
          {safeBullets.map((b, idx) => (
            <View key={`${id}-${idx}`} style={styles.bulletRow}>
              <MaterialCommunityIcons name="check-circle" size={16} color="#17D46B" />
              <Text style={styles.bulletText}>{b}</Text>
            </View>
          ))}
        </View>

        <Pressable style={styles.detailsBtn} onPress={onDetails}>
          <Text style={styles.detailsText}>View Details</Text>
        </Pressable>
      </LinearGradient>
    </View>
  );
}

function formatPrice(n) {
  const s = String(Math.round(n));
  let out = "";
  for (let i = 0; i < s.length; i++) {
    const idxFromEnd = s.length - i;
    out += s[i];
    if (idxFromEnd > 1 && idxFromEnd % 3 === 1) out += ",";
  }
  return out;
}

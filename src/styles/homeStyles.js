import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  bg: { flex: 1 },
  safe: { flex: 1 },

  topBar: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    gap: 12,
  },
  iconBtn: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  brandWrap: { flexDirection: "row", alignItems: "center", gap: 10 },
  logoWrap: {
    width: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: "rgba(255,106,0,0.08)",
    alignItems: "center",
    justifyContent: "center",
  },
  logoImg: { width: 18, height: 18 },

  brandTitle: { color: "#EAF0FF", fontWeight: "700", fontSize: 16 },
  brandSub: { color: "rgba(234,240,255,0.65)", marginTop: 1, fontSize: 12 },

  catRow: { paddingHorizontal: 16, paddingTop: 14, paddingBottom: 8, gap: 10 },
  chip: { flexDirection: "row", alignItems: "center", gap: 8, paddingHorizontal: 14, height: 38, borderRadius: 12 },
  chipActive: { backgroundColor: "#FF6A00" },
  chipInactive: { backgroundColor: "rgba(215,222,239,0.18)" },
  chipText: { fontSize: 12.5, fontWeight: "700" },
  chipTextActive: { color: "#FFFFFF" },
  chipTextInactive: { color: "#D7DEEF" },

  listPad: { paddingHorizontal: 16, paddingTop: 12, paddingBottom: 10 },

  cardOuter: { borderRadius: 22, overflow: "hidden", marginBottom: 14 },
  card: { borderRadius: 22, padding: 16, borderWidth: 1, borderColor: "rgba(255,255,255,0.08)" },
  productImg: { width: "100%", height: 130, marginTop: 6 },

  pricePill: { alignSelf: "flex-start", marginTop: 8, backgroundColor: "#FF6A00", paddingHorizontal: 10, paddingVertical: 6, borderRadius: 12 },
  priceText: { color: "#FFFFFF", fontWeight: "800", fontSize: 12 },

  productName: { marginTop: 10, color: "#EAF0FF", fontWeight: "800", fontSize: 16 },

  bullets: { marginTop: 10, gap: 8 },
  bulletRow: { flexDirection: "row", alignItems: "center", gap: 10 },
  bulletText: { color: "rgba(234,240,255,0.75)", fontSize: 12.5 },

  detailsBtn: { marginTop: 14, backgroundColor: "#FF6A00", height: 44, borderRadius: 14, alignItems: "center", justifyContent: "center" },
  detailsText: { color: "#FFFFFF", fontWeight: "800" },
});

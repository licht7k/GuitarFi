import { StyleSheet } from "react-native";



export const drawerStyles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(7, 12, 24, 0.95)",
  },
  panel: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    paddingTop: 56,
    paddingHorizontal: 16,
    backgroundColor: "#0C1B36",
    borderRightWidth: 1,
    borderRightColor: "rgba(255,255,255,0.08)",
  },
  closeBtn: {
    position: "absolute",
    right: 12,
    top: 12,
    width: 34,
    height: 34,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  closeTxt: { color: "#EAF0FF", fontSize: 18, fontWeight: "800" },

  item: {
    height: 46,
    borderRadius: 12,
    backgroundColor: "rgba(215,222,239,0.18)",
    paddingHorizontal: 14,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 12,
  },
  itemTxt: { color: "#EAF0FF", fontWeight: "700", flex: 1 },

  badge: {
    minWidth: 28,
    height: 24,
    borderRadius: 12,
    paddingHorizontal: 8,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FF6A00",
  },
  badgeTxt: { color: "#fff", fontWeight: "800", fontSize: 12 },
});


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

  catRow: { paddingHorizontal: 16, paddingTop: 15, paddingBottom: 20, gap: 10 },
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

  
    priceRow: {
    paddingHorizontal: 16,
    paddingTop: 6,
    paddingBottom: 8,
    gap: 8,
  },

  priceChip: {
    height: 34,
    paddingHorizontal: 14,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },

  priceChipActive: {
    backgroundColor: "#1E2A4A",
  },

  priceChipInactive: {
    backgroundColor: "rgba(215,222,239,0.15)",
  },

  priceText: {
    fontSize: 12,
    fontWeight: "700",
  },

  priceTextActive: {
    color: "#FFFFFF",
  },

  priceTextInactive: {
    color: "#D7DEEF",
  },


  
});


export const modalStyles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(7, 12, 24, 0.95)",
    alignItems: "center",
    justifyContent: "center",
    padding: 18,
  },
  card: {
    width: "100%",
    maxWidth: 360,
    borderRadius: 22,
    padding: 18,
    backgroundColor: "#0C1B36",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
  },
  closeBtn: {
    position: "absolute",
    right: 12,
    top: 10,
    width: 34,
    height: 34,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  closeTxt: { color: "#EAF0FF", fontSize: 18, fontWeight: "800" },

  img: { width: "100%", height: 130, marginTop: 8 },

  headerRow: { marginTop: 10, alignItems: "center", gap: 10 },
  pricePill: {
    backgroundColor: "#FF6A00",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
  },
  priceText: { color: "#fff", fontWeight: "800", fontSize: 12 },
  name: { color: "#EAF0FF", fontWeight: "800", fontSize: 16, marginTop: 8 },

  sectionTitle: { color: "#EAF0FF", fontWeight: "800", marginTop: 14, textAlign: "center" },
  desc: { color: "rgba(234,240,255,0.75)", marginTop: 6, textAlign: "center", fontSize: 12.5 },

  feature: { color: "rgba(234,240,255,0.75)", marginTop: 6, textAlign: "center", fontSize: 12.5 },

  favBtn: {
    marginTop: 16,
    backgroundColor: "#FF6A00",
    height: 44,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  favBtnText: { color: "#fff", fontWeight: "800" },
});


export const aboutStyles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(7, 12, 24, 0.95)",
    alignItems: "center",
    justifyContent: "center",
    padding: 18,
  },
  card: {
    width: "100%",
    maxWidth: 380,
    minHeight: 520,
    borderRadius: 22,
    padding: 18,
    backgroundColor: "#0C1B36",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
    justifyContent: "space-between",
  },
  closeBtn: {
    position: "absolute",
    right: 14,
    top: 12,
    width: 36,
    height: 36,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 2,
  },
  closeTxt: { color: "#EAF0FF", fontSize: 18, fontWeight: "800" },

  title: {
    marginTop: 55,
    color: "#EAF0FF",
    fontSize: 16,
    fontWeight: "800",
    textAlign: "center",
  },
  body: {
    marginTop: 14,
    color: "rgba(234,240,255,0.75)",
    fontSize: 13,
    lineHeight: 18,
    textAlign: "center",
  },

  iconRow: {
    marginTop: 18,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },

  footer: {
    marginTop: 12,
    color: "#EAF0FF",
    fontSize: 22,
    fontWeight: "900",
    textAlign: "center",
    letterSpacing: 1,
    paddingBottom: 10,
  },
});

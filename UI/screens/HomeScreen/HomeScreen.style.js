import { StyleSheet } from "react-native";

export const s = StyleSheet.create({
  container: {
    flex: 1,
  },
  logoView: {
    marginTop: 10,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 50,
  },
  btnView: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  txtView: {
    marginTop: 50,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "white",
    marginHorizontal: 50,
    borderRadius: 20,
  },
  txt: {
    color: "white",
    fontSize: 50,
  },
  btnContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  img_background: {
    flex: 1,
    width: "100%",
    height: "100%",
    opacity: 0.9,
  },
  homeLogo: {
    height: "100%",
    width: "100%",
    resizeMode: "cover",
    borderRadius: 90,
  },
  btn: {
    backgroundColor: "#8c60a1",
    paddingHorizontal: 15,
    width: "82%",
    height: "15%",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "white",
    marginBottom: 30,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,

    elevation: 24,
  },
  btnTxt: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    marginRight: 10,
  },
  footer: {
    alignItems: "flex-start",
  },
  fotterBtn: {
    left: 25,
    bottom: 10,
  },
});

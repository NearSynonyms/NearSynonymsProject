import ConfettiCannon from "react-native-confetti-cannon";
export function Fireworks() {
  return (
    <ConfettiCannon
      count={400}
      origin={{ x: -10, y: 0 }}
      fadeOut={true}
      colors={["#7262be", "#c24ba8", "#ef73b7"]}
      explosionSpeed={350}
      fallSpeed={5000}
      style={{
        position: "absolute",
        zIndex: 9999,
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      }}
    />
  );
}

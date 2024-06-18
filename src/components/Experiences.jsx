import { Environment, OrbitControls, Text } from "@react-three/drei";
import * as THREE from "three";
import { Camping } from "./Camping";
import { degToRad } from "three/src/math/MathUtils.js";

export const Experience = () => {
  return (
    <>
      <OrbitControls />
      <Text
        font="fonts/NotoSans_Condensed-ExtraBold.ttf"
        position-x={-1.3}
        position-y={-0.5}
        position-z={1}
        lineHeight={0.8}
        textAlign={"center"}
        rotation-y={degToRad(30)}
        anchorY={"bottom"}
      >
        My Little{"\n"} Camping
        <meshBasicMaterial color="white" />
      </Text>
      <group rotateY={degToRad(-25)} position-x={3}>
        <Camping scale={0.6} />
      </group>
      <Environment preset="sunset" />
    </>
  );
};

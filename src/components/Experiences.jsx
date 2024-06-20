import {
  CameraControls,
  Environment,
  MeshReflectorMaterial,
  OrbitControls,
  RenderTexture,
  Text,
} from "@react-three/drei";
import * as THREE from "three";
import { Camping } from "./Camping";
import { degToRad } from "three/src/math/MathUtils.js";
import { useEffect, useRef } from "react";

export const Experience = () => {
  const controls = useRef();

  const intro = async () => {
    controls.current.dolly(-22);
    controls.current.smoothTime = 1.6;
    controls.current.dolly(22, true);
  };

  useEffect(() => {
    intro();
  }, []);

  return (
    <>
      <CameraControls ref={controls} />
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
        <meshBasicMaterial color="white">
          <RenderTexture attach={"map"}>
            <color attach="background" args={["#FFF"]} />
            <Environment preset="sunset" />
            <Camping
              scale={1.6}
              rotation-y={-degToRad(25)}
              rotation-x={degToRad(40)}
              position-y={-0.5}
            />
          </RenderTexture>
        </meshBasicMaterial>
      </Text>
      <group rotateY={degToRad(-25)} position-x={3}>
        <Camping scale={0.6} />
      </group>
      <mesh position-y={-0.48} rotation-x={-Math.PI / 2}>
        <planeGeometry args={[100, 100]} />
        <MeshReflectorMaterial
          blur={[100, 100]}
          resolution={720}
          mixBlur={1}
          mixStrength={10}
          roughness={1}
          depthScale={1}
          opacity={0.5}
          transparent
          minDepthThreshold={0.4}
          maxDepthThreshold={1.4}
          color="#333"
          metalness={0.5}
        />
      </mesh>
      <Environment preset="sunset" />
    </>
  );
};

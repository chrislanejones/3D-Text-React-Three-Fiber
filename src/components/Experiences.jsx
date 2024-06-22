import {
  CameraControls,
  Environment,
  Float,
  MeshReflectorMaterial,
  OrbitControls,
  RenderTexture,
  Text,
} from "@react-three/drei";
import * as THREE from "three";
import { Camping } from "./Camping";
import { degToRad } from "three/src/math/MathUtils.js";
import { useEffect, useRef } from "react";
import { Color } from "three";

const bloomColor = new Color("#fff");
bloomColor.multiplyScalar(1.5);

export const Experience = () => {
  const controls = useRef();
  const meshFitCameraHome = useRef();

  const intro = async () => {
    controls.current.dolly(-22);
    controls.current.smoothTime = 1.6;
    fitCamera();
  };

  const fitCamera = async () => {
    controls.current.fitToBox(meshFitCameraHome.current, true);
  };

  useEffect(() => {
    intro();
  }, []);

  useEffect(() => {
    window.addEventListener("resize", fitCamera);
    return () => window.removeEventListener("resize, fitCamera");
  }, []);

  return (
    <>
      <CameraControls ref={controls} />
      <mesh ref={meshFitCameraHome} position-z={1.5} visible={false}>
        <boxGeometry args={[7.5, 2, 2]} />
        <meshBasicMaterial color="orange" transparent opacity={0.5} />
      </mesh>
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
        <meshBasicMaterial color={bloomColor} toneMapped={false}>
          <RenderTexture attach={"map"}>
            <color attach="background" args={["#FFF"]} />
            <Environment preset="sunset" />
            <Float floatIntensity={4} rotationIntensity={5}>
              <Camping
                scale={1.6}
                rotation-y={-degToRad(25)}
                rotation-x={degToRad(40)}
                position-y={-0.5}
              />
            </Float>
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

useFont.preload("fonts/NotoSans_Condensed-ExtraBold.ttf");

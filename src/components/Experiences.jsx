import {
  CameraControls,
  Cloud,
  Decal,
  Environment,
  Float,
  MeshReflectorMaterial,
  OrbitControls,
  RenderTexture,
  Sky,
  Text,
  useFont,
} from "@react-three/drei";
import { Camping } from "./Camping";
import { Tent } from "./Tent";
import { currentPageAtom } from "./UI";
import { degToRad, lerp } from "three/src/math/MathUtils";
import { useEffect, useRef } from "react";
import { Color } from "three";
import { useAtom } from "jotai";
import { useFrame } from "@react-three/fiber";

const bloomColor = new Color("#fff");
bloomColor.multiplyScalar(1.5);

export const Experience = () => {
  const controls = useRef();
  const meshFitCameraHome = useRef();
  const meshFitCameraCamp = useRef();
  const textMaterial = useRef();
  const [currentPage, setCurrentPage] = useAtom(currentPageAtom);

  useFrame((_, delta) => {
    textMaterial.current.opacity = lerp(
      textMaterial.current.opacity,
      currentPage === "home" || currentPage === "intro" ? 1 : 0,
      delta * 1.5
    );
  });

  const intro = async () => {
    controls.current.dolly(-22);
    controls.current.smoothTime = 1.6;
    setTimeout(() => {
      setCurrentPage("home");
    }, 1200);
    fitCamera();
  };

  const fitCamera = async () => {
    if (currentPage === "camp") {
      controls.current.fitToBox(meshFitCameraCamp.current, true);
      controls.current.smoothTime = 0.8;
    } else {
      controls.current.fitToBox(meshFitCameraHome.current, true);
      controls.current.smoothTime = 1.6;
    }
  };

  useEffect(() => {
    intro();
  }, []);

  useEffect(() => {
    fitCamera();
    window.addEventListener("resize", fitCamera);
    return () => window.removeEventListener("resize", fitCamera);
  }, [currentPage]);

  return (
    <>
      <CameraControls ref={controls} />
      <mesh ref={meshFitCameraHome} position-z={1.5} visible={false}>
        <boxGeometry args={[7.5, 2, 2]} />
        <meshBasicMaterial color="orange" transparent opacity={0.5} />
      </mesh>
      <Text
        font="fonts/NotoSans_Condensed-ExtraBold.ttf"
        position-x={-4.5}
        position-y={1.1}
        position-z={1.8}
        lineHeight={0.8}
        textAlign={"center"}
        rotation-y={degToRad(27)}
        rotation-x={degToRad(-30)}
        rotation-z={degToRad(15)}
        anchorX={"bottom"}
        anchorY={"center"}
      >
        LET'S GO{"\n"} CAMPING
        <meshBasicMaterial
          color={bloomColor}
          toneMapped={false}
          ref={textMaterial}
        >
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
        <Cloud
          color="#eed0d0"
          seed={2}
          position={[-0.6, 0.2, 0.6]}
          scale={0.1}
          rotation-z={degToRad(90)}
          growth={3}
          opacity={0.8}
          speed={1}
        />
        <Camping scale={0.6} position-y={-0.5} />
        <Tent position={[-7.3, 0, -1]} rotation-y={-degToRad(60)} scale={2.5} />
        <mesh ref={meshFitCameraCamp} visible={false}>
          <boxGeometry args={[2, 1, 2]} />
          <meshBasicMaterial
            color="red"
            transparent
            opacity={0.5}
          ></meshBasicMaterial>
        </mesh>
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

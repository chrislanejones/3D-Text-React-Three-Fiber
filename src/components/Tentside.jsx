/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.18 public/models/camping.glb -o src/components/Camping.jsx -k -K -r public 
*/

import { Decal, RenderTexture, Text, useGLTF } from "@react-three/drei";

export function Tentside(props) {
  const { nodes, materials } = useGLTF("/models/camping.glb");
  return (
    <group {...props} dispose={null}>
      <mesh
        name="group1997237509"
        geometry={nodes.group1997237509.geometry}
        material={materials.mat13}
        position-z={0.1}
      >
        <sphereGeometry />
        <meshBasicMaterial />
        <Decal debug position={[0, 0.9, 0.75]} scale={[1, 1, 1]}>
          <meshStandardMaterial
            roughness={1}
            transparent
            polygonOffset
            polygonOffsetFactor={-1}
          >
            <RenderTexture attach="map">
              <color attach="background" args={["#af2040"]} />
              <Text fontSize={9} color="black">
                hello from drei
              </Text>
            </RenderTexture>
          </meshStandardMaterial>
        </Decal>
      </mesh>
    </group>
  );
}

useGLTF.preload("/models/camping.glb");
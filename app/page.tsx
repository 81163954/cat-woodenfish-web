"use client";

import React, { useEffect, useRef, useState } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { AnimationMixer } from "three";
import * as THREE from "three";
import useStatus from "@/hook/useStatus";
import { Switch } from "@/components/ui/switch";
import SettingDrawer from "@/components/SettingDrawer";

function Heart(props: any) {
  const hit = useLoader(GLTFLoader, "/heart/heart.gltf"); // 加载 GLB 文件
  const mixer = useRef(new AnimationMixer(hit.scene)).current; // 创建 AnimationMixer
  const [action] = useState<any>(() => mixer.clipAction(hit.animations[0])); // 获取第一个动画

  const { isAnimating } = useStatus((state) => state);

  useEffect(() => {
    mixer.addEventListener("finished", () => {}); // properties of e: type, action and direction
  }, [mixer]);

  // 在每一帧中更新动画
  useFrame((state, delta) => {
    mixer.update(delta); // 更新动画混合器

    const currentTime = mixer.time;

    // console.log(action);
  });

  // 在加载完成后设置动画
  useEffect(() => {
    action.loop = THREE.LoopOnce; // 设置为只播放一次
    action.timeScale = 2; // 设置播放速度（1.0 为正常速度，1.5 为 1.5 倍速）

    // 监听动画完成事件
    action.clampWhenFinished = true; // 确保在完成时保持最后一帧
    action.onFinished = () => {
      mixer.time = action.getClip().duration; // 设置为最后一帧
      action.stop(); // 停止动画
    };

    return () => action.stop(); // 清理
  }, [action]);

  useEffect(() => {
    if (isAnimating) {
      action.reset(); // 重置动画
      action.play(); // 播放动画
    }
  }, [isAnimating]);

  return (
    <primitive
      visible={isAnimating} // 设置为不可见
      object={hit.scene}
      {...props}
      // onPointerDown={() => {
      //   action.reset(); // 重置动画
      //   action.play(); // 播放动画
      // }}
    />
  ); // 渲染模型
}

function Stick(props: any) {
  const hit = useLoader(GLTFLoader, "/stick1/stick.gltf"); // 加载 GLB 文件
  const mixer = useRef(new AnimationMixer(hit.scene)).current; // 创建 AnimationMixer
  const [action] = useState<any>(() => mixer.clipAction(hit.animations[0])); // 获取第一个动画

  const { isAnimating } = useStatus((state) => state);

  useEffect(() => {
    mixer.addEventListener("finished", () => {}); // properties of e: type, action and direction
  }, [mixer]);

  // 在每一帧中更新动画
  useFrame((state, delta) => {
    mixer.update(delta); // 更新动画混合器

    const currentTime = mixer.time;

    // console.log(action);
  });

  // 在加载完成后设置动画
  useEffect(() => {
    action.loop = THREE.LoopOnce; // 设置为只播放一次
    action.timeScale = 2; // 设置播放速度（1.0 为正常速度，1.5 为 1.5 倍速）

    return () => action.stop(); // 清理
  }, [action]);

  useEffect(() => {
    if (isAnimating) {
      action.reset(); // 重置动画
      action.play(); // 播放动画
    }
  }, [isAnimating]);

  return (
    <primitive
      object={hit.scene}
      {...props}
      // onPointerDown={() => {
      //   action.reset(); // 重置动画
      //   action.play(); // 播放动画
      // }}
    />
  ); // 渲染模型
}

function Cat(props: any) {
  const audio = new Audio("/sounds/hit.mp3"); // 创建音频对象
  audio.volume = 1; // 设置音量为最大（1.0）

  const { isAnimating, setIsAnimating, sound } = useStatus((state) => state);

  const audioLoader = new THREE.AudioLoader();
  audioLoader.load("sounds/hit.mp3", function (buffer) {
    sound.setBuffer(buffer);
    sound.setLoop(false);
    sound.setVolume(1);
    // sound.play();
  });

  const idle = useLoader(GLTFLoader, "/cat1/idle/cat.gltf"); // 加载 GLB 文件
  const hit = useLoader(GLTFLoader, "/cat1/hit/cat.gltf"); // 加载 GLB 文件
  const mixer = useRef(new AnimationMixer(hit.scene)).current; // 创建 AnimationMixer
  const [action] = useState<any>(() => mixer.clipAction(hit.animations[0])); // 获取第一个动画
  const increaseHitNumber = useStatus((state) => state.increaseHitNumber);

  useEffect(() => {
    mixer.addEventListener("finished", () => {
      setIsAnimating(false);
    }); // properties of e: type, action and direction
  }, [mixer]);

  // 在每一帧中更新动画
  useFrame((state, delta) => {
    mixer.update(delta); // 更新动画混合器

    const currentTime = mixer.time;

    // console.log(action);
  });

  // 在加载完成后设置动画
  useEffect(() => {
    // action.play(); // 播放动画
    console.log(action);

    action.loop = THREE.LoopOnce; // 设置为只播放一次
    action.timeScale = 2; // 设置播放速度（1.0 为正常速度，1.5 为 1.5 倍速）

    return () => action.stop(); // 清理
  }, [action]);

  //每秒钟调用一次hit
  useEffect(() => {
    const interval = setInterval(() => {}, 1000);

    return () => clearInterval(interval); // 清理计时器
  }, []);

  const autoHit = useStatus((state) => state.autoHit);
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null; // 定义计时器变量

    if (autoHit) {
      interval = setInterval(() => {
        onHit();
      }, 1000);
    }

    return () => {
      if (interval) {
        clearInterval(interval); // 清理计时器
      }
    };
  }, [autoHit]);

  const onHit = () => {
    if (!isAnimating) {
      console.log(audio.paused);

      if (!audio.paused) {
        audio.currentTime = 0;
        audio.play();
      } else {
        audio.play();
      }

      // if (sound.isPlaying) {
      //   sound.stop(); // 停止音频
      // }
      // sound.play();

      setIsAnimating(true);
      action.reset(); // 重置动画
      action.play(); // 播放动画

      increaseHitNumber();
    }
  };

  const ref = useRef(null);

  return (
    <primitive
      object={!isAnimating ? idle.scene : hit.scene}
      ref={ref}
      onPointerDown={() => {
        onHit();
      }}
    />
  ); // 渲染模型
}

export default function Home() {
  const hitNumber = useStatus((state) => state.hitNumber);

  const setSound = useStatus((state) => state.setSound);

  return (
    <div className="font-fusion h-screen w-full  bg-[#7aae96]">
      <div className="absolute p-4 left-1/2 text-3xl transform -translate-x-1/2 font-semibold text-white ">{`喵德：${hitNumber}`}</div>
      <SettingDrawer />
      <Canvas
        // linear={true}
        // onCreated={(state: any) => {
        //   // 设置 Gamma 校正
        //   state.gl.outputEncoding = THREE.sRGBEncoding; // 设置色彩空间
        //   state.gl.gammaFactor = 1; // 设置 gamma 校正因子
        //   state.gl.gammaOutput = true; // 开启 Gamma 校正
        // }}
        onCreated={({ gl, camera }) => {
          gl.toneMapping = THREE.NoToneMapping;

          const listener = new THREE.AudioListener(); // 创建 AudioListener
          camera.add(listener); // 将 AudioListener 添加到相机

          const sound = new THREE.Audio(listener);
          setSound(sound);
        }}
        camera={{ fov: 75, near: 0.1, far: 1000, position: [0, 0, 7] }}
      >
        <ambientLight intensity={Math.PI} />

        <Cat position={[0, 0, 0]} />
        <Stick position={[0, 0, -1]} />
        <Heart position={[0, 0, -2]} />
      </Canvas>
    </div>
  );
}

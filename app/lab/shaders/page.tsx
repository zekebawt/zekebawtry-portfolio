import { Metadata } from "next";
import { ShaderPlayground } from "./ShaderPlayground";

export const metadata: Metadata = {
  title: "Shader Playground | Zeke's Lab",
  description: "Interactive WebGL shader experiments. Real-time GLSL editing with live preview. Explore plasma, fractals, raymarching, and more.",
  openGraph: {
    title: "Shader Playground | Zeke's Lab",
    description: "Interactive WebGL shader experiments with live GLSL editing",
  },
};

export default function ShaderPage() {
  return <ShaderPlayground />;
}

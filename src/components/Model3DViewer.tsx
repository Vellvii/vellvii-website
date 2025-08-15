import { Suspense, useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment } from '@react-three/drei';
import { Group } from 'three';
import { cn } from '@/lib/utils';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface Model3DViewerProps {
  modelPath: string;
  className?: string;
}

function Model({ modelPath }: { modelPath: string }) {
  try {
    const { scene } = useGLTF(modelPath);
    const modelRef = useRef<Group>(null);

    useFrame(() => {
      if (modelRef.current) {
        modelRef.current.rotation.y += 0.005;
      }
    });

    return <primitive ref={modelRef} object={scene} scale={[1, 1, 1]} />;
  } catch (error) {
    console.error('Failed to load 3D model:', error);
    return null;
  }
}

function LoadingFallback() {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="animate-pulse text-muted-foreground">Loading 3D model...</div>
    </div>
  );
}

function ErrorFallback() {
  return (
    <div className="flex items-center justify-center h-full p-4">
      <Alert className="max-w-sm">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          3D model temporarily unavailable. Please try the image view instead.
        </AlertDescription>
      </Alert>
    </div>
  );
}

export const Model3DViewer = ({ modelPath, className }: Model3DViewerProps) => {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setHasError(false);
  }, [modelPath]);

  if (hasError) {
    return <ErrorFallback />;
  }

  return (
    <div className={cn("w-full h-full relative", className)}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        className="rounded-lg"
        gl={{ alpha: true, antialias: true }}
        onError={() => setHasError(true)}
      >
        <Suspense fallback={null}>
          <Environment preset="studio" />
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <Model modelPath={modelPath} />
          <OrbitControls
            enablePan={true}
            enableZoom={true}
            enableRotate={true}
            minDistance={2}
            maxDistance={10}
            autoRotate={false}
          />
        </Suspense>
      </Canvas>
      <Suspense fallback={<LoadingFallback />}>
        <div />
      </Suspense>
    </div>
  );
};
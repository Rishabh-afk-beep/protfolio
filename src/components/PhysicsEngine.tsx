import { useEffect, useState, useRef } from 'react';
import Matter from 'matter-js';
import { useSoundEffects } from '@/hooks/useSoundEffects';

export default function PhysicsEngine() {
  const [isActive, setIsActive] = useState(false);
  const engineRef = useRef<Matter.Engine | null>(null);
  const renderRef = useRef<Matter.Render | null>(null);
  const { playWhoosh, playLoadingBeep } = useSoundEffects();

  const domElementsRef = useRef<{ clone: HTMLElement, original: HTMLElement, originalStyle: string }[]>([]);

  useEffect(() => {
    const triggerPhysics = () => {
      setIsActive(true);
      playLoadingBeep();
      setTimeout(playWhoosh, 500);
    };

    const stopPhysics = () => {
      setIsActive(false);
    };

    window.addEventListener('trigger-physics', triggerPhysics);
    window.addEventListener('stop-physics', stopPhysics);
    return () => {
      window.removeEventListener('trigger-physics', triggerPhysics);
      window.removeEventListener('stop-physics', stopPhysics);
    };
  }, [playLoadingBeep, playWhoosh]);

  useEffect(() => {
    if (!isActive) {
      // Cleanup DOM if it was active
      if (domElementsRef.current.length > 0) {
        domElementsRef.current.forEach(({ clone, original, originalStyle }) => {
          clone.remove();
          original.setAttribute('style', originalStyle);
        });
        domElementsRef.current = [];
      }
      return;
    }

    // Wait a tick for UI to update before initializing
    const timeoutId = setTimeout(() => {
      initPhysics();
    }, 100);

    return () => {
      clearTimeout(timeoutId);
      if (engineRef.current) {
        Matter.Engine.clear(engineRef.current);
        if (renderRef.current) {
          Matter.Render.stop(renderRef.current);
          renderRef.current.canvas.remove();
        }
      }
    };
  }, [isActive]);

  const initPhysics = () => {
    const Engine = Matter.Engine,
          Render = Matter.Render,
          Runner = Matter.Runner,
          Bodies = Matter.Bodies,
          Composite = Matter.Composite,
          Mouse = Matter.Mouse,
          MouseConstraint = Matter.MouseConstraint;

    const engine = Engine.create();
    engineRef.current = engine;

    // Create a canvas for debug rendering if needed, but we'll make it invisible and just use the MouseConstraint
    const render = Render.create({
      element: document.body,
      engine: engine,
      options: {
        width: window.innerWidth,
        height: window.innerHeight,
        wireframes: false,
        background: 'transparent'
      }
    });
    
    // Hide the canvas, we just need it for Mouse constraints
    render.canvas.style.position = 'fixed';
    render.canvas.style.top = '0';
    render.canvas.style.left = '0';
    render.canvas.style.zIndex = '9999';
    render.canvas.style.pointerEvents = 'none'; // We'll handle pointer events differently or make the canvas overlay transparent
    
    // Actually, to let users drag elements, we need the canvas on top but completely transparent
    render.canvas.style.opacity = '0';
    render.canvas.style.pointerEvents = 'auto';

    renderRef.current = render;

    // Add boundaries
    const thickness = 60;
    const ground = Bodies.rectangle(window.innerWidth / 2, window.innerHeight + thickness / 2, window.innerWidth, thickness, { isStatic: true });
    const leftWall = Bodies.rectangle(0 - thickness / 2, window.innerHeight / 2, thickness, window.innerHeight, { isStatic: true });
    const rightWall = Bodies.rectangle(window.innerWidth + thickness / 2, window.innerHeight / 2, thickness, window.innerHeight, { isStatic: true });
    
    Composite.add(engine.world, [ground, leftWall, rightWall]);

    // Find all significant DOM elements to turn into physics bodies
    // We'll target headers, buttons, cards, etc.
    const elementsToConvert = Array.from(document.querySelectorAll('h1, h2, h3, p, button, a, .border-2, img')).filter(el => {
      const rect = el.getBoundingClientRect();
      // Only convert visible elements that are reasonably sized
      return rect.width > 20 && rect.height > 20 && rect.top > 0 && rect.bottom < window.innerHeight;
    }) as HTMLElement[];

    const domBodies: { body: Matter.Body, element: HTMLElement, originalStyle: string }[] = [];

    elementsToConvert.forEach((el) => {
      const rect = el.getBoundingClientRect();
      
      // Clone the element so we can manipulate it independently
      const clone = el.cloneNode(true) as HTMLElement;
      
      // Set absolute positioning matching the original element
      clone.style.position = 'fixed';
      clone.style.left = `${rect.left}px`;
      clone.style.top = `${rect.top}px`;
      clone.style.width = `${rect.width}px`;
      clone.style.height = `${rect.height}px`;
      clone.style.margin = '0';
      clone.style.zIndex = '9998';
      clone.style.pointerEvents = 'none'; // Prevent interaction with clone itself, use canvas for dragging
      
      document.body.appendChild(clone);
      
      // Hide original
      const originalStyle = el.getAttribute('style') || '';
      el.style.opacity = '0';

      // Create physics body
      const body = Bodies.rectangle(
        rect.left + rect.width / 2,
        rect.top + rect.height / 2,
        rect.width,
        rect.height,
        { 
          restitution: 0.6, // Bounciness
          friction: 0.1,
          density: 0.001
        }
      );

      Composite.add(engine.world, body);
      domBodies.push({ body, element: clone, originalStyle });
      domElementsRef.current.push({ clone, original: el, originalStyle });
    });

    // Add mouse control
    const mouse = Mouse.create(render.canvas);
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.2,
        render: {
          visible: false
        }
      }
    });

    Composite.add(engine.world, mouseConstraint);
    render.mouse = mouse;

    // Sync DOM elements with Physics Bodies
    Matter.Events.on(engine, 'afterUpdate', () => {
      domBodies.forEach(({ body, element }) => {
        // Apply position and rotation to the cloned DOM element
        element.style.transform = `translate(${body.position.x - body.bounds.max.x + body.bounds.min.x/2}px, ${body.position.y - body.bounds.max.y + body.bounds.min.y/2}px) rotate(${body.angle}rad)`;
        
        // Simpler transform application based on body center
        const width = element.offsetWidth;
        const height = element.offsetHeight;
        element.style.left = '0';
        element.style.top = '0';
        element.style.transform = `translate(${body.position.x - width/2}px, ${body.position.y - height/2}px) rotate(${body.angle}rad)`;
      });
    });

    // Run the engine
    Render.run(render);
    const runner = Runner.create();
    Runner.run(runner, engine);

    // Optional: Add a subtle flash effect when triggered
    const flash = document.createElement('div');
    flash.style.position = 'fixed';
    flash.style.inset = '0';
    flash.style.backgroundColor = 'hsl(var(--hot-red))';
    flash.style.zIndex = '10000';
    flash.style.pointerEvents = 'none';
    flash.style.transition = 'opacity 1s ease-out';
    document.body.appendChild(flash);
    
    // Force reflow
    void flash.offsetWidth;
    flash.style.opacity = '0';
    setTimeout(() => flash.remove(), 1000);
  };

  if (!isActive) return null;

  return (
    <div className="fixed inset-0 z-[9990] pointer-events-none flex flex-col items-center justify-center gap-8">
      <div className="text-hot-red text-6xl md:text-9xl font-display font-black tracking-tighter opacity-20 glitch pointer-events-none" data-text="SYSTEM FAILURE">
        SYSTEM FAILURE
      </div>
      <button 
        onClick={() => window.location.reload()}
        className="pointer-events-auto border-4 border-hot-red text-hot-red px-8 py-4 font-mono font-bold hover:bg-hot-red hover:text-background transition-colors z-[10000]"
      >
        REBOOT SYSTEM
      </button>
    </div>
  );
}

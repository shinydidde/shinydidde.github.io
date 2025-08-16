// components/DesktopBlackCat.tsx
"use client";

import { useEffect, useRef, useState, useCallback } from 'react';

export default function DesktopBlackCat() {
  const catRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [direction, setDirection] = useState<'right' | 'left'>('left');
  const [action, setAction] = useState<'idle' | 'walking' | 'sleeping' | 'playing' | 'sitting'>('sitting');
  const [frame, setFrame] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [eyeBlink, setEyeBlink] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const dragOffset = useRef({ x: 0, y: 0 });

  // Initialize position after mount
  useEffect(() => {
    setIsMounted(true);
    setPosition({
      x: window.innerWidth - 100,
      y: window.innerHeight - 100
    });
  }, []);

  // Animation frame counter
  useEffect(() => {
    if (!isMounted) return;

    const interval = setInterval(() => {
      setFrame(prev => (prev + 1) % 60);
    }, 100);
    return () => clearInterval(interval);
  }, [isMounted]);

  // Eye blinking effect
  useEffect(() => {
    if (!isMounted) return;

    const blinkInterval = setInterval(() => {
      setEyeBlink(true);
      setTimeout(() => setEyeBlink(false), 150);
    }, 3000 + Math.random() * 4000);
    return () => clearInterval(blinkInterval);
  }, [isMounted]);

  // Handle mouse move with useCallback
  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging) return;
    setPosition({
      x: e.clientX - dragOffset.current.x,
      y: e.clientY - dragOffset.current.y
    });
  }, [isDragging]);

  // Handle mouse up with useCallback
  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
    document.body.style.cursor = '';
    setTimeout(() => {
      setAction('sitting');
    }, 500);
  }, []);

  // Drag and drop effect
  useEffect(() => {
    if (!isMounted || !isDragging) return;

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isMounted, isDragging, handleMouseMove, handleMouseUp]);

  // Random movement behavior
  useEffect(() => {
    if (!isMounted || !catRef.current || isDragging) return;

    let moveInterval: NodeJS.Timeout;
    let behaviorInterval: NodeJS.Timeout;

    const changeBehavior = () => {
      const behaviors: typeof action[] = ['sitting', 'walking', 'sleeping', 'playing', 'idle'];
      const weights = [40, 20, 10, 15, 15];
      const totalWeight = weights.reduce((a, b) => a + b, 0);
      const random = Math.random() * totalWeight;

      let sum = 0;
      let nextBehavior = behaviors[0];

      for (let i = 0; i < behaviors.length; i++) {
        sum += weights[i];
        if (random <= sum) {
          nextBehavior = behaviors[i];
          break;
        }
      }

      setAction(nextBehavior);

      const duration = nextBehavior === 'sleeping'
        ? 8000 + Math.random() * 10000
        : nextBehavior === 'sitting'
        ? 5000 + Math.random() * 8000
        : 3000 + Math.random() * 5000;

      behaviorInterval = setTimeout(changeBehavior, duration);
    };

    const moveCat = () => {
      if (action === 'sleeping' || action === 'sitting') {
        setTimeout(moveCat, 100);
        return;
      }

      let velocityX = 0;
      let velocityY = 0;

      if (action === 'walking') {
        velocityX = direction === 'right' ? 1 + Math.random() * 0.5 : -1 - Math.random() * 0.5;
        velocityY = (Math.random() - 0.5) * 0.3;
      } else if (action === 'playing') {
        velocityX = (Math.random() - 0.5) * 3;
        velocityY = (Math.random() - 0.5) * 2;
      }

      setPosition(prev => {
        let newX = prev.x + velocityX;
        let newY = prev.y + velocityY;
        let newDirection = direction;

        const margin = 20;
        if (newX <= margin) {
          newX = margin;
          newDirection = 'right';
        } else if (newX >= window.innerWidth - 80) {
          newX = window.innerWidth - 80;
          newDirection = 'left';
        }

        if (newY <= margin) {
          newY = margin;
        } else if (newY >= window.innerHeight - 70) {
          newY = window.innerHeight - 70;
        }

        if (newDirection !== direction) {
          setDirection(newDirection);
        }

        return { x: newX, y: newY };
      });

      moveInterval = setTimeout(moveCat, 100);
    };

    changeBehavior();
    moveCat();

    return () => {
      clearTimeout(moveInterval);
      clearTimeout(behaviorInterval);
    };
  }, [isMounted, action, direction, isDragging]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!isMounted || e.button !== 0) return;
    setIsDragging(true);
    dragOffset.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y
    };
    setAction('idle');
    document.body.style.cursor = 'grabbing';
  };

  const renderCat = () => {
    if (!isMounted) return null;

    const transformStyle = {
      transform: `translate(${position.x}px, ${position.y}px) scaleX(${direction === 'right' ? 1 : -1})`,
      transition: isDragging ? 'none' : 'transform 0.3s ease-out'
    };

    // Simple animations
    const tailSway = Math.sin(frame * 0.1) * 10;
    const walkBounce = action === 'walking' ? Math.sin(frame * 0.5) * 2 : 0;

    return (
      <div
        ref={catRef}
        className="fixed z-[9999] cursor-grab select-none"
        style={{
          ...transformStyle,
          width: '80px',
          height: '70px',
        }}
        onMouseDown={handleMouseDown}
        title="🐱 Simple desktop cat"
      >
        <svg viewBox="0 0 80 70" width="80" height="70" style={{ overflow: 'visible' }}>
          {/* Drop shadow */}
          <ellipse cx="40" cy="68" rx="25" ry="3" fill="#000" opacity="0.2" />

          {action === 'sleeping' ? (
            // Sleeping - simple curled shape
            <>
              <ellipse cx="40" cy="45" rx="20" ry="12" fill="#2a2a2a" />
              <circle cx="45" cy="35" r="8" fill="#2a2a2a" />

              {/* Simple ears */}
              <path d="M40 30 L42 22 L45 32 Z" fill="#2a2a2a" />
              <path d="M49 30 L51 22 L54 32 Z" fill="#2a2a2a" />

              {/* Closed eyes - just lines */}
              <path d="M42 33 L45 33" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M47 33 L50 33" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" />

              {/* Curled tail */}
              <path d="M20 45 Q15 35 25 32 Q35 30 40 35" fill="none" stroke="#2a2a2a" strokeWidth="4" strokeLinecap="round" />

              {/* Z's for sleeping */}
              <text x="40" y="20" textAnchor="middle" fontSize="8" fill="#666">💤</text>
            </>
          ) : (
            // Normal sitting cat - simple and clean like the reference
            <>
              {/* Main body - simple oval */}
              <ellipse cx="40" cy={48 + walkBounce} rx="18" ry="20" fill="#2a2a2a" />

              {/* Head - simple circle */}
              <circle cx="40" cy={25 + walkBounce * 0.5} r="14" fill="#2a2a2a" />

              {/* Ears - simple triangles */}
              <path d="M30 18 L33 8 L36 22 Z" fill="#2a2a2a" />
              <path d="M44 18 L47 8 L50 22 Z" fill="#2a2a2a" />

              {/* Inner ears - pink triangles */}
              <path d="M31 17 L33 11 L35 19 Z" fill="#ff69b4" opacity="0.8" />
              <path d="M45 17 L47 11 L49 19 Z" fill="#ff69b4" opacity="0.8" />

              {/* Eyes - simple white circles */}
              {eyeBlink ? (
                <>
                  <path d="M34 22 L37 22" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
                  <path d="M43 22 L46 22" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
                </>
              ) : (
                <>
                  <circle cx="35" cy="22" r="3.5" fill="#fff" />
                  <circle cx="45" cy="22" r="3.5" fill="#fff" />

                  {/* Pupils */}
                  <circle cx="35" cy="23" r="2" fill="#000" />
                  <circle cx="45" cy="23" r="2" fill="#000" />

                  {/* Eye shine */}
                  <circle cx="34" cy="21.5" r="0.8" fill="#fff" />
                  <circle cx="44" cy="21.5" r="0.8" fill="#fff" />
                </>
              )}

              {/* Simple nose */}
              <path d="M39 28 L40 30 L41 28 Z" fill="#ff69b4" />

              {/* Whiskers */}
              <g stroke="#fff" strokeWidth="1" opacity="0.8">
                <path d="M25 26 L18 24" strokeLinecap="round" />
                <path d="M25 30 L18 30" strokeLinecap="round" />
                <path d="M55 26 L62 24" strokeLinecap="round" />
                <path d="M55 30 L62 30" strokeLinecap="round" />
              </g>

              {/* Simple curved tail */}
              <path
                d={`M58 ${50 + walkBounce} Q${68 + tailSway * 0.3} ${35 + tailSway} ${70 + tailSway * 0.5} ${20 + tailSway * 0.7}`}
                fill="none"
                stroke="#2a2a2a"
                strokeWidth="6"
                strokeLinecap="round"
              />

              {/* Tail tip */}
              <circle cx={70 + tailSway * 0.5} cy={20 + tailSway * 0.7} r="3" fill="#2a2a2a" />

              {/* Simple front paws when sitting */}
              {action === 'sitting' && (
                <>
                  <ellipse cx="35" cy="65" rx="3" ry="5" fill="#2a2a2a" />
                  <ellipse cx="45" cy="65" rx="3" ry="5" fill="#2a2a2a" />
                </>
              )}
            </>
          )}

          {/* Action indicators */}
          {action === 'playing' && (
            <text x="40" y="8" textAnchor="middle" fontSize="10">🎾</text>
          )}
        </svg>

        {/* Hover tooltip */}
        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-xs bg-black text-white px-2 py-1 rounded opacity-0 hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
          🐱 Desktop Cat - {action}
        </div>
      </div>
    );
  };

  return renderCat();
}

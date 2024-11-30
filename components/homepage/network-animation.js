"use client";

import { useEffect, useRef } from "react";

export function NetworkAnimation() {
  const canvasRef = useRef(null);
  const nodesRef = useRef([]);
  const requestIdRef = useRef();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Node class for managing individual points
    class Node {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.radius = 2;
      }

      update() {
        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;
        this.x += this.vx;
        this.y += this.vy;
      }
    }

    // Initialize nodes
    const initNodes = () => {
      nodesRef.current = [];
      const numberOfNodes = Math.floor((width * height) / 15000); // Responsive number of nodes
      for (let i = 0; i < numberOfNodes; i++) {
        nodesRef.current.push(new Node());
      }
    };

    // Draw connections between nodes
    const drawConnections = () => {
      ctx.strokeStyle = "rgba(147, 51, 234, 0.1)"; // Purple with low opacity
      for (let i = 0; i < nodesRef.current.length; i++) {
        for (let j = i + 1; j < nodesRef.current.length; j++) {
          const dx = nodesRef.current[i].x - nodesRef.current[j].x;
          const dy = nodesRef.current[i].y - nodesRef.current[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            ctx.beginPath();
            ctx.moveTo(nodesRef.current[i].x, nodesRef.current[i].y);
            ctx.lineTo(nodesRef.current[j].x, nodesRef.current[j].y);
            ctx.stroke();
          }
        }
      }
    };

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Update and draw nodes
      nodesRef.current.forEach((node) => {
        node.update();
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(147, 51, 234, 0.8)";
        ctx.fill();
      });

      drawConnections();
      requestIdRef.current = requestAnimationFrame(animate);
    };

    // Handle resize
    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initNodes();
    };

    window.addEventListener("resize", handleResize);
    initNodes();
    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(requestIdRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full opacity-50"
      style={{
        background:
          "linear-gradient(to right, rgba(147, 51, 234, 0.05), rgba(59, 130, 246, 0.05))",
      }}
    />
  );
}

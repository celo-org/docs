// src/components/ColoredText.tsx
import React from 'react'

// Create the component
// Create the ColoredText component
export default function ColoredText({ color = '#329F3B', children }: { color?: string; children: React.ReactNode }) {
    return (
      <span style={{ color, fontWeight: 'bold' }}>
        {children}
      </span>
    );
  }
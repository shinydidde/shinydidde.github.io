'use client';

import React, { useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import type { IconType } from 'react-icons';
import { FaTimes } from 'react-icons/fa';

type ModalSize = 'sm' | 'md' | 'lg';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  icon?: IconType;
  children: React.ReactNode;
  size?: ModalSize;
  closeOnBackdrop?: boolean;
  ariaLabelledById?: string; // optionally pass an external h2 id
}

const sizeClass: Record<ModalSize, string> = {
  sm: 'max-w-md',
  md: 'max-w-2xl',
  lg: 'max-w-4xl',
};

export default function Modal({
  isOpen,
  onClose,
  title,
  icon: Icon,
  children,
  size = 'md',
  closeOnBackdrop = true,
  ariaLabelledById,
}: ModalProps) {
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const titleId = ariaLabelledById ?? 'modal-title';

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    // rudimentary focus management
    const t = setTimeout(() => closeBtnRef.current?.focus(), 0);
    return () => {
      document.removeEventListener('keydown', onKey);
      clearTimeout(t);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[1000] flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          aria-modal="true"
          role="dialog"
          aria-labelledby={title ? titleId : undefined}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => closeOnBackdrop && onClose()}
          />
          {/* Panel */}
          <motion.div
            className={`relative mx-4 w-full ${sizeClass[size]} rounded-2xl border-4 border-black bg-white p-6 shadow-[12px_12px_0_0_rgba(0,0,0,1)]`}
            initial={{ scale: 0.95, y: 10 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: 10 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              ref={closeBtnRef}
              onClick={onClose}
              aria-label="Close modal"
              className="absolute right-3 top-3 rounded-full border-2 border-black p-2 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-black"
            >
              <FaTimes />
            </button>

            {(title || Icon) && (
              <div className="mb-4 flex items-center gap-3">
                {Icon && (
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border-2 border-black bg-yellow-200">
                    <Icon className="text-xl" />
                  </span>
                )}
                {title && (
                  <h2 id={titleId} className="text-2xl font-extrabold">
                    {title}
                  </h2>
                )}
              </div>
            )}

            <div className="text-gray-800">{children}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

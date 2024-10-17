import { motion } from 'framer-motion';
import { useCallback, useEffect } from 'react';
import { createPortal } from 'react-dom';

export const Modal = ({ title, children, path, setSelectedCategory }) => {
  const handleDetectEscapeKey = useCallback(
    (e) => {
      if (e.key === 'Escape') {
        setSelectedCategory(null);
      }
    },
    [setSelectedCategory]
  );

  useEffect(() => {
    const eventKeyDown = window.addEventListener(
      'keydown',
      handleDetectEscapeKey
    );
    return () => {
      window.removeEventListener('keydown', eventKeyDown);
    };
  }, [handleDetectEscapeKey]);

  return createPortal(
    <motion.div
      className="h-screen fixed inset-0 z-[60] backdrop-blur-lg flex items-center justify-center"
      animate={{
        opacity: [0, 1],
        scale: [0.7, 1],
      }}
    >
      <ModalContent
        title={title}
        children={children}
        path={path}
        setSelectedCategory={setSelectedCategory}
      />
    </motion.div>,
    document.body
  );
};

const ModalContent = ({ title, children, path, setSelectedCategory }) => {
  return (
    <motion.div
      animate={{
        opacity: [0, 1],
        scale: [0.7, 1],
      }}
      className="bg-white rounded-lg border-2 container p-8 space-y-8 relative border-purple-500"
    >
      <h2 className="text-xl text-center font-bold">{title}</h2>
      <div className="text-center">{children}</div>
      <a
        className="bg-purple-500 p-3 block w-fit rounded-lg text-white mx-auto"
        href={path}
      >
        Click to play
      </a>

      <button
        onClick={() => setSelectedCategory(null)}
        className="absolute top-0 right-4"
      >
        X
      </button>
    </motion.div>
  );
};

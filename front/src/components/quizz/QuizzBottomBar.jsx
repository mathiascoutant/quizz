import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useSessionStore } from '../../store/session.store';

export const QuizzBottomBar = () => {
  const session = useSessionStore((state) => state.session);
  const navigate = useNavigate();

  if (!session) {
    navigate('/');
    return;
  }

  return (
    <div className="absolute bottom-0 left-0 flex p-4 justify-between w-full">
      <div className="flex items-center gap-3">
        <div className="size-5 bg-purple-500"></div>
        <span>{session.user?.username ?? 'Anonymous'}</span>
      </div>

      <div className="flex flex-col gap-1">
        <span className="flex items-center">
          +1 <img src="/assets/icons/coin.png" alt="" className="size-6" /> par
          bonne réponse
        </span>

        <span className="flex items-center">
          -1 <img src="/assets/icons/coin.png" alt="" className="size-6" /> par
          mauvaise réponse
        </span>
      </div>

      <div className="flex flex-col items-center gap-2">
        <img src="/assets/icons/coin.png" alt="" className="size-12" />
        <motion.span
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0, 1, 1],
            transition: { duration: 0.3 },
          }}
        >
          {session.user?.coins ?? 0}
        </motion.span>
      </div>
    </div>
  );
};

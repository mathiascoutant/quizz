import {
  FaBook,
  FaBookOpen,
  FaCalendarDay,
  FaFilm,
  FaFlag,
  FaFlask,
  FaFutbol,
  FaGamepad,
  FaGlobe,
  FaGlobeAmericas,
  FaLandmark,
  FaLaptopCode,
  FaLeaf,
  FaMusic,
  FaPalette,
  FaPaw,
  FaPlane,
  FaQuestionCircle,
  FaSkull,
  FaStar,
  FaTheaterMasks,
  FaTv,
  FaUtensils,
} from 'react-icons/fa';

export const getCategoryIcon = (
  name: string
): {
  color: string;
  backgroundImage: string;
  icon: JSX.Element;
} => {
  switch (name.toLowerCase()) {
    case 'animaux':
      return {
        color: 'bg-amber-600/40',
        backgroundImage: '/assets/images/sport-bg.png',
        icon: <FaPaw size={30} className="text-amber-600" />,
      };
    case 'archéologie':
      return {
        color: 'bg-red-500/20',
        backgroundImage: '/assets/images/archeo-bg.png',
        icon: <FaSkull size={30} className="text-red-500" />,
      };
    case 'arts':
      return {
        color: 'bg-pink-500/20',
        backgroundImage: '/assets/images/arts-bg.png',
        icon: <FaPalette size={30} className="text-pink-500" />,
      };
    case 'bd':
      return {
        color: 'bg-orange-500/20',
        backgroundImage: '/assets/images/bd-bg.png',
        icon: <FaBook size={30} className="text-orange-500" />,
      };
    case 'célébrités':
      return {
        color: 'bg-yellow-500/20',
        backgroundImage: '/assets/images/celebrity-bg.png',
        icon: <FaStar size={30} className="text-yellow-500" />,
      };
    case 'cinéma':
      return {
        color: 'bg-red-500/20',
        backgroundImage: '/assets/images/cinema-bg.png',
        icon: <FaFilm size={30} className="text-red-500" />,
      };
    case 'culture':
      return {
        color: 'bg-purple-500/20',
        backgroundImage: '/assets/images/culture-bg.png',
        icon: <FaTheaterMasks size={30} className="text-purple-500" />,
      };
    case 'gastronomie':
      return {
        color: 'bg-green-500/20',
        backgroundImage: '/assets/images/gastronomy-bg.png',
        icon: <FaUtensils size={30} className="text-green-500" />,
      };
    case 'géographie':
      return {
        color: 'bg-blue-500/20',
        backgroundImage: '/assets/images/geography-bg.png',
        icon: <FaGlobeAmericas size={30} className="text-blue-500" />,
      };

    case 'histoire':
      return {
        color: 'bg-gray-700/20',
        backgroundImage: '/assets/images/history-bg.png',
        icon: <FaLandmark size={30} className="text-gray-700" />,
      };
    case 'informatique':
      return {
        color: 'bg-blue-600/20',
        backgroundImage: '/assets/images/computer-bg.png',
        icon: <FaLaptopCode size={30} className="text-blue-600" />,
      };
    case 'internet':
      return {
        color: 'bg-blue-300/20',
        backgroundImage: '/assets/images/internet-bg.png',
        icon: <FaGlobe size={30} className="text-blue-300" />,
      };
    case 'littérature':
      return {
        color: 'bg-indigo-500/20',
        backgroundImage: '/assets/images/literature-bg.png',
        icon: <FaBook size={30} className="text-indigo-500" />,
      };
    case 'loisirs':
      return {
        color: 'bg-pink-600/20',
        backgroundImage: '/assets/images/sport-bg.png',
        icon: <FaGamepad size={30} className="text-pink-600" />,
      };
    case 'monde':
      return {
        color: 'bg-green-600/20',
        backgroundImage: '/assets/images/world-bg.png',
        icon: <FaFlag size={30} className="text-green-600" />,
      };
    case 'musique':
      return {
        color: 'bg-purple-500/20',
        backgroundImage: '/assets/images/music-bg.png',
        icon: <FaMusic size={30} className="text-purple-500" />,
      };
    case 'nature':
      return {
        color: 'bg-green-400/20',
        backgroundImage: '/assets/images/nature-bg.png',
        icon: <FaLeaf size={30} className="text-green-400" />,
      };
    case 'quotidien':
      return {
        color: 'bg-teal-500/30',
        backgroundImage: '/assets/images/daily-bg.png',
        icon: <FaCalendarDay size={30} className="text-teal-500" />,
      };
    case 'sciences':
      return {
        color: 'bg-green-500/30',
        backgroundImage: '/assets/images/science-bg.png',
        icon: <FaFlask size={30} className="text-green-500" />,
      };
    case 'sports':
      return {
        color: 'bg-blue-500/30',
        backgroundImage: '/assets/images/sport-bg.png',
        icon: <FaFutbol size={30} className="text-blue-500" />,
      };
    case 'télévision':
      return {
        color: 'bg-gray-600/30',
        backgroundImage: '/assets/images/tv-bg.png',
        icon: <FaTv size={30} className="text-gray-600" />,
      };
    case 'tourisme':
      return {
        color: 'bg-cyan-500/30',
        backgroundImage: '/assets/images/travel-bg.png',
        icon: <FaPlane size={30} className="text-cyan-500" />,
      };
    case 'légendes':
      return {
        color: 'bg-indigo-500/30',
        backgroundImage: '/assets/images/legends-bg.png',
        icon: <FaBookOpen size={30} className="text-indigo-500" />,
      };
    default:
      return {
        color: 'bg-gray-500/30',
        backgroundImage: '/assets/images/default-bg.png',
        icon: <FaQuestionCircle size={30} className="text-gray-500" />,
      };
  }
};

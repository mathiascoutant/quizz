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
  backgroundImage: string;
  icon: JSX.Element;
} => {
  switch (name.toLowerCase()) {
    case 'animaux':
      return {
        backgroundImage: '/assets/images/sport-bg.png',
        icon: <FaPaw size={30} className="text-amber-600" />,
      };
    case 'archéologie':
      return {
        backgroundImage: '/assets/images/archeo-bg.png',
        icon: <FaSkull size={30} className="text-red-500" />,
      };
    case 'arts':
      return {
        backgroundImage: '/assets/images/arts-bg.png',
        icon: <FaPalette size={30} className="text-pink-500" />,
      };
    case 'bd':
      return {
        backgroundImage: '/assets/images/bd-bg.png',
        icon: <FaBook size={30} className="text-orange-500" />,
      };
    case 'célébrités':
      return {
        backgroundImage: '/assets/images/celebrity-bg.png',
        icon: <FaStar size={30} className="text-yellow-500" />,
      };
    case 'cinéma':
      return {
        backgroundImage: '/assets/images/cinema-bg.png',
        icon: <FaFilm size={30} className="text-red-500" />,
      };
    case 'culture':
      return {
        backgroundImage: '/assets/images/culture-bg.png',
        icon: <FaTheaterMasks size={30} className="text-purple-500" />,
      };
    case 'gastronomie':
      return {
        backgroundImage: '/assets/images/gastronomy-bg.png',
        icon: <FaUtensils size={30} className="text-green-500" />,
      };
    case 'géographie':
      return {
        backgroundImage: '/assets/images/geography-bg.png',
        icon: <FaGlobeAmericas size={30} className="text-blue-500" />,
      };

    case 'histoire':
      return {
        backgroundImage: '/assets/images/history-bg.png',
        icon: <FaLandmark size={30} className="text-gray-700" />,
      };
    case 'informatique':
      return {
        backgroundImage: '/assets/images/computer-bg.png',
        icon: <FaLaptopCode size={30} className="text-blue-600" />,
      };
    case 'internet':
      return {
        backgroundImage: '/assets/images/internet-bg.png',
        icon: <FaGlobe size={30} className="text-blue-300" />,
      };
    case 'littérature':
      return {
        backgroundImage: '/assets/images/literature-bg.png',
        icon: <FaBook size={30} className="text-indigo-500" />,
      };
    case 'loisirs':
      return {
        backgroundImage: '/assets/images/sport-bg.png',
        icon: <FaGamepad size={30} className="text-pink-600" />,
      };
    case 'monde':
      return {
        backgroundImage: '/assets/images/world-bg.png',
        icon: <FaFlag size={30} className="text-green-600" />,
      };
    case 'musique':
      return {
        backgroundImage: '/assets/images/music-bg.png',
        icon: <FaMusic size={30} className="text-purple-500" />,
      };
    case 'nature':
      return {
        backgroundImage: '/assets/images/nature-bg.png',
        icon: <FaLeaf size={30} className="text-green-400" />,
      };
    case 'quotidien':
      return {
        backgroundImage: '/assets/images/daily-bg.png',
        icon: <FaCalendarDay size={30} className="text-teal-500" />,
      };
    case 'sciences':
      return {
        backgroundImage: '/assets/images/science-bg.png',
        icon: <FaFlask size={30} className="text-green-500" />,
      };
    case 'sports':
      return {
        backgroundImage: '/assets/images/sport-bg.png',
        icon: <FaFutbol size={30} className="text-blue-500" />,
      };
    case 'télévision':
      return {
        backgroundImage: '/assets/images/tv-bg.png',
        icon: <FaTv size={30} className="text-gray-600" />,
      };
    case 'tourisme':
      return {
        backgroundImage: '/assets/images/travel-bg.png',
        icon: <FaPlane size={30} className="text-cyan-500" />,
      };
    case 'légendes':
      return {
        backgroundImage: '/assets/images/legends-bg.png',
        icon: <FaBookOpen size={30} className="text-indigo-500" />,
      };
    default:
      return {
        backgroundImage: '/assets/images/default-bg.png',
        icon: <FaQuestionCircle size={30} className="text-gray-500" />,
      };
  }
};

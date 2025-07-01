// React Icons Reference - Commonly Available Icons
// Use this as a reference for safe icon imports

// From react-icons/fa (Font Awesome)
export const commonFaIcons = {
  // Presentation & Display
  FaDesktop: "🖥️ Desktop/Presentation",
  FaLaptop: "💻 Laptop",
  FaProjectDiagram: "📊 Project Diagram", 
  FaChartBar: "📊 Bar Chart",
  FaChartLine: "📈 Line Chart",
  FaChartPie: "🥧 Pie Chart",
  
  // Calendar & Time
  FaCalendarAlt: "📅 Calendar",
  FaClock: "🕐 Clock",
  FaCalendarCheck: "✅ Calendar Check",
  
  // Users & Teams
  FaUsers: "👥 Users",
  FaUser: "👤 Single User",
  FaUserTie: "👔 Business User",
  FaUserGraduate: "🎓 Graduate",
  
  // Files & Documents
  FaFile: "📄 File",
  FaFileAlt: "📝 Document",
  FaFilePdf: "📄 PDF",
  FaFileWord: "📄 Word Doc",
  FaFilePowerpoint: "📊 PowerPoint",
  
  // Communication
  FaEnvelope: "✉️ Email",
  FaComments: "💬 Comments",
  FaPhone: "📞 Phone",
  
  // Actions
  FaPlay: "▶️ Play",
  FaPause: "⏸️ Pause",
  FaStop: "⏹️ Stop",
  FaUpload: "⬆️ Upload",
  FaDownload: "⬇️ Download",
  
  // Interface
  FaBars: "☰ Menu",
  FaCog: "⚙️ Settings",
  FaSearch: "🔍 Search",
  FaPlus: "➕ Add",
  FaMinus: "➖ Remove",
  FaEdit: "✏️ Edit",
  FaTrash: "🗑️ Delete"
};

// From react-icons/io5 (Ionicons 5)
export const commonIo5Icons = {
  // Arrows & Navigation
  IoArrowForwardCircleOutline: "→ Arrow Forward Circle",
  IoArrowBackCircleOutline: "← Arrow Back Circle",
  IoChevronDown: "⌄ Chevron Down",
  IoChevronUp: "⌃ Chevron Up",
  
  // Media
  IoPlayCircle: "▶️ Play Circle",
  IoPauseCircle: "⏸️ Pause Circle",
  IoStopCircle: "⏹️ Stop Circle",
  
  // Actions
  IoRocket: "🚀 Rocket",
  IoStar: "⭐ Star",
  IoHeart: "❤️ Heart",
  IoThumbsUp: "👍 Thumbs Up",
  
  // Interface
  IoMenu: "☰ Menu",
  IoClose: "✕ Close",
  IoSettings: "⚙️ Settings",
  IoSearch: "🔍 Search",
  
  // Communication
  IoMail: "✉️ Mail",
  IoCall: "📞 Call",
  IoChatbubble: "💬 Chat",
  
  // Files
  IoDocument: "📄 Document",
  IoFolder: "📁 Folder",
  IoImage: "🖼️ Image"
};

// Safe icon combinations for features
export const featureIconSuggestions = [
  {
    category: "Presentation Management",
    icons: ["FaDesktop", "FaLaptop", "FaProjectDiagram", "IoDocument"],
    recommended: "FaDesktop"
  },
  {
    category: "Calendar/Scheduling", 
    icons: ["FaCalendarAlt", "FaClock", "FaCalendarCheck"],
    recommended: "FaCalendarAlt"
  },
  {
    category: "Team Collaboration",
    icons: ["FaUsers", "FaComments", "IoChatbubble"],
    recommended: "FaUsers"
  },
  {
    category: "Analytics/Charts",
    icons: ["FaChartLine", "FaChartBar", "FaChartPie"],
    recommended: "FaChartLine"
  }
];

// Example safe import statement
export const safeImportExample = `
import { 
  FaDesktop, 
  FaCalendarAlt, 
  FaUsers, 
  FaChartLine 
} from "react-icons/fa";

import { 
  IoPlayCircle, 
  IoRocket, 
  IoArrowForwardCircleOutline 
} from "react-icons/io5";
`;

export default {
  commonFaIcons,
  commonIo5Icons,
  featureIconSuggestions,
  safeImportExample
};

import React from "react";
import styles from "./Tooltip.module.css";
import { FiX } from "react-icons/fi";

interface TooltipProps {
  content: string[];
  visible: boolean;
  onClose: () => void;
}

function Tooltip({ content, visible, onClose }: TooltipProps) {
  if (!visible) return null;
  return (
    <div className={`absolute fz-xs ${styles.tooltipWrapper} ${styles.show}`}>
      <button
        onMouseDown={onClose}
        className={`absolute ${styles.closeButton}`}
        aria-label="Close tooltip"
      >
        <FiX size={16} />
      </button>
      <ul
        className={`flex-container ${
          content.length === 1 ? `list-style-none ${styles.listStyleNone}` : ""
        } ${styles.list}`}
      >
        {content.map((err, i) => (
          <li key={i}>
            <p className="text">{err}</p>
          </li>
        ))}
      </ul>
      <div className={styles.tooltipTriangle}></div>
    </div>
  );
}

export default Tooltip;

import React, { useState } from "react";
import styles from "./Tooltip.module.css";

interface TooltipProps {
  content: string[];
  visible: boolean;
  onClose: () => void;
}

function Tooltip({ content, visible, onClose }: TooltipProps) {
  return (
    <div
      onClick={onClose}
      className={`absolute cursor-pointer fz-xs ${styles.tooltipWrapper} ${
        visible ? styles.show : ""
      }`}
    >
      <div className={styles.tooltip}>
        {content.map((err, i) => (
          <p key={i}>{err}</p>
        ))}
      </div>
      <div className={styles.tooltipTriangle}></div>
    </div>
  );
}

export default Tooltip;

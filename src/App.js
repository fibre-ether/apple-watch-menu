import "./styles.css";
import { motion } from "framer-motion";
import { useRef, useEffect } from "react";

export default function App() {
  const parentRef = useRef();
  const containerRef = useRef();
  const colors = [
    "#A67FC7",
    "#1EA896",
    "#D8464B",
    "#FDDF21",
    "#736AC8",
    "#a2d2ff",
    "#e9c46a",
    "#00b4d8",
  ];

  useEffect(() => {
    for (let item of containerRef.current.children[0].children) {
      item.style.background = colors[Math.floor(Math.random() * colors.length)];
    }
  }, []);

  const animate = (dragInfo) => {
    const parentCBR = parentRef.current.getBoundingClientRect();
    for (let item of containerRef.current.children[0].children) {
      const itemCBR = item.getBoundingClientRect();
      const middleX = parentCBR.x + parentCBR.width / 2;
      const middleY = parentCBR.y + parentCBR.height / 2;
      const scaleX =
        1 -
        (Math.abs(itemCBR.x + itemCBR.width / 2 - middleX) * 2) /
          parentCBR.width;
      const scaleY =
        1 -
        (Math.abs(itemCBR.y + itemCBR.height / 2 - middleY) * 2) /
          parentCBR.height;
      const scale = (scaleX + scaleY) / 2;
      item.style.scale = Math.min(1, Math.max(scale * 1.5, 0.65));
    }
  };
  return (
    <div className="app flex-center">
      <div className="container" ref={parentRef}>
        <motion.div
          drag
          dragConstraints={parentRef}
          dragMomentum={false}
          ref={containerRef}
          onDrag={(_, info) => {
            animate(info);
          }}
          className="overflowing-container flex-center"
        >
          <div className="item-container">
            <div className="item"></div>
            <div className="item"></div>
            <div className="item"></div>
            <div className="item"></div>
            <div className="item clear-w-margin"></div>
            <div className="item"></div>
            <div className="item"></div>
            <div className="item clear"></div>
            <div className="item"></div>
            <div className="item"></div>
            <div className="item"></div>
            <div className="item clear-w-margin"></div>
            <div className="item"></div>
            <div className="item"></div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

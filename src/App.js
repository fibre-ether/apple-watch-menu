import "./styles.css";
import { AnimatePresence, motion } from "framer-motion";
import { useRef, useEffect, useState } from "react";

export default function App() {
  const parentRef = useRef();
  const containerRef = useRef();
  const mousePosRef = useRef({ x: 0, y: 0 });
  const [selectedId, setSelectedId] = useState(true);
  //!BUG: popup doesnt pop up if click is done before any drag
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
    // for (let item of containerRef.current.children[0].children) {
    //   item.style.background = colors[Math.floor(Math.random() * colors.length)];
    // }
  }, []);

  const animate = () => {
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
  const itemLayoutConfig = [
    "",
    "",
    "",
    "",
    "clear-w-margin",
    "",
    "",
    "clear",
    "",
    "",
    "",
    "clear-w-margin",
    "",
    "",
  ];

  const cardInfo = {
    title: "SkyJack",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer fermentum magna vitae elementum tempus. Maecenas eros eros, lacinia eu est ac, tempus rhoncus arcu. Quisque sit amet ipsum lacus. Vivamus mollis sit amet dolor eget lacinia. Aliquam non magna hendrerit, scelerisque justo ut, aliquet erat. Integer gravida ipsum luctus auctor semper. Nunc nec dui eget felis elementum rutrum. Curabitur quis nulla tellus. ",
    imgSrc:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvGtBQwB86uHOUF4QuBwBUYV3IOTJjITpMxYov96ft",
    subImages: [
      "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MjB8fHxlbnwwfHx8fA%3D%3D&w=1000&q=80",
      "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&w=1000&q=80",
      "https://img.freepik.com/free-vector/gradient-grainy-gradient-texture_79603-1642.jpg?w=2000",
    ],
    categories: ["ReactJS", "TailwindCSS", "Python"],
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
          className="overflowing-container"
        >
          <div className="item-container">
            {itemLayoutConfig.map((item, index) => (
              <motion.div
                layoutId={index}
                onMouseDown={(e) => {
                  mousePosRef.current.x = e.clientX;
                  mousePosRef.current.y = e.clientY;
                }}
                onMouseUp={(e) => {
                  if (
                    mousePosRef.current.x === e.clientX &&
                    mousePosRef.current.y === e.clientY
                  ) {
                    setSelectedId(index);
                  }
                }}
                className={"item " + item}
              >
                <motion.p className="item-title">Project title</motion.p>
                <motion.img className="item-image" src={cardInfo.imgSrc} />
              </motion.div>
            ))}
          </div>
        </motion.div>
        <AnimatePresence>
          {selectedId && (
            <PopupCard
              selectedId={selectedId}
              setSelectedId={setSelectedId}
              cardInfo={cardInfo}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

const PopupCard = ({ selectedId, setSelectedId, cardInfo }) => {
  return (
    <motion.div layout className="popup-card" layoutId={selectedId}>
      <img className="image-pane" src={cardInfo} />
      <div className="content-pane">
        <div className="top-border-design">
          <button onClick={() => setSelectedId(null)} />
        </div>
        <div className="popup-content">
          <p>{cardInfo.title}</p>
          <p>{cardInfo.description}</p>

          <div className="sub-images">
            <img />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

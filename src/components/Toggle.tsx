import { animated, useSpring } from "react-spring";
import { useDrag } from "react-use-gesture";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faChevronLeft,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

const RANGE = -50;

function Toggle(props: any) {
  const [{ x }, set] = useSpring(() => ({
    x: 0,
  }));

  var deleted = false;

  const clamp = (x: any) => {
    if (x > 0) {
      return 0;
    }

    return x;
  };

  const backgroundStyle = {
    backgroundColor: "white",
    cursor: "pointer",
  };

  const knobStyle = {
    x,
    backgroundColor: "black",
  };

  const bind = useDrag(({movement: [mx] }) => {
    const mxclamped = clamp(mx);
    const offs = 0;
    const newX = offs + mxclamped;

    if (!deleted && newX < -100) {
      deleted = true;
      props.toggleDelete(props.item);
    }

    set({ x: newX });
  });

  return (
    <div style={backgroundStyle}>
      <animated.div
        {...bind()}
        style={knobStyle}
        // style={{
        //   x: posLogo.x,
        //   touchAction: "none",
        // }}
      >
        <div className="item-container">
          <div
            className="item-name"
            // onClick={() => toggleComplete(index)}
          >
            {/* Linea de prueba para que salga el nombre */}
            <span>{props.item.itemName}</span>
            {/* {item.isSelected ? (
                    <>
                      <FontAwesomeIcon icon={faCheckCircle} />
                      <span className="completed">{item.itemName}</span>
                    </>
                  ) : (
                    <>
                      <FontAwesomeIcon icon={faCircle} />
                      <span>{item.itemName}</span>
                    </>
                  )} */}
          </div>
          <div className="quantity">
            <button>
              <FontAwesomeIcon
                icon={faChevronLeft}
                // onClick={() => handleQuantityDecrease(index)}
              />
            </button>
            {/* <span> {item.quantity} </span> */}
            <button>
              <FontAwesomeIcon
                icon={faChevronRight}
                // onClick={() => handleQuantityIncrease(index)}
              />
            </button>
          </div>
        </div>
      </animated.div>
    </div>
  );
}

export default Toggle;

import { animated, useSpring } from "react-spring";
import { useDrag } from "react-use-gesture";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";
import "./Toggle.css";

function Toggle(props: any) {
  const limitDelete = -100;
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

  const knobStyle = {
    x,
    backgroundColor: "#5b73ec",
  };

  //TODO: Down is not working in chrome when I using phone screen resolution
  const bind = useDrag(({ down, movement: [mx] }) => {
    const mxclamped = clamp(mx);
    const offs = 0;
    const newX = down ? offs + mxclamped : 0;

    if (!deleted && newX < limitDelete) {
      deleted = true;
      props.toggleDelete(props.item);
    }

    set({ x: newX });
  });

  return (
    <div className="background">
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
          >
            <span>{props.item.itemName}</span>
          </div>
          <div className="quantity">
            <button>
              <FontAwesomeIcon
                icon={faChevronLeft}
                onClick={() => props.handleQuantityDecrease(props.item)}
              />
            </button>
            <span> {props.item.quantity} </span>
            <button>
              <FontAwesomeIcon
                icon={faChevronRight}
                onClick={() => props.handleQuantityIncrease(props.item)}
              />
            </button>
          </div>
        </div>
      </animated.div>
    </div>
  );
}

export default Toggle;

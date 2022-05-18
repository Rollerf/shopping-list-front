import { animated, useSpring } from "react-spring";
import { useDrag } from "react-use-gesture";
import React, { useState } from "react";

const RANGE = 50;

function Toggle(props: any) {
  const [{ x }, set] = useSpring(() => ({
    x: 50,
  }));

  const [toggled, setToggled] = useState(false);
  var deleted = false;
  const RB_RANGE = 5;

  const rubberband = (x: any) =>
    x > RB_RANGE ? RB_RANGE : RB_RANGE * (x / RB_RANGE) * (x / RB_RANGE);

  const clamp = (x: any) => {
    const dx = toggled ? x * -1 : x;
    if (dx < 0) {
      const rb = rubberband(Math.abs(dx));
      return x < 0 ? -rb : rb;
    }
    if (dx > RANGE) {
      const diff = dx - RANGE;
      const rb = rubberband(diff);
      return x < 0 ? -RANGE - rb : RANGE + rb;
    }

    return x;
  };

  const backgroundStyle = {
    backgroundColor: "#ddd",
    cursor: "pointer",
    height: 50,
    width: 100,
  };

  const knobStyle = {
    x,
    backgroundColor: "#444",
    height: 50,
    width: 50,
  };

  const bind = useDrag(({ down, movement: [mx] }) => {
    if (!deleted && mx < -100) {
      deleted = true;
      props.toggleDelete(props.item);
    }

    const left = mx < 0;
    const mxclamped = clamp(mx);
    const aboveThreshold = Math.abs(mxclamped) > RANGE / 2;
    const aboveThresholdCustom = Math.abs(mxclamped) > RANGE;

    setToggled(aboveThresholdCustom);

    const offs = toggled ? RANGE : 0;
    const newX =
      offs + (down ? mxclamped : aboveThreshold ? (left ? -RANGE : RANGE) : 0);
    set({ x: newX });
  });

  return (
    <div // Background
      style={backgroundStyle}
      onClick={() => {
        set({ x: toggled ? 0 : 50 });
      }}
    >
      <animated.div style={knobStyle} {...bind()}></animated.div>
    </div>
  );
}

export default Toggle;
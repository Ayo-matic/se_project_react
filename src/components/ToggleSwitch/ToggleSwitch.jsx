import { useContext } from "react";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import "./ToggleSwitch.css";

function ToggleSwitch() {
  const { currentTemperatureUnit, handleToggleSwitchChange } = useContext(
    CurrentTemperatureUnitContext,
  );

  return (
    <label className="toggle-switch">
      <input
        type="checkbox"
        className="toggle-switch__checkbox"
        checked={currentTemperatureUnit === "C"}
        onChange={handleToggleSwitchChange}
      />
      <span className="toggle-switch__slider" />
      <span
        className={`toggle-switch__unit toggle-switch__unit_type_f ${
          currentTemperatureUnit === "F" ? "toggle-switch__unit_active" : ""
        }`}
      >
        F
      </span>
      <span
        className={`toggle-switch__unit toggle-switch__unit_type_c ${
          currentTemperatureUnit === "C" ? "toggle-switch__unit_active" : ""
        }`}
      >
        C
      </span>
    </label>
  );
}

export default ToggleSwitch;

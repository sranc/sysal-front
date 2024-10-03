import "./switch.css";
const OwnSwitch = ({ checked, onChange, name, label }) => {
  return (
    <div className="switch ">
      <span className="switch-name">{label}</span>
      <label className="switch-label">
        <input
          type="checkbox"
          name={name}
          checked={checked}
          onChange={onChange}
        />
        <span className="switch-slider"></span>
      </label>
    </div>
  );
};

export default OwnSwitch;

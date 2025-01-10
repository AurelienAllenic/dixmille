const Dice = ({ value, isSelected, onToggle }) => (
    <div
      className={`dice ${isSelected ? 'selected' : ''}`}
      onClick={onToggle}
    >
      {value}
    </div>
  );
export default Dice  
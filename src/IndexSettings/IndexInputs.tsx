interface IndexInputsProps {
  indices: IndicesType;
  onChange: (indices: IndicesType) => void;
  onPost: () => void;
  onStatusChange: () => void;
  status: boolean;
}

export interface StartEnd {
  s: number;
  e: number;
}

export interface IndicesType {
  left: StartEnd;
  right: StartEnd;
  top: StartEnd;
  bottom: StartEnd;
}

const IndexInputs: React.FC<IndexInputsProps> = ({
  indices,
  onChange,
  onPost,
  onStatusChange,
  status,
}) => {
  const handleChange =
    (pos: keyof IndicesType, sel: keyof StartEnd) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const copy = { ...indices };
      copy[pos][sel] = Math.floor(Number(e.target.value));
      onChange(copy);
    };

  return (
    <div className="container">
      <div className="display-container">
        {/* Left side Indices */}
        <input
          className="input-item side left start"
          placeholder="Left End Index"
          value={indices.left.e}
          type="number"
          onChange={handleChange("left", "e")}
        ></input>
        <input
          className="input-item side left end"
          placeholder="Left Start Index"
          value={indices.left.s}
          type="number"
          onChange={handleChange("left", "s")}
        ></input>

        {/* Right side Indices */}
        <input
          className="input-item side right start"
          placeholder="Right Start Index"
          value={indices.right.s}
          type="number"
          onChange={handleChange("right", "s")}
        ></input>
        <input
          className="input-item side right end"
          placeholder="Right End Index"
          value={indices.right.e}
          type="number"
          onChange={handleChange("right", "e")}
        ></input>

        {/* Top side Indices */}
        <input
          className="input-item vertical top start"
          placeholder="Top Start Index"
          value={indices.top.s}
          type="number"
          onChange={handleChange("top", "s")}
        ></input>
        <input
          className="input-item vertical top end"
          placeholder="Top End Index"
          value={indices.top.e}
          type="number"
          onChange={handleChange("top", "e")}
        ></input>

        {/* Bottom side Indices */}
        <input
          className="input-item vertical bottom start"
          placeholder="Bottom End Index"
          value={indices.bottom.e}
          type="number"
          onChange={handleChange("bottom", "e")}
        ></input>
        <input
          className="input-item vertical bottom end"
          placeholder="Bottom Start Index"
          value={indices.bottom.s}
          type="number"
          onChange={handleChange("bottom", "s")}
        ></input>

        {/* update button */}
        <button onClick={() => onPost()}>Update</button>
      </div>
      <button onClick={() => onStatusChange()}>
        {status ? "turn off" : "turn on"}
      </button>
    </div>
  );
};

export default IndexInputs;

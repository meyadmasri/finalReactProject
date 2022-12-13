import NavSide from "../NavSide/NavSide";

const Wrapper = ({ children }) => {
  return (
    <div className="d-flex">
      <div
        style={{
          width: 300,
        }}
      >
        <NavSide />
      </div>
      <div
        style={{
          border: "1px solid #f3f4f5",
          borderBottom: 0,
          borderTop: 0,
          maxWidth: 620,
          width: "100%",
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default Wrapper;

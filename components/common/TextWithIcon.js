const TextWithIcon = ({ icon, text }) => {
  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        {icon}
        <span style={{ marginRight: 10 }}>{text}</span>
      </div>
    </>
  );
};

export default TextWithIcon;

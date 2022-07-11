import { Box } from "@chakra-ui/react";
export default function SingleDie({ props: { value, func, color } }) {
  function handleClick(e) {
    e.preventDefault();
    func();
  }
  return (
    <Box h='40px' w='40px' bgColor={color || "green"} border='2px solid black'>
      <a
        style={{
          cursor: "pointer",
        }}
        onClick={(e) => handleClick(e)}
      >
        <div
          style={{
            height: "100%",
            width: "100%",
            textAlign: "center",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <h1 style={{ fontWeight: "bolder" }}>{value.sides ?? value}</h1>
        </div>
      </a>
    </Box>
  );
}

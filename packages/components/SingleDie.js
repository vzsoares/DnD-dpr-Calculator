import { Box } from "@chakra-ui/react";
export default function SingleDie({ props: { value, func } }) {
  function handleClick(e) {
    e.preventDefault();
    func(value);
  }
  return (
    <Box h='50px' w='50px' bgColor='green' border='2px solid black'>
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
          d{value}
        </div>
      </a>
    </Box>
  );
}

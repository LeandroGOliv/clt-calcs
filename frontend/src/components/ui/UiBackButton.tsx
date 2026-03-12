import { Button } from "@chakra-ui/react";
import { useNavigate } from "@tanstack/react-router";
import { RiArrowLeftLine } from "react-icons/ri";

export default function UIBackButton() {
  const navigate = useNavigate();

  function handleBackClick() {
    navigate({ to: ".." });
  }
  return (
    <>
      <Button
        variant="solid"
        onClick={handleBackClick}
        className="max-md:w-full"
      >
        <RiArrowLeftLine />
        Voltar ao menu
      </Button>
    </>
  );
}

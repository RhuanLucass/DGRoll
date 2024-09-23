import { ContainerMessage } from "./styles";

export const Message = ({ error, content }) => {
  return (
    <ContainerMessage
      $error={error}
      className={content !== "" ? "message-active" : ""}
    >
      <p>{content}</p>
    </ContainerMessage>
  );
};


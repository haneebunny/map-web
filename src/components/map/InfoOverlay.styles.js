import styled from "@emotion/styled";

export const InfoBubble = styled.div`
    transform: translate(0%, -200%);
    z-index: 3;
    background-color: ${(props) =>
        props.payYn === "유료" ? "#994dbdae" : "#4ec7a7b7"};
    padding: 2px;
    border-radius: 10px;
    border: 1.5px solid #ffffff2b;
    font-size: 10px;
`;


import * as S from "./InfoOverlay.styles";

export default function InfoOverlay({ info }) {
  return (
    <S.InfoBubble>
      <span className="text-lg  text-red-700 px-1 ">{info.parkingName}</span>
    </S.InfoBubble>
  );
}

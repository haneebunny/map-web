import * as S from "./InfoOverlay.styles";

export default function InfoOverlay({ info }) {
  return (
    <S.InfoBubble>
      <span className="text-sm text-white px-1 ">{info.parkingName}</span>
    </S.InfoBubble>
  );
}

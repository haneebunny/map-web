import * as S from "./InfoOverlay.styles";

export default function InfoOverlay({ info }) {
    return (
        <S.InfoBubble>
            <p className="text-sm px-1 ">{info?.parkingName}</p>
        </S.InfoBubble>
    );
}


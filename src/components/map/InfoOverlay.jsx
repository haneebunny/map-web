import * as S from "./InfoOverlay.styles";

export default function InfoOverlay({ info }) {
    return (
        <S.InfoBubble payYn={info?.payYn}>
            <p className="text-sm px-1 text-white">{info?.parkingName}</p>
        </S.InfoBubble>
    );
}


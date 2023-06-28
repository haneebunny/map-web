import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { noticeListState } from "../../common/store/atom";

export default function NoticeMessage() {
    const [noticeList, setNoticeList] = useRecoilState(noticeListState);
    const [isMessageVisible, setIsMessageVisible] = useState(false);
    const [parkingLotName, setParkingLotName] = useState("");
    const [coloredNumber, setColoredNumber] = useState("");
    const [miscellaneousMessage, setMiscellaneousMessage] = useState("");

    useEffect(() => {
        if (!noticeList) return;
        if (!noticeList[0]) return;

        setParkingLotName("");
        setColoredNumber("");
        setMiscellaneousMessage("");

        const message = noticeList[0];

        // 공지 메세지에 " | "가 포함되어 있다면,
        if (message.includes("|")) {
            const parts = message?.split("|");

            // " | "로 나누었을 때 두 덩이가 아니라면 return
            if (parts.length !== 2) {
                setMiscellaneousMessage(message);
                return;
            }

            // 뒷덩이에 숫자가 있는지 확인
            if (/\d+/.test(parts[1])) {
                // 숫자 부분만 색을 다르게 처리
                const coloredNumber = parts[1]?.replace(
                    /\b(\d+)\b/g,
                    "<span style='color: #00556d'>$1</span>"
                );
                setColoredNumber(coloredNumber);
            } else {
                // 숫자가 없다면
                // 그냥 그 상태로 메세지 set
                const notColoredMessage = parts[1];
                setColoredNumber(notColoredMessage);
            }

            setParkingLotName(parts[0]);
        } else {
            // 주차장 이름이 없는 기타 메세지 처리
            setMiscellaneousMessage(message);
        }

        showNotification();
    }, [noticeList]);

    const showNotification = () => {
        setIsMessageVisible(true);

        setTimeout(() => {
            setIsMessageVisible(false);
        }, 2000);
    };

    return (
        <MessageBox
            isVisible={noticeList && true}
            className="w-auto min-w-[300px] fixed left-[50%] top-20  -translate-x-1/2 -translate-y-1/2 z-10 flex flex-row justify-center items-center"
        >
            <div className="px-3 py-1  text-white bg-opacity-80 bg-[#5db5a8]   rounded-2xl">
                {parkingLotName && coloredNumber && (
                    <>
                        <span className="font-bold">[{parkingLotName}] </span>
                        <span
                            dangerouslySetInnerHTML={{
                                __html: coloredNumber,
                            }}
                        />
                    </>
                )}

                {miscellaneousMessage && <span>{miscellaneousMessage}</span>}
            </div>
        </MessageBox>
    );
}

const MessageBox = styled.div`
    opacity: ${(props) => (props.isVisible ? "100%" : "0")};
    transition: opacity 0.2s;
`;


export const isWeekday = () => {
    const today = new Date();
    const dayOfWeek = today.getDay();
    //일요일부터 토요일까지 0~6

    return dayOfWeek !== 0 && dayOfWeek !== 6;
};

export const makeOperatingHours = (info) => {
    // 평일인지 공휴일인지 확인
    const weekday = isWeekday();

    // 오늘 날짜, 시간
    const today = new Date();
    const currentHour = today.getHours();
    const currentMinute = today.getMinutes();

    let beginTime, endTime;
    beginTime = weekday ? info.weekdayBeginTime : info.weekendBeginTime;
    endTime = weekday ? info.weekdayEndTime : info.weekendEndTime;

    // 시와 분으로 쪼개고 Number()로 숫자화
    const [beginHour, beginMinute] = beginTime.split(":").map(Number);
    const [endHour, endMinute] = endTime.split(":").map(Number);

    let message = "";

    if (
        (currentHour > beginHour ||
            (currentHour === beginHour && currentMinute >= beginMinute)) &&
        (currentHour < endHour ||
            (currentHour === endHour && currentMinute < endMinute))
    ) {
        message = "운영 중";
    } else {
        message = "운영 종료";
    }

    return [message, endHour, endMinute];
};


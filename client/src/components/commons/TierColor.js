export default function TierColor(point, rank) {
  if (point < 600) {
    // 언랭크 (10분 이하 활동 시)
    return "#000000";
  } else if (rank == 1) {
    // 그랜드 마스터
    return "#24FFF2";
  } else if (rank <= 10) {
    // 마스터
    return "#FF4B7A";
  } else if (rank <= 100) {
    // 다이아
    return "#35D1C8";
  } else if (rank <= 50) {
    // 플레티넘
    return "#70D9AD";
  } else if (rank <= 500) {
    // 골드
    return "#ECD351";
  } else if (rank <= 1000) {
    // 실버
    return "#A4A4A4";
  } else {
    // 브론즈
    return "#DA8736";
  }
}

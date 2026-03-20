// 祝日判定用（日本の祝日は外部APIが理想だが、MVPではトグルで対応）

const DAYS = ['日', '月', '火', '水', '木', '金', '土'];

const SHOTA = { name: '翔太', emoji: '\u{1F64B}\u200D\u2642\uFE0F' };
const RENA = { name: '玲奈', emoji: '\u{1F64B}\u200D\u2640\uFE0F' };
const EACH = { name: '各自', emoji: '🍽️' };

/**
 * 当日の担当を返す
 * @param {Date} date
 * @param {boolean} isHoliday - 祝日モードON
 * @returns {{ breakfast: object, lunch: object, dinner: object }}
 */
export function getDuty(date, isHoliday = false) {
  const dow = date.getDay(); // 0=日, 6=土
  const isWeekend = dow === 0 || dow === 6;
  const treatAsHoliday = isHoliday || isWeekend;

  // 朝食
  let breakfast;
  if (treatAsHoliday) {
    breakfast = RENA;
  } else {
    breakfast = EACH;
  }

  // 夕食
  let dinner;
  if (treatAsHoliday) {
    dinner = SHOTA;
  } else {
    // 平日: 月火木=玲奈, 水金=翔太
    if (dow === 1 || dow === 2 || dow === 4) {
      dinner = RENA;
    } else {
      dinner = SHOTA;
    }
  }

  // 昼食
  let lunch;
  if (treatAsHoliday) {
    lunch = dow === 0 ? SHOTA : RENA; // 日=翔太自炊, 土=玲奈自炊
    if (isHoliday && !isWeekend) {
      // 平日祝日 → 翔太（祝日モードなので夕食が翔太 → 昼も翔太負担扱い）
      lunch = SHOTA;
    }
  } else {
    // 平日: 前夜の夕食担当が準備。不可時は担当者負担
    // 前夜の夕食担当を算出
    const prevDate = new Date(date);
    prevDate.setDate(prevDate.getDate() - 1);
    const prevDow = prevDate.getDay();
    const prevIsWeekend = prevDow === 0 || prevDow === 6;
    if (prevIsWeekend) {
      lunch = SHOTA; // 土日夜は翔太 → 月曜昼は翔太準備
    } else if (prevDow === 1 || prevDow === 2 || prevDow === 4) {
      lunch = RENA;
    } else {
      lunch = SHOTA;
    }
  }

  return { breakfast, lunch, dinner };
}

/**
 * 前夜の夕食担当者を返す（昼食アラート用）
 */
export function getPrevNightDuty(date, isHoliday = false) {
  const prevDate = new Date(date);
  prevDate.setDate(prevDate.getDate() - 1);
  return getDuty(prevDate, isHoliday).dinner;
}

export { DAYS, SHOTA, RENA, EACH };

/**
 * バリデーション関数の共通ライブラリ（改訂）
 */

export const validateEmail = (raw: string): boolean => {
  // 前後スペースはユーザーの誤入力として除去
  const email = raw.trim();
  if (!email) return false;

  // 実務では「完璧な正規表現」より“ほどよい緩さ + バックエンド検証”が安全
  // TLD 2文字以上、空白禁止、@とドットの最小構造のみ担保
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  return emailRegex.test(email);
};

export type PasswordValidation = {
  ok: boolean;
  length: boolean;          // 8文字以上
  hasLetter: boolean;       // 文字（Unicode）
  hasNumber: boolean;       // 数字（Unicode）
  hasSymbol: boolean;       // 記号（推奨）
  noSpace: boolean;         // 空白が含まれない
  notSingleRepeating: boolean; // 同一文字のみで構成されない
};

export const validatePassword = (password: string): PasswordValidation => {
  const length = password.length >= 8;
  const hasLetter = /\p{L}/u.test(password); // Unicodeの文字
  const hasNumber = /\p{N}/u.test(password); // Unicodeの数字
  const hasSymbol = /[^\p{L}\p{N}]/u.test(password); // 記号（任意だが推奨）
  const noSpace = !/\s/.test(password);
  const notSingleRepeating = !/^(\S)\1+$/.test(password); // 例: "aaaaaaaa"

  const ok =
    length &&
    hasLetter &&
    hasNumber &&
    noSpace &&
    notSingleRepeating; // 記号は任意にする場合は含めない

  return { ok, length, hasLetter, hasNumber, hasSymbol, noSpace, notSingleRepeating };
};

// --- エラーメッセージ: undefined = エラーなしに変更 ---

export const getEmailError = (email: string): string | undefined => {
  if (!email) return undefined; // 未入力時はここではエラーを返さない（必須チェックは別で）
  return validateEmail(email) ? undefined : "有効なメールアドレスを入力してください";
};

export const getPasswordError = (password: string): string | undefined => {
  if (!password) return undefined; // 未入力の段階ではメッセージを出さない想定
  const v = validatePassword(password);

  if (!v.length) return "8文字以上で入力してください";
  if (!v.noSpace) return "空白は使用できません";
  if (!v.notSingleRepeating) return "同じ文字のみのパスワードは使用できません";
  if (!v.hasLetter || !v.hasNumber) return "英字と数字を含めてください";
  // 記号を必須にしたい場合は以下を有効化
  // if (!v.hasSymbol) return "記号も含めてください";

  return undefined;
};

export const getConfirmPasswordError = (password: string, confirmPassword: string): string | undefined => {
  if (!confirmPassword) return undefined;
  // パスワードはトリムしないのが原則（入力通り比較）
  return password === confirmPassword ? undefined : "パスワードが一致しません";
};

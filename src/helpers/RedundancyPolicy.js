import sha256 from 'sha256';

export default class RedundancyPolicy {
  static sha256(text, salt = '', redundancy = 3e4) {
    let encryptedText = text;

    for (let i = redundancy; i > 0; i -= 1) {
      encryptedText = sha256(`${encryptedText}${salt}`);
    }

    return encryptedText;
  }
}

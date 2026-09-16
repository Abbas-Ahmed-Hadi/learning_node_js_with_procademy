export default class StringUtilities {
    static isNullOrEmpty(string) {
        return !string;
    }

    static isNullOrWhiteSpace(string) {
        if (!string) return true;
        
        const len = string.length;
        for (let i = 0; i < len; i++) {
            if (string[i] !== " ") return false;
        }

        return true;
    }
}

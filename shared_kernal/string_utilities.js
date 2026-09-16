export default class StringUtlities {
    static IsNullOrEmpty(value) {
        return !value;
    }
    
    static IsNullOrWhiteSpace(value) {
        if (!value) return true;
        
        const len = value.length;
        for (let i = 0; i < len; i++) {
            if (value[i] !== " ") return false;
        }
        
        return true;
    }
}
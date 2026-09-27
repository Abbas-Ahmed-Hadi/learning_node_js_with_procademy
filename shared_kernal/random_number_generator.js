export default class RandomNumberGenerator {
    
    static get GetRandomInt() {
        const base = 10;
        const n = Math.floor(Math.random() * base);
        return Math.floor(Math.random() * (10 ** n));
    }
    
    static GetInt(min = 0, max = Number.MAX_SAFE_INTEGER) {
        if (min > max) { [min, max] = [max, min]; }
        
        return RandomNumberGenerator.GetRandomInt % (max - min + 1) + min;
    }
    
    static get GetRandomFloat() {
        const base = 10;
        const n = Math.random() * base;
        
        return Math.random() * (10 ** n);
    }
    
    static GetFloat(min = 0, max = Number.MAX_SAFE_INTEGER) {
        if (min > max) { [min, max] = [max, min]; }
        
        return RandomNumberGenerator.GetRandomFloat % (max - min + 1) + min;
    }
}
import StringUtlities from "./../shared_kernal/string_utilities.js";
export default class Controller {
    static #FiltrationOperatorsSymboles = {
        gte: "gte",
        gt: "gt",
        lte: "lte",
        lt: "lt",
        eq: "eq",
        ne: "ne"
    };
    
    static get FiltrationOperatorsSymboles() {
        return Controller.#FiltrationOperatorsSymboles;
    }
    
    
    static GetQuerySortingFieldsFromRequestQueryString(
        requestQueryString,
        fieldsSeparator = ',') {
            
        return StringUtlities.
                IsNullOrWhiteSpace(requestQueryString.sort)
                ? []
                : requestQueryString.sort.split(fieldsSeparator);
    }
    
    static GetLimitedFieldsFromRequestQueryString(
        requestQueryString,
        fieldsSeparator = ',') {
            
        return StringUtlities.
                IsNullOrWhiteSpace(requestQueryString.fields)
                ? []
                : requestQueryString.fields.split(fieldsSeparator);
    }

    static GetRequestBodyFieldsWithItsFilters(requestQueryString) {

        const queryStrAsStr = JSON.stringify(requestQueryString);
        const queryStrAsObj = JSON.parse(queryStrAsStr);

        for (const [objKey, objValue] of Object.entries(queryStrAsObj)) {

            if (typeof objValue === "string") {
                queryStrAsObj[objKey] = Controller
                    .#FilterSimboleWithValue(
                        queryStrAsObj,
                        objKey,
                        objValue);
            } else {
                queryStrAsObj[objKey] = Controller
                    .#FilterSimboleWithQueryFilter(
                        queryStrAsObj,
                        objKey,
                        objValue);
            }
        }

        return queryStrAsObj;
    }
    
    static #FilterSimboleWithQueryFilter(
        queryStringObject,
        objKey,
        objValue) {

        for (const opValue of Object.values(Controller.FiltrationOperatorsSymboles)) {

            if (!objValue.includes(opValue)) {
                continue;
            }
            
            // TODO: Write the logic here.

            break;
        }
        
        return queryStringObject[objKey];
    }
    
    static #FilterSimboleWithValue(
        queryStringObject,
        objKey,
        objValue,
        separator = ':',
        replaceSeparatorBy = '":') {

        for (const opValue of Object.values(Controller.FiltrationOperatorsSymboles)) {

            if (!objValue.includes(opValue)) {
                continue;
            }

            queryStringObject[objKey] = queryStringObject[objKey]
                .replace(separator, replaceSeparatorBy);

            queryStringObject[objKey] = `{ "$${queryStringObject[objKey]} }`;

            queryStringObject[objKey] = JSON.parse(queryStringObject[objKey]);

            break;
        }
        
        return queryStringObject[objKey];
    }
}
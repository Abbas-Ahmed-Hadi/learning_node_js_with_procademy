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

    static GetRequestBodyFieldsWithItsFilters(
        requestQueryString,
        separator = ':',
        replaceSeparatorBy = '":') {

        const queryStrAsStr = JSON.stringify(requestQueryString);
        const queryStrAsObj = JSON.parse(queryStrAsStr);

        for (const [objKey, objValue] of Object.entries(queryStrAsObj)) {

            if (typeof objValue !== "string") {
                continue;
            }

            for (const opValue of Object.values(Controller.FiltrationOperatorsSymboles)) {

                if (!objValue.includes(opValue)) {
                    continue;
                }

                queryStrAsObj[objKey] = queryStrAsObj[objKey]
                    .replace(separator, replaceSeparatorBy);

                queryStrAsObj[objKey] = `{ "$${queryStrAsObj[objKey]} }`;

                queryStrAsObj[objKey] = JSON.parse(queryStrAsObj[objKey]);

                break;
            }
        }

        return queryStrAsObj;
    }

}
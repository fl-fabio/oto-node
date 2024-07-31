export interface PaginatedResponse<T> {
    results: T[];
    total: number;
}

export const QueryParamsFilter = 
    <T>(
        data: T[], 
        filters: (keyof T)[], 
        query: {[key: string]: string | number}
    ) : PaginatedResponse<T> => {
        let filteredResults = [...data];
        const { skip, limit, ...queryFilters } = query;

        filters.forEach((filterItem) => {
            queryFilters[filterItem as string] &&
            (filteredResults = filteredResults.filter(
                (result) => result[filterItem] === query[filterItem as string]
            ));
        });

        if (skip !== undefined && limit !== undefined) {
            filteredResults = filteredResults.slice(
                skip as number,
                (skip as number) + (limit as number)
            );
        } 
        return {
            total: data.length,
            results: filteredResults
        };    
    };




/**
 * data = [
 *  { id: 1, name: 'John', age: 30 },
 *  { id: 2, name: 'Jane', age: 25 }
 * ]
 * 
 * QueryParamsFilter(data, ['id', 'name'], { skip: 0, limit: 10, name: 'John' })
 * 
 * filteredResults = [
 *   { id: 1, name: 'John', age: 30 },
 *  { id: 2, name: 'Jane', age: 25 }
 * ]
 * 
 * skip = 0
 * limit = 10
 * queryFilters = {
 *   name: 'John'
 * }
 * 
 * 
 */
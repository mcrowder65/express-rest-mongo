const QueryBuilder = {
    select: tableName => {
        return `select ?? from ${tableName}`;
    },
    selectWhere: tableName => {
        return `select ?? from ${tableName} where ?`;
    }
};

export default QueryBuilder;
